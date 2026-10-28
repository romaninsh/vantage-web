# Vantage 1.7

A project can now sign people in through its own session table: your web app and API clients sign
in, and the desktop app doesn't have to. It opens with a session of its own and full access, and
can step into anyone's shoes to check what they would see. Each client's rows stay apart by one
rule on the datasource, which every page, relation, script, MCP read and API call gets; a table the
rule misses stops the project from loading. Every new, edit and delete, and every action run, is
written to an audit table you choose, with who did it and what changed, so a record's history is
an ordinary page.

## What's new

- `session:` in `application.yaml` names the session and people tables and, in `signed_out:`, the
  only actions anyone may run before signing in. Pages read the session's fields as
  `${session.<field>}`, and a row action's `when:` reads them too, so an entry can show only for
  admins.
- The desktop never signs in: it opens with its own session, filled by `session.desktop` (or your
  OS account name), and full access as the `vantage` app (`app:` renames it). An admin can reset
  someone's password from there.
- A `kind: identity` title bar item shows who the pages are for and runs its `menu:` actions. An
  action that calls `session.assume` switches every page to that app and session, say a staff
  editor of one bakery, and `session.restore` switches back.
- A page whose table the rules refuse shows who is looking, in which app, and the rule that
  refused it. A narrowed table shows one locked chip per rule beside its filter chips.
- `invariants:` on a datasource (or opting out on a table) keeps each client's rows apart, with
  `exceptions:` for shared tables, operator pages, actions and apps. A rule's `script:` can check
  writes and remove columns, so one table serves readers and editors.
- Over MCP, `explain_access` says what the rules do to a table, `run_data_script` reads as any app
  and session you name, and `ui_tree` reports the session and each page's access.
- `log_changes:` and `log_events:` in `application.yaml` log row changes and action runs into a
  table; the log table is read-only everywhere.
- `auth: session` in `api/*.yaml` lets API clients sign in with the same actions; the API's own
  `sign_in:` lists the ones it offers.
- Without `session:`, the person picked in the title bar is the one the audit log names.
- A script writing `table:id` text into a reference column on SQLite, Postgres or MySQL stores
  it as written; only SurrealDB turns it into a record link.
- Fix: a file that `!include`s another one written a moment later now loads as soon as that file
  appears, instead of staying broken until you touch it.
- Fix: editing a log script (or anything else `application.yaml` includes) now takes effect at
  once, in the app and in your running APIs, instead of after a datasource reconnect.
- Fix: a button pressed by an agent over MCP can run actions again while another app is in
  front ("no active window to host dialog").
- Fix: read-only fields in a dialog, such as a password shown once, can be selected and have a
  Copy button.
