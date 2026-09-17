# Vantage 0.40

Put a `composer.yaml` next to `application.yaml` and Vantage runs your project's database for you. A
layers button in the title bar brings the stack up, shows each service's health, ports and live log,
and puts it away again. Quit Vantage and the containers stop; open the project again and they
resume, data intact. Docker Desktop, colima and OrbStack all work. A service can take an ephemeral
loopback port and the datasource just names the service (`surrealdb:8000`), so Stable and Nightly
run the same project side by side, each with its own containers. A setup wizard step can embed the
services panel, which makes "install, start the database, seed it" three presses of Next.

## What's new

- While an action's command runs, the dialog offers "Run in background", and Close asks
  stop-or-continue instead of killing the run. A backgrounded job sits under Jobs on the Services
  sheet with a live log and a Stop button, counted in the title-bar indicator ("1/1 +1").
- `kind: button` runs an action from anywhere on a page, and any button — page or grid toolbar —
  takes `color:` (a theme name or `#hex`) and `size: xs`.
- A select over a table publishes the value it shows, so tiles narrow through `.args(#{ … })` and a
  "Promote"-style button carries the same pick into its form. A grid's filter chip prefills it the
  same way.
- `x_label:` formats each chart tick with a one-line script, and a repeated label shows only once,
  so a live 30-second ticker labels each minute exactly once. An all-zero chart draws a flat zero
  rather than nothing.
- `sub:` puts dimmed context under a list row's text, and long rows clip with an ellipsis instead of
  wrapping over their neighbours.
- A `bool` field renders as a checkbox, and `widget: checklist` turns `choices:` into tickboxes,
  submitted comma-joined.
- New MCP tools report service status, tail service and action logs, and — when you allow it — start
  or stop the stack.

## 0.40.1

- Fix: naming a new project could land you in a `my-app-2` folder, because the location picker's
  "New Folder" had already created the one you named. The name you type is the folder you get.
