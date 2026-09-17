# Vantage 0.21

A new `faker` data source lets you try Vantage without a backend to wire up. Add one from the
datasource dialog and its tables fill with synthetic rows — names, emails, cities, amounts. A table
can sit still or run live, with rows appearing about once a second and expiring a few seconds later,
so you can watch grids, lists and charts react. It suits a demo, or trying a dashboard layout before
the real data lands. The rest of the release is sorting and live-data behaviour.

## What's new

- Where your data source can sort, Vantage lets it: the order is applied where the data lives and
  the grid shows the result, instead of re-sorting everything on your machine. The built-in sorting
  handles more cases too, including numeric columns that used to sort oddly.
- When rows shift under you on a live feed or after a refresh, the highlight stays on the item you
  picked as it moves. If the item is gone, the selection clears rather than jumping to whatever slid
  into its place.
- A pie chart can be ordered, so its slices come out in a sensible sequence instead of the order the
  data happened to arrive in.
