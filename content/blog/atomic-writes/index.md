+++
title = "Atomic writes in Vantage 1.11"
description = "Vantage 1.11 adds atomic blocks to Rhai and a Transaction type to Rust. Writes in a block commit together or not at all, on Postgres, MySQL, SQLite, MongoDB, SurrealDB and the in-memory store."
date = 2026-10-31

[taxonomies]
categories = ["Releases"]

[extra]
unlisted = true
+++

An action that inserts a plan and then its first block leaves an empty plan behind if the second insert fails. Before 1.11 only `import` was all-or-nothing. 1.11 adds atomic writes on every supported database.

## Atomic blocks in Rhai

Put the writes in an `atomic` block:

```rhai
// atomic: a plan without its first block breaks the planner screen,
// so both inserts land or neither does.
let id = atomic {
    let id = table("plan").record().set(#{ name: args.name, owner: args.owner }).flash();
    table("block").record().set(#{ plan: id, position: 0, title: "Start" }).flash();
    id
} rollback (e) {
    log(`plan ${args.name} rolled back: ${e}`);
};
```

The block commits at its end, or on `return` or `exit`. A `throw`, `fail(...)`, failed write, cancel or the 30-second limit rolls it back. The optional `rollback` arm runs after the rollback, outside the transaction. The error still reaches the caller.

To make a whole action atomic, set `atomic: true`:

```yaml
kind: script
# atomic: the stock move and its ledger entry must agree.
atomic: true
body: |
  table("stock").patch(args.from, #{ qty: args.from_qty - args.qty });
  table("stock").patch(args.to, #{ qty: args.to_qty + args.qty });
  table("stock_move").record().set(#{ from: args.from, to: args.to, qty: args.qty }).flash();
```

vantage-server runs the same blocks. A REST or WebSocket `batch` is not atomic; call an action instead.

## Design

### A block

Rhai has no `finally`, so a script that opened a transaction could leave it open on an early `return` or an uncaught error. A block always commits or rolls back. `break` or `continue` out of it rolls back and throws `break and continue can't leave an atomic block`.

### A wrapper, not ambient state

In Rust, a `Transaction` wraps Vistas:

```rust
let tx = Transaction::new();
let accounts = tx.wrap(&accounts);
accounts.patch_value("bob", &balance(130)).await?;
accounts.patch_value("alice", &balance(70)).await?;
tx.commit().await?;
```

Unlike a task-local "current transaction" that every driver checks, a wrapper shows in the code which writes are in the transaction. A wrapped Vista keeps its conditions, sort, hooks and references, and `get_ref` returns a wrapped Vista. Each datasource begins its transaction at its first statement, so wrapping an unused table costs nothing.

### Handles made before the block

A run's table handles resolve through a cell, which the block points at the transaction. A handle created before the block, such as `let plans = table("plan");`, still joins.

### No isolation setting

Each database keeps its default: read committed on Postgres, repeatable read on MySQL, serializable on SQLite, default read concern on MongoDB. For read-then-write, Rust's `lock()` reads `FOR UPDATE` on Postgres and MySQL.

### No two-phase commit

Two-phase commit needs a durable decision log: a table in the client's database. Vantage never creates one. Databases commit in the order they joined. If one fails, the earlier ones stay committed; `committed`, the rollback arm's second binding, lists their tables:

```rhai
atomic {
    // ...
} rollback (e, committed) {
    log(`failed: ${e}; already committed: ${committed}`);
}
```

In Rust, use `Transaction::committed_before_failure`.

### A caught error fails the commit

After a failed statement, Postgres turns `COMMIT` into a rollback; MySQL, SQLite and SurrealDB commit the rest. Vantage fails the commit on every database with `a statement failed inside the transaction; rolled back`. Move writes that may fail out of the block.

### One test suite for every driver

Every driver passes `contract::check_transactions` and its Rhai counterpart, `contract::check_atomic_rhai`. They cover commit, rollback, drop, lazy begin, isolation from outside readers, a failed statement, use after finish, crossed writers, `lock()` and two datasources at once.

### Every block needs a reason

An AI agent writes most action bodies in Vantage UI. The vantage-rhai skill tells it to comment each block with the writes that must land together, and not to use a block for a single write, read-only work, steps safe to repeat, or slow work. Nothing enforces this.

## What each database does

- **Postgres, MySQL**: a pooled connection, `BEGIN`.
- **SQLite**: one connection, `BEGIN IMMEDIATE`. Writers queue on the file lock.
- **MongoDB**: a session transaction on a replica set (a single node works) or sharded cluster.
- **SurrealDB 3+**: an interactive transaction on its own connection. Of two conflicting commits, the second fails.
- **Memory**: one transaction per store at a time, on copies of the tables it touches, replayed at commit. Another waits up to 2 seconds, then fails as busy.
- **MongoDB standalone, SurrealDB before 3**: no transactions; writes survive a rollback, so a retried action must be safe to run twice. The run log warns once per table.
- **CSV, REST, GraphQL, Kubernetes, AWS, cmd**: read-only in the app.

## Limits

- 30 seconds per block, 10 for the arm, not configurable. The limit doesn't interrupt database lock waits or secrets prompts.
- No retries: a deadlock or write conflict fails the block.
- `actions.x()` and nested `atomic` are refused inside a block; call actions before, after, or from the arm.
- Rhai has no `lock()`, so a read-then-write can lose a concurrent update on Postgres or MySQL. Guard invariants with a `CHECK` or trigger.
- DynamoDB, redb, Dio-only tables and relations stored inside a parent row don't take part.
- Open grids show the block's writes only after commit.

Versions: Vantage 1.11, vantage-vista 2.6.0, vantage-server 1.11. The Rust API, including what a driver implements, is in the book's transactions chapter.
