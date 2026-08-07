# Vantage 0.32

Search comes back. Last release took it away because it only ever looked at the rows already sitting
on your machine and presented that as the whole answer. It now asks the data source instead, and
where a source can't be asked, the box simply isn't there — so a search result is either the real
one or nothing pretending to be it.

## What's new

- **Search returns to data grids.** Type in the box above a grid and the rows narrow as you go, no
  Enter needed. On a large table the question goes to the data source, so you're searching all of
  your data and not just the part you've scrolled past. On a small table that's already loaded in
  full, it filters what's in hand — same answer, no round trip. If the source can't answer either
  way, the grid shows no search box at all.
- **Search returns to reference dropdowns.** Open a dropdown, start typing, and the list narrows the
  same way and under the same rule. Each dropdown searches on its own, so filtering one doesn't
  disturb another on the same form.
- **Dropdowns load as you scroll.** A dropdown over a large table no longer waits to pull everything
  before it opens. It shows the first options straight away and fetches more as you scroll, with
  placeholders in the rows that haven't arrived.
- **Grids stop flashing while they load.** Re-opening a grid whose rows are already cached now draws
  them directly, instead of showing a skeleton for a moment first. The loading placeholder only
  appears when there's a real wait, including for rows further down that a late row count has just
  revealed.
