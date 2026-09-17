# Vantage 0.10

Grid rows and toolbars can run operations. An action is declared as `action/*.yaml` and referenced
from a row's `action:`: `kind: form` opens a dialog to add or edit a record, `kind: confirm` asks
before a destructive step, and `kind: http_request` calls an outside service. The bakery example
uses them to add, edit and delete products, to cancel an order, and to send a password reset to a
client.

## What's new

- Grids can carry a toolbar of buttons above the rows, such as "Add product".
- Orders carry a status, and the right-click menu offers only the valid next transitions for the
  current state — placed, confirmed, in production, ready, delivered or picked up, paid, cancelled —
  hiding the steps that don't apply.
- A `kind: chart` element plots a table as a bar, line or pie chart, with an `x` column for the
  category and a `y` column for the value. `layout: grid` arranges several into a dashboard.
- A page can declare a `controls:` dropdown sourced from a table, and every chart that references it
  in `where:` re-filters when the selection changes, so one dropdown scopes the whole dashboard.
