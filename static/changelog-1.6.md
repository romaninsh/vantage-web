# Vantage 1.6

The app runs on version 2.0 of the Vantage data framework, and a few script names changed with it:
`row.flash()` saves a row, faker `capabilities:` use the 2.0 names, and `expr:` builds queries
through `sql::`, `surreal::` or `mongo::`. The agent skills already use the new names.

## What's new

- Rhai row scripts call `row.flash()` to save; `row.save()` is gone.
- Faker `capabilities:` take the 2.0 names (`window`, `cursor`, `order`, `search`, `insert`, …);
  the old names stop the project from loading.
- `expr:` and `modify:` use `sql::`, `surreal::` and `mongo::` builder prefixes.
- A binder keeps its own fixed filters; every other filter on the table shows as a chip.
- Fix: a form opened by id, or a select label, stayed empty until the row loaded elsewhere.
- Fix: an activity feed whose `at:` column can't order a source was empty; it now shows the error.
