# Vantage 0.26

Opening Vantage with no project no longer leaves you on an empty screen in a hidden folder. You get
a splash with three ways in — connect your own data, try a playground of sample data, or open a
downloadable example — plus a wide button for a project folder you already have, including one you
just cloned from git. Creating a project isn't a separate step any more; it happens as a side effect
of picking what you want to do, and everything Vantage creates lands in `~/Documents/vantage`. The
splash stays one click away under "Welcome / New Project" in the project switcher.

## What's new

- "Try with sample data" builds a courier-service playground — a live delivery board, cities,
  orders, customers and couriers — out of generated data, with no install, network or account.
- A project running on fake data keeps a slim banner up saying so, and a project with no datasource
  that connects gets one pointing at the fix. Each hands you off to your AI agent in one click.
- The AI path no longer asks you to pick data kinds first. Name your app, press Start, and you land
  on a three-step guide: open the folder in your agent, say what you want, watch your first
  datasource appear. Skills for every backend are pre-installed.
- A picker lists curated examples (Bakery, Launch Control, Periscope) and runs them through the same
  download-and-review installer as website links.
- A fake table whose columns reference another table points at real rows there, so drilling from a
  customer into their orders works on sample data the way it does on a live database.

## 0.26.1

- Projects you create come pre-wired for your AI agent: the app's feedback loop is connected, and
  the everyday data commands (SQLite, Python, the database CLIs) are pre-approved, so the agent
  builds instead of stopping for a permission prompt at every step.
- A project whose folder you deleted or moved drops off the recents list on its own, and opening the
  app lands you on the welcome screen rather than trying to reopen it.
- Fix: a project created through the connect-your-data or sample-data path could end up impossible
  to reopen.

## 0.26.2

- The bundled agent instructions were rebuilt around showing results first: a couple of opening
  questions, then a working page in your menu, refined in later passes once you can see real
  screens. They also describe pages, dashboards, actions and column styling as they work today, so
  agent-built apps validate on the first save far more often.
- SQLite is a first-class scenario in the connect-your-data picker — a local single-file database,
  no server, no credentials — and the agent grows it one table at a time, asking first about
  anything that touches data you already have.

## 0.26.3

- A table can be defined by a query on SQLite, Postgres and MySQL as well as SurrealDB: grouped
  totals, top-N rankings, filtered worklists, or a variant of another table. Dashboards chart these
  directly, with no views or stored procedures in your database.

## 0.26.4

- The welcome screen's "Connect your data" card shows where the project will be created, with a
  folder button to pick somewhere other than `~/Documents/vantage`. The location you pick is
  remembered for every project after it.
