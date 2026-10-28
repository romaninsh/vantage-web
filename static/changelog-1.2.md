# Vantage 1.2

Pages can show a table as a kanban board. `kind: kanban` puts each row on a card in a lane chosen
by one column, such as an order's status, and dragging a card to another lane writes that column
back to the datasource. The lanes follow the column's `enum:` values unless the page lists them.
With a numeric `rank:` column, cards can be reordered inside a lane as well. On a datasource that
takes no writes the board is read-only.

## What's new

- `kind: kanban` shows a table's rows as cards in lanes by a column's value; drag a card to move
  it to another lane.
- `rank:` names a numeric column that orders the cards in a lane, so they can be dragged into a
  new order.
- Each lane has an "Add card" entry, and `wip:` shows a lane's count as a warning once it holds
  more cards than its limit.
- Double-clicking a card, or pressing Enter on it, runs `on_open:`, for example
  `open("order", #{ id: row.id })`.
- The playground menu has an Order Board over its orders, which gain a `status` column.

## 1.2.1 — 2026-10-11

- Fix: MongoDB apps got slower the longer they ran.
- Fix: pages over MongoDB views stalled on open.
- Fix: relation tabs and `ref()` on MongoDB tables.
- `mongo: { view: true }` marks a table as a MongoDB view; `stream_pool_size` sets a datasource's
  pool for live streams.
- A table's `mongo:` block takes only `view`. `collection:` used to pass and be ignored; now it
  fails the table.
