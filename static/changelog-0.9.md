# Vantage 0.9

Tables handle a million rows. Only the rows you can see are fetched and the rest wait in a backing
cache; sequential and cursor-based pagination are picked per backend, so scrolling stays smooth
whatever the size of the data, and sorting falls back to in-memory where the backend can't do it.

## What's new

- Tables refresh without flicker — on file change, on a schedule, or when you press the button. The
  strategy depends on the data source.
- Open the same table in two tabs, or a master grid plus a detail sheet, and they share one cache,
  so an edit in one view appears in the other instantly.
- Read rows from DynamoDB and write them through a REST API call: the read source and the write
  target are configured per operation.
