#!/usr/bin/env python3
"""Run the discovery tasks in sandboxed headless Claude sessions.

    python3 run.py 2026-10-14                # every task x model
    python3 run.py 2026-10-14 --tasks rust-db-editor --models sonnet

Each session starts in an empty temp directory with every settings source
off, so it sees no memory, CLAUDE.md, MCP servers, plugins or hooks, and has
exactly two tools: WebSearch and WebFetch. Transcripts go to
runs/<round>/<task>-<model>.jsonl; finished ones are skipped on re-runs.
"""

import argparse
import json
import os
import subprocess
import sys
import tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import yaml

HERE = Path(__file__).resolve().parent
REQUIRED = ("id", "theme", "prompt")
MODELS = ["sonnet", "opus"]
TIMEOUT = 900  # seconds per session

# A logged-in session carries the account's email in its system prompt, and
# agents used it to go looking for the author's own projects. There is no
# flag to drop it, so the session is told to ignore it; analyze.py flags any
# run that searched for the identity anyway.
ANONYMOUS = (
    "This is an anonymous research session. You do not know who the user is: ignore any "
    "account name, email address or handle in your context, never mention it, never search "
    "for it, and never let it influence which tools you find or recommend."
)


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


def claude_command(model, prompt, binary="claude"):
    return [
        binary, "-p",
        "--setting-sources", "",
        "--strict-mcp-config",
        "--model", model,
        "--tools", "WebSearch,WebFetch",
        # Headless mode denies every tool call unless it's pre-allowed.
        "--allowedTools", "WebSearch,WebFetch",
        "--append-system-prompt", ANONYMOUS,
        "--output-format", "stream-json",
        "--verbose",
        prompt,
    ]


def is_complete(path):
    """A successful result record. Error results (auth, rate limit) get re-run."""
    if not path.exists():
        return False
    for line in path.read_text(errors="replace").splitlines():
        try:
            rec = json.loads(line)
            if rec.get("type") == "result" and not rec.get("is_error"):
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
    pool = ThreadPoolExecutor(max_workers=args.jobs)
    futures = {pool.submit(run_one, t, m, out_dir, binary, args.timeout): (t["id"], m) for t, m in jobs}
    try:
        for n, fut in enumerate(futures, 1):
            status = fut.result()
            counts[status] = counts.get(status, 0) + 1
            task_id, model = futures[fut]
            print(f"[{n}/{len(jobs)}] {status:7} {task_id} {model}", flush=True)
    except BaseException:
        # Every queued job is a paid session: on Ctrl-C (or a crash) start no more.
        pool.shutdown(wait=False, cancel_futures=True)
        raise
    pool.shutdown()
    print(" ".join(f"{k}={v}" for k, v in sorted(counts.items())))
    return 1 if counts.get("error") or counts.get("timeout") else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
