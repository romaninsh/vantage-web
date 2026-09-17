# Vantage 0.30

Two things this release, and they meet in the middle. A page can follow a single record instead of a
whole table, so a row opens into a screen built for it: a row action opens one for the row you
clicked, the sidebar can link straight to a specific record, and Vantage holds the page behind a
spinner until the record is fully loaded rather than showing you a half-drawn screen. And a page can
host a widget Vantage doesn't ship. Drop a plugin into your project's `plugins` folder and any page
can place it. The first one is a real map, which arrives as a separate download rather than weight
in the app.

## What's new

- A map drags to pan and scrolls to zoom with the momentum you expect. Give it a GPS trail, a
  boundary or a point of interest and it draws that over the basemap, then frames the view on it.
- A widget whose plugin isn't installed shows a note in the space it would occupy rather than
  breaking the page. Plugins can also add functions your pages call.
- Opening a second record reuses the same tab instead of piling up, unless you pin it, in which case
  the next one opens alongside.
- A data page can offer named filters as buttons above the grid — click to narrow, click again to
  clear. They read as chips you can dismiss, and they work on computed columns as well as stored
  ones.
- A table can borrow columns from another data source and show them beside its own, a file store's
  contents next to a database's records. They fill in as they arrive and sort, search and filter
  like any other column.
- Pages gained an image element that renders a picture from a path, a labelled divider, and framed
  columns that draw as cards.

## 0.30.1

- Fix: a table borrowing columns from another source made rows jump order for an instant while you
  scrolled, and kept re-asking about rows the other source had nothing for long after it had
  finished loading.
