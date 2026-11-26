# Vantage 1.12

A project can now carry policies: `policy/*.yaml` files whose rules mask, hide and lock columns and
actions on every page, whoever wrote the page. A profile lists the policies it applies, or a policy
names its own profiles, so a company can add one without touching the app's files. Rules also cover
the in-app agent: they can lock the dashboard's MCP read and write switches off, remove tools, or
run the agent as an adapter that gets no raw rows. Masks don't restrict search or filters yet.

Since 1.12.1 policies need Vantage Enterprise, and take `warn` and `audit` modes to try a rule
before enforcing it. A community build keeps a policy-bound project's pages closed rather than show
the data without its rules. Every edition can say in a table or API file which writes it takes:
`deny: { actions: [delete] }` refuses those, and `allow: { actions: [insert] }` refuses everything
else, so an append-only ledger is one line.

## What's new

- A masked column shows the masked value everywhere, the run log included; `hide: true` removes
  the column.
- A widget that can't apply a rule doesn't mount; it shows the rule that stopped it.
- A denied action disappears from menus and is refused if called. Denied writes remove the add,
  delete, drag and save controls.
- A page's access chips list the policy entries applied, with file and rule.
- A column with `deny: { actions: [update] }` is read-only after insert. A refusal names the line
  that made it.
- A read-only field keeps its value selectable and has a Copy button, for numbers, dates, dropdowns
  and references too.
- A column read through a reference (`customer.name`) sorts on SurrealDB.
- Fix: a column read through a reference back to its own table (an employee's `manager.name`)
  closed the app as the project opened.
- Fix: switching from one assumed role straight to another said the session had ended.
