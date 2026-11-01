# Vantage 1.11

A script can now change several tables as one unit. Wrap the writes in `atomic { … }` and they
commit together at the end of the block, or none of them do. An action with `atomic: true` runs its
whole body that way.

## What's new

- `atomic { … } rollback (e) { … }` in a script: every table used inside the block reads and writes
  through one transaction per database. A `throw`, a cancel or a block that runs past 30 seconds
  rolls it back, and the optional `rollback` arm gets 10 seconds to clean up.
- `atomic: true` on a `kind: script` action runs the body as one block. On any other kind of
  action the project is refused with `atomic: is only for kind: script actions`.
- Inside a block, `actions.x()` and a nested `atomic` throw (`actions can't be called inside atomic`,
  `atomic can't be nested`).
- Pages and lists that show the tables an atomic run wrote reload once it commits.

## 1.11.2

The bundled skills explain `atomic`. The vantage-rhai skill covers the block, the rollback arm,
the time limits and what is refused inside a block, and asks for a reason behind every use. Each
database skill says whether its tables take part.

## 1.11.1

`atomic` now covers MongoDB (replica sets), SurrealDB 3+ and the in-memory store, as well as SQL.
A database that can't hold a transaction (MongoDB on a standalone server, SurrealDB before 3)
writes directly inside a block, and the run log says so. When a block spans several databases and
a later one fails, `rollback (e, committed)` names the tables that had already landed, and their
pages reload.
