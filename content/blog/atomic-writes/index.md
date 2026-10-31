+++
title = "Writes that land together"
description = "A client needed a plan and its first block to be created together or not at all, on whatever database the app runs on. Vantage 1.11 adds atomic blocks to Rhai and a Transaction to the framework. Here is how they work, and what I decided to leave out."
date = 2026-10-31

[taxonomies]
categories = ["Releases"]

[extra]
unlisted = true
+++

A client of ours builds plans. A plan is useless without its first block, so the app creates both in one action: insert the plan, insert the block. If the second insert fails, the client is left with an empty plan that the rest of their app doesn't expect to exist.

Until now, Vantage favoured idempotence over transactions. Writes were designed to be safe to run again: an insert with an id you chose lands on the same row, a patch to a fixed value is the same patch twice. Only `import` was all-or-nothing. That works for a retry, but not for a person staring at half a plan.

So the request was simple: these writes land together, and on every database Vantage supports, not only on Postgres. That's coming in Vantage 1.11.

## What it looks like

In a Rhai action body, you put the writes in an `atomic` block:

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

The block commits when it reaches its end (or on `return` or `exit`). A `throw`, `fail(...)`, a failed write, a cancel or the 30-second limit rolls it back. The `rollback` arm is optional. It runs after the rollback, outside any transaction, and it can't swallow the error: the caller still gets it.

When the whole body of an action should be one block, there's a flag for that in the YAML:

```yaml
kind: script
# atomic: the stock move and its ledger entry must agree.
atomic: true
body: |
  table("stock").patch(args.from, #{ qty: args.from_qty - args.qty });
  table("stock").patch(args.to, #{ qty: args.to_qty + args.qty });
  table("stock_move").record().set(#{ from: args.from, to: args.to, qty: args.qty }).flash();
```

vantage-server runs the same blocks. A REST or WebSocket `batch` is still not atomic, so for writes that must land together over an API, you call an action with a block in it.

## The decisions

### A block, because Rhai has no `finally`

Rhai has `try` and `catch`, but no `finally`. Without it, a script that begins a transaction can't promise to end it: an early `return` or an uncaught error leaves it open. So the transaction is a block with its own scope. Leaving the block is the only way out, and every way out either commits or rolls back. The `rollback` arm is where you'd put your cleanup or your log line.

`break` and `continue` that leave the block roll it back and throw `break and continue can't leave an atomic block`.

### Wrap at the boundary

In Rust the type is called `Transaction`, and it wraps any Vista:

```rust
let tx = Transaction::new();
let accounts = tx.wrap(&accounts);
accounts.patch_value("bob", &balance(130)).await?;
accounts.patch_value("alice", &balance(70)).await?;
tx.commit().await?;
```

The other way to build this is ambient state: a task-local "current transaction" that every driver checks before it writes. I didn't want that. With a wrapper, a write either goes through a wrapped Vista or it doesn't, and you can see which by reading the code. The wrapped Vista keeps its conditions, sort, hooks and references. A Vista it hands back from `get_ref` is wrapped too, so a child row inserted through a relation joins the same transaction.

Wrapping costs nothing. Each datasource begins its transaction at its first statement, so a host can wrap every table it knows and pay only for the ones a script touches.

### Handles made before the block still join

People write `let plans = table("plan");` at the top of a body and use it everywhere. If only handles created inside the block joined, that habit would quietly write outside the transaction. So a run's table handles don't hold a Vista directly; they resolve through a cell, and the block points that cell at the transaction while it runs. Every handle in the run, old or new, goes through it.

### No isolation setting

Each database runs at its own default: read committed on Postgres, repeatable read on MySQL, serializable on SQLite, MongoDB's default read concern. I kept those rather than add a knob. For the read-then-write race, the Rust API has `lock()`, which reads `FOR UPDATE` on Postgres and MySQL.

### No two-phase commit

One block can write to several databases. Two-phase commit would close the gap between their commits, but it needs a decision log: a durable record of "prepared, about to commit" that a recovering process reads. That log has to live in a database, and Vantage never creates its own tables in a client's database.

So databases commit one after another, in the order they joined. If a later one fails after an earlier one committed, the earlier one stays committed, and the arm's second name tells you which tables landed:

```rhai
atomic {
    // ...
} rollback (e, committed) {
    log(`failed: ${e}; already committed: ${committed}`);
}
```

The failure window is reported instead of hidden. In Rust the same list comes from `Transaction::committed_before_failure`.

### A caught error still fails the commit

Postgres turns a `COMMIT` after a failed statement into a rollback, without complaining. MySQL, SQLite and SurrealDB undo the failed statement and commit the rest. A script that caught an error and moved on would then commit half of what it meant to, and how much would depend on the database. Now a commit after any failed statement inside the transaction errors on every database, with `a statement failed inside the transaction; rolled back`. If you want to try a write that may fail and carry on regardless, do it outside the block.

### One test suite for every driver

Every driver runs the same contract, `contract::check_transactions`, and the same fixture again through Rhai with `contract::check_atomic_rhai`. It probes commit, rollback, drop, lazy begin, isolation from outside readers, a failed statement, use after finish, two crossed writers, `lock()` and two datasources at once. A new driver gets transactions by passing it, instead of growing its own copy of the tests.

### A reason behind every block

In Vantage UI, an AI agent writes most of the action bodies, so the rules for when to use a block go where the agent reads them. The vantage-rhai skill asks for a reason behind every block: a comment naming the writes that must land together and what a half-done run would leave behind, as in the examples above. It also lists where not to use one: a single write, reads only, steps safe to run again, slow work. Nothing in the YAML enforces this. A block without a reason is a review finding.

## What each database does

- **Postgres, MySQL**: one connection from the pool, `BEGIN`. The server reports deadlocks, and the write fails.
- **SQLite**: one connection, `BEGIN IMMEDIATE`. Writers queue on the file lock instead of deadlocking.
- **MongoDB**: a session transaction, on a replica set or sharded cluster. A single-node replica set is fine.
- **SurrealDB 3 and later**: an interactive transaction on a connection of its own. SurrealDB is optimistic, so the second of two conflicting commits fails.
- **Memory**: the driver builds its own. A transaction claims the store, works on copies of the tables it touches, and replays its changes at commit. A second transaction on the same store waits up to 2 seconds, then fails as busy.
- **MongoDB standalone, SurrealDB before 3**: no transactions, so writes land directly and stay after a rollback. The run log says so, once per table.
- **CSV, REST, GraphQL, Kubernetes, AWS, cmd**: read-only in the app, so a block only reads them.

## Limits

- 30 seconds per block and 10 seconds for the arm. Neither can be changed. A database lock wait or a secrets prompt isn't cut off by the limit, so keep blocks short.
- Nothing retries. A write conflict on MongoDB or SurrealDB fails the block; re-run it.
- `actions.x()` and a nested `atomic` are refused inside a block. Call actions before or after it, or from the arm.
- Rhai has no `lock()`. A block doesn't hold the rows it reads, so a read-then-write can still lose a concurrent update on Postgres or MySQL. Put that rule in the database, as a `CHECK` or a trigger.
- Across several databases, each commit is atomic on its own database, not across them.
- DynamoDB and redb don't take part, and neither do Dio-only tables or relations stored inside a parent row.
- Writes in a block don't show in open grids as they happen. The app reloads the written tables after the commit.

Idempotence still matters. A direct write that landed before a rollback is still there when you retry, so the retry has to be safe to run twice.

Atomic blocks ship in Vantage 1.11, with vantage-vista 2.6.0 and vantage-server 1.11. The book's new transactions chapter covers the Rust side, including what a driver implements to take part.
