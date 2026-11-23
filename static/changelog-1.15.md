# Vantage 1.15

A save now tells you what happened. While a write is still on its way the form footer says
**Saving…**, and after two seconds **Retrying…**; the status bar counts them (`saving 2…`,
`retrying 1…`). A save to a datasource that can't be reached keeps trying for up to three minutes,
then fails with an error and puts the old value back. An entry the datasource only queued shows as
**Queued** until a later read finds it, and the status bar counts those too.

## What's new

- Adding a record whose id is already stored shows the stored record instead of your values; nothing
  is written.
- A faker datasource's `shape:` can disturb writes: `latency.write`, `faults.write_error_rate`,
  `faults.lost_reply_rate`, `faults.queue` and `faults.refuse` (`conflict`, `invalid_value`,
  `forbidden`). `offline` now takes writes down too.
- A REST API entity takes `on_existing: record | conflict`: a create of an id that already exists
  answers with the stored record (the default) or 409.
- A policy can lock a session field with `deny: { actions: [update] }`; a signed-in session can't
  change it.
- A project table whose key a model bundle already serves fails to load, with a message naming the
  file.
