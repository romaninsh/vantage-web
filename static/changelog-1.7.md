# Vantage 1.7

A project can sign people in through its own session table. Your web app and API clients sign in;
the desktop doesn't have to, opens with full access, and can switch to anyone's session to see what
they see.

A rule on the datasource keeps each client's rows apart, on every page, script, MCP read and API
call; a table the rule misses stops the project from loading. Every change and action run can be
written to an audit table, so a record's history is an ordinary page.

## What's new

- `session:` in `application.yaml` names the session and people tables and the only actions anyone
  may run before signing in. Pages and a row action's `when:` read the session's fields, so an
  entry can show only for admins.
- The desktop opens with its own session and full access; an admin can reset someone's password
  from there.
- A `kind: identity` title bar item shows who the pages are for and runs its menu actions, such as
  switching every page to a staff editor of one bakery and back.
- A page whose table the rules refuse shows who is looking, in which app, and the rule that refused
  it. A narrowed table shows one locked chip per rule beside its filter chips.
- `invariants:` on a datasource keep each client's rows apart, with exceptions for shared tables,
  operator pages, actions and apps. A rule can also check writes and remove columns, so one table
  serves readers and editors.
- `log_changes:` and `log_events:` log row changes and action runs into a read-only table.
- API clients sign in with the same actions through `auth: session`.
- Fix: a file that `!include`s one written a moment later stayed broken until you touched it.
- Fix: an edited log script, or anything else `application.yaml` includes, took effect only after
  a datasource reconnect.
