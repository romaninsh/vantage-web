# Vantage 0.31

Search is gone from grids and dropdowns. It only ever filtered the rows already loaded on your
machine, so on a large table it quietly searched a slice of your data and presented the result as if
it were all of it — narrower than what you asked for, with nothing to tell you so. Filter buttons
and column sorting are unaffected, and search will return once it can put the question to the
datasource instead of guessing locally.

## What's new

- **The search box is removed from data grids and from reference dropdowns.** Use the filter buttons
  above a grid to narrow rows, and the column headers to sort.
- Fix: on framework pages, a record's id could show as a chunk of raw machine text instead of its
  readable form.
- Fix: timestamps stored as whole seconds showed as a bare number in page elements, while the same
  value read correctly in a grid cell.
- Fix: the same expression could print a number two ways — `3` in one place, `3.0` in another —
  depending on where on the page it appeared.
