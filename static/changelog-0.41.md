# Vantage 0.41

"Connect your data" opens a comparison of every driver the free build ships against what Enterprise
adds, and one click continues into a wizard. Pick your data sources and each gets a step of its own.
CSV and SQLite files are copied into a `data/` folder inside the project, gitignored. A database can
be one you already run — address and credentials go to the project's `.env` and are never committed
— or Vantage can run it for you, writing a loopback-only `composer.yaml` service with its data on a
named volume and starting it from the Services panel. Nothing is written until you press Finish.

## What's new

- `${VAR}` references from `.env` work in every driver's connection field now — postgres, mysql,
  mongo, REST, GraphQL, SQLite and CSV paths included — and a connection error logs the reference,
  never the secret.
- The "no datasource" banner, the datasource panel's Add button and the setup screen all open the
  same wizard. The old add-datasource form stays, for editing what exists.
- Every project gets the full skill set, installed on create and refreshed on every open, instead of
  a per-backend pick.
- The AI setup screen is three steps: configure data, open the folder in your agent, and watch the
  three signals confirm it works.

## 0.41.1

- The bundled skill set was rebuilt against Vantage itself: a build order that puts real data on
  screen within minutes, a quality checklist for colours, money, dates and icons, verification and
  debugging guides, and a skill for each of the 13 data sources. An agent that can't build something
  now says so and writes it to `FEEDBACK.md` for you to send, and it opens the page it is changing
  in your Vantage window so you watch each edit land.
- Fix: a project with its own database could open to "datasource offline" just after Vantage started
  the stack, because the container's port answered before the database behind it was ready. Vantage
  waits for the service's own health check.

## 0.41.2

- Sidebar sections fold, one open at a time, and the page list scrolls, so a long menu no longer
  runs under Project Settings.
- `menu: { placement: native }` in `application.yaml` moves your pages into the macOS menu bar — one
  menu per section, submenus for nested ones — and takes the sidebar away.
