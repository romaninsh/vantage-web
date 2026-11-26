# Vantage 1.15

A save now tells you what happened. While a write is on its way the form footer says **Saving…**,
and after two seconds **Retrying…**; the status bar counts both. A save to a datasource that can't
be reached keeps trying for up to three minutes, then fails with an error and puts the old value
back. An entry the datasource only queued shows as **Queued** until a later read finds it.

## What's new

- Adding a record whose id is already stored shows the stored record instead of your values; nothing
  is written.
- A faker datasource can slow writes down, fail them, lose their replies, queue them, or refuse
  them as a conflict, an invalid value or forbidden. `offline` now takes writes down too.
- A REST API entity answers a create of an existing id with the stored record (the default) or
  with 409 (`on_existing: conflict`).
- A policy can lock a session field with `deny: { actions: [update] }`; a signed-in session can't
  change it.
- A project table whose key a model bundle already serves fails to load, with a message naming the
  file.
