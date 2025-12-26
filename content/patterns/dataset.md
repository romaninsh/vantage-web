+++
title = "DataSet"
description = "Learn about the DataSet pattern in Vantage Framework"
weight = 4
+++

# DataSet

DataSet is a powerful abstraction pattern that provides a unified interface for accessing data from
multiple sources. Vantage data-sets have the following qualities:

- It is assumed that DataSet is stored remotely and interaction with elements will be high-latency.
- DataSet use idempotency rules for basic operations. In enterprise architecture we assume that any
  operation is fallable, but could be retried without need of atomic transactions.
- Vantage knows that different datasets will have different capabilities, but the absolute minimum
  would be read, insert and edit

This makes DataSets extremely versatile and able to work with any data source, CSV file, Kafka
topic, SQL table, massive KV store.

| Data Source      | Readable         | Insertable | Editable |
| ---------------- | ---------------- | ---------- | -------- |
| CSV File         | ✅ Yes           | ⚠️ Depends | ❌ No    |
| Kafka Topic      | ❌ No            | ✅ Yes     | ❌ No    |
| Kafka Subscriber | ✅ Yes           | ❌ No      | ❌ No    |
| SQL Table        | ✅ Yes           | ✅ Yes     | ✅ Yes   |
| KV Store         | ⚠️ Get, not List | ✅ Yes     | ✅ Yes   |
| REST API         | ✅ GET           | ✅ PUT     | ✅ POST  |

## Difference between DataSet and ValueSet

Vantage draws clear separation between "Data" and "Value". Data refers to user-defined data
structure or `Entity`, but Value is shapeless JSON object, that can have any arbitrary structure.

Lets look at a basic Rust structure that defines a `User`. Rust has no reflection and will only be
able to read field names at compile time, but with `#[entity(CsvType)]` we can ensure that entire
structure is compatible with Csv persistence.

```rust
#[derive(Debug, Clone, Default)]
#[entity(CsvType)]
struct User {
    id: String,
    name: String,
    email: String,
    age: i64,
}
```

## Creating Sample CSV File

To test the code above, create a `users.csv` file in your project directory with the following
content:

```csv
id,name,email,age
1,Alice Johnson,alice@example.com,28
2,Bob Smith,bob@company.org,35
3,Carol Davis,carol.davis@startup.io,22
4,David Wilson,d.wilson@enterprise.com,41
5,Eve Brown,eve.brown@freelance.net,29
```

As far as CSV is concerned - every field is a chunk of string. CSV does not have types. Lets not
worry about it now an focus on reading CSV file into our User struct:

```rust
use vantage_dataset::AnyCsvType;
use vantage_dataset::traits::ReadableDataSet;
use vantage_types::entity;

use vantage_dataset::mocks::{CsvFile, MockCsv};

#[derive(Debug, Clone, Default)]
#[entity(CsvType)]
struct User {
    id: String,
    name: String,
    email: String,
    age: i64,
}

#[tokio::main]
async fn main() -> vantage_core::Result<()> {
    let csv_ds = MockCsv::new();
    let users = CsvFile::<User>::new(csv_ds, "users.csv");

    // List all users
    let all_users = users.list().await?;
    println!("All users ({})", all_users.len());
    for (id, user) in &all_users {
        println!(
            "  [{}] {} - {} (age {})",
            id, user.name, user.email, user.age
        );
    }

    Ok(())
}
```

Lets analyse some code and identify some patterns:

1. We must create `csv_ds` first - which is a DataSource. DataSource represents remote "persistence"
   or database. Potentially we might be storing CSV files on remote volume or accessing them over
   network protocol - DataSource in Vantage makes those kinds of assumpions.

2. When using CsvFile we must initialise it with our entity. Type of `users` variable will be
   `CsvFile<User>`. This means we won't need to annotate operations later on and any records we
   exchange with this dataset will be of `<User>` type.

3. User must implement trait `Entity<CsvType>`, meaning that entity field should be convertable
   to/from CSV file native type (which is String).

4. Readable DataSource will have `list()` method, which will return `Vec<User>` in the `Future`.

5. While `list()` operation can fail, it cannot be partially successful. You are guaranteed to only
   receive records which fits your entity definition, so you can iterate over records safely.

## Failure Scenarios

Lets look at some potential failure scenarios. CSV file structure may not match ours. Some records
age may not be parseable. Any bad records will be skipped.

If you want to tolerate and work around problematic Age column, you can change it's definition to
`Optional<i64>`. This way records with poorly formatted age will still be loaded, but age will be
`None`.

Finally - `list` will load entire set. If you operate with massive CSV and you need to load them
partially - you would simply load a different CSV persistence implementation, which supports
"sub-sets".

## Loading without Entity

Modify your code like this:

```rust
#[tokio::main]
async fn main() -> vantage_core::Result<()> {
    let csv_ds = MockCsv::new();
    let users = CsvFile::new(csv_ds, "users.csv");

    // List all users
    let all_users = users.list_values().await?;
    println!("All users ({})", all_users.len());
    for (id, user) in &all_users {
        println!(
            "  [{}] {} - {} (age {})",
            id,
            user.get("name")?,
            user.get("email")?,
            user.get("age")?
        );
    }

    Ok(())
}
```

Now the type of `user` will be `Record<String>`. This is quite similar to `IndexMap<Sting, String>`,
and that's why you can interact with user using `get()`.

When we are not providing CsvFile with an entity, it will use `EmptyEntity`. Method `list()` would
be useless, but `list_values` will return `serde_json::Value` for every row. Next it's your
responsibility to check presence of certain fields and convert types as necessary.

The example will skip no rows, potentially there could be empty row entirely.

# Type System

Vantage assumes that each persistence will use a slightly different type structure. With CSV we only
stored values as String. The CSV persistence we have been using implements types like this:

```rust
// CSV type system - everything is a string since CSV is text-based
vantage_type_system! {
    type_trait: CsvType,
    method_name: csv_string,
    value_type: String,
    type_variants: [String]
}

// Implement String for CSV type system
impl CsvType for String {
    type Target = CsvTypeStringMarker;

    fn to_csv_string(&self) -> String {
        self.clone()
    }

    fn from_csv_string(value: String) -> Option<Self> {
        Some(value)
    }
}

// Implement i64 for CSV type system (stored as string)
impl CsvType for i64 {
    type Target = CsvTypeStringMarker;

    fn to_csv_string(&self) -> String {
        self.to_string()
    }

    fn from_csv_string(value: String) -> Option<Self> {
        value.parse().ok()
    }
}

// Variant detection for CSV (only strings)
impl CsvTypeVariants {
    pub fn from_csv_string(_value: &String) -> Option<Self> {
        Some(CsvTypeVariants::String)
    }
}
```

Vantage respects `CsvType` as a complete collection of all the types that CSV file supports. There
is only one variant - `String`. Only 2 Rust native types can be used - `String` and `i64`. There
will also be `AnyCsvType` which is a type-erased variant capable of holding any-type with type
variant safety, but since there is only `String` variant, it's not very useful to us.

## Mermaid Tests

<div class="mermaid">
graph TB
    A[Your Code] --> C[DataSet]
    B[Business Logic] --> C
    C --> D[CSV Files]
    C --> E[JSON Files]
    C --> F[Database]
    C --> G[REST API]
</div>

---

<div class="mermaid">
sequenceDiagram
    Code->>DataSet: get_users()
    DataSet->>CSV: read users.csv
    CSV-->>DataSet: raw CSV data
    DataSet->>DataSet: parse & validate
    DataSet-->>Code: User objects
    Code->>DataSet: save_user(user)
    DataSet->>DataSet: serialize user
    DataSet->>CSV: append to users.csv
    CSV-->>DataSet: success
    DataSet-->>Code: confirmation
</div>
