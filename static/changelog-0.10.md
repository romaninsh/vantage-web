# Vantage 0.10

This release adds row actions, dialogs, and charts. Grid rows and toolbars can run operations —
opening form and confirmation dialogs, writing records, and calling external services — and pages
can present their data as charts.

## What's new

- **Row actions.** A grid row's right-click menu can run an operation, not only open another page.
  Actions are declared as `action/*.yaml` and referenced from a row's `action:`.
- **Form and confirmation dialogs.** A `kind: form` action opens a dialog to add or edit a record; a
  `kind: confirm` action asks before a destructive step. The bakery example uses these to add, edit,
  and delete products and to cancel an order.
- **Grid toolbars.** Grids can carry a toolbar of buttons above the rows, such as "Add product".
- **Order status workflow.** Orders carry a status, and the right-click menu offers only the valid
  next transitions for the current state — placed, confirmed, in production, ready, delivered or
  picked up, paid, and cancelled — hiding steps that don't apply.
- **External actions.** A `kind: http_request` action calls an outside service; the example wires a
  "Send password reset" action on a client.
- **Charts.** A `kind: chart` element plots a table as a bar, line, or pie chart, using an `x`
  column for the category and a `y` column for the value. Arrange several with `layout: grid` to
  build a dashboard.
- **Chart controls.** A page can declare a `controls:` dropdown sourced from a table; charts that
  reference it in their `where:` re-filter when the selection changes, so one dropdown scopes the
  whole dashboard.
