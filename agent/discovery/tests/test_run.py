import json
import os
import stat
import sys
import tempfile
import textwrap
import unittest
from pathlib import Path
from unittest import mock

HERE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(HERE))

import run  # noqa: E402


class LoadTasks(unittest.TestCase):
    def test_real_task_file(self):
        tasks = run.load_tasks(HERE / "tasks.yaml")
        self.assertEqual(len(tasks), 32)
        self.assertEqual(len({t["id"] for t in tasks}), 32)
        for t in tasks:
            self.assertNotIn("vantage", t["prompt"].lower(), t["id"])
            self.assertTrue(t["theme"])

    def test_rejects_duplicate_ids(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "t.yaml"
            p.write_text("- {id: a, theme: x, prompt: p}\n- {id: a, theme: x, prompt: q}\n")
            with self.assertRaises(ValueError):
                run.load_tasks(p)

    def test_rejects_missing_key(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "t.yaml"
            p.write_text("- {id: a, prompt: p}\n")
            with self.assertRaises(ValueError):
                run.load_tasks(p)


FAKE = textwrap.dedent("""\
    #!/usr/bin/env python3
    import json, os, sys, time
    if os.environ.get("FAKE_SLEEP"):
        time.sleep(float(os.environ["FAKE_SLEEP"]))
    print(json.dumps({"type": "system", "subtype": "init", "cwd": os.getcwd()}))
    if not os.environ.get("FAKE_NO_RESULT"):
        print(json.dumps({"type": "result", "is_error": False, "result": " ".join(sys.argv[1:])}))
""")


def fake_binary(d):
    p = Path(d) / "fake-claude"
    p.write_text(FAKE)
    p.chmod(p.stat().st_mode | stat.S_IEXEC)
    return str(p)


TASK = {"id": "t1", "theme": "x", "prompt": "find a tool"}


class Runner(unittest.TestCase):
    def test_command_is_sandboxed(self):
        cmd = run.claude_command("opus", "find a tool")
        self.assertEqual(cmd[:2], ["claude", "-p"])
        for flag in (["--setting-sources", ""], ["--strict-mcp-config"],
                     ["--tools", "WebSearch,WebFetch"], ["--allowedTools", "WebSearch,WebFetch"],
                     ["--output-format", "stream-json"], ["--verbose"], ["--model", "opus"]):
            i = cmd.index(flag[0])
            self.assertEqual(cmd[i:i + len(flag)], flag)
        self.assertEqual(cmd[-1], "find a tool")

    def test_command_hides_account_identity(self):
        # A logged-in session puts the account email in the system prompt; agents used it to
        # search for the author's own projects. The appended prompt tells them to ignore it.
        cmd = run.claude_command("sonnet", "find a tool")
        i = cmd.index("--append-system-prompt")
        self.assertIn("anonymous", cmd[i + 1])
        self.assertIn("never search for it", cmd[i + 1])

    def test_runs_in_empty_dir_and_writes_transcript(self):
        with tempfile.TemporaryDirectory() as d:
            out = Path(d) / "out"
            out.mkdir()
            status = run.run_one(TASK, "sonnet", out, fake_binary(d), timeout=30)
            self.assertEqual(status, "ok")
            lines = [json.loads(l) for l in (out / "t1-sonnet.jsonl").read_text().splitlines()]
            cwd = Path(lines[0]["cwd"])
            self.assertNotEqual(cwd.resolve(), Path(d).resolve())
            self.assertFalse(cwd.exists())  # temp sandbox removed afterwards
            self.assertTrue(run.is_complete(out / "t1-sonnet.jsonl"))

    def test_skips_finished_transcript(self):
        with tempfile.TemporaryDirectory() as d:
            out = Path(d)
            (out / "t1-sonnet.jsonl").write_text(json.dumps({"type": "result"}) + "\n")
            self.assertEqual(run.run_one(TASK, "sonnet", out, fake_binary(d), 30), "skipped")

    def test_reruns_transcript_without_result(self):
        with tempfile.TemporaryDirectory() as d:
            out = Path(d)
            (out / "t1-sonnet.jsonl").write_text(json.dumps({"type": "system"}) + "\n")
            self.assertEqual(run.run_one(TASK, "sonnet", out, fake_binary(d), 30), "ok")

    def test_timeout_keeps_partial_and_is_retried(self):
        with tempfile.TemporaryDirectory() as d:
            out = Path(d)
            os.environ["FAKE_SLEEP"] = "5"
            try:
                status = run.run_one(TASK, "sonnet", out, fake_binary(d), timeout=1)
            finally:
                del os.environ["FAKE_SLEEP"]
            self.assertEqual(status, "timeout")
            self.assertTrue((out / "t1-sonnet.jsonl").exists())
            self.assertFalse(run.is_complete(out / "t1-sonnet.jsonl"))

    def test_error_result_is_retried(self):
        # "Not logged in", rate limits and API errors end with an is_error result record;
        # those must be re-run, not skipped forever.
        with tempfile.TemporaryDirectory() as d:
            out = Path(d)
            fixture = HERE / "tests" / "fixtures" / "auth-failure.jsonl"
            (out / "t1-sonnet.jsonl").write_text(fixture.read_text())
            self.assertFalse(run.is_complete(out / "t1-sonnet.jsonl"))
            self.assertEqual(run.run_one(TASK, "sonnet", out, fake_binary(d), 30), "ok")

    def test_interrupt_stops_queued_sessions(self):
        started = []

        def fake_run_one(task, model, out_dir, binary, timeout):
            started.append((task["id"], model))
            if len(started) == 1:
                raise KeyboardInterrupt
            return "ok"

        with mock.patch.object(run, "run_one", fake_run_one), \
                mock.patch.object(run, "HERE", Path(tempfile.mkdtemp())):
            (run.HERE / "tasks.yaml").write_text((HERE / "tasks.yaml").read_text())
            with self.assertRaises(KeyboardInterrupt):
                run.main(["r", "--tasks", "desktop-app", "aws-console", "rust-db-editor", "--jobs", "1"])
        self.assertLess(len(started), 6)  # 3 tasks x 2 models queued; the rest never start

    def test_missing_result_is_error(self):
        with tempfile.TemporaryDirectory() as d:
            os.environ["FAKE_NO_RESULT"] = "1"
            try:
                status = run.run_one(TASK, "sonnet", Path(d), fake_binary(d), 30)
            finally:
                del os.environ["FAKE_NO_RESULT"]
            self.assertEqual(status, "error")


if __name__ == "__main__":
    unittest.main()
