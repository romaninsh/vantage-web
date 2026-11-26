# Vantage 1.14

The agent can now drive the app the way you do. It opens a row action or a toolbar entry, fills in
the dialog, submits or cancels it, and reads back the dialog's fields, options and errors, so it
checks a dialog-driven flow before it hands it over. Dialogs gained a dropdown over `choices:`, the
current value preselected when you edit, and a checklist over a table.

A request card that runs a command names the profile and the variables the command reads, declared
with `uses:`. The agent never sees the values or, in a project that has secrets, the command's
output.

Later 1.14 releases added scenario tests: `tests/scenarios/*.yaml` plays a project's actions, hooks
and access rules on in-memory copies of its tables, and the title bar's test badge runs them.
Timestamps show, and are typed, in your computer's time zone. People can sign in with the logins of
an existing database, such as Odoo's, without anything being added to it. Postgres tables update
live from `NOTIFY` with `notify: true` on the datasource. The agent's skills were checked against
the app and shortened, and the agent now holds every page to query budgets before handover.

## What's new

- A command's button reads **Run**. A failed run shows the last 20 lines of its output in the card,
  with secrets masked; the agent gets them only when the project holds no secret values.
- A record page updates in place when its row changes, and its grids keep scroll and selection.
- A row action with `primary: true` is a small button on the row. A grid can hide relation links or
  turn off edit and delete, and a relation can name the page its link opens with `link_page:`.
- Buttons and row actions run the action's current definition, so an edited action no longer runs
  its old body in an open page. A page button's uncaught error shows as a toast.
- Values the app writes follow the column's declared type, and a column's `default:` is written
  when a record is added without that value; before, it only prefilled forms. A column can be
  `type: json`.
- Rhai has date helpers (`today()`, `date()`, `add_days()`), and actions import shared helpers from
  `lib/*.rhai`. An API keeps its port across failed starts and app restarts.
- Fix: a row action on a filtered page couldn't take a row out of the filter; archiving or changing
  a status now saves, and the row leaves the page.
- Fix: editing a page file left a second open tab on the old page.
- Fix: a service row's **Restart** restarted the whole stack.
- Fix: an API datasource whose secret didn't resolve sent its requests without credentials.
- Fix: typing in the agent panel froze the window on long threads.
