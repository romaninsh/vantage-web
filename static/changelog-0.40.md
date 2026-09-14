# Vantage 0.40

Your project's services, run for you — and dashboards that move on their own.

## What's new

- **Vantage runs your database.** Put a `composer.yaml` (a standard compose file) next
  to `application.yaml` and a layers button appears in the title bar: Start brings the
  stack up, every service shows its health, ports and live log, Stop puts it away.
  Quit Vantage and the containers stop; open the project again and they resume, data
  intact. Works with Docker Desktop, colima or OrbStack.
- **No port juggling.** A service can take an ephemeral loopback port and the
  datasource just names the service (`surrealdb:8000`) — Vantage wires it to whatever
  port docker picked. Stable and Nightly can run the same project side by side without
  a collision, and each keeps its own containers and data.
- **Long jobs go to the background.** While an action's command runs, the dialog
  offers "Run in background" — and Close asks stop-or-continue instead of silently
  killing the run. A backgrounded job lives under Jobs on the Services sheet with a
  live log and a Stop button, and the title-bar indicator counts it ("1/1 +1").
- **Setup wizards can start services.** A wizard step can embed the services panel, so
  "install → start the database → seed it" is three presses of Next.
- **Buttons on pages.** `kind: button` runs an action from anywhere on a page — and
  any button, page or grid toolbar, takes `color:` (a theme name or `#hex`) and
  `size: xs`, so a ✨ process button looks the same everywhere.
- **Chart ticks you can read.** `x_label:` formats each tick with a one-line script
  and repeated labels show only once — a live 30-second ticker labels each minute
  exactly once. And an all-zero chart draws a flat zero instead of nothing.
- **Lists with a second line.** `sub:` puts dimmed context under a row's text (rows
  whose value is empty get none), and long rows clip with an ellipsis instead of
  wrapping over their neighbours.
- **Dashboards that filter on a pick.** A select over a table publishes the value it
  shows, tiles narrow through `.args(#{ … })`, and a "Promote"-style button carries
  the same pick into its form — a grid's filter chip prefills it the same way.
- **Real checkboxes.** A `bool` field renders as a checkbox, and `widget: checklist`
  turns `choices:` into tickboxes submitted comma-joined.
- **Agents can see your services.** New MCP tools report service status, tail service
  and action logs, and — when you allow it — start or stop the stack.

## 0.40.1

- Fix: naming a new project on the welcome screen could land you in a `-2` folder. If
  the folder already existed — the location picker's "New Folder" creates it before you
  ever press Start — Vantage quietly made `my-app-2` beside it. The name you type is now
  the folder you get; a folder that already holds something else is a clear error.
- "Connect your data" now leads the welcome screen, and "Open an example" points at the
  new Breg bakery demo.
