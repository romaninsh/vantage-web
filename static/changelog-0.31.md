# Vantage 0.31

Search is gone from grids and dropdowns. It only ever filtered the rows already loaded on your
machine, so on a large table it quietly searched a slice of your data and presented the result as if
it were all of it — narrower than what you asked for, with nothing to tell you so. Filter buttons
and column sorting are unaffected, and search returns once it can put the question to the datasource
instead of guessing locally.

## What's new

- The search box is gone from data grids and reference dropdowns. Use the filter buttons above a
  grid to narrow rows, and the column headers to sort.
- Fix: on framework pages, a record's id could show as a chunk of raw machine text.
- Fix: timestamps stored as whole seconds showed as a bare number in page elements, while the same
  value read correctly in a grid cell.
- Fix: the same expression could print `3` in one place and `3.0` in another.

## 0.31.1

- Fix: a grid could open empty and stay empty, then fill instantly if you clicked the same menu item
  again.
- Fix: a grid showed "no rows" for a moment before its rows arrived, and figures on a dashboard
  could sit at zero on a first run and never move.

## 0.31.2

- `debug: true` on a data source, with Vantage started from a terminal, prints a line for every
  request it sends, every batch of rows it stores, and every screen it paints without asking the
  source at all, plus a summary when you quit. Only the source you marked says anything.
- Fix: sorting a large table could put the wrong rows at the top — rows you had already scrolled
  past, re-ordered among themselves, instead of the true first rows of the sort.
