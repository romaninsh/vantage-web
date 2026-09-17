# Vantage 0.17

A grid on screen refreshes itself every few seconds, but only while its tab is the active one, the
window is focused, and you have interacted recently. Switch away or step out for a minute and it
pauses; come back and it resumes. The work runs in the background, so a refresh never freezes the
app, and an unchanged table doesn't flicker or lose your place. A small title-bar indicator spins
while a refresh is in flight and shows a bell with a count when something changed underneath you;
hover it for the most recent updates.

## What's new

- If a background refresh fails — a script that won't respond, an expired login — that page stops
  auto-refreshing instead of retrying on a loop, and you get one toast naming what broke. Reopen the
  tab once it's fixed.
- A row or toolbar action can run a script or CLI command: a dialog collects any inputs as a form,
  then streams the command's output live in a terminal, so a deployment can be kicked off from the
  row it belongs to.
- A page's default sort is honoured on open, so log streams and state objects lead with the most
  recently active instead of falling back to name order.
- Fix: right-clicking "Show <related>" on a row you had already selected sometimes failed to open
  the drill-down.
- Fix: clicking a link in a table with a detail tab open below could drill into the wrong table, or
  nothing at all.

## 0.17.2

- Fix: a table that auto-refreshed blanked out on each refresh, then snapped back when the new rows
  landed, or stayed blank if the refresh failed. Visible grids refresh in place now, and only swap
  rows in if the fetch succeeds.
