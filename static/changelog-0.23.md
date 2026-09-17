# Vantage 0.23

The key that points a grid, stat or chart at its data is now `observe:`. `observe: launches` reads
like what it does, and the editor's autocomplete follows suit. Existing pages keep working — the old
`table:` spelling is still accepted.

## What's new

- A stat can carry a `project:` formula that keeps its number gliding between data updates, so
  altitude climbs on velocity instead of jumping once a second. The projection corrects itself
  whenever fresh data lands, and freezes at the last honest value if the feed stalls.
