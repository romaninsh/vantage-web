# Vantage 0.22

Every page runs on one page language. A page is a `body:` list of components — grids, charts, lists,
forms, selects, binders — nested in rows and columns. That grammar gained everything the old
`elements:`/`layout:` format could do, and the old format no longer loads; a page still written that
way shows a clear error naming the file. Every bundled example ships migrated, and the YAML editor's
schema hints describe the real grammar instead of flagging valid pages.

## What's new

- The master-detail screen was rebuilt: arrow-keying through rows re-targets the tabs without
  reloading the page, the details form fills in place instead of blanking first, and the split
  between grid and tabs is draggable.
- `refresh_interval` on a grid, crud or binder re-pulls on that cadence. New rows float to their
  sorted spot, and an unchanged pull repaints nothing.
- A select can take its options from a table, with an "All" entry, and chart bindings can narrow on
  it — pick a namespace and the pod charts re-scope while the cluster-wide ones stay put.
- Clicking a relation cell or "Related →" opens the target page narrowed to the reachable records,
  from any page, including chained walks such as namespace → deployments → pods stacked on one page.
  Re-selecting a row you've visited is instant.
- A datasource or table that reads anything other than `profile.*` or `secret.*` in a `${...}`
  placeholder is flagged at load time, so switching profiles swaps every connection detail cleanly.
