# Vantage 1.13

Each profile now has one env file: profile `prod` reads `.env.prod`, `local` reads `.env.local`,
and nothing else. **Project Secrets** shows every variable once with a column per profile, so you
edit prod without switching the app to prod; missing values are red, each row says which YAML file
uses it, and Save reconnects. A project that still keeps `local`'s values in `.env` keeps working,
and Project Secrets offers to move them.

The agent no longer asks for passwords in chat. It sends a request instead: a card with a link,
steps, the fields to fill and a command to test them with, which runs in a terminal you can type
into. You type the values; the agent only learns which ones were set. The same card can ask you to
run a sign-in such as `gcloud auth login`.

The in-app agent reaches Vantage's MCP server on a private port with a key only it holds. Agents
outside the app (Claude Code in a terminal, Cursor) connect only while **Allow external MCP
connections** is on in Project Settings; it is off by default, and switched on when Vantage
prepares an AI project.

## What's new

- `.env.example` is written for you and committed: every name the project needs, `local`'s
  config values, secrets left empty. A lock on a row in Project Secrets marks a name that doesn't
  start with `SECRET_` as a secret.
- Project Settings is laid out as sections and opens quickly. The settings cog in the title bar
  is gone; the sidebar's **Project Settings** opens the same page.
- Two Vantage apps open at once (Nightly beside Stable) each keep their in-app agent. Only one can
  take external connections; the other's Settings card says the port is in use and has a Retry
  button.
- **Report feedback…** is in the title-bar feeds menu, below the feeds. It goes to the Vantage
  authors as feedback rather than an error report, with the agent's `FEEDBACK.md` attached as a
  file.
- Errors the agent has read with `list_logs` no longer count on the feeds button.

## 1.13.1

- Fix: an agent's `actions.x()` in `run_data_script` ran the action as it was before its YAML was
  edited.
- Fix: a page button, toolbar entry or row action whose body is still running shows a spinner and
  ignores a second press, so a long run no longer looks failed or starts twice. A row action is
  busy per row. `button action ran` is now logged when the body ends, with its `ms`. A button
  inside a list item gets its label back too when the run ends.
- New MCP tool `query_stats`: queries sent per second and per datasource and table, with rows and
  ms per query and the count per kind, so an agent can see a page polling a database.
- New MCP tool `query_log { on: true }`: logs each query, with its rendered text, to a new
  `queries` feed (gated like other feeds) and adds the slowest and most repeated queries to
  `query_stats`. It turns itself off after 10 minutes; Project Settings shows when it is on and
  how long it has left, with a button to turn it off.
- A row action or toolbar entry can name a project action: `row_actions: [add-line]`, or
  `{ use: add-line, label: Add }`. `action/add-line.yaml` sets `table:`, `label`, `icon` and
  `when`, and its body runs with the clicked `row`. The page's catalog messages flag an unknown
  key, or an action whose `table:` isn't the one the grid shows. A policy rule denying the action,
  by key or by kind, leaves the entry out.
- A write refused by a table `hook:` shows the hook's message where you made the change: under
  Save in a form, which keeps your edit, or as a toast for a delete, a tree drag, an action or a
  page button.
  It isn't reported as an error. `run_data_script` returns the message as its error.
- The agent writes a parent's count or total over its child rows as a `rollup:` column
  (`rollup: { relation: lines, op: sum, column: net }`) on SQLite, Postgres, MySQL and
  SurrealDB, instead of a hand-written `expr:` or query table.

## 1.13.2

- A project can send its server events (action runs, writes, sign-ins, MCP tool calls) to
  PostHog, GA4 or a webhook: a `log_events` or `log_changes` block with `buffered: true` into an
  insert-only `api-client` table. Ask the agent to "send events to PostHog"; its recipes hash
  visitor ids with a project salt and leave out IP addresses unless you turn them on. Buffered log
  tables keep at most 10,000 queued entries each, dropping the oldest.
- Fix: quitting from the menu or closing a project could lose buffered log entries; they are now
  sent first. A Dock or logout quit still doesn't send them.
