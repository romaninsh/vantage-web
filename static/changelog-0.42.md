# Vantage 0.42

Remote APIs falter. Your app no longer has to.

## What's new

- **A signal for every API.** Each REST and GraphQL datasource carries a
  four-bar indicator in the title bar, its request rate beside it. Amber
  means calls are failing or a response is slow; red, that the source is
  down. Hover for the last minute in full: latency, requests in flight,
  failures, the last error, and whether Vantage is easing off to let the
  server recover.
- **Failures handled, not announced.** Requests you are waiting on retry on
  their own; a background refresh that fails keeps the rows already on
  screen. A datasource going down, and coming back, earns one toast each.
- **Sorting where the data lives.** Name an API's sort parameter
  (`ordering: { param: ordering }`) and grids ask the server for their order,
  so the first page is truly the top and new records surface there on the
  next refresh.
- **Pace, per datasource.** `max_connections` now caps parallel requests, and
  `rate_limit` bounds them per second.
- Fix: actions run after switching projects used the previous project.
- Fix: a terminal action pointed at a missing folder now says so, rather than
  opening in your home directory.
