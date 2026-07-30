# Vantage 0.22

Every page now runs on one page language. The `body:` grammar that newer pages already used is
now the only one — it gained everything the old `elements:` pages could do, plus a lot they
couldn't, and the old grammar is gone.

## What's new

- **One way to write a page.** Pages are a `body:` list of components — grids, charts, lists,
  forms, selects, binders — nested in rows and columns. The old `elements:`/`layout:` page format
  no longer loads; a page still written that way shows a clear error naming the file. Every
  bundled example app ships migrated, and the YAML editor's schema hints now describe the real
  grammar instead of flagging valid pages.
- **Binder pages feel instant.** The master-detail screen (grid on top, tabs below) was rebuilt:
  arrow-keying through rows re-targets the tabs immediately without reloading the page, the
  details form fills in place instead of blanking first, and the split between grid and tabs is
  draggable. Tabs cover a hand-authored summary view, the record's details, and one tab per
  related table — plus toolbar buttons and right-click row actions, same as before.
- **Grids that keep themselves fresh.** Give any grid, crud, or binder a `refresh_interval` and
  it re-pulls on that cadence — new rows appear and float to their sorted spot without you
  touching anything, and an unchanged pull repaints nothing.
- **Dashboards you can filter.** A select can now take its options from a table (with an "All"
  entry), and chart bindings can narrow on it — pick a namespace and the pod charts re-scope
  while the cluster-wide ones stay put.
- **Drill-downs go anywhere.** Clicking a relation cell or "Related →" opens the target page
  narrowed to just the reachable records — from any page, including chained walks (namespace →
  deployments → pods stacked on one page). Re-selecting a row you've visited is instant instead
  of refetching.
- **Cleaner data traffic.** Pages stopped fetching the same rows twice per refresh, values no
  longer blink while a refresh lands, and a probing script that asks a source for something it
  can't do gets a plain answer instead of spraying errors into the log.
- **Stricter config checks.** A datasource or table that reads anything other than `profile.*`
  or `secret.*` in a `${...}` placeholder is flagged at load time — connection details must come
  from the active profile, so switching profiles cleanly swaps everything.
