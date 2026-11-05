# Vantage 1.12

A project can now carry policies: `policy/*.yaml` files whose rules mask, hide and lock columns and
actions on every page, whoever wrote the page. A profile lists the ones it applies
(`policies: [pii]` under `profiles:` in `application.yaml`), or a policy names its own profiles with
a top-level `profiles:`, so a company can add one without touching the app's files.

Policies also cover the in-app agent. A rule can lock the dashboard's MCP read and write switches
off, remove tools, or run the agent as an adapter. Masks don't restrict search or filters yet.

## What's new

- A masked column shows the masked value in grids, trees, drawers, record titles, `copy:` row
  actions and the run log. A `hide: true` rule removes the column.
- A widget that can't apply a rule doesn't mount; it shows the rule that stopped it
  (`policy/<file>.yaml#<rule>`).
- A denied action disappears from menus and is refused if called. Denied writes remove the add,
  delete, drag and save controls.
- The access chips on a page and `explain_access` list the policy entries applied, with file and
  rule.
- A locked MCP switch on the dashboard is off and names its rule. `kinds: [agent_tool]` rules remove
  tools, and `mutate: { mode: adapter }` runs the agent as an adapter: tools that return raw rows,
  such as `run_data_script`, refuse.

## 1.12.1

You can now say in a table or API file which writes it takes. `deny: { actions: [delete,
delete_all] }` refuses those; `allow: { actions: [insert] }` refuses everything else, so an
append-only ledger is one line. A column takes `deny: { actions: [update] }` to become read-only
after insert. The rule holds everywhere the table is used (pages, scripts, actions, APIs), the
buttons for a refused write disappear, and a refusal names the line that made it. This works in
every edition.

Vantage Enterprise adds a policy engine on top, modelled on Kyverno: `policy/*.yaml` files whose
rules match tables, columns, pages, APIs, actions and the agent by kind, name, flag or a Rhai
condition, then deny, mask, hide or narrow them, per profile and with `warn` / `audit` modes to
try a rule before enforcing it. A community build that opens a project binding a policy keeps its
pages closed with "policies need Vantage Enterprise" rather than show the data without its rules.

- `deny:` and `allow:` on a table (`insert`, `update`, `delete`, `delete_all`, `import`), on a
  column (`deny: { actions: [update] }`) and on an API entity; refusals name
  `table/<key>.yaml#deny`, `#allow` or `api/<api>.yaml#<entity>.deny` / `.allow`.
- A read-only field keeps its value selectable and has a Copy button: numbers, dates, dropdowns
  and references too, not only text.
- The bundled skills cover static permissions, a roles guide for datasource rules, and, in
  Enterprise builds, policies (`vantage-policies`).
- Fix: switching from one assumed role straight to another said the session had ended.
- Fix: an identity menu entry was logged twice, and as the assumed person rather than you.
- Fix: a count-only stat refused to show over a table with a masked column.
- Fix: a form showed a column the role's rule had removed.
- Fix: a grid footer said "1 rows".

## 1.12.2

- Fix: a project whose table has a column read through a reference back to the same table (an
  employee's `manager.name`) closed the app as it opened.
- A column read through a reference (`customer.name`) sorts on SurrealDB, and an API's schema
  offers only the sorts the table can do.
- The SurrealDB skill builds totals and counts over child rows from record references (`<~`),
  which keeps such pages fast on large tables.

## 1.12.3

- Security updates in bundled libraries: XML parsing for AWS datasources, zip handling when
  installing an app, compression, TLS certificate checks and the async runtime.
