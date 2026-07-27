# Vantage 0.30

Two things this release, and they meet in the middle. Pages can now follow a single record instead
of a whole table, so a row opens into a screen built for it. And a page can host a widget that
Vantage itself doesn't ship — starting with a real map, which arrives as a separate download you
drop beside your project rather than weight in the app.

## What's new

- **A page for one record.** A page can name the record it follows, and everything on it reads from
  that record. Vantage holds the page behind a spinner until the record is fully loaded — including
  any columns pulled from a second source — so you never see a half-drawn screen, and a record that
  can't be loaded says so plainly instead of rendering blank.
- **Open a record from a row.** A row action can open one of these pages for the row you clicked,
  and the sidebar can link straight to a specific record. Opening a second record reuses the same
  tab instead of piling up — unless you pin it, in which case the next one opens alongside.
- **Maps.** A page can host a map: drag to pan, scroll to zoom, with the momentum and feel you
  expect. Give it your data — a GPS trail, a boundary, a point of interest — and it draws it over
  the basemap, then frames the view on what you asked for. It's a plugin, so the app doesn't carry
  a mapping stack for projects that never show a map.
- **Plugin widgets.** Widgets can come from outside the app. Drop one into your project's `plugins`
  folder and any page can place it; a widget whose plugin isn't installed shows a clear note in the
  space it would occupy rather than breaking the page. Plugins can also add functions your pages
  can call, so installing one extends what your project can script.
- **Filter buttons on data pages.** A data page can offer named filters as buttons above the grid —
  click to narrow to matching rows, click again to clear. They read as chips you can dismiss, and
  they work on computed columns too, not just stored ones.
- **Columns from a second source.** A table can borrow columns from another data source and show
  them alongside its own — a file store's contents beside a database's records, say. They fill in
  as they arrive, and you can sort, search, and filter on them like any other column.
- **Pictures, dividers, and framed sections.** Pages gained an image element that renders a picture
  from a path, a labelled divider for splitting a page into sections, and framed columns that draw
  as cards.

## 0.30.1

- Fix: on a table that borrows columns from another source, scrolling or moving the pointer over the
  grid made rows jump into a different order for an instant — the top row blanking out and snapping
  back.
- Fix: those tables kept working away in the background long after they finished loading, re-asking
  about rows the other source had nothing for. They settle now once the last column has arrived.
