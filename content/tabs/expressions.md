+++
title = "Expressions"
weight = 1
+++

## Execute Raw queries while retaining type safety

Similar to `SQLx`, Vantage offers a powerful expression and query engine. Unlike other frameworks,
the number of vendors is not limited to the trio of MySQL, SQLite and PostgreSQL - you can query any
vendor that is **integrated** with Vantage.

### Raw SQL with Type Safety

Execute raw SQL queries while maintaining compile-time type checking:

```rust
use vantage::{Database, Value, Row};

async fn get_active_users(db: &Database) -> Result<Vec<User>, VantageError> {
    let result = db.execute(
        "SELECT id, name, email, created_at FROM users WHERE active = ? AND age > ?",
        &[Value::Bool(true), Value::Int(18)]
    ).await?;

    let mut users = Vec::new();
    for row in result {
        let user = User {
            id: row.get::<i64>("id")?,
            name: row.get::<String>("name")?,
            email: row.get::<String>("email")?,
            created_at: row.get::<DateTime<Utc>>("created_at")?,
        };
        users.push(user);
    }

    Ok(users)
}
```

### Cross-Database Compatibility

The same expression works across different database vendors:

```rust
// Works with PostgreSQL
let pg_result = pg_db.execute(
    "SELECT * FROM orders WHERE status = ?",
    &[Value::String("pending".to_string())]
).await?;

// Works with MySQL
let mysql_result = mysql_db.execute(
    "SELECT * FROM orders WHERE status = ?",
    &[Value::String("pending".to_string())]
).await?;

// Works with SQLite
let sqlite_result = sqlite_db.execute(
    "SELECT * FROM orders WHERE status = ?",
    &[Value::String("pending".to_string())]
).await?;
```

### Dynamic Query Building

Build queries dynamically while maintaining type safety:

```rust
let mut query = String::from("SELECT * FROM products WHERE 1=1");
let mut params = Vec::new();

if let Some(category) = filter.category {
    query.push_str(" AND category = ?");
    params.push(Value::String(category));
}

if let Some(min_price) = filter.min_price {
    query.push_str(" AND price >= ?");
    params.push(Value::Decimal(min_price));
}

let products = db.execute(&query, &params).await?;
```

### Advanced Features

- **Prepared statements** for performance
- **Transaction support** with rollback
- **Streaming results** for large datasets
- **Custom type mapping** for domain objects
- **SQL injection protection** built-in
