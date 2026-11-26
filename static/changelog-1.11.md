# Vantage 1.11

A script can now change several tables as one unit. Wrap the writes in `atomic { … }` and they
commit together at the end of the block, or none of them do. An action with `atomic: true` runs its
whole body that way. 1.11.1 extended `atomic` from SQL to MongoDB replica sets, SurrealDB 3+ and the
in-memory store.

## What's new

- `atomic { … } rollback (e) { … }`: a `throw`, a cancel or a block that runs past 30 seconds rolls
  it back, and the optional `rollback` arm gets 10 seconds to clean up.
- `atomic: true` is only for `kind: script` actions; on any other kind the project is refused.
- Calling `actions.x()` or nesting `atomic` inside a block throws.
- Pages and lists that show the tables an atomic run wrote reload once it commits.
- A database that can't hold a transaction (standalone MongoDB, SurrealDB before 3) writes directly
  inside a block, and the run log says so.
- When a block spans several databases and a later one fails, `rollback (e, committed)` names the
  tables that had already landed.
