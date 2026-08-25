# Vantage 0.36

## What's new

- **Selects are real dropdowns.** A page's `kind: select` now opens a searchable dropdown instead
  of a row of chips. Want the chip look back for a small toggle? Say `appearance: chips` — chips
  now paint as a proper segmented control. A `params.label` names the control on its closed face
  ("Month: July 2026"), and a two-column options query shows a friendly label while publishing
  the raw value.
- **Dropdowns can query their own options.** Give a select a `query:` block and it fills itself
  from your database once, when the page opens — no table file, no polling. Options cap at 200.
  A third projected column becomes a muted annotation beside each option in the open list — an
  org-wide total, a count — without lengthening the closed control.
- **Dropdowns share a row politely.** A select now shrinks to the slot its row gives it, so a
  filter bar of several dropdowns fits on one line instead of overlapping; give one a `width:`
  to pin it. The open list keeps its own readable width however narrow the closed face gets.
- **Stat tiles grew into KPI cards.** A stat can show a value from its data (`column:`) instead of
  a row count, wear an icon in the corner (`icon:`), take an accent colour (`color:`), draw a tiny
  trend strip under the number (`spark:`), and carry a change line — "▲ 4.5% vs June" — where the
  arrow follows the direction and the colour follows the meaning (`change_good: down` paints a
  growing cost red).
- **Line charts can follow the data.** A line chart with `group:` draws one line per distinct
  value of that column — the top 8 by total — with a legend underneath. A per-entity chart (one
  person's spend per model) needs no hand-pivoted columns; the rows decide the lines.
- **Stacked bar charts.** `chart_type: stacked_bar` stacks series into monthly columns, and every
  chart can pin its exact series colours with `palette: { colors: [...] }`.
- **Lists became breakdown lists.** A list row can paint a percentage underline in its colour
  (`bar:`), and colours can follow the member instead of the row position (`slot:`) so re-sorting
  never repaints the wrong entity.
- **Labels can read the database.** A label with `observe:` + `column:` shows a value your query
  formatted — panel subtitles like "8 title tiers · 500,000 employees · 245,315 active" without a
  single client-side calculation. Labels also take `style: heading | muted` and an `icon:`.
- **`when:` conditions are real expressions now.** A gate like `when: 'tab.value == "Details"'`
  evaluates as a condition. Previously a text-form gate rendered to a non-empty string and counted
  as always-true — if a page relied on that accident, its gates need the expression form.
- **Filters that reach inside the query.** A binding can hand named values to a query-sourced
  table — `scenery("revenue").args(#{ region: r })` — and the table's `rhai:` script reads them
  from the `args` map, so a filter bar narrows the data *before* it is aggregated: KPI totals,
  deltas and sparklines all recompute for the slice. Every value binds as a query parameter, and
  the script can even pick a different source table when a filter needs a column the narrow one
  lacks.
- **The page keeps your place.** Changing a filter no longer scrolls the page back to the top.
- **Dropdowns over huge tables.** A select with `observe:` now fronts the whole table lazily:
  nothing is fetched until the menu opens, scrolling pulls only the visible window, and typing
  searches on the server — a picker over 500,000 people costs nothing until a pick starts.
  `params.column` names the display column and `params.placeholder` the closed-face prompt;
  the picked row's id publishes as `${name.value}`.
- **Grids can carry a search box.** `search: true` on a `kind: grid` puts a quicksearch bar
  above the table — searched on the server when the backend can, filtered locally over an eager
  cache otherwise, and hidden entirely when neither is honest. The typed term survives filter
  changes on the page.
- **PostgreSQL tables reached capability parity with SQLite.** Quicksearch (case-insensitive),
  declared page sizes and paged/cursor fetches now work on Postgres-backed tables and views —
  previously they under-advertised, which is why grids trickle-loaded in small chunks.
- **PostgreSQL joins the datasource wizard** with its own guidance for modelling existing
  databases and warehouses.
