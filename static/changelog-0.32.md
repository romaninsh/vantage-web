# Vantage 0.32

Search comes back. 0.31 took it away because it only ever looked at the rows already sitting on your
machine and presented that as the whole answer. It asks the data source now: type in the box above a
grid and the rows narrow as you go, with the question going to the source on a large table and
staying local on a small one that is already loaded in full. Where a source can't be asked, the box
isn't there, so a search result is either the real one or nothing pretending to be it.

## What's new

- Reference dropdowns search the same way and under the same rule. Each one searches on its own, so
  filtering one doesn't disturb another on the same form.
- A dropdown over a large table shows its first options straight away and fetches more as you
  scroll, with placeholders in the rows that haven't arrived.
- Re-opening a grid whose rows are cached draws them directly instead of flashing a skeleton first.
  The loading placeholder appears only when there's a real wait.
