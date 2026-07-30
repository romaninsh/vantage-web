# Vantage 0.21

A round of smaller improvements to how tables, sorting, and live data behave — plus a new **faker**
data source so you can try any of it without a backend to wire up.

## What's new

- **Faster, sturdier sorting.** When your data source can sort for you, Vantage now lets it — the
  order is applied where the data lives and the grid just shows the result, instead of re-sorting
  everything on your machine. For sources that can't, the built-in sorting got more robust and now
  keeps rows in the right order in more cases, including numeric columns that used to sort oddly.
- **Your selection stays put.** When rows shift around under you — on a live feed or after a refresh
  — the highlight stays on the item you picked as it moves. If that item is gone, the selection
  clears instead of jumping to whatever slid into its place.
- **Sortable pie charts.** A pie chart can now be ordered, so its slices come out in a sensible
  sequence instead of whatever order the data happened to arrive in.
- **A "faker" data source.** Add one from the datasource dialog and its tables fill with realistic
  synthetic rows — names, emails, cities, amounts. A table can sit still or run "live": rows appear
  about once a second and expire a few seconds later, so you can watch grids, lists, and charts react
  in real time. Handy for demos, or for trying a dashboard layout before the real data lands.
