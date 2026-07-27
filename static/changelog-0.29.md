# Vantage 0.29

Dates and times finally read like dates and times. Every timestamp column now renders in a clean,
readable form instead of a raw machine string, and you choose how much detail to show — down to the
millisecond, or as coarse as a year. Editing them got a proper picker, too.

## What's new

- **Readable dates, at the precision you want.** A date column no longer shows a raw
  `2027-07-22T20:26:13.902258674Z`. It renders as a clean date and time, and you pick how much to
  show per column: full timestamp with milliseconds, date and time, date only, or just the year.
  The stored value keeps its full precision either way — hiding the seconds doesn't throw them
  away, and the same column can show year-only on an overview grid while a detail view shows the
  whole timestamp.
- **A real date & time editor.** Editing a date field now gives you a text box with a calendar
  button beside it. Open the calendar to click a day, and jump years fast from the year caption —
  handy for birthdays and anything far in the past.
- **Paste a date from anywhere.** Copy a date out of an email, a spreadsheet, or another app and
  paste it straight into the field — it doesn't have to match the field's format.
  `July 22, 2027`, `07/22/2027`, an ISO timestamp, or a bare year all get understood and tidied up.

## 0.29.1

- **Columns that pack several values now read as one clean line.** A field that used to show up
  blank or as a raw blob — a contact bundled with its email and phone, a nested record — can be laid
  out as a readable summary like `Peter O'Mahony <peter@example.com>, +353…`, so you see the gist
  without opening the row.
- **Copy a single piece straight from the cell.** Right-click one of these cells and pick exactly
  what you want on the clipboard — just the name, just the email, just the phone, or the whole
  thing — instead of copying the entire cell and trimming it by hand.

## 0.29.2

- **Custom form layouts.** Drop a `form/<name>.yaml` into your project and point a page at it
  (`form: <name>`) — the same layout drives the details panel and the add/edit dialogs. Titled
  sections, fields pinned side by side on one line, multi-column spreads, a notes box across the
  whole row. Without a layout file, the default form over the table's columns still applies.
- **Column counts follow the available space.** The same layout renders three columns in a wide
  tab, one in a narrow side panel. Checkbox clusters stay compact after text fields go
  single-column.
- **Conditional sections.** A section with `when: 'record.kind == "company"'` (the same
  expressions views use) appears only while the condition holds; hidden fields stay out of the
  save.
- **A failed save keeps your edits.** Your values stay in the fields, still marked as edited, and
  a field the server rejected shows its message right under the input until you change it.
- **Unsaved changes are visible per field.** An `edited` tag and a highlighted label on each
  changed field, a count in the footer, and Revert to put everything back.
- **Forms stay current while you edit.** Changes from other users or a live datasource land in
  the fields you haven't touched; the one you're typing in holds your version.
- **Enter submits.** Works in any single-line field, in dialogs and detail panels alike;
  multi-line fields keep Enter for new lines.
- **Duplicate-proof creates.** A new record gets its identity when the form opens, so retrying
  Create after a network hiccup updates that record instead of adding another.
- **Long forms render only what's on screen**, with an accurate scrollbar from the first frame.
- Fix: edit forms no longer show phantom "unsaved changes" on records with date or decimal
  columns.
- Fix: clicking a field's label now focuses the field.

## 0.29.3

- **Tables update themselves.** When data changes outside the app — a colleague editing a record, a
  script loading a batch, another system writing in — it appears on screen on its own, usually
  within a second. No refresh button, no waiting for the next tick. Grids, detail tabs and the lists
  inside them all follow along. This is on wherever your database can announce its own changes
  (SurrealDB projects get it with no setup); everything else refreshes exactly as it did before.
