# Vantage 0.28

Vantage tables grew up: you can now edit, add, and delete records right from any data page. Forms
save only what you actually changed, related records pick from searchable dropdowns, and a round of
performance work made the whole app stop freezing.

## What's new

- **Edit records.** Open a record's details and change it — Save writes only the fields you
  touched, Revert puts them back, and the footer counts your unsaved changes as you type. While a
  form is open, fields you haven't touched keep tracking live changes from the data source instead
  of going stale.
- **Add and delete records.** Data pages gained toolbar buttons to create a record and delete the
  selected one (with a confirmation). Creating is safe to fumble: clicking Save twice can't
  produce a duplicate.
- **Pick related records from a dropdown.** A column that references another table now renders as
  a searchable dropdown of that table's records — type to filter, pick by name, and the reference
  is saved. Columns with declared `enum:` values become a dropdown of exactly those choices.
- **Click through to related records.** A grid column showing a value from a related record (like
  an author's name on a books table) can declare a link — clicking the value jumps straight to
  that record.
- **Fix: random freezes.** The app's working cache lived inside your (often iCloud-synced)
  project folder, where macOS could quietly evict it to the cloud — and the app would lock up
  re-downloading it mid-click. The cache now lives in the system cache folder where it belongs.
- **Fix: long sessions stay lean.** Closing a page now releases everything it was holding — data
  pipelines, caches, watchers — instead of accumulating them until restart.
