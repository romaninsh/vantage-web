# Vantage 0.7

Two stacked features that turn Vantage UI from a one-page-at-a-time admin into something you can
actually navigate: **tabs**, and **Rhai-driven drilldowns** that make context-menu entries open
related records in a new tab.

## What's new

- **Tabs.** Open multiple data-table pages at once. The left sidebar owns one nav slot — clicking a
  different sidebar item rebuilds that slot's tab in place, so any child tabs you spawned from it
  stay live.
- **Open-in-new-tab from link cells.** Click a link cell and the related record opens in a child tab
  owned by the current page. Subsequent clicks in the same parent reuse the child tab — unless
  you've **pinned** it, in which case new tabs slide in immediately to the left and take focus.
- **Pin tabs.** Star a tab to keep it around; opens-from-the-same-parent go beside it instead of
  replacing it. (Star icon is a stand-in until a custom Pin glyph ships.)
- **Rhai-driven context-menu drilldowns.** `context_menu` entries in a page's YAML can now declare
  an `open_page` plus a `model:` Rhai expression that returns the table to show. The expression sees
  the clicked row's columns, the full `row`, and the page's master `model` (with a
  `get_ref(relation, id)` helper for chasing `has_many` relations). Chain it for multi-hop
  drilldowns like `model.get_ref("albums", row.id).get_ref("photos", album_id)`.
- **Page title in the CRUD toolbar.** The toolbar grew a header band to the right of the Refresh
  button showing the active page's title (or a breadcrumb path for drill-down tabs).
- **`vantage-ui-builder` skill 1.4.0.** Bundled agent skill picks up a "Drilling into related pages
  from a context menu" section and an updated Rhai scope table.

## 0.7.1

- Fix: the dashboard's "Recent Changes" panel shows the real notes for 0.5, 0.6 and 0.7 instead of
  the empty placeholder it shipped with in 0.7.0.
