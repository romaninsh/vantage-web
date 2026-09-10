# Vantage 0.39

Filtering, and a page that is just a document.

## What's new

- **Filter a table without leaving it.** A funnel button next to the search box opens a
  small form; fill in what you want and press Apply. Each filter you apply shows up as a
  chip beside the search box, and clicking its cross takes just that one off. Say
  `filter: [shop, "~name", ">total"]` on the page and you get a field per column — a
  picker where the column has a fixed set of values, a text box otherwise. The `~` means
  "contains", `>` means "more than"; leave the mark off and you can type one yourself
  (`>30`, `~smith`) into the field.
- **Filters stay put.** Come back to a page and the filters you left on are still there,
  shown as chips so you can always see why you are looking at fewer rows.
- **Your own filter form.** Point `filter:` at a form you wrote and a short script that
  turns its answers into conditions — for a date range, or one question that narrows two
  columns at once.
- **One-click filters.** The same `grid.filter(…)` works in a toolbar button or a
  right-click action, so "only overdue" or "just this row's shop" is a button.
- **Markdown pages.** `kind: markdown` renders a document — headings, tables, lists, code.
  Point it at a file with `text: !include ../README.md` and the page and the file can never
  drift apart.
- **Server-computed columns are back.** A column can carry an `expr:` again, so a table can
  show a total or a balance worked out by the database on every read, without giving up
  editing. (0.38 removed this; it turned out to be the only way to do it.)
- **Page actions sit with the built-in ones.** Buttons you declare in `toolbar:` now appear
  next to Add and Delete instead of on a strip above the table, and look like them rather
  than shouting.
- Fix: prices showed as plain numbers on any page that lists its columns — the pound sign
  and the pence went missing.
- Fix: a negative price read `£-1.40` instead of `-£1.40`.
