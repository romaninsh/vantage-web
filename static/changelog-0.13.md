# Vantage 0.13

Relationships can be scripted. A related list used to be a plain foreign-key match; give the
relation a `rhai:` script and it builds its own set when you drill in — filtered by status, sorted
newest-first, limited, or matched on a computed condition that plain YAML couldn't express. The
parent record is available to the script, so the related list can depend on the row you opened it
from. Relations without a script work exactly as before.

## What's new

- A `surreal: { modify: | … | }` script on a table runs as a final step once the table is built, for
  a condition the column and relation YAML can't say on their own — "only paying clients", "balance
  below zero". It narrows the table without making it read-only.
- The bundled SurrealDB and UI-builder skills teach both, so asking the assistant to "show a
  client's open orders, newest first" produces the right YAML.

## 0.13.1

- A table whose rows come from running a command or script shows the list right away and fills in
  the slower per-row details as they scroll into view. Switch a filter or sort and the details it
  already fetched stay put.

## 0.13.2

- A menu item or button can use any icon from the built-in set; before, only a handful of names
  worked and anything else quietly showed nothing. Your YAML editor lists the full set as you type.
