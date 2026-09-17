# Vantage 0.39

A funnel button beside a grid's search box opens a small form: fill in what you want, press Apply,
and each filter appears as a chip you can take off one at a time. Say
`filter: [shop, "~name", ">total"]` on the page and you get a field per column — a picker where the
column has a fixed set of values, a text box otherwise. The `~` means "contains" and `>` means "more
than"; leave the mark off and you can type one into the field yourself (`>30`, `~smith`). Come back
to the page later and the filters you left on are still there, still shown as chips, so it's always
clear why you are looking at fewer rows.

## What's new

- Point `filter:` at a form you wrote, plus a short script that turns its answers into conditions,
  for a date range or one question that narrows two columns at once.
- The same `grid.filter(…)` works from a toolbar button or a right-click action, so "only overdue"
  or "just this row's shop" is one click.
- `kind: markdown` renders a document — headings, tables, lists, code. With
  `text: !include ../README.md` the page and the file can't drift apart.
- A column can carry an `expr:` again, so a table can show a total or a balance the database works
  out on every read without giving up editing. 0.38 removed this; it turned out to be the only way
  to do it.
- Buttons declared in `toolbar:` sit next to Add and Delete, and look like them, instead of on a
  strip above the table.
- Fix: prices showed as plain numbers on any page that lists its columns, losing the pound sign and
  the pence.
- Fix: a negative price read `£-1.40` instead of `-£1.40`.
