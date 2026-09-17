# Vantage 0.36

A page's `kind: select` is a real dropdown now: searchable, filled either from a `query:` block of
its own or lazily from a whole table, and narrow enough that a filter bar of four of them fits on
one line. `appearance: chips` brings the old chip look back as a proper segmented control. What
those filters feed is the other half of the release — a binding can hand named values to a
query-sourced table, `scenery("revenue").args(#{ region: r })`, and the table's `rhai:` script reads
them from the `args` map. The slice is narrowed before it is aggregated, so KPI totals, deltas and
sparklines all recompute rather than being filtered after the fact.

## What's new

- A select with `observe:` fronts a whole table lazily: nothing is fetched until the menu opens,
  scrolling pulls the visible window, and typing searches on the server, so a picker over 500,000
  people costs nothing until you use it. `params.column` names the display column,
  `params.placeholder` the closed-face prompt, and the picked row's id publishes as `${name.value}`.
- Stat tiles became KPI cards: a value from the data (`column:`) instead of a row count, an `icon:`
  in the corner, an accent `color:`, a trend strip under the number (`spark:`), and a change line
  like "▲ 4.5% vs June" whose colour follows the meaning — `change_good: down` paints a growing cost
  red.
- A line chart with `group:` draws one line per distinct value of that column, the top 8 by total,
  with a legend underneath, so a per-entity chart needs no hand-pivoted columns.
  `chart_type: stacked_bar` stacks series into monthly columns, and `palette: { colors: [...] }`
  pins exact series colours.
- A label with `observe:` and `column:` shows a value your query formatted — a panel subtitle like
  "8 title tiers · 500,000 employees · 245,315 active" with no client-side arithmetic. Labels also
  take `style: heading | muted` and an `icon:`.
- `search: true` on a `kind: grid` puts a quicksearch bar above the table: on the server where the
  backend can do it, over an eager cache where it can't, and hidden where neither would be honest.
- `when:` conditions are real expressions: `when: 'tab.value == "Details"'`. A text-form gate used
  to render to a non-empty string and count as always-true, so a page that relied on that needs the
  expression form.
- Postgres tables match SQLite now — case-insensitive quicksearch, declared page sizes, paged and
  cursor fetches — which is what used to make Postgres grids trickle-load in small chunks. Postgres
  also joins the datasource wizard.
- Fix: changing a filter scrolled the page back to the top.

## 0.36.1

- Fix: the recent-projects list showed several identical "inventory" rows, one per app keeping its
  catalog in a folder of that name. Names that clash grow a parent folder until they read apart —
  `bakery/inventory`, `space/inventory`.
