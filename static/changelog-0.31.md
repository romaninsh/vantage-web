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

## 0.31.2

- **A data source can explain what it is doing.** Add `debug: true` to a data source's YAML and start
  Vantage from a terminal. It then prints a line for every request it sends, every batch of rows it
  stores, and every screen it paints without asking the source at all — and a summary of the session
  when you quit. Only the data source you marked says anything; the others stay silent, and leaving
  the flag off costs nothing.
- Fix: sorting a large table could put the wrong rows at the top. The first screen showed rows you
  had already scrolled past, re-ordered among themselves, instead of the true first rows of the sort.

## 0.31.1

- Fix: a grid could open empty and stay empty, then fill instantly if you clicked the same menu item
  again.
- Fix: a grid showed "no rows" for a moment before its rows arrived. While it's still loading you
  now get a loading placeholder, and the empty message only appears once there's really nothing to
  show.
- Fix: figures on a dashboard could sit at zero on a first run and never move.
- Fix: opening a project left more files behind on disk than it needed to — each project now keeps
  one cache file per data source.
