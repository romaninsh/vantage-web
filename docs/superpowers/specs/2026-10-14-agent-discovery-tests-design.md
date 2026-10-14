# Agent discovery tests — design

Date: 2026-10-14 · Linear project: Vantage AI-agent discoverability · label `agent-web`

## Goal

Find out **where AI agents go when they research a tool** for the jobs Vantage does, and turn that
into a list of places Vantage should be listed, content fixes for our own pages, and Linear tickets
for the humans who will do the listing.

Vantage ranking in today's results is a side metric. New pages take days to weeks to be indexed,
so "Vantage not found" in a round is expected; the transcripts are what we're after.

## Decisions (agreed)

- **Agent:** Claude only.
- **Sandbox:** `claude -p` with every setting source disabled, from a fresh empty temp directory,
  tools limited to `WebSearch` and `WebFetch`. No memory, no CLAUDE.md, no MCP servers, no
  plugins or hooks, no repo access.
- **Prompts:** realistic first-person user tasks (not raw keywords). The agent picks its own
  searches; which searches it picks is part of what we measure.
- **Models:** Sonnet and Opus, one run each per task (64 sessions per round for 32 tasks).

## Tasks

32 tasks in `agent/discovery/tasks.yaml`, each `{id, theme, prompt}`. Every prompt is in the voice
of a target user (positioning.md: internal-tools teams, developers building admin panels, platform
and ops engineers; also Rust developers for the framework), states their situation and ends with
"research the options and recommend one". No prompt names Vantage.

| # | Theme | Gist |
|---|---|---|
| 1–3 | Seeds | build an app with low-code · build a desktop app · speed up app development with an AI agent |
| 4–8 | Internal tools | self-hosted Retool alternative · internal tool without sending data to a cloud · admin panel over existing Postgres · Django-admin / CRUD generator alternative · back office over MySQL |
| 9–12 | Agent-built apps | Claude Code / Cursor builds an internal UI · app builder that works with my agent over MCP · config-as-code admin UI in YAML · AI app builder that keeps prompts and data private |
| 13–15 | Ops consoles | GUI over CLI tools · custom AWS resource console · dashboard over a REST/GraphQL API |
| 16–19 | Live data & DBs | real-time dashboard updating from the DB · editable DB GUI for non-technical staff · SurrealDB admin UI · MongoDB admin UI with relations |
| 20–23 | Legacy & enterprise | replace a legacy internal app without migrating data · signed, SSO-ready internal tools for corporate laptops · unify many partner APIs · expose a DB as an API and MCP service for agents |
| 24–29 | Rust | Rust desktop database editor · Rust app builder / low-code in Rust · native Rust (GPUI-style) UI for data apps · Rust ORM / entity framework across databases · Rust facade API over a legacy DB · data grid or admin UI component for a Rust desktop app |
| 30–32 | Comparisons | native alternative to Electron for data apps · open-source low-code for developers, not no-code · forms, grids and wizards over an existing DB, fast |

## Components

All under `vantage-web2/agent/discovery/`.

1. **`tasks.yaml`** — the tasks above.
2. **`run.py <round>`** — for each task × model: create an empty temp dir, run
   `claude -p --setting-sources "" --strict-mcp-config --model <m> --tools WebSearch,WebFetch --allowedTools WebSearch,WebFetch --output-format stream-json --verbose "<prompt>" < /dev/null`
   from it, write `runs/<round>/<task>-<model>.jsonl`. About 4 sessions in parallel, each with a
   timeout. Skips transcripts that already finished, so a failed round can be resumed. (`--bare`
   was dropped: it ignores the logged-in session and loads no tools. With all setting sources off
   the session has exactly WebSearch and WebFetch, no MCP servers, no plugins, no user hooks and an
   empty per-directory memory. Python rather than shell because macOS has no `timeout`.)
3. **`analyze.py <round>`** — parses the transcripts (stdlib only) and writes
   `reports/<round>.md`:
   - every search query, grouped by task — how agents phrase the need
   - domains and pages: how often each was returned by a search and how often it was actually
     fetched (fetched weighs more), across all runs
   - tools recommended, with the agent's stated reasons, per task and overall
   - every Vantage mention: in results, in fetched pages, in the recommendation
   - per-run failures (timeouts, refusals) so gaps aren't mistaken for findings
4. **`placements.md`** — written by hand from the report. Top sources sorted into: directories
   (submission link), GitHub awesome-lists (PR target), comparison/listicle articles (outreach
   note), community threads (for the human to judge; we don't post), and pages we control. Each
   entry: evidence (how many runs used it), how to get listed, suggested copy.
5. **Linear tickets for humans** — each placement worth doing and each content gap becomes a ticket
   in the discoverability project with the evidence, exact steps and ready-to-paste copy. Existing
   tickets that overlap (VAN-79, VAN-80, VAN-81, VAN-90…) are refined instead of duplicated.
6. **Content fixes** — gaps on our own pages, from what winning tools' pages offer that ours don't
   (comparison pages, crisp one-liners, pricing clarity, proof). Proposed for approval before any
   site edit.

## Data and git

Committed: `tasks.yaml`, `run.py`, `analyze.py`, `tests/`, `reports/`, `placements.md`. Gitignored: `runs/`
(raw transcripts, several MB per round).

## Re-testing

Rounds are dated (`2026-10-14`, …). Discovery is re-checked by re-running the same tasks after
content or listings change, at least a week apart, and comparing reports. A faster "preference"
check — does the agent pick Vantage once it has read our page next to the alternatives — is a
possible later addition, not part of this round.

## Out of scope

Other agents (ChatGPT, Perplexity, Gemini); posting to communities on anyone's behalf; the
crates.io metadata pass (VAN-77, blocked by the vantage refactor).

## Cost

64 headless sessions per round, roughly 5–15 searches/fetches each, billed to the configured API
key; Opus runs dominate.
