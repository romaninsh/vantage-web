# Vantage 1.14

The agent can now drive the app the way you do. `ui_interact` opens a row action or a toolbar entry,
fills the fields of its dialog and submits or cancels it, and `ui_tree` reports the dialog's
fields, options and errors, so an agent checks a dialog-driven flow before it hands it over. Dialogs
also gained what they were missing: a dropdown over `choices:`, the current value preselected when
you edit, and a checklist over a table.

Cards from `request_from_user` say which environment they touch. A command declares the profile
variables it reads with `uses:`, the card shows a banner naming the profile and the variables, and
the agent never sees the values or, in a project that has secrets, the command's output. Values the
engine writes follow the column's declared type: a `date` or `timestamp` column takes a date, a
`references:` column takes a link, on SurrealDB too. Rhai has date helpers (`today()`, `date()`,
`add_days()`), and actions import shared helpers from `lib/*.rhai`.

## What's new

- A `request_from_user` card with `run:` takes `uses: [SECRET_URL, NS]`: those saved values go into
  the command's environment and the card shows no field for them. A banner at the top of the card
  names the profile (red for anything but `local`) and the variables the command reads, and says
  when the app itself stays on another profile. A command that reads a profile variable it didn't
  declare is refused.
- A command's button reads **Run**; **Test** stays for checks of values you type. A failed run
  shows the last 20 lines of its output in the card, with secrets masked, and a secret field you
  filled shows a fixed row of dots. The agent gets those lines only when the project holds no
  secret values; otherwise it is told the output was withheld.
- `ui_interact` opens a row action by row id or a toolbar entry, `fill`s a dialog's fields by name
  and `submit`s or `cancel`s it. `ui_tree` lists each page's `row_actions` and `toolbar` and the
  open dialog with its fields, current values, options and validation errors. It follows the same
  "Allow MCP agents to write data" gate as a click.
- A form field with `choices:` is a dropdown; `widget: checklist` also takes `references:` or
  `options:` and submits a list of ids. A field can carry its own `references:` to name the table.
  An edit dialog shows the current pick in a dropdown once the options load, and keeps a stored
  value that isn't among the choices instead of dropping it.
- A record page (`record: { table: … }`) updates in place when its row changes: only what shows a
  changed value repaints, and the page's grids keep their scroll and selection. It remounts when
  the row disappears or the page's YAML changes.
- A grid takes `relation_links: false` to hide relation links and keep row actions, and
  `allow_edit: false` and `allow_delete: false` (crud and binder). A row action with
  `primary: true` is drawn as a small button on the row, next to `⋯`; two primaries on a grid is a
  validation error. A relation can name the page its link opens with `link_page:`, tried before
  the page that observes the target table.
- Buttons, toolbar entries and row actions run the action's current definition when pressed, so an
  edited action no longer runs its old body in a page that was already open. A removed action says
  so.
- An API keeps its port for the app session across a failed start, a re-added slot and a
  reconfigure, and the log names the old and new port when it can't. The web dev container follows
  the port it gets.
- A page button's uncaught error shows as a toast, so a button body needs no `try/catch`. A button
  body that calls `table()` is told to put the write in an action and call `actions.x()`.
- Fix: Esc or closing a confirm or HTTP-request dialog answered nothing and logged "dialog dropped
  without response"; it now answers no.
- Fix: a `kind: command` action with an empty form field left `${form.x}` in the command; the field
  is now empty text.
- Fix: `command: mongo/guides.sh` (a relative path with a `/`) wasn't found, and spawn errors were
  cut short.
- Fix: editing a page file or an `!include` it uses left a second open tab on the old page; every
  open instance reloads now.
- Fix: a select's `default:` is read as a template, so `${args.plan_id}` works, and falls back to
  the select's own default when the arg is missing. A page reads `args.x ?? ""` for an arg it
  wasn't given.
- Fix: a list with `refresh_interval` refreshes, and `action:` on a list works without `item:`.
- Fix: a stack's menu entry stays highlighted after pushing a page onto it.
- Fix: a drawer with a tall form scrolls to its Save button instead of clipping it.
- Fix: a `readonly:` field in an action dialog is selectable and has a Copy button.
- Fix: an unknown `icon:` on a row action is reported as a warning naming the page, entry and icon.
- Fix: a form's `references:` naming no table, and a `link_page:` naming no page, are reported when
  the project loads.
- Fix: `run_data_script` with `mode: cache` said "Model is not currently open" while a page showed
  the table.
- The MCP data tools say "no project is open yet" without the old "open a page first" hint.
- Skills: `request_from_user` with `uses:`, driving dialogs through `ui_interact`, `lib/*.rhai`,
  dates, `nested_path` for embedded MongoDB fields, `link_page:`, "buttons call actions, actions
  write", and `api: { list: false }` for records served only by id.

## 1.14.1

- Fix: a `kind: label` over a `table#aggregate` failed to mount with "unknown scenery" unless a stat
  on the same page used the same aggregate.
- Fix: a service row's **Restart** restarted the whole stack; it restarts only that service.
- Fix: the status bar kept the previous page's row count when a page failed to mount.
- Fix: a kanban board's `on_open` found no row on a table whose id column isn't `id`.
- Fix: closing a project or quitting left its compose network behind; volumes stay.
- Security updates in the bundled web server and DNS resolver (actix-web 4.19, hickory 0.26.3).

## 1.14.2

- Fix: an API datasource whose `${secret.*}` credential didn't resolve sent its requests without
  credentials; it now stays unconnected with an error naming the secret.
- Fix: an API key set to go in a named header (`X-Api-Key`) was sent in the wrong header.
- Fix: log tables offered add, edit and delete.
- Fix: a cached table kept serving rows cached under its old YAML after the table was edited.
- Fix: an API's `/v1/schema` reported `search: true` for entities whose search it refuses, and
  `$title` in `@vantage-ui/client` ignored the table's title column.
- Security update in the MCP library (rmcp 3.10). Tool output schemas now list exactly the fields
  each tool returns.

## 1.14.3

- Scenario tests: `tests/scenarios/*.yaml` plays a project's actions, hooks and access rules on
  in-memory copies of its tables, from fixtures in `tests/fixtures/`, on a clock the test sets.
  A step can name other outcomes with `what_if`; a file is green, yellow (an outcome is named but
  not written) or red.
- The title bar shows a test badge in a project with `tests/scenarios/`: click it to run the
  tests; it then shows the steps that passed, such as `10/10`, and opens the run's steps. A grid
  row's menu has "Freeze into fixture…" to capture a record as starting data.
- Agents run the tests with `test_run` and capture fixtures with `test_freeze`.
- A column's `default:` is now written when a record is added without that value, on every
  backend; before, it only prefilled forms.
- `table(..).delete_all()` in action bodies deletes every row of the handle's set.
- A new SurrealDB service uses SurrealDB 3 (`v3.3.5`).
- Fix: adding a record from an action body to a table with a numeric `auto` id failed on SQL
  databases with "datatype mismatch".
- Fix: an agent pressing a row entry with `navigate:` closed the app.
- Skills: where business rules go (table hooks and actions, not database triggers), and a
  first version's scenario file names its open questions instead of deciding them.

## 1.14.4

- Skills: the fifteen core skills were checked claim by claim against the app and rewritten.
  Wrong and out-of-date statements are corrected and limits nobody could trace are gone. An agent
  now starts from four short files (`AGENTS.md`, `vantage-app-builder`, `vantage-brainstorm`, the
  project's database skill; under 5,000 words) and loads the others when a task calls for them.
- Skills: no database triggers, stored procedures or SurrealDB events. Rules, stamped values and
  cascades are table hooks, `atomic` actions and `rollup:` columns, in the examples too. An agent
  writes a trigger only when the user asks for one or nothing in Vantage can do the job.
- Skills: shorter throughout. Database skills hold only what differs per database and link to the
  general skills for the rest; each keeps at most one small example. Text that does not help an
  agent build an app is gone.
- Skills: an agent builds an app in phases (outline, sample data, working pages, quality, rules,
  people and access, handover) and keeps its progress in `PROGRESS.md` at the project root.

## 1.14.5

- Under `session:`, the person picked in the title bar fills the desktop session, so the change
  history names who acted.
- An API keeps its port when the app restarts, so links made earlier still work.
- A `request_from_user` card no longer times out while you fetch a password or run a command; an
  agent that stops waiting is told the card is still open and asks again before going on.
- `observe:` scripts filter with an operator: `where("status", "in", ["new", "offered"])`.
- A form field's `default:` takes an expression, such as `${row.balance_cents / 100.0}`.
- `{ use: <action>, primary: true }` draws a row action as a button, as an inline entry does.
- `run_data_script` passes `args` to a query table, and runs actions as the `app` and `session`
  it was given.
- `toast(text, "warning")` in a row action body shows a warning toast.
- Fix: a row action's `navigate:` args and `when:` read `row.id` as empty.
- Fix: `app.*` read empty in row action and `kind: script` bodies.
- Fix: a record page found its row only among the table's first 100 rows.
- Fix: a record page sometimes stayed on "mounting…".
- Fix: an open page kept running a query table's old query after the file was edited.
- Fix: a table that turned invalid on save logged no reason.
- Fix: an action couldn't insert into an insert-only REST table (`api.read: false`).
- Fix: a tall request card pushed its buttons out of the agent panel and cut its lines short.
- Fix: typing in the agent panel froze the window on long threads.
- Fix: a new web frontend could pin a client version the builder image doesn't carry.
- Fix: a stat counter could show a count remembered from an earlier session.
- Fix: a `list` without `height:` in a fixed-height row drew over the row below.
- Fix: kanban cards showed `due:` as a raw ISO timestamp; it now reads like a grid cell.
- Fix: chart axis labels overlapped on long series; an axis now labels at most eight ticks.
- Fix: form dropdowns over an `enum:` with labels showed the stored codes.
- Skills: rule scripts on SQLite and Postgres narrow with `with_condition`, and `or_()` joins
  two conditions, for "my jobs, or jobs offered to me"; passwordless sign-in through a link the
  office emails is written up as a pattern.

## 1.14.6

- Fix: a row action or toolbar entry on a filtered page (`where("archived", 0)`) couldn't take a
  row out of the filter; archiving or changing a status now saves, and the row leaves the page.
- Fix: the title bar's identity menu listed actions by key (`as_staff`) instead of their `label:`.
- Dates, times and timestamps read the same from every database: a timestamp as
  `2026-11-01T09:00:00.000000Z`, a time with six fraction digits.
- A write to a column the table doesn't declare is refused, including one a faker sim makes: a
  `builtin:flight`, `builtin:pulse` or `builtin:folder_tree` table declares every column the sim
  writes, or the sim stops with "column is not declared on this table".
- A column may be `type: json`, a map or an array stored as one value. Writes to a `contained:`
  relation's host column take only the contained table's columns.

## 1.14.7

- Timestamps show in your computer's time zone, in grids, forms and record pages, and you type
  them in it; the database keeps UTC. Dates and times of day never shift.
- Fix: saving a form after editing a date or a time could be refused by the database.
- Fix: a `time` column showed six fraction digits (`20:26:13.000000`) instead of its precision.

## 1.14.8

- Skills: the database skills describe dates as they work now. Postgres `date`, `time` and
  `timestamp` columns save from forms with no cast, and SQLite, MongoDB, MySQL, SurrealDB and CSV
  list the one form each kind reads in.

## 1.14.9

- People can sign in with the logins of an existing database, such as Odoo's: `session:` with
  `identity:` and no `table:` keeps sign-ins in memory, so nothing is added to that database,
  and `password_schemes: [pbkdf2_sha512, argon2id]` accepts Odoo's passwords. An API with
  `auth: session` takes these sign-ins.
- `desktop:` reads `user_id`, the person picked in the title bar, so the desktop shows exactly
  what that person sees.

## 1.14.10

- Skills: the agent now checks performance before it hands an app over. It opens every page and
  web screen with `query_log` and `query_stats` running, and holds each one to budgets: one
  query per list, nothing repeated, no queries while idle, sign-in under a second. The numbers
  go in `NOTES.md`.
- Skills: `vantage-rebuild` guides rebuilding an existing product from its source code or demo,
  one feature at a time: a feature inventory that records every gap, side-by-side comparisons
  of the same data, and one pull request per feature.

## 1.14.11

- Postgres tables update live when the database sends `NOTIFY`: `notify: true` on the datasource
  makes tables listen on `<table>_changed`, and `postgres: { listen: [...] }` lets a query table
  follow the tables it reads. The refresh timers they replace can go.
- The datasource dialog keeps a file's `notify:` when it saves.
- Served web apps show a row changed outside the app as soon as the re-read lands, not on the
  next change (vantage-server 1.14.9).
- Dev builds check a password in about 0.3 s instead of about 2 s: password hashing is optimised
  even in debug builds, as vantage-lib already does.
