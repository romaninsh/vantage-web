# Vantage 0.9

Tables handle a million rows without breaking a sweat. A new reactive caching layer lazy-loads only
what's on screen, keeps multiple views in sync, and refreshes in the background.

## What's new

- **Big tables feel instant.** Only the rows you can see are fetched; the rest wait in a backing
  cache. Sequential and cursor-based pagination are picked automatically per backend, so scrolling
  is smooth regardless of dataset size. Sorting falls back to in-memory when the backend doesn't
  support it.
- **Background refresh.** Tables refresh without flicker — on file change, on a schedule, or when
  you hit the button explicitly. Refresh strategy depends on the data source.
- **Dirty-record tracking.** The cache layer tracks pending changes; UI indicators will follow.
- **Shared cache across views.** Open the same table in two tabs, or a master grid plus a detail
  sheet — they share one cache, and edits in one view appear in the other instantly. Individual
  record lookups and aggregate counts are cached separately.
- **Mixed-backend tables.** Read rows from DynamoDB, write them through a REST API call.
  Per-operation backend configuration lets you combine any read source with any write target.
