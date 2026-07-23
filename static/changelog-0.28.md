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

## 0.28.1

- **Fix: adding records to tables with numeric ids.** Creating a record on a plain SQL table with an
  integer id column failed silently — the row never landed. Creates now work out of the box.
- **Fix: saving a picked related record.** Choosing a value from a reference dropdown could crash
  the app or fail the save with a cryptic database error.
- **Errors you can read and copy.** When a save or delete fails, the form shows a proper alert box —
  full message, the details that matter, and a copy button — instead of a clipped line or nothing.
- **Delete owns its outcome.** The confirm dialog waits for the delete to land: a record still
  referenced by others explains exactly that ("Cannot delete — referenced by: books"), and a
  successful delete cleans up the selection and row count.
- **Toolbar, reorganised.** Add and Delete lead with labels and proper icons, the search box says
  Search, and refresh reads Force-refresh on pages that already auto-refresh. The redundant table
  title is gone — the tab has it, and the Add dialog is named after the table instead.
- **Drill-down you can see and undo.** Opening related records (an author's books) shows a small
  filter chip on the grid — dismiss it to see the whole table. The tab is named after the record
  you came from.
- **Forms feel right.** Enter submits create/edit dialogs, there's a single button row, and Revert
  only appears where it can actually revert something.
- **Instant repaints.** Grids and forms repaint the moment data arrives instead of up to a second
  later.
- **Three times the icons.** The `icon:` set in YAML grew from ~100 to 300+ Lucide icons — menus,
  toolbar actions, and row actions can name any of them.
- **Updates announce themselves.** The title-bar button now says "Update to X", then "Restart to
  Update" once it's installed; the app checks for updates shortly after launch and hourly. Agents
  can ask the app about its version through MCP.
- **New projects land in ~/Vantage.** Out of `~/Documents`, where iCloud eviction kept freezing
  cold starts.
