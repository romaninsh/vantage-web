# Vantage 0.29

Dates and times read like dates and times. A date column no longer shows a raw
`2027-07-22T20:26:13.902258674Z` — it renders as a clean date and time, and you pick per column how
much of it to show: full timestamp with milliseconds, date and time, date only, or just the year.
The stored value keeps its full precision either way, so hiding the seconds doesn't throw them away
and the same column can read year-only on an overview grid while a detail view shows the lot.

## What's new

- Editing a date field gives you a text box with a calendar button beside it. The year caption jumps
  years fast, which helps for birthdays and anything far in the past.
- A date copied out of an email or a spreadsheet pastes straight into the field without matching its
  format: `July 22, 2027`, `07/22/2027`, an ISO timestamp or a bare year all get understood and
  tidied up.

## 0.29.1

- A field that packs several values — a contact with its email and phone, a nested record — reads as
  one line, `Peter O'Mahony <peter@example.com>, +353…`, and right-click copies just the part you
  point at instead of the whole cell.

## 0.29.2

- Custom form layouts: drop a `form/<name>.yaml` into your project and point a page at it
  (`form: <name>`) for titled sections, fields side by side, multi-column spreads and a notes box
  across the whole row. The same layout drives the details panel and the add/edit dialogs, and the
  column count follows the space available — three in a wide tab, one in a narrow side panel.
- A section with `when: 'record.kind == "company"'` appears only while the condition holds, and
  hidden fields stay out of the save.
- A failed save keeps your edits and shows the server's message under the field it rejected. Changed
  fields carry an `edited` tag, the footer counts them, and Revert puts everything back. Enter
  submits from any single-line field, and a new record takes its identity when the form opens, so
  retrying Create after a network hiccup updates that record instead of adding another.

## 0.29.3

- Tables update themselves. A colleague editing a record, a script loading a batch, another system
  writing in — it appears on screen within about a second, in grids, detail tabs and the lists
  inside them. This works wherever your database can announce its own changes; SurrealDB projects
  get it with no setup and everything else refreshes as before.
