# Vantage 0.23

## What's new

- **Pages now say what they observe.** The key that points a grid, stat, or chart at its
  data is now `observe:` — `observe: launches` reads like what it does, and the editor's
  autocomplete follows suit. Existing pages keep working: the old `table:` spelling is still
  accepted.
- **Stats that keep moving.** A stat can carry a small `project:` formula that keeps its
  number gliding between data updates — altitude climbs smoothly using velocity instead of
  jumping once a second. The projection corrects itself whenever fresh data lands, and if
  the feed stalls it freezes at the last honest value instead of guessing on.
