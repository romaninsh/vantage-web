# Vantage 1.13

Each profile now has one env file: `prod` reads `.env.prod`, `local` reads `.env.local`.
**Project Secrets** shows every variable once with a column per profile, so you edit prod without
switching the app to prod; missing values are red, each row says which YAML file uses it, and Save
reconnects. A project that still keeps `local`'s values in `.env` keeps working, and Project
Secrets offers to move them.

The agent no longer asks for passwords in chat. It sends a card with a link, steps, the fields to
fill and a command to test them, which runs in a terminal you can type into. The agent only learns
which values were set. Agents outside the app (Claude Code in a terminal, Cursor) reach Vantage's
MCP server only while **Allow external MCP connections** is on in Project Settings; it is off by
default.

Later 1.13 releases added `rollup:` columns for counts and totals over child rows, and let a
project send its server events to PostHog, GA4 or a webhook.

## What's new

- `.env.example` is written for you and committed: every name the project needs, `local`'s config
  values, secrets left empty.
- Project Settings is laid out as sections and opens quickly; the title-bar settings cog is gone.
- Two Vantage apps open at once (Nightly beside Stable) each keep their in-app agent.
- **Report feedback…** in the title-bar feeds menu sends feedback to the Vantage authors, with the
  agent's `FEEDBACK.md` attached.
- A row action or toolbar entry can name a project action: `row_actions: [add-line]`. A policy
  that denies the action leaves the entry out.
- A write refused by a table hook shows the hook's message under Save in a form, which keeps your
  edit, or as a toast. It isn't reported as an error.
- A button or row action whose body is still running shows a spinner and ignores a second press.
- Fix: quitting from the menu or closing a project could lose buffered log entries.
