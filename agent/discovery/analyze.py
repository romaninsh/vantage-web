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
    r"vantage[- ]ui|(romaninsh|atk4)/vantage|romaninsh\.github\.io/vantage|medium\.com/@romaninsh"
    r"|(crates\.io/crates|docs\.rs|lib\.rs/crates)/vantage",
    re.IGNORECASE,
)
# Searches that can only come from the account identity leaking into the session.
IDENTITY = re.compile(r"romaninsh|malinovsk|\batk4\b|agile toolkit", re.IGNORECASE)


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
    contaminated: bool = False


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
    # An identity term counts as a leak only if the agent used it before any search result
    # showed it; following up on a Vantage repo it found itself is ordinary research.
    surfaced = False
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
            # Results mix link blocks with strings of the model's own commentary.
            results = [
                (c.get("title", ""), c["url"])
                for block in tur["results"] if isinstance(block, dict)
                for c in block.get("content") or [] if isinstance(c, dict) and c.get("url")
            ]
            if IDENTITY.search(tur["query"]) and not surfaced:
                r.contaminated = True
            surfaced = surfaced or any(IDENTITY.search(f"{t} {u}") for t, u in results)
            r.searches.append(Search(tur["query"], results))
        elif isinstance(tur, dict) and tur.get("url"):
            if IDENTITY.search(tur["url"]) and not surfaced:
                r.contaminated = True
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
        if r.contaminated:
            continue  # a hit found by searching for the author isn't discovery
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
    contaminated = [r for r in runs if r.contaminated]
    if contaminated:
        out += ["Contaminated runs (searched for the account identity; excluded from Vantage hits):", ""]
        out += [f"- {r.task_id} {r.model}: " + " · ".join(f"“{s.query}”" for s in r.searches if IDENTITY.search(s.query))
                for r in contaminated] + [""]

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
