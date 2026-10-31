+++
title = "Atomic writes in Vantage"
description = "Vantage 1.11 adds atomic blocks to Rhai and a Transaction type to Rust. Writes in a block commit together or not at all, on Postgres, MySQL, SQLite, MongoDB, SurrealDB and the in-memory store."
date = 2026-10-31

[taxonomies]
categories = ["Releases"]

[extra]
unlisted = true
+++

Vantage was originally released with a focus on idempotency and no support for transactions. We focused on decentralised and eventually consistent databases, but transactions were always #2 on the plan.

Transactions in Vantage are not trivial. Different databases have different quirks when it comes to ACID compliance, especially once you pull in NoSQL vendors. Vantage often uses multiple backends, so we need to account for that too. I believe the solution we came up with is both elegant and powerful.

## Introducing `atomic {}` blocks in Rhai

Rather than expecting explicit transactions, `atomic {}` creates a fenced block, which represents a single atomic operation:

```rhai
atomic {
    table("account")
        .where("id", session.user_id)
        .ref("transactions")
        .insert(#{
            amount: -args.amount,
            counterparty: args.to,
        });
    table("account")
        .where("id", args.to)
        .ref("transactions")
        .insert(#{
            amount: args.amount,
            counterparty: session.user_id,
        });
}
```

Operations fenced inside `atomic {}` are executed together, or rolled back if any of them throws or the block hits its timeout. The design has some important considerations in its implementation:

1. `atomic {}` supports multiple databases, SQL and NoSQL, and handles each correctly.
2. Any database driver can signal support for transactions, even your custom REST implementation.
3. If you work with multiple databases, this is handled automatically. Databases start transactions lazily and commit them at the end of the block.
4. You can follow up with `rollback {}` for situations where the implicit rollback isn't sufficient.
5. Transactions are non-blocking on our multi-threaded client: other database operations go as planned.

To make a whole {{<glossary.term id="action" />}} atomic, set `atomic: true`:

```yaml
kind: script
# atomic: the stock move and its ledger entry must agree.
atomic: true
body: |
  table("stock").patch(args.from, #{
      qty: args.from_qty - args.qty,
  });
  table("stock").patch(args.to, #{
      qty: args.to_qty + args.qty,
  });
  table("stock_move").record().set(#{
      from: args.from,
      to: args.to,
      qty: args.qty,
  }).flash();
```

Making an action atomic applies to every way it runs: UI actions, and the WebSocket, REST and MCP APIs that expose it.

## In-depth implementation analysis

Our elegant Rhai block starts in the open-source Vantage framework. We have introduced a {{<glossary.term id="transaction" code={true} />}} wrapper for all {{<glossary.term id="vista_rust" />}} types:

```rust
let tx = Transaction::new();
let accounts = tx.wrap(&accounts);
accounts.patch_value("bob", &balance(130)).await?;
accounts.patch_value("alice", &balance(70)).await?;
tx.commit().await?;
```

Dropping a `Transaction` without committing rolls it back. A Vista returned by [`get_ref()`](https://docs.rs/vantage-vista/latest/vantage_vista/struct.Vista.html#method.get_ref) is wrapped too.

### Implementing fenced `atomic {}` block

Rust has no identical mechanism. When Rhai execution enters a fenced block, all the Vistas are wrapped, and since the wrapper implements Vista itself, this works transparently. Any new Vistas received from the {{<glossary.term id="vista_factory" />}} within the block are wrapped too.

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
- `actions.x()` and nested `atomic {}` are refused inside a block; call actions before, after, or from the arm.
- Rhai has no `lock()`, so a read-then-write can lose a concurrent update on Postgres or MySQL. Guard invariants with a `CHECK` or trigger.
- DynamoDB, redb, Dio-only tables and relations stored inside a parent row don't take part.
- Open grids show the block's writes only after commit.

Versions: Vantage 1.11, vantage-vista 2.6.0, vantage-server 1.11. The Rust API, including what a driver implements, is in the book's transactions chapter.
