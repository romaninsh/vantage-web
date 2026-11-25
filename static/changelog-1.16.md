# Vantage 1.16

A column can now read a relation of its own table: `expr: 'table.ref("tags").order_by("name")
.join_concat("name", ", ")'` lists a project's tags, `.count()`, `.exists()` and `.first(col)`
work the same way, on SQLite, Postgres, MySQL and SurrealDB. A link table (tags on projects) gets
an id the database computes from the pair, so tags can be linked and unlinked without hand-written
SQL.

## What's new

- `expr:` columns work on SQLite, Postgres and MySQL tables, not only SurrealDB.
- `type: json` columns hold a list or a map, such as the ids `join_json(col)` returns.
- An `expr:` that reads `session` shows each signed-in user their own value (`is_favorite`).
- A rule script can narrow by a relation: `table.where_expr(|t| t.ref("tags").where("tag_id", 5).exists())`.
- A typo in a relation expression stops the table from loading, naming the table and column.
- `sql::concat([...])` and `sql::concat_ws(sep, [...])` join columns and text in an `expr:` on
  every SQL database, such as `sql::concat(["INV-", sql::ident("number")])`.
- Skills: agents can set up workers that run on a schedule (cron or a Cloud Run job) to do
  follow-up work after a save, such as notes, followers or emails.
- Ask the agent to run your access tests: it checks who can see and change which records on your
  current profile, and leaves the data as it was.
- The test badge in the title bar has an Access section: run your access tests against the current
  profile, and watch the count and failures there.
- Skills: agents write an access-test file for each table with rules in `tests/access/`, and go
  through the outcomes they captured with you before keeping them.
- Skills: the agent can give one table an access rule of its own when a column means something
  different there, while the datasource's rule keeps covering every other table.
- Fix: an action called from another action's body ignored its own access exceptions, so it saw
  only your rows; it now sees what it sees when you run it directly.
- Fix: an action that kept calling itself could hang the app; it now stops after 256 levels with
  "actions nest deeper than 256".
- Fix: a policy that denies the actions of a table now also refuses them when another action calls
  them. An entry whose action has no table of its own stays on the page. The refusal reads as the
  server's: ``action `submit_expense` is denied``, with the rule. A rule with `tables:` now matches
  only an action's own `table:`, so a form action without `table:`, or a page's own row or toolbar
  button, is no longer matched by it; name those with `names:` instead.
- A policy can lock session fields in a project without a session table: a rule on
  `tables: [session]` names the declared `session.fields`, and `session.set("uid", …)` is
  refused with the rule.
- `html::sanitize(text)` in a `normalise` hook cleans rich text before it's saved (scripts, event
  handlers and `javascript:` links go; the rest is kept as written), and `html::text(text)` turns
  HTML into plain text, which still needs escaping before it goes back into HTML. The default keeps
  `style`, `data-*` and `id`; pass your own allow-list for stricter fields.
