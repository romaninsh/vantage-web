# Vantage 0.26

Opening Vantage for the first time is a whole new experience: no more empty screen in a hidden
folder — the app now opens on a splash with three ways in, and everything it creates for you lands
in `~/Documents/vantage`.

## What's new

- **A real front door.** With no project open, Vantage shows a splash: connect your own data,
  try a playground of sample data, or open a downloadable example — plus a wide button for a
  project folder you already have (including one you just cloned from git). Creating a project
  is no longer a separate step; it happens as a side effect of picking what you want to do. The
  splash stays one click away under "Welcome / New Project" in the project switcher.
- **Try with sample data.** One click builds a courier-service playground — a live delivery
  board, cities, orders, customers and couriers — entirely from generated data. No install, no
  network, no account.
- **The app tells you where your data stands.** Any project running on fake data keeps a slim
  banner up saying so, for as long as the fake datasource is active. A project with no
  datasources — or none that managed to connect — gets a banner too, pointing you at the fix.
  Each one hands you off to your AI agent in one click.
- **Set up with AI, without the setup.** The AI path no longer asks you to pick data kinds
  first. Name your app, press Start, and you land on a three-step guide: open the folder in
  your agent, say what you want, watch your first datasource appear. Skills for every backend
  are pre-installed — the agent figures out the rest with you.
- **Examples, one click from the splash.** A small picker lists curated examples (Bakery,
  Launch Control, Periscope) and runs them through the same download-and-review installer as
  website links. Installed examples land in `~/Documents/vantage` too.
- **Generated data got relational.** Fake tables whose columns reference another table now
  point at real rows there, so drilling from a customer into their orders works on sample data
  the same way it does on a live database.

## 0.26.1

- **A head start for your AI agent.** Projects you create now come pre-wired: the app's
  feedback loop is already connected to your agent, and the everyday data commands (SQLite,
  Python, the database CLIs) are pre-approved — so the agent starts building instead of
  stopping for setup and a permission prompt at every step.
- **Agents skip the planning ceremony.** The bundled instructions now tell your assistant
  that Vantage apps are thin: brainstorm briefly, connect your data, and start putting pages
  on screen — no write-a-spec-then-a-plan detour before anything appears.
- **Recent projects stay tidy.** A project whose folder you deleted or moved drops off the
  recents list on its own, and opening the app no longer tries to reopen a project that isn't
  there — you land on the welcome screen instead.
- Fix: a project created through the connect-your-data or sample-data path could end up
  impossible to reopen. New projects now open reliably every time.
- Fix: opening a folder that couldn't be read used to fail silently; it now tells you what
  went wrong.

## 0.26.2

- **Your agent shows results before asking questions.** The bundled instructions were
  rebuilt around a show-first flow: a couple of opening questions, then a working page in
  your menu — structure, sample data and looks decided for you, refined in later passes
  once you can see real screens. The agent checks its own work through the app's feedback
  tools instead of asking "did that work?", and wraps up in plain words rather than YAML.
- **SQLite is now a first-class scenario.** The connect-your-data picker offers a local
  single-file database — no server, no credentials — and the agent knows how to grow it
  one table at a time: sample rows arrive when a table is first created, and anything
  touching data you already have gets asked about first.
- **The instructions match the app again.** Pages, dashboards, actions and column styling
  are documented as they actually work today — including chart tiles, summary views,
  terminal actions and per-column widths and colours — so agent-built apps validate on the
  first save far more often.

## 0.26.3

- **Aggregate views on every SQL database.** A table can now be defined by a query —
  grouped totals, top-N rankings, filtered worklists, or a modified variant of another
  table — on SQLite, Postgres and MySQL, just like SurrealDB. Dashboards chart these
  directly, no views or stored procedures in your database needed, and your agent has a
  dedicated guide for building them.

## 0.26.4

- **Choose where your projects live.** New projects still land in `~/Documents/vantage` by
  default, but the welcome screen's "Connect your data" card now shows where the project will
  be created, with a folder button in the name field to pick a different spot. The location
  you pick is remembered and used for every project you create from then on.
