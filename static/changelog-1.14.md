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
