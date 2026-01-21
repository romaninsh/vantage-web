+++
title = "QueryBuilder"
weight = 2
+++

## Use Builder pattern to construct compliant queries

Most database dialects will have support for `SELECT` operation. To create database-agnostic code
you can use a `Select` builder, which is included by your database vendor crate. Suppose we wanted
to query from **SurrealDB** but we are not familiar with SurrealQL:

```rust
let mut select = SurrealSelect::new();

// Use Selectable trait methods
select.set_source(expr!("users"), None);
select.add_field("department".to_string());
select.add_expression(expr!("count()"), Some("total".to_string()));
select.add_where_condition(expr!("age > {}", 18));
select.add_order_by("total", false);
select.add_group_by(expr!("department"));
select.add_where_condition(expr!("count() > {}", 5));
select.set_limit(Some(10), Some(5));
select.set_distinct(true);
```

### Expressive structures

`Select` struct implements `Expressive` trait, making it valid part of any other expression. You can
execute `select` with `db.execute()`. Database vendor crates will have wide range of other types
that are also expressive.

[Further information on Query Building pattern](../patterns/query-builder).
