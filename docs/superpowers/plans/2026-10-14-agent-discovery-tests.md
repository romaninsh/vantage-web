# Agent Discovery Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Run 32 realistic "find me a tool" tasks through sandboxed headless Claude sessions, log where the agents search and what they read, and turn that into placements, Linear tickets for humans, and proposed content fixes.

**Architecture:** `run.py` launches `claude -p` per task × model from an empty temp dir with only WebSearch/WebFetch and saves the stream-json transcript. `analyze.py` parses transcripts into runs (searches, results, fetches, answer) and renders a markdown report of domains, pages, queries, answers and Vantage hits. Placements, tickets and content proposals are written by hand from the report.

**Tech Stack:** Python 3 stdlib + PyYAML (installed, 6.0.3), `unittest`, Claude Code CLI 2.1.214, Linear MCP.

**Spec:** `docs/superpowers/specs/2026-10-14-agent-discovery-tests-design.md`

## Global Constraints

- All files live under `vantage-web2/agent/discovery/`; raw transcripts in `runs/` are gitignored.
- Sandbox command, exactly: `claude -p --setting-sources "" --strict-mcp-config --model <m> --tools WebSearch,WebFetch --allowedTools WebSearch,WebFetch --output-format stream-json --verbose <prompt>`, stdin from `/dev/null`, cwd an empty temp dir. `--allowedTools` is required: without it every tool call is denied in headless mode.
- Models: `sonnet`, `opus`; one run each per task.
- No prompt may name Vantage.
- Commits: the user's hook allows a commit only as the project's final step. Do not commit per task; the final task commits everything and opens one PR.
- Tests: run only the named test modules, from `agent/discovery`: `python3 -m unittest tests.test_run -v` / `tests.test_analyze`. No suite-wide runs except the final check in Task 8.
- Posting to communities (Reddit, HN, forums) is never done by the agent; such placements become tickets for the human.

## Review Focus

- A session that times out or crashes leaves a transcript with no `result` record → analyzer marks the run failed with "no result", and the next `run.py` invocation re-runs it instead of skipping it.
- Tool permission denied (`tool_use_result` is the string "Error: Claude requested permissions…") → run counted as failed ("tool permission denied"), not as a run with zero searches.
- A transcript line that isn't JSON (interrupted write) → skipped, parsing continues.
- WebSearch `results` entries that are plain strings (model commentary) rather than `{tool_use_id, content}` dicts → ignored, never crash.
- "vantage point" / "advantage" in a page or answer → not counted as a Vantage hit; only `vantage-ui`, `vantage ui`, `vantage-ui.com`, `romaninsh/vantage`, `crates.io/crates/vantage…`, `docs.rs/vantage…`, `lib.rs/crates/vantage…` count.

---

### Task 1: Task list and loader

**Files:**
- Create: `agent/discovery/tasks.yaml`
- Create: `agent/discovery/run.py` (loader only in this task)
- Create: `agent/discovery/tests/__init__.py` (empty)
- Test: `agent/discovery/tests/test_run.py`

**Interfaces:**
- Produces: `run.load_tasks(path: Path) -> list[dict]` — each dict has `id: str`, `theme: str`, `prompt: str`; raises `ValueError` on a missing key or duplicate id.

- [ ] **Step 1: Write `tasks.yaml`**

```yaml
# Discovery tasks: realistic requests from Vantage's target users. None names Vantage.
# Each ends by asking for research and a single recommendation.

- id: lowcode-business-app
  theme: seeds
  prompt: "I want to build an internal business app for my team without writing a full stack from scratch. I'm technical but short on time, so a low-code tool sounds right. Research the options and recommend one."
- id: desktop-app
  theme: seeds
  prompt: "I need to build a desktop app for my company: forms and tables over our data, running on our laptops. What's the fastest way to build one in 2026? Research the options and recommend one."
- id: agent-speedup
  theme: seeds
  prompt: "How can I speed up building business apps using an AI coding agent like Claude Code or Cursor? I want the agent to do most of the work on a real app, not a toy. Research the tools and approaches and recommend one."
- id: retool-selfhosted
  theme: internal-tools
  prompt: "We use Retool but don't want our data going through their cloud or to self-host a heavy Retool instance. What's a good alternative for internal tools? Research the options and recommend one."
- id: internal-tool-no-cloud
  theme: internal-tools
  prompt: "I need to give our ops team an internal tool over our production database, but security says no third-party cloud may see the data. What can I build it with? Research the options and recommend one."
- id: postgres-admin-panel
  theme: internal-tools
  prompt: "We have an existing Postgres database with about 40 tables and relations between them. I need an admin panel where staff can browse, search and edit records safely. Research the options and recommend one."
- id: crud-generator
  theme: internal-tools
  prompt: "I'm tired of hand-writing yet another CRUD admin backend (Django-admin style) for every project. Is there a tool that gives me a proper admin UI over my database quickly? Research the options and recommend one."
- id: mysql-backoffice
  theme: internal-tools
  prompt: "Our small company runs on a MySQL database that a contractor built years ago. We need a back-office app for orders and customers on top of it. Research the options and recommend one."
- id: agent-builds-internal-ui
  theme: agent-built
  prompt: "I'd like Claude Code to build an internal admin UI for our database, but I don't want it generating a big React codebase I then have to maintain. Is there a tool designed for an AI agent to configure an app instead? Research the options and recommend one."
- id: mcp-app-builder
  theme: agent-built
  prompt: "Is there an app builder that my AI coding agent can drive over MCP, so I describe the screens and the agent builds them against my real data? Research the options and recommend one."
- id: config-as-code-admin
  theme: agent-built
  prompt: "I want an admin/internal-tools UI defined as code in my git repo (YAML or similar), not clicked together in a web builder. What tools work like that? Research the options and recommend one."
- id: private-ai-builder
  theme: agent-built
  prompt: "I want to use AI to build internal apps, but I won't send our prompts or data to another vendor; I already pay for my own AI plan. Which app builders work with my own agent and keep data local? Research the options and recommend one."
- id: cli-to-gui
  theme: ops
  prompt: "Our platform team lives in a dozen CLI tools and scripts. I want a GUI that wraps them into tables and buttons so others can use them safely. Research the options and recommend one."
- id: aws-console
  theme: ops
  prompt: "The AWS console is painful for our team's daily tasks. I want a custom console showing just our resources across services, with actions. Research the options and recommend one."
- id: api-dashboard
  theme: ops
  prompt: "I need a dashboard over a third-party REST and GraphQL API: browse records, drill into related data, run a few actions. No database of my own. Research the options and recommend one."
- id: realtime-db-dashboard
  theme: live-data
  prompt: "I need dashboards and tables that update in real time when rows change in our database, without users pressing refresh. Research the options and recommend one."
- id: db-gui-for-staff
  theme: live-data
  prompt: "Non-technical staff need to view and edit data in our database. DBeaver and phpMyAdmin are too raw and risky for them. What should I give them? Research the options and recommend one."
- id: surrealdb-admin
  theme: live-data
  prompt: "We're building on SurrealDB. What's the best admin UI or app builder to manage the data, including relations? Research the options and recommend one."
- id: mongodb-admin
  theme: live-data
  prompt: "I need an admin UI for MongoDB where staff can work with related collections (customers, orders, invoices), not just raw JSON documents. Research the options and recommend one."
- id: legacy-replacement
  theme: legacy-enterprise
  prompt: "We have a 12-year-old internal app everyone depends on and nobody wants to touch. I want to replace its UI without migrating the database underneath. Research the options and recommend one."
- id: enterprise-signed-tools
  theme: legacy-enterprise
  prompt: "Our enterprise needs internal tools delivered as signed desktop apps with SSO that IT can install on corporate laptops, connected to our existing databases. Research the options and recommend one."
- id: unify-partner-apis
  theme: legacy-enterprise
  prompt: "Our business depends on dozens of partner APIs plus our own databases, glued together with scripts and polling. I want one place to see and act on all of it, live. Research the options and recommend one."
- id: db-as-api-mcp
  theme: legacy-enterprise
  prompt: "I want to expose our existing database as a clean internal API and also as an MCP server so AI agents in the company can use it safely. Research the options and recommend one."
- id: rust-db-editor
  theme: rust
  prompt: "I'm looking for a desktop database editor written in Rust: native, fast, for browsing and editing data across Postgres, SQLite and others. Research the options and recommend one."
- id: rust-app-builder
  theme: rust
  prompt: "Is there an app builder or low-code tool built in Rust for making data-heavy business apps? Research the options and recommend one."
- id: rust-native-ui
  theme: rust
  prompt: "I want to build a native desktop UI for a data-heavy app in Rust (GPUI, egui, Slint, Iced or similar), with big tables and forms. What should I use? Research the options and recommend one."
- id: rust-orm-multidb
  theme: rust
  prompt: "I need a Rust ORM or entity framework that works across several databases (SQL, SurrealDB, MongoDB) and APIs with the same model code. Research the options and recommend one."
- id: rust-facade-api
  theme: rust
  prompt: "I want to build a Rust service that puts a clean, typed API in front of a messy legacy database. What crates or frameworks should I use? Research the options and recommend one."
- id: rust-data-grid
  theme: rust
  prompt: "I need a data grid or admin-UI component for a Rust desktop app: sorting, filtering, editing, large datasets. Research the options and recommend one."
- id: electron-alternative
  theme: comparisons
  prompt: "Electron apps are too heavy for the data tools we build. What's a native alternative for desktop data apps? Research the options and recommend one."
- id: lowcode-for-developers
  theme: comparisons
  prompt: "I want an open-source low-code tool aimed at developers, not no-code citizen developers: code-first, versionable, extensible. Research the options and recommend one."
- id: forms-grids-wizards
  theme: comparisons
  prompt: "I need to put forms, data grids, wizards and dashboards on top of an existing database quickly. Research the options and recommend one."
```

- [ ] **Step 2: Write the failing test** — `agent/discovery/tests/test_run.py`

```python
import sys
import tempfile
import unittest
from pathlib import Path

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


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 3: Run to verify it fails**

Run: `cd agent/discovery && python3 -m unittest tests.test_run -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'run'`

- [ ] **Step 4: Minimal `run.py` with the loader**

```python
#!/usr/bin/env python3
"""Run the discovery tasks in sandboxed headless Claude sessions.

    python3 run.py 2026-10-14                # every task x model
    python3 run.py 2026-10-14 --tasks rust-db-editor --models sonnet

Each session starts in an empty temp directory with every settings source
off, so it sees no memory, CLAUDE.md, MCP servers, plugins or hooks, and has
exactly two tools: WebSearch and WebFetch. Transcripts go to
runs/<round>/<task>-<model>.jsonl; finished ones are skipped on re-runs.
"""

from pathlib import Path

import yaml

HERE = Path(__file__).resolve().parent
REQUIRED = ("id", "theme", "prompt")


def load_tasks(path):
    tasks = yaml.safe_load(Path(path).read_text())
    seen = set()
    for t in tasks:
        missing = [k for k in REQUIRED if not t.get(k)]
        if missing:
            raise ValueError(f"task {t.get('id', '?')}: missing {', '.join(missing)}")
        if t["id"] in seen:
            raise ValueError(f"duplicate task id {t['id']}")
        seen.add(t["id"])
    return tasks
```

- [ ] **Step 5: Run to verify it passes**

Run: `cd agent/discovery && python3 -m unittest tests.test_run -v`
Expected: 3 tests OK

---

### Task 2: Sandboxed runner

**Files:**
- Modify: `agent/discovery/run.py`
- Create: `agent/discovery/.gitignore`
- Test: `agent/discovery/tests/test_run.py` (add cases)

**Interfaces:**
- Consumes: `load_tasks` (Task 1).
- Produces: `run.claude_command(model: str, prompt: str, binary: str = "claude") -> list[str]`; `run.is_complete(path: Path) -> bool` (file has a `"type": "result"` record); `run.run_one(task: dict, model: str, out_dir: Path, binary: str, timeout: int) -> str` returning `"skipped" | "ok" | "error" | "timeout"`; `run.main(argv: list[str]) -> int`. Binary overridable with env `CLAUDE_BIN`.

- [ ] **Step 1: Add failing tests** — append to `tests/test_run.py` above the `if __name__` block

```python
import json
import os
import stat
import textwrap

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

    def test_missing_result_is_error(self):
        with tempfile.TemporaryDirectory() as d:
            os.environ["FAKE_NO_RESULT"] = "1"
            try:
                status = run.run_one(TASK, "sonnet", Path(d), fake_binary(d), 30)
            finally:
                del os.environ["FAKE_NO_RESULT"]
            self.assertEqual(status, "error")
```

- [ ] **Step 2: Run to verify they fail**

Run: `cd agent/discovery && python3 -m unittest tests.test_run -v`
Expected: the six new tests ERROR with `AttributeError: module 'run' has no attribute 'claude_command'` (Task 1 tests still pass)

- [ ] **Step 3: Implement the runner** — append to `run.py` and add imports at the top (`argparse`, `json`, `os`, `subprocess`, `sys`, `tempfile`, `concurrent.futures.ThreadPoolExecutor`)

```python
MODELS = ["sonnet", "opus"]
TIMEOUT = 900  # seconds per session


def claude_command(model, prompt, binary="claude"):
    return [
        binary, "-p",
        "--setting-sources", "",
        "--strict-mcp-config",
        "--model", model,
        "--tools", "WebSearch,WebFetch",
        "--allowedTools", "WebSearch,WebFetch",
        "--output-format", "stream-json",
        "--verbose",
        prompt,
    ]


def is_complete(path):
    if not path.exists():
        return False
    for line in path.read_text(errors="replace").splitlines():
        try:
            if json.loads(line).get("type") == "result":
                return True
        except (json.JSONDecodeError, AttributeError):
            continue
    return False


def run_one(task, model, out_dir, binary, timeout):
    out = out_dir / f"{task['id']}-{model}.jsonl"
    if is_complete(out):
        return "skipped"
    with tempfile.TemporaryDirectory(prefix="discovery-") as sandbox, open(out, "wb") as f:
        try:
            proc = subprocess.run(
                claude_command(model, task["prompt"], binary),
                cwd=sandbox, stdin=subprocess.DEVNULL, stdout=f,
                stderr=subprocess.DEVNULL, timeout=timeout,
            )
        except subprocess.TimeoutExpired:
            return "timeout"
    return "ok" if proc.returncode == 0 and is_complete(out) else "error"


def main(argv):
    p = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    p.add_argument("round", help="round name, e.g. 2026-10-14")
    p.add_argument("--tasks", nargs="*", help="task ids (default: all)")
    p.add_argument("--models", nargs="*", default=MODELS)
    p.add_argument("--jobs", type=int, default=4)
    p.add_argument("--timeout", type=int, default=TIMEOUT)
    args = p.parse_args(argv)

    tasks = load_tasks(HERE / "tasks.yaml")
    if args.tasks:
        unknown = set(args.tasks) - {t["id"] for t in tasks}
        if unknown:
            p.error(f"unknown task ids: {', '.join(sorted(unknown))}")
        tasks = [t for t in tasks if t["id"] in args.tasks]
    out_dir = HERE / "runs" / args.round
    out_dir.mkdir(parents=True, exist_ok=True)
    binary = os.environ.get("CLAUDE_BIN", "claude")

    jobs = [(t, m) for t in tasks for m in args.models]
    counts = {}
    with ThreadPoolExecutor(max_workers=args.jobs) as pool:
        futures = {pool.submit(run_one, t, m, out_dir, binary, args.timeout): (t["id"], m) for t, m in jobs}
        for n, fut in enumerate(futures, 1):
            status = fut.result()
            counts[status] = counts.get(status, 0) + 1
            task_id, model = futures[fut]
            print(f"[{n}/{len(jobs)}] {status:7} {task_id} {model}", flush=True)
    print(" ".join(f"{k}={v}" for k, v in sorted(counts.items())))
    return 1 if counts.get("error") or counts.get("timeout") else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
```

- [ ] **Step 4: `.gitignore`**

```
# Raw session transcripts: several MB per round. Reports are committed instead.
runs/
```

- [ ] **Step 5: Run to verify all pass**

Run: `cd agent/discovery && python3 -m unittest tests.test_run -v`
Expected: 9 tests OK

---

### Task 3: Transcript analyzer and report

**Files:**
- Create: `agent/discovery/analyze.py`
- Test: `agent/discovery/tests/test_analyze.py`
- Uses fixtures (already captured from real sessions): `tests/fixtures/search-and-fetch.jsonl` (one search for "rust desktop database editor", one fetch of `https://github.com/rustbunker/tables`, answer names "Tables"), `tests/fixtures/auth-failure.jsonl` (result "Not logged in · Please run /login", `is_error: true`)

**Interfaces:**
- Consumes: `run.load_tasks` for task themes/prompts in the report.
- Produces: dataclasses `Search(query: str, results: list[tuple[str, str]])`, `Fetch(url: str, code: int | None)`, `Run(task_id, model, searches, fetches, answer: str, ok: bool, error: str, cost: float | None, turns: int | None)`; `parse_transcript(path: Path) -> Run` (task id and model from the file name `<task>-<model>.jsonl`); `domain(url: str) -> str`; `is_vantage(text: str) -> bool`; `aggregate(runs: list[Run]) -> dict`; `render_report(round_name: str, runs: list[Run], tasks: list[dict]) -> str`; `main(argv) -> int` writing `reports/<round>.md`.

- [ ] **Step 1: Write failing tests** — `tests/test_analyze.py`

```python
import json
import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(HERE))

import analyze  # noqa: E402

FIX = HERE / "tests" / "fixtures"


def write(d, name, records, raw_lines=()):
    p = Path(d) / name
    lines = [json.dumps(r) for r in records] + list(raw_lines)
    p.write_text("\n".join(lines) + "\n")
    return p


SEARCH = {"type": "user", "tool_use_result": {"query": "q1", "results": [
    "Some commentary string the model added",
    {"tool_use_id": "x", "content": [{"title": "Tool A", "url": "https://www.example.com/a"},
                                      {"title": "Tool B", "url": "https://other.dev/b"}]}]}}
FETCH = {"type": "user", "tool_use_result": {"url": "https://www.example.com/a", "code": 200}}
RESULT = {"type": "result", "is_error": False, "result": "Use Tool A.", "total_cost_usd": 0.5, "num_turns": 4}


class Parse(unittest.TestCase):
    def test_real_search_and_fetch(self):
        r = analyze.parse_transcript(FIX / "search-and-fetch.jsonl")
        self.assertTrue(r.ok, r.error)
        self.assertEqual([s.query for s in r.searches], ["rust desktop database editor"])
        self.assertIn("https://github.com/rustbunker/tables", [u for _, u in r.searches[0].results])
        self.assertEqual([(f.url, f.code) for f in r.fetches], [("https://github.com/rustbunker/tables", 200)])
        self.assertIn("Tables", r.answer)
        self.assertGreater(r.cost, 0)

    def test_task_and_model_from_file_name(self):
        with tempfile.TemporaryDirectory() as d:
            r = analyze.parse_transcript(write(d, "rust-db-editor-opus.jsonl", [RESULT]))
            self.assertEqual((r.task_id, r.model), ("rust-db-editor", "opus"))

    def test_real_auth_failure(self):
        r = analyze.parse_transcript(FIX / "auth-failure.jsonl")
        self.assertFalse(r.ok)
        self.assertIn("Not logged in", r.error)

    def test_no_result_record_is_failure(self):
        with tempfile.TemporaryDirectory() as d:
            r = analyze.parse_transcript(write(d, "t-sonnet.jsonl", [SEARCH]))
            self.assertFalse(r.ok)
            self.assertIn("no result", r.error)
            self.assertEqual(len(r.searches), 1)

    def test_bad_line_and_string_results_are_skipped(self):
        with tempfile.TemporaryDirectory() as d:
            r = analyze.parse_transcript(write(d, "t-sonnet.jsonl", [SEARCH, FETCH, RESULT], ['{"type": "us']))
            self.assertTrue(r.ok)
            self.assertEqual(r.searches[0].results, [("Tool A", "https://www.example.com/a"),
                                                     ("Tool B", "https://other.dev/b")])

    def test_permission_denied_is_failure(self):
        denied = {"type": "user", "tool_use_result": "Error: Claude requested permissions to use WebSearch, but you haven't granted it yet."}
        with tempfile.TemporaryDirectory() as d:
            r = analyze.parse_transcript(write(d, "t-sonnet.jsonl", [denied, RESULT]))
            self.assertFalse(r.ok)
            self.assertIn("permission", r.error)


class Helpers(unittest.TestCase):
    def test_domain(self):
        self.assertEqual(analyze.domain("https://www.Example.com/a?b"), "example.com")
        self.assertEqual(analyze.domain("not a url"), "")

    def test_is_vantage(self):
        for yes in ("https://vantage-ui.com/", "Vantage UI is a desktop app", "github.com/romaninsh/vantage",
                    "https://crates.io/crates/vantage-sql", "https://docs.rs/vantage-table"):
            self.assertTrue(analyze.is_vantage(yes), yes)
        for no in ("from a different vantage point", "a clear advantage", "Vantage Data Centers"):
            self.assertFalse(analyze.is_vantage(no), no)


class Report(unittest.TestCase):
    def runs(self, d):
        a = analyze.parse_transcript(write(d, "t1-sonnet.jsonl", [SEARCH, FETCH, RESULT]))
        b = analyze.parse_transcript(write(d, "t1-opus.jsonl", [SEARCH, SEARCH, RESULT]))
        return [a, b]

    def test_domains_counted_once_per_run(self):
        with tempfile.TemporaryDirectory() as d:
            agg = analyze.aggregate(self.runs(d))
            self.assertEqual(agg["appeared"]["example.com"], 2)  # two runs, three searches
            self.assertEqual(agg["fetched"]["example.com"], 1)
            self.assertEqual(agg["fetched_pages"]["https://www.example.com/a"], 1)

    def test_report_sections(self):
        with tempfile.TemporaryDirectory() as d:
            text = analyze.render_report("r1", self.runs(d), [{"id": "t1", "theme": "x", "prompt": "find a tool"}])
            for heading in ("# Discovery round r1", "## Vantage", "## Domains", "## Pages fetched",
                            "## Search queries", "## Answers"):
                self.assertIn(heading, text)
            self.assertIn("not found in any run", text)
            self.assertIn("example.com", text)
            self.assertIn("q1", text)

    def test_report_lists_vantage_hits_and_failures(self):
        hit = {"type": "user", "tool_use_result": {"query": "q", "results": [
            {"content": [{"title": "Vantage UI", "url": "https://vantage-ui.com/"}]}]}}
        with tempfile.TemporaryDirectory() as d:
            ok = analyze.parse_transcript(write(d, "t1-sonnet.jsonl", [hit, RESULT]))
            bad = analyze.parse_transcript(write(d, "t1-opus.jsonl", [hit]))
            text = analyze.render_report("r1", [ok, bad], [{"id": "t1", "theme": "x", "prompt": "p"}])
            self.assertIn("https://vantage-ui.com/", text)
            self.assertIn("Failed runs", text)
            self.assertIn("t1 opus", text)
```

- [ ] **Step 2: Run to verify they fail**

Run: `cd agent/discovery && python3 -m unittest tests.test_analyze -v`
Expected: ERROR — `ModuleNotFoundError: No module named 'analyze'`

- [ ] **Step 3: Implement `analyze.py`**

```python
#!/usr/bin/env python3
"""Turn a round of discovery transcripts into a markdown report.

    python3 analyze.py 2026-10-14   # reads runs/2026-10-14/, writes reports/2026-10-14.md

For every run: the searches the agent made and the links each returned, the
pages it fetched, its final answer, and whether it failed. Across runs:
which domains and pages agents rely on, counted once per run, and every
place Vantage showed up.
"""

import json
import re
import sys
from collections import Counter
from dataclasses import dataclass, field
from pathlib import Path
from urllib.parse import urlparse

import run

HERE = Path(__file__).resolve().parent

# Only unambiguous Vantage references; "vantage point" and "advantage" don't count.
VANTAGE = re.compile(
    r"vantage[- ]ui|romaninsh/vantage|(crates\.io/crates|docs\.rs|lib\.rs/crates)/vantage",
    re.IGNORECASE,
)


@dataclass
class Search:
    query: str
    results: list = field(default_factory=list)  # (title, url)


@dataclass
class Fetch:
    url: str
    code: int | None


@dataclass
class Run:
    task_id: str
    model: str
    searches: list = field(default_factory=list)
    fetches: list = field(default_factory=list)
    answer: str = ""
    ok: bool = False
    error: str = ""
    cost: float | None = None
    turns: int | None = None


def domain(url):
    host = urlparse(url).netloc.lower()
    return host[4:] if host.startswith("www.") else host


def is_vantage(text):
    return bool(VANTAGE.search(text or ""))


def parse_transcript(path):
    path = Path(path)
    task_id, _, model = path.stem.rpartition("-")
    r = Run(task_id=task_id, model=model)
    denied = 0
    got_result = False
    for line in path.read_text(errors="replace").splitlines():
        try:
            rec = json.loads(line)
        except json.JSONDecodeError:
            continue
        if not isinstance(rec, dict):
            continue
        tur = rec.get("tool_use_result")
        if isinstance(tur, str) and "requested permissions" in tur:
            denied += 1
        elif isinstance(tur, dict) and "query" in tur and "results" in tur:
            results = [
                (c.get("title", ""), c["url"])
                for block in tur["results"] if isinstance(block, dict)
                for c in block.get("content") or [] if isinstance(c, dict) and c.get("url")
            ]
            r.searches.append(Search(tur["query"], results))
        elif isinstance(tur, dict) and tur.get("url"):
            r.fetches.append(Fetch(tur["url"], tur.get("code")))
        if rec.get("type") == "result":
            got_result = True
            r.answer = rec.get("result") or ""
            r.ok = not rec.get("is_error")
            r.cost = rec.get("total_cost_usd")
            r.turns = rec.get("num_turns")
            if not r.ok:
                r.error = r.answer[:200] or "error result"
    if not got_result:
        r.ok, r.error = False, "no result record (timeout or crash)"
    elif denied and not r.searches and not r.fetches:
        r.ok, r.error = False, "tool permission denied"
    return r


def aggregate(runs):
    appeared, fetched, fetched_pages = Counter(), Counter(), Counter()
    vantage = []  # (run label, where, detail)
    for r in runs:
        label = f"{r.task_id} {r.model}"
        seen = {domain(u) for s in r.searches for _, u in s.results}
        appeared.update(d for d in seen if d)
        fetched.update({domain(f.url) for f in r.fetches} - {""})
        fetched_pages.update({f.url for f in r.fetches})
        for s in r.searches:
            for title, url in s.results:
                if is_vantage(url) or is_vantage(title):
                    vantage.append((label, f"search result for “{s.query}”", url))
        for f in r.fetches:
            if is_vantage(f.url):
                vantage.append((label, "fetched", f.url))
        if is_vantage(r.answer):
            vantage.append((label, "final answer", "named in the recommendation"))
    return {"appeared": appeared, "fetched": fetched, "fetched_pages": fetched_pages, "vantage": vantage}


def render_report(round_name, runs, tasks):
    agg = aggregate(runs)
    by_task = {t["id"]: t for t in tasks}
    ok = [r for r in runs if r.ok]
    failed = [r for r in runs if not r.ok]
    cost = sum(r.cost or 0 for r in runs)
    out = [
        f"# Discovery round {round_name}", "",
        f"{len(runs)} runs ({len(ok)} ok, {len(failed)} failed), "
        f"{sum(len(r.searches) for r in runs)} searches, {sum(len(r.fetches) for r in runs)} fetches, "
        f"${cost:.2f}.", "",
    ]
    if failed:
        out += ["Failed runs:", ""] + [f"- {r.task_id} {r.model}: {r.error}" for r in failed] + [""]

    out += ["## Vantage", ""]
    if agg["vantage"]:
        out += ["| Run | Where | Detail |", "|---|---|---|"]
        out += [f"| {a} | {b} | {c} |" for a, b, c in agg["vantage"]]
    else:
        out.append("Vantage was not found in any run.")
    out.append("")

    out += ["## Domains", "", "Runs that fetched a page from the domain, and runs whose searches returned it.", "",
            "| Domain | Fetched (runs) | In results (runs) |", "|---|---|---|"]
    domains = set(agg["fetched"]) | set(agg["appeared"])
    ranked = sorted(domains, key=lambda d: (-agg["fetched"][d], -agg["appeared"][d], d))
    out += [f"| {d} | {agg['fetched'][d]} | {agg['appeared'][d]} |" for d in ranked[:60]]
    out.append("")

    out += ["## Pages fetched", "", "| Runs | Page |", "|---|---|"]
    out += [f"| {n} | {u} |" for u, n in agg["fetched_pages"].most_common(80)]
    out.append("")

    out += ["## Search queries", ""]
    for task_id in sorted({r.task_id for r in runs}):
        theme = by_task.get(task_id, {}).get("theme", "")
        out += [f"### {task_id} ({theme})", ""]
        for r in sorted((r for r in runs if r.task_id == task_id), key=lambda r: r.model):
            out += [f"- **{r.model}:** " + " · ".join(f"“{s.query}”" for s in r.searches)]
        out.append("")

    out += ["## Answers", ""]
    for r in sorted(runs, key=lambda r: (r.task_id, r.model)):
        prompt = by_task.get(r.task_id, {}).get("prompt", "")
        out += [f"### {r.task_id} — {r.model}", "", f"> {prompt}", ""]
        out += [(r.answer.strip()[:1500] or f"_{r.error}_"), ""]
    return "\n".join(out)


def main(argv):
    if len(argv) != 1:
        print(__doc__.strip().splitlines()[2].strip(), file=sys.stderr)
        return 2
    round_name = argv[0]
    paths = sorted((HERE / "runs" / round_name).glob("*.jsonl"))
    if not paths:
        print(f"no transcripts in runs/{round_name}/", file=sys.stderr)
        return 1
    runs = [parse_transcript(p) for p in paths]
    tasks = run.load_tasks(HERE / "tasks.yaml")
    out = HERE / "reports" / f"{round_name}.md"
    out.parent.mkdir(exist_ok=True)
    out.write_text(render_report(round_name, runs, tasks))
    print(f"{out.relative_to(HERE)}: {len(runs)} runs, {sum(not r.ok for r in runs)} failed")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
```

- [ ] **Step 4: Run to verify they pass**

Run: `cd agent/discovery && python3 -m unittest tests.test_analyze -v`
Expected: 11 tests OK

---

### Task 4: Smoke run, then round 1

No new code. Gate between the smoke run and the full round.

- [ ] **Step 1: Smoke run** — one Rust task, both models

Run: `cd agent/discovery && python3 run.py smoke --tasks rust-db-editor`
Expected: `[1/2] ok …`, `[2/2] ok …`, `ok=2`, exit 0.

- [ ] **Step 2: Analyze the smoke round**

Run: `cd agent/discovery && python3 analyze.py smoke && grep -c '' reports/smoke.md`
Expected: `reports/smoke.md: 2 runs, 0 failed`. Read the report: searches, domains and answers present; costs plausible (sonnet ≈ $0.2–1, opus more).

- [ ] **Step 3: Full round**

Run (in background, ~64 sessions, 4 at a time): `cd agent/discovery && python3 run.py 2026-10-14`
Expected: all 64 `ok` or `skipped`; on any `error`/`timeout`, re-run the same command once (finished runs are skipped).

- [ ] **Step 4: Analyze round 1**

Run: `cd agent/discovery && python3 analyze.py 2026-10-14`
Expected: `reports/2026-10-14.md: 64 runs, 0 failed` (a few failures are acceptable if a re-run didn't fix them; they're listed at the top of the report).

- [ ] **Step 5: Remove the smoke report** — `reports/smoke.md` is not committed (`rm agent/discovery/reports/smoke.md`).

---

### Task 5: Placements

**Files:**
- Create: `agent/discovery/placements.md`

- [ ] **Step 1: Read `reports/2026-10-14.md` end to end.** Note the top ~30 domains by "Fetched (runs)", pages fetched by 2+ runs, recurring query phrasings, the tools recommended most and the reasons given.

- [ ] **Step 2: Write `placements.md`** with these sections, every entry citing its evidence (runs that fetched it / returned it):
  - **Directories and catalogs** — site, evidence, submission URL, category to list under, suggested 1-line and 3-line copy.
  - **GitHub awesome-lists** — repo, evidence, section to add to, exact list line to PR.
  - **Comparison and listicle articles** — URL, evidence, what the article covers, outreach angle (why Vantage belongs in it), contact route if visible.
  - **Community threads** — URL, evidence, note for the human (we never post).
  - **Pages we control** — for each recurring query with no good Vantage page, the page we'd need.
  - **What winners have** — patterns in the pages of the most-recommended tools (comparison pages, pricing, demos, GitHub stars, docs depth).

---

### Task 6: Linear tickets for humans

- [ ] **Step 1: Draft** the ticket list at the end of `placements.md` (title, why with evidence, steps, copy) and show it to the user. Merge with existing tickets where they overlap: VAN-79 (crawlable tutorial and comparison content), VAN-80 (launch posts), VAN-81 (ecosystem catalogs + seed Q&A), VAN-90 (positioning).

- [ ] **Step 2: After the user OKs the list,** create new tickets with `mcp__linear__save_issue` (team "Vantage UI", project "Vantage AI-agent discoverability", parent VAN-73 for catalogs/lists/articles or VAN-76 for positioning) and refine overlapping ones with a description patch. Human tickets are not labelled `agent-web`.

---

### Task 7: Content fix proposals

- [ ] **Step 1: Propose** (in chat, not edits) the site changes the report supports: new pages (e.g. comparisons the agents searched for), wording changes on existing pages to match how agents phrase the need, missing facts winners state (pricing, platforms, open-source status). Each with evidence.

- [ ] **Step 2: Stop** for the user's selection. Approved changes are a separate follow-up.

---

### Task 8: Commit and PR

- [ ] **Step 1: Run both test modules once**

Run: `cd agent/discovery && python3 -m unittest tests.test_run tests.test_analyze -v`
Expected: 20 tests OK

- [ ] **Step 2: Commit and open the PR** (final step, per the commit rule)

```bash
git add docs/superpowers/specs/2026-10-14-agent-discovery-tests-design.md \
        docs/superpowers/plans/2026-10-14-agent-discovery-tests.md \
        agent/discovery/.gitignore agent/discovery/tasks.yaml agent/discovery/run.py \
        agent/discovery/analyze.py agent/discovery/tests agent/discovery/reports/2026-10-14.md \
        agent/discovery/placements.md
git commit -m "add agent discovery tests and round 1 report"
git push -u origin agent-discovery
gh pr create --base main --head agent-discovery --title "add agent discovery tests and round 1 report"
```
