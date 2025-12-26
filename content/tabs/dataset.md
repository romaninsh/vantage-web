+++
title = "DataSet and Active Record"
weight = 4
+++

## DataSet and Active Record

Active Record pattern implementation with dataset operations for bulk processing and transactions.
DataSet provides a powerful abstraction for working with collections of records and performing
complex operations across multiple rows efficiently.

### Basic DataSet Operations

Create and manipulate datasets with a fluent API:

```rust
use vantage::{DataSet, Database, Value};

async fn dataset_basics(db: &Database) -> Result<(), VantageError> {
    // Create a dataset from a table
    let users_dataset = DataSet::from_table("users", &db);

    // Filter the dataset
    let active_users = users_dataset
        .where_field("active", Value::Bool(true))
        .where_field("created_at", Value::GreaterThan(
            Utc::now() - Duration::days(30)
        ));

    // Get count of filtered records
    let count = active_users.count().await?;
    println!("Found {} active users", count);

    // Iterate over results
    for record in active_users.iter().await? {
        let name: String = record.get("name")?;
        let email: String = record.get("email")?;
        println!("User: {} <{}>", name, email);
    }

    Ok(())
}
```

### Bulk Operations

Perform efficient bulk operations on large datasets:

```rust
async fn bulk_operations(db: &Database) -> Result<(), VantageError> {
    let users_dataset = DataSet::from_table("users", &db);

    // Bulk insert from another dataset or collection
    let new_users = vec![
        UserRecord::new("Alice", "alice@example.com"),
        UserRecord::new("Bob", "bob@example.com"),
        UserRecord::new("Charlie", "charlie@example.com"),
    ];

    let inserted_count = users_dataset
        .bulk_insert(&new_users)
        .on_conflict("email")
        .do_nothing()
        .execute()
        .await?;

    println!("Inserted {} new users", inserted_count);

    // Bulk update with conditions
    let updated_count = users_dataset
        .bulk_update()
        .set("status", Value::String("verified".to_string()))
        .set("updated_at", Value::Timestamp(Utc::now()))
        .where_field("email_verified", Value::Bool(true))
        .where_field("status", Value::String("pending".to_string()))
        .execute()
        .await?;

    println!("Updated {} users to verified status", updated_count);

    Ok(())
}
```

### Active Record Pattern

Implement the Active Record pattern for individual records:

```rust
#[derive(ActiveRecord)]
#[table(name = "users")]
pub struct User {
    pub id: Option<i64>,
    pub name: String,
    pub email: String,
    pub active: bool,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

impl User {
    pub fn new(name: &str, email: &str) -> Self {
        Self {
            id: None,
            name: name.to_string(),
            email: email.to_string(),
            active: true,
            created_at: None,
            updated_at: None,
        }
    }

    // Active Record methods are auto-generated
    pub async fn save(&mut self, db: &Database) -> Result<(), VantageError> {
        if self.id.is_none() {
            // Insert new record
            let result = db.execute(
                "INSERT INTO users (name, email, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
                &[
                    Value::String(self.name.clone()),
                    Value::String(self.email.clone()),
                    Value::Bool(self.active),
                    Value::Timestamp(Utc::now()),
                    Value::Timestamp(Utc::now()),
                ]
            ).await?;
            self.id = Some(result.last_insert_id()?);
            self.created_at = Some(Utc::now());
        } else {
            // Update existing record
            self.updated_at = Some(Utc::now());
            db.execute(
                "UPDATE users SET name = ?, email = ?, active = ?, updated_at = ? WHERE id = ?",
                &[
                    Value::String(self.name.clone()),
                    Value::String(self.email.clone()),
                    Value::Bool(self.active),
                    Value::Timestamp(self.updated_at.unwrap()),
                    Value::Int(self.id.unwrap()),
                ]
            ).await?;
        }
        Ok(())
    }

    pub async fn delete(self, db: &Database) -> Result<(), VantageError> {
        if let Some(id) = self.id {
            db.execute("DELETE FROM users WHERE id = ?", &[Value::Int(id)]).await?;
        }
        Ok(())
    }
}

// Usage example
async fn active_record_usage(db: &Database) -> Result<(), VantageError> {
    // Create and save new record
    let mut user = User::new("John Doe", "john@example.com");
    user.save(&db).await?;

    // Load existing record
    let mut existing_user = User::find(1, &db).await?;
    existing_user.name = "Jane Doe".to_string();
    existing_user.save(&db).await?;

    // Delete record
    existing_user.delete(&db).await?;

    Ok(())
}
```

### Complex DataSet Transformations

Perform complex transformations and aggregations:

```rust
async fn dataset_transformations(db: &Database) -> Result<(), VantageError> {
    // Create datasets from multiple tables
    let orders_dataset = DataSet::from_table("orders", &db);
    let customers_dataset = DataSet::from_table("customers", &db);

    // Join datasets
    let customer_orders = orders_dataset
        .join(&customers_dataset, "customer_id", "id")
        .select(&[
            "orders.id",
            "orders.total_amount",
            "orders.created_at",
            "customers.name as customer_name",
            "customers.email as customer_email"
        ]);

    // Aggregate operations
    let sales_summary = customer_orders
        .group_by(&["customers.id", "customers.name"])
        .aggregate(&[
            ("COUNT(*)", "order_count"),
            ("SUM(orders.total_amount)", "total_spent"),
            ("AVG(orders.total_amount)", "average_order"),
            ("MAX(orders.created_at)", "last_order_date")
        ])
        .having("order_count", Value::GreaterThan(Value::Int(5)));

    // Execute and process results
    for record in sales_summary.fetch_all().await? {
        let customer_name: String = record.get("name")?;
        let order_count: i64 = record.get("order_count")?;
        let total_spent: Decimal = record.get("total_spent")?;

        println!("{} has {} orders worth ${}", customer_name, order_count, total_spent);
    }

    Ok(())
}
```

### Streaming and Pagination

Handle large datasets with streaming and pagination:

```rust
async fn handle_large_datasets(db: &Database) -> Result<(), VantageError> {
    let large_dataset = DataSet::from_table("transactions", &db)
        .where_field("created_at", Value::GreaterThan(
            Utc::now() - Duration::days(365)
        ))
        .order_by("created_at DESC");

    // Stream processing for memory efficiency
    let mut stream = large_dataset.stream().await?;
    let mut processed_count = 0;

    while let Some(batch) = stream.next_batch(1000).await? {
        for record in batch {
            // Process each record
            let amount: Decimal = record.get("amount")?;
            let transaction_type: String = record.get("transaction_type")?;

            // Apply business logic
            if amount > Decimal::from(10000) && transaction_type == "transfer" {
                // Flag for review
                record.set("flagged_for_review", Value::Bool(true));
                record.save(&db).await?;
            }

            processed_count += 1;
        }

        // Commit batch
        db.commit_batch().await?;
        println!("Processed {} records...", processed_count);
    }

    Ok(())
}
```

### Cross-Database Operations

Work with datasets across different databases:

```rust
async fn cross_database_sync(
    source_db: &Database,
    target_db: &Database,
) -> Result<(), VantageError> {
    // Source dataset from PostgreSQL
    let source_users = DataSet::from_table("users", source_db)
        .where_field("sync_status", Value::String("pending".to_string()))
        .select(&["id", "name", "email", "created_at"]);

    // Target dataset in MySQL
    let target_users = DataSet::from_table("user_cache", target_db);

    // Sync data between databases
    let mut sync_count = 0;
    for source_record in source_users.iter().await? {
        let user_data = UserCacheRecord {
            source_id: source_record.get("id")?,
            name: source_record.get("name")?,
            email: source_record.get("email")?,
            synced_at: Utc::now(),
        };

        // Insert or update in target database
        target_users
            .upsert(&user_data)
            .on_conflict(&["source_id"])
            .execute()
            .await?;

        // Mark as synced in source
        DataSet::from_table("users", source_db)
            .bulk_update()
            .set("sync_status", Value::String("completed".to_string()))
            .where_field("id", Value::Int(source_record.get("id")?))
            .execute()
            .await?;

        sync_count += 1;
    }

    println!("Synced {} records between databases", sync_count);
    Ok(())
}
```

### Advanced Features

- **Lazy evaluation** for optimal query performance
- **Change tracking** for audit trails
- **Batch processing** with configurable sizes
- **Memory-efficient streaming** for large datasets
- **Cross-database synchronization**
- **Custom serialization** for complex data types
- **Automatic relationship loading**
- **Query caching** and optimization
