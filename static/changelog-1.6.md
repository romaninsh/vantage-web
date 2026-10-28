# Vantage 1.6

The app now runs on version 2.0 of the Vantage data framework, and project scripts follow its
vocabulary. A Rhai script saves a row with `row.flash()` in place of `row.save()`, faker datasources
list their `capabilities:` under the 2.0 names, and `expr:` columns build queries through `sql::`,
`surreal::` or `mongo::`. The bundled agent skills already use the new names, so an agent editing a
project writes them for you. A form or a select label opened on a row the table hasn't loaded yet
fetches it instead of showing an empty record.

## What's new

- Rhai row scripts call `row.flash()` to save; `row.save()` is gone.
- Faker `capabilities:` take the 2.0 names (`window`, `cursor`, `order`, `search`, `insert`, …);
  the old names stop the project from loading.
- `expr:` and `modify:` use `sql::`, `surreal::` and `mongo::` builder prefixes.
- A binder keeps its own fixed filters; every other filter on the table shows as a chip.
- Fix: a form opened by id, or a select label, stayed empty until the row loaded elsewhere.
- Fix: an activity feed whose `at:` column can't order a source was empty; it now shows the error.
