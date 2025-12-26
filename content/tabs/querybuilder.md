+++
title = "QueryBuilder"
weight = 2
+++

## Fluent Query Building

Build complex queries programmatically with a fluent interface that maintains type safety and
database portability. The QueryBuilder pattern provides an intuitive API for constructing SQL
queries without writing raw SQL.

### Basic Query Building

Create queries with a clean, readable API:

```rust
use vantage::{QueryBuilder, Database};

async fn find_users(db: &Database) -> Result<Vec<User>, VantageError> {
    let users = User::query()
        .where_field("active").equals(true)
        .where_field("age").greater_than(18)
        .order_by("name")
        .limit(10)
        .fetch_all(&db)
        .await?;

    Ok(users)
}
```

### Complex Filtering

Build sophisticated WHERE clauses with logical operators:

```rust
let products = Product::query()
    .where_field("category").equals("electronics")
    .and(|q| q
        .where_field("price").between(100, 500)
        .or_where_field("discount").greater_than(0.2)
    )
    .where_field("in_stock").equals(true)
    .order_by("price")
    .fetch_all(&db)
    .await?;
```

### Joins and Relations

Handle complex relationships with type-safe joins:

```rust
let orders_with_customers = Order::query()
    .join("customers", "orders.customer_id", "customers.id")
    .join("order_items", "orders.id", "order_items.order_id")
    .where_field("orders.status").equals("completed")
    .where_field("customers.country").equals("US")
    .select([
        "orders.*",
        "customers.name as customer_name",
        "SUM(order_items.quantity * order_items.price) as total"
    ])
    .group_by("orders.id")
    .having("total").greater_than(100)
    .fetch_all(&db)
    .await?;
```

### Subqueries and CTEs

Build nested queries and Common Table Expressions:

```rust
// Subquery example
let expensive_products = Product::query()
    .where_field("price").greater_than(
        Product::query()
            .select("AVG(price)")
            .where_field("category").equals("luxury")
            .as_subquery()
    )
    .fetch_all(&db)
    .await?;

// CTE example
let query = QueryBuilder::with("recent_orders")
    .as_query(
        Order::query()
            .where_field("created_at").greater_than(Utc::now() - Duration::days(30))
    )
    .select_from("recent_orders")
    .join("customers", "recent_orders.customer_id", "customers.id")
    .fetch_all(&db)
    .await?;
```

### Aggregations and Grouping

Perform complex aggregations with type safety:

```rust
let sales_summary = Order::query()
    .select([
        "DATE(created_at) as date",
        "COUNT(*) as order_count",
        "SUM(total_amount) as daily_total",
        "AVG(total_amount) as average_order"
    ])
    .where_field("status").equals("completed")
    .where_field("created_at").greater_than(
        Utc::now() - Duration::days(90)
    )
    .group_by("DATE(created_at)")
    .order_by("date DESC")
    .fetch_all(&db)
    .await?;
```

### Dynamic Query Construction

Build queries conditionally based on runtime parameters:

```rust
fn build_user_search(filters: &UserFilters) -> QueryBuilder<User> {
    let mut query = User::query();

    if let Some(name) = &filters.name {
        query = query.where_field("name").like(format!("%{}%", name));
    }

    if let Some(department) = &filters.department {
        query = query.where_field("department").equals(department);
    }

    if filters.active_only {
        query = query.where_field("active").equals(true);
    }

    if let Some(created_after) = filters.created_after {
        query = query.where_field("created_at").greater_than(created_after);
    }

    query
        .order_by("name")
        .limit(filters.limit.unwrap_or(50))
}
```

### Advanced Features

- **Type-safe field references** prevent typos
- **Automatic SQL generation** for different databases
- **Query optimization** hints and analysis
- **Batch operations** for bulk inserts/updates
- **Connection pooling** integration
- **Query caching** for performance
