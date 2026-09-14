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
- **"Verify your setup."** The AI setup screen is now three honest steps:
  configure data (the wizard), open the folder in your agent, and watch the
  three signals confirm it all works.
