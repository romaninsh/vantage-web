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
