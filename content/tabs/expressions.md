+++
title = "Expressions"
weight = 1
+++

## Execute Raw queries while retaining type safety

Similar to `SQLx`, Expressions enable developer to execute any raw queries using supported database
type. Vantage Expressions have some unique qualities:

- Expressions are **composable**, meaning your expression can consist of other expressions.
- Expression parameters will use **strong type conversion** to prevent accidental type-casting from
  the native type of your language into a type-system of your database engine.
- Expression parameters can be **deferred**. You may use async closure as argument to your
  expression.

Sub-expressions therefore can cross databases boundaries, fetching data from one database (or API),
type-casting then using result as a parameter in another query.

### Basic Example

Expressions are very simple to use with `expr!` macro and `execute()` method.

```rust
let where_expr = expr!("age > {} AND status = {}", 21, "active");
let query_expr = expr!("SELECT * FROM users WHERE {}", where_expr);

let result: serde_json::Value = db.execute(&query_expr).await?;
```

[Further information on Expressions and Advanced Examples](../patterns/expressions).
