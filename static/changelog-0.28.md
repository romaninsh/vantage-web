# Vantage 0.28

You can edit, add and delete records from any data page. Open a record's details and change it:
Save writes only the fields you touched, Revert puts them back, and the footer counts your unsaved
changes as you type. Fields you haven't touched keep tracking live changes from the data source
while the form is open, so nothing goes stale under you, and creating is safe to fumble — clicking
Save twice can't produce a duplicate. A round of performance work went with it. The app's working
cache used to live in your project folder, where iCloud could evict it to the cloud and leave the
app locked up re-downloading it mid-click; it now lives in the system cache folder.

## What's new

- A column that references another table renders as a searchable dropdown of that table's records,
  and a column with declared `enum:` values becomes a dropdown of exactly those choices.
- A grid column showing a value from a related record — an author's name on a books table — can
  declare a link, so clicking the value jumps to that record.
- Fix: closing a page releases everything it was holding, instead of accumulating data pipelines,
  caches and watchers until you restart.

## 0.28.1

- Fix: creating a record on a plain SQL table with an integer id column failed silently, and saving
  a value picked from a reference dropdown could crash the app.
- A failed save or delete shows a full message with a copy button, and the delete confirmation waits
  for the outcome — a record other rows still point at says so ("Cannot delete — referenced by:
  books").
- Add and Delete lead the toolbar with labels and icons, drilling into related records shows a
  filter chip you can dismiss to see the whole table, and the `icon:` set grew from about 100 to
  300+ Lucide icons.
- New projects land in `~/Vantage`, out of `~/Documents` where iCloud eviction kept freezing cold
  starts.

## 0.28.2

- A reference dropdown names the linked record the instant the form opens rather than sitting blank
  while a long list loads, fetches its choices when you open it, and filters as you type.
- Fix: a form could show one unsaved change on a reference field that you never made, and blank the
  reference on Save.
