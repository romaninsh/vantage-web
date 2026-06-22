# Vantage 0.17

Tables keep themselves current without getting in your way. A grid that's on screen now refreshes on
its own, quietly pauses when you're not looking, and tells you in the title bar when something
changed underneath you — and when a datasource breaks, it backs off instead of hammering you with
errors.

## What's new

- **Tables refresh themselves, quietly.** A grid refreshes on its own every few seconds — but only
  while its tab is the active one, the window is focused, and you've interacted recently. Switch
  away, background the app, or step out for a minute and it pauses; come back and it resumes. It
  runs in the background so a refresh never freezes the app, and an unchanged table no longer
  flickers or loses your place or selection.
- **A refresh indicator in the title bar.** A small indicator spins while a refresh is in flight and
  shows a bell with a count when changes were spotted; hover it for a list of the most recent
  updates.
- **Auto-refresh backs off when something breaks.** If a background refresh fails — a script that
  won't respond, an expired login — that page stops auto-refreshing instead of retrying on a loop,
  and you get a single toast naming what broke. Reopen the tab once it's fixed to start fresh.
- **Run a command from a row, with live output.** A row or toolbar action can now run a script or
  CLI command: it opens a dialog that collects any inputs as a form, then streams the command's
  output live in a terminal as it runs — handy for kicking off something like a deployment from the
  row it belongs to.
- **Tables open in the order the page asks for.** A page's default sort is now honored on open — so
  log streams and state objects can lead with the most recently active, newest first, instead of
  falling back to name order.
- **Fix:** right-clicking "Show <related>" on a row you'd already selected sometimes failed to open
  the drill-down. It now opens reliably.
- **Fix:** clicking a link in a table while a detail tab was open below could drill into the wrong
  table, or nothing at all. The click now resolves against the row you actually clicked.

## 0.17.2

- **Fix:** a table that auto-refreshed every few seconds would briefly blank out on each refresh,
  then snap back when the new rows landed — or stay blank if the refresh failed. Visible grids now
  refresh in place: rows stay on screen while new ones are fetched, and only swap in if the fetch
  succeeds.
