+++
title = "Table<Entity>"
weight = 3
+++

## Table<Entity> Pattern

Work with strongly-typed table representations that provide CRUD operations and relationship
management. The Table<Entity> pattern offers a clean abstraction over database tables while
maintaining type safety and performance.

### Basic Table Operations

Interact with tables using a strongly-typed interface:

```rust
use vantage::{Table, Database};

async fn user_operations(db: &Database) -> Result<(), VantageError> {
    let users_table = Table::<User>::new(&db);

    // Find by primary key
    let user = users_table.find(1).await?;
    println!("Found user: {}", user.name);

    // Insert new record
    let new_user = User {
        id: 0, // Will be auto-generated
        name: "John Doe".to_string(),
        email: "john@example.com".to_string(),
        active: true,
        created_at: Utc::now(),
    };
    let created_user = users_table.insert(&new_user).await?;

    // Update existing record
    let mut user_to_update = users_table.find(created_user.id).await?;
    user_to_update.name = "Jane Doe".to_string();
    users_table.update(&user_to_update).await?;

    // Delete record
    users_table.delete(created_user.id).await?;

    Ok(())
}
```

### Batch Operations

Perform bulk operations efficiently:

```rust
async fn batch_operations(db: &Database) -> Result<(), VantageError> {
    let users_table = Table::<User>::new(&db);

    // Bulk insert
    let new_users = vec![
        User::new("Alice", "alice@example.com"),
        User::new("Bob", "bob@example.com"),
        User::new("Charlie", "charlie@example.com"),
    ];
    let inserted_users = users_table.insert_batch(&new_users).await?;

    // Bulk update
    let user_ids: Vec<i64> = inserted_users.iter().map(|u| u.id).collect();
    users_table.update_batch()
        .set("active", true)
        .where_in("id", &user_ids)
        .execute()
        .await?;

    // Bulk delete
    users_table.delete_batch()
        .where_field("active").equals(false)
        .where_field("created_at").less_than(Utc::now() - Duration::days(365))
        .execute()
        .await?;

    Ok(())
}
```

### Relationships and Foreign Keys

Handle table relationships with type safety:

```rust
// Define relationships
#[derive(Table)]
#[table(name = "orders")]
struct Order {
    id: i64,
    customer_id: i64,
    total_amount: Decimal,
    status: OrderStatus,
    created_at: DateTime<Utc>,
}

impl Order {
    // Define relationship to Customer
    async fn customer(&self, db: &Database) -> Result<Customer, VantageError> {
        Table::<Customer>::new(db).find(self.customer_id).await
    }

    // Define relationship to OrderItems
    async fn items(&self, db: &Database) -> Result<Vec<OrderItem>, VantageError> {
        Table::<OrderItem>::new(db)
            .where_field("order_id").equals(self.id)
            .fetch_all()
            .await
    }
}

// Use relationships
async fn order_with_details(db: &Database, order_id: i64) -> Result<(), VantageError> {
    let orders_table = Table::<Order>::new(&db);
    let order = orders_table.find(order_id).await?;

    let customer = order.customer(&db).await?;
    let items = order.items(&db).await?;

    println!("Order {} for customer {}", order.id, customer.name);
    for item in items {
        println!("  - {} x {} = {}", item.quantity, item.product_name, item.total_price);
    }

    Ok(())
}
```

### Advanced Queries

Combine Table operations with complex queries:

```rust
async fn advanced_table_queries(db: &Database) -> Result<(), VantageError> {
    let users_table = Table::<User>::new(&db);

    // Find with conditions
    let active_users = users_table
        .where_field("active").equals(true)
        .where_field("last_login").greater_than(Utc::now() - Duration::days(30))
        .order_by("name")
        .limit(50)
        .fetch_all()
        .await?;

    // Count records
    let total_users = users_table.count().await?;
    let active_count = users_table
        .where_field("active").equals(true)
        .count()
        .await?;

    // Check existence
    let user_exists = users_table
        .where_field("email").equals("john@example.com")
        .exists()
        .await?;

    // First or create pattern
    let user = users_table
        .where_field("email").equals("new@example.com")
        .first_or_create(|| User::new("New User", "new@example.com"))
        .await?;

    Ok(())
}
```

### Transactions

Work with transactions across multiple tables:

```rust
async fn transfer_funds(
    db: &Database,
    from_account_id: i64,
    to_account_id: i64,
    amount: Decimal,
) -> Result<(), VantageError> {
    let accounts_table = Table::<Account>::new(&db);
    let transactions_table = Table::<Transaction>::new(&db);

    db.transaction(|tx| async move {
        // Debit from source account
        let mut from_account = accounts_table.find(from_account_id).await?;
        if from_account.balance < amount {
            return Err(VantageError::InsufficientFunds);
        }
        from_account.balance -= amount;
        accounts_table.update(&from_account).await?;

        // Credit to destination account
        let mut to_account = accounts_table.find(to_account_id).await?;
        to_account.balance += amount;
        accounts_table.update(&to_account).await?;

        // Record the transaction
        let transaction = Transaction {
            from_account_id,
            to_account_id,
            amount,
            transaction_type: TransactionType::Transfer,
            created_at: Utc::now(),
        };
        transactions_table.insert(&transaction).await?;

        Ok(())
    }).await
}
```

### Schema Migrations

Handle schema changes with Table operations:

```rust
// Define table schema
impl Table<User> {
    async fn create_table(db: &Database) -> Result<(), VantageError> {
        db.execute(r#"
            CREATE TABLE IF NOT EXISTS users (
                id BIGINT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        "#, &[]).await?;

        Ok(())
    }

    async fn add_column(db: &Database) -> Result<(), VantageError> {
        db.execute(
            "ALTER TABLE users ADD COLUMN last_login TIMESTAMP NULL",
            &[]
        ).await?;

        Ok(())
    }
}
```

### Advanced Features

- **Automatic timestamps** for created_at and updated_at
- **Soft deletes** with deleted_at columns
- **Optimistic locking** with version fields
- **Custom field serialization** for complex types
- **Index management** and query optimization
- **Connection pooling** for high performance
- **Database-specific optimizations** (PostgreSQL arrays, MySQL JSON, etc.)
