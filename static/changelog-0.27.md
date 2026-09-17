# Vantage 0.27

A table column can show more than what's stored: a value from a related record — a batch's name
beside each tag, a course name beside each booking — or one worked out from the row, without putting
it in your database. This works on SurrealDB, SQL and REST. Timestamps in summary and detail views
read as "2 days ago" or "15 Jul 14:32" rather than raw machine strings, and every value on screen is
selectable, with double-click to copy it whole and a copy icon beside the ones you reach for most.

## What's new

- A dashboard stat can show how it has moved recently — a green "+3" or a red "−2" beside the
  number, with a tooltip explaining the window.
- Pie and donut charts shrink to fit their tile as the window narrows instead of spilling over their
  neighbours, and a tall dashboard scrolls.
- SurrealDB datasources can authenticate at the namespace level, which is what a hosted SurrealDB
  Cloud instance expects.
- REST datasources can read auth tokens and credentials from environment variables instead of
  hard-coding them in the project, and send fixed query parameters on every request.

## 0.27.1

- Fix: the Mac disk image now opens an installer window asking you to drag Vantage into
  Applications. Running it from the read-only image is what quietly blocked in-app updates.
- A connect-your-data card for a backend that needs a stored credential has a button straight to the
  secrets editor.
