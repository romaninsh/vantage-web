# Vantage 0.18

Form dropdowns grow up: an `options:` script can build the list from a live query that reads other
fields in the same form, and the dropdown updates itself on its own when one of those fields
changes. HTTP action errors get readable.

## What's new

- **Dropdowns can run a query for their options.** A form dropdown can now carry an `options:`
  script — a short Rhai snippet that builds a table query (with conditions, references, the works)
  and returns the rows as the dropdown's choices. Pick the label and id columns the same way you
  would for a static reference. The dialog opens immediately; each scripted dropdown shows a spinner
  while its query runs and fills in as soon as the rows land.
- **Dropdowns react to the rest of the form.** When an `options:` script reads another field on the
  same form, that dropdown re-runs and re-filters itself the moment you change the field it depends
  on — so a Country dropdown can drive a Cities dropdown, or selecting an agency narrows a Rockets
  dropdown to that agency's rockets, with no extra wiring.
- **Fix:** an HTTP action that came back with an error used to dump the raw JSON response body into
  the toast. It now pulls out the server's own message — the `detail`, `message`, or `error` field —
  so you see "rocket configuration X does not belong to agency Y" instead of `{"detail": "..."}`.
- **Fix:** a dropdown's options sometimes came up empty until you'd opened the referenced table in
  its own tab first. Dropdowns now read straight from the datasource, so the full list of valid
  choices is there regardless of what you've browsed.

## 0.18.3

- **Fix:** a multi-line value in a table cell or a form field (a JSON blob, a stack trace) would
  crash the app. Multi-line strings are now flattened to a single line wherever they're rendered.
- **Fix:** a `cmd`-backed table with a per-row `detail` script showed only its first 100 rows, then
  re-ran the whole CLI to fetch the next page. It now loads the full list in one pass and hydrates
  only the rows on screen.
- **Fix:** a two-pass grid that also had a default sort lost its per-row hydration dimming the
  moment the preset sort applied — every row looked fully loaded even before its detail arrived. The
  preset sort is now skipped on two-pass grids so the dimming stays an honest signal.
- **Fix:** a `detail` script that errored on a row (non-zero exit, unparseable output) failed
  silently — the row just stayed un-augmented forever with no trace. Per-row detail failures are now
  logged at WARN so they're diagnosable.
