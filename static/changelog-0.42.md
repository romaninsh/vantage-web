# Vantage 0.42

REST and GraphQL datasources now cope with a server that is slow or failing. A request you are
waiting on retries by itself, and a background refresh that fails keeps the rows already on screen
instead of emptying the grid. Each datasource carries a four-bar indicator in the title bar with its
request rate beside it: amber when calls are failing or a response is slow, red when the source is
down. Going down and coming back earns one toast each, rather than an error per request.

## What's new

- Hover a datasource's indicator for the last minute in full: latency, requests in flight, failures,
  the last error, and whether Vantage is easing off to let the server recover.
- `max_connections` caps parallel requests to a datasource and `rate_limit` bounds them per second.
- Name an API's sort parameter (`ordering: { param: ordering }`) and grids ask the server for their
  order, so the first page is the real top and new records surface there on the next refresh.
- Fix: actions run after switching projects used the previous project.
- Fix: a terminal action pointed at a missing folder says so, rather than opening in your home
  directory.
