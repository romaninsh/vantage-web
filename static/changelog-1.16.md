# Vantage 1.16

A new Mac goes from download to a first app without leaving Vantage. On first launch a setup
panel installs Claude and signs you in, checks that Docker runs, and asks you to agree to the
terms once. A short intro then shows where the pages, the User UI and the agent panel are. Start
a new app by describing it, dropping spreadsheets or SQL files, or picking the database you
already have. While it has no pages yet, the window shows the build plan.

Columns can now read their related rows on SQLite, Postgres, MySQL and SurrealDB, such as a
project's tags: `expr: 'table.ref("tags").order_by("name").join_concat("name", ", ")'`.
Access tests check who can see and change which records against your current profile, from the
title bar's test badge or by asking the agent.

## What's new

- A User UI button in the title bar opens your app's web frontend.
- An agent's request for a secret is one shorter form with **Answer differently**, for when it
  asked in the wrong form. The agent waits for your answer.
- A row or toolbar action that fails shows its own message; a broken body shows the script error
  with a Copy button.
- A kanban without `lanes:` takes its lanes from the table its lane column references.
- `html::sanitize` cleans rich text in a hook before it's saved; `html::text` gives plain text.
- A policy can lock session fields, and a table can have an access rule of its own.
- Removed: "Set up with AI", "Try with sample data" and the Community/Enterprise connect dialog.
- Fix: an action called from another action now runs with its own access, refuses what a policy
  denies, and stops after 256 nested calls instead of hanging.
- Fix: Docker Desktop installed without admin rights is found.

## 1.16.13

- An `expr:` column can be filtered, searched and used in an access rule, such as "tasks assigned
  to me".
- `where("paid_on", "is", null())` finds empty values; `"is_not"` is its opposite. A condition on
  an empty value, such as an unset session field, now fails naming the column instead of matching
  nothing.
- A quick filter chip that compares with an empty value, such as `user.id` before anyone signs
  in, is switched off until the value is set, rather than failing.
- `nested_path: name.en_US` shows one key of a JSON column as its own column; editing it keeps the
  other keys.
- `lazy:` columns can use `html::text` and the other standard functions, and `import` from `lib/`.
- Fix: adding a row to a link table whose id is made from its two keys no longer fails.
- Translated text: each person reads a JSON column's text in their session's language, falling
  back to English, and lists sort, search and filter on it.
- A table's `build:` script adds per-reader columns: `table.nested_column("name_localised",
  "name", session.lang)` edits the reader's own language beside the English text.
- An `expr:` column can use another column with `table.column(..)`, and a related table's
  computed column reads in the same language.
- Language codes such as `sr@latin` work in JSON keys; saving `null` into a translation
  removes it.

## 1.16.14

- Fix: the Services button works after closing a dialog opened from the feeds menu.
- Fix: quick-filter chips have the date functions, so `today().add_days(7)` works in a chip.
- Fix: the agent's container tools (`web_dev_start`, `web_dev_stop`, `web_run`, `services_control`) no longer need the "Allow MCP agents to read/write data" switches, since they build or run containers, not data. A policy that locks agent reads or writes still blocks them.
- The web scaffold depends on `@vantage-ui/client` from npm at the exact version `web_dev_status` reports, with no committed `vendor/` tarball. The vantage-web skill says how to move an older frontend over.
- Kubernetes datasources moved to Vantage Enterprise. The community build has no Kubernetes datasource type, driver or skill, and the other skills no longer mention Kubernetes or `kubectl`.
- Fix: SurrealDB tables with number record ids (`CREATE todo:7`) show their rows again. A text id
  made only of digits (`todo:⟨7⟩`), as Vantage used to write for an id like "7", can't be opened
  by id.
- Fix: a date quick-filter chip on a `date` column works on SurrealDB, Postgres, MySQL and SQLite.
- An API entity name the web client reserves, such as `models` or `then`, now fails the load with
  a hint to rename it. This applies to WebSocket APIs; `kind: rest` APIs are exempt.

## 1.16.15

- Ask the agent for a copy of an app you already run, and it asks for the sources, studies each
  feature with the original open in a visible browser, and shows a working prototype on your real
  data first, then improves it in rounds. It can run on the original's database without changing
  its structure.
- The agent compares the old and new screens for ease of use and polishes the weaker one.
- The agent answers "how do I…" questions that look like missing features with what Vantage
  already has, such as refusing to delete a record that is still in use.
- Scenario tests stay on your app's own rules, not on sign-in or loading data.

## 1.16.16

- An access rule such as "projects I'm a member of" reads the related records with
  `table.where(|t| t.ref("members").where("user_id", session.user_id).exists())`, and scenario
  tests run it too.
- Access tests count a change to a record outside the person's rows as refused.
- An API entity's `writable:` lists the columns clients may change; the rest stay readable.
- A scenario step's `clock:` takes seconds, such as `+15s`.
- Fix: a new web frontend uses the 1.16 dev image and `@vantage-ui/client` 0.7.4, the client
  the agent's instructions describe, so `useCount` and the other documented functions are there.
- Fix: the Web row no longer shows "building" after a save that left the API schema unchanged.
