# Vantage 0.18

A form dropdown can build its list from a live query. Give it an `options:` script — a short Rhai
snippet that builds a table query, with conditions and references, and returns the rows as the
choices — and pick the label and id columns the way you would for a static reference. The dialog
opens immediately, with a spinner on each scripted dropdown while its query runs. When the script
reads another field on the same form, that dropdown re-runs the moment you change the field it
depends on, so a Country dropdown can drive a Cities one with no extra wiring.

## What's new

- Fix: an HTTP action that failed dumped the raw JSON response body into the toast. It now shows the
  server's own message — the `detail`, `message` or `error` field — so you read "rocket
  configuration X does not belong to agency Y" instead of `{"detail": "..."}`.
- Fix: a dropdown's options could be empty until you had opened the referenced table in its own tab.
  Dropdowns read straight from the datasource now.

## 0.18.3

- Fix: a multi-line value in a table cell or a form field — a JSON blob, a stack trace — crashed the
  app. Such values are flattened to a single line wherever they are rendered.
- Fix: a `cmd`-backed table with a per-row `detail` script showed only its first 100 rows, then
  re-ran the whole CLI to fetch the next page.
