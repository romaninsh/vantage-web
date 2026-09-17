# Vantage 0.41

Connecting your data is now a guided path, not a leap of faith.

## What's new

- **A real front door for your data.** "Connect your data" opens a comparison:
  every driver the free build ships on the left (hover one for what it can do),
  what Enterprise adds on the right. One click continues into the new wizard.
- **The connect wizard.** Pick your data sources — each gets its own step.
  CSV and SQLite files are copied into a `data/` folder inside the project
  (gitignored automatically). A database can be one you already run — address
  and credentials, stored in the project's `.env`, never committed — or
  **Vantage can run it for you**: the wizard writes a `composer.yaml` service
  (loopback-only, data on a named volume) and the Services panel starts it.
  Nothing is written until you press Finish; Cancel leaves no trace.
- **Credentials out of YAML, everywhere.** `${VAR}` references from `.env` now
  work in every driver's connection field — postgres, mysql, mongo, REST,
  GraphQL, SQLite and CSV paths included — and connection errors log the
  reference, never the secret.
- **One way in.** The "no datasource" banner, the datasource panel's Add
  button and the setup screen all open the same wizard; the old add-datasource
  form remains for editing what exists.
- **Skills stay in sync by themselves.** Every project gets the full skill set,
  installed on create and refreshed on every open — no per-backend picking.

## 0.41.2

- **Sidebar sections fold.** One section open at a time, the first by default; click a
  heading to switch. The page list scrolls, so a long menu no longer runs under Project
  Settings.
- **Menu bar navigation.** Set `menu: { placement: native }` in `application.yaml` and your
  pages move into the macOS menu bar — one menu per section, submenus for nested ones — and
  the sidebar goes away.

## 0.41.1

- **Rebuilt AI skills.** Your coding agent gets a new skill set checked against
  Vantage itself: a build order that puts real data on screen within minutes,
  a quality checklist (colours, money, dates, icons), verification and debugging
  guides, dashboards, actions, Rhai, and a skill for each of the 13 data
  sources — packed with working examples. Agents now tell you plainly when
  something can't be built, and note it in `FEEDBACK.md` for you to send.
- **Watch your agent work.** The agent opens the page it's changing in your
  Vantage window, so you see every edit land as it happens.
- Fix: a project with its own database could open to "datasource offline" right
  after Vantage started or resumed the stack — the app could reach the
  container's port a moment before the database inside it was ready. It now
  waits for the service's own health check.
- **"Verify your setup."** The AI setup screen is now three honest steps:
  configure data (the wizard), open the folder in your agent, and watch the
  three signals confirm it all works.
