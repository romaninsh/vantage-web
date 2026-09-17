# Vantage 0.7

Tabs, and drilldowns that open related records in one. You can keep several data-table pages open at
once; the left sidebar owns a single nav slot, so clicking a different sidebar item rebuilds that
slot's tab in place and any child tabs you spawned from it stay live. Click a link cell and the
related record opens in a child tab owned by the current page. Later clicks in the same parent reuse
that tab, unless you star it to pin it, in which case new tabs slide in to the left and take focus.

## What's new

- `context_menu` entries can declare an `open_page` plus a `model:` Rhai expression returning the
  table to show. The expression sees the clicked row's columns, the full `row` and the page's master
  `model`, with a `get_ref(relation, id)` helper for chasing `has_many` relations — chain it for
  `model.get_ref("albums", row.id).get_ref("photos", album_id)`.
- The CRUD toolbar shows the active page's title to the right of Refresh, or a breadcrumb path on a
  drill-down tab.

## 0.7.1

- Fix: the dashboard's "Recent Changes" panel showed an empty placeholder instead of the real notes
  for 0.5, 0.6 and 0.7.
