+++
title = "Entity and Any"
weight = 5
+++

## Entity and Any

Dynamic entity handling for flexible data structures and runtime schema adaptation. The Entity
pattern provides maximum flexibility for working with heterogeneous data, dynamic schemas, and API
integrations where the structure isn't known at compile time.

### Dynamic Entity Creation

Create and manipulate entities without predefined schemas:

```rust
use vantage::{Entity, Database, Any, Value};

async fn dynamic_entities(db: &Database) -> Result<(), VantageError> {
    // Create a new entity dynamically
    let mut user_entity = Entity::new("users");
    user_entity.set("name", "John Doe");
    user_entity.set("email", "john@example.com");
    user_entity.set("age", 30);
    user_entity.set("active", true);
    user_entity.set("metadata", json!({
        "preferences": {
            "theme": "dark",
            "language": "en"
        },
        "permissions": ["read", "write"]
    }));

    // Save to database
    let saved_entity = user_entity.save(&db).await?;
    println!("Created entity with ID: {}", saved_entity.id());

    // Load entity by ID
    let loaded_entity = Entity::find("users", saved_entity.id(), &db).await?;

    // Access fields dynamically
    let name: String = loaded_entity.get("name")?;
    let age: i32 = loaded_entity.get("age")?;
    let is_active: bool = loaded_entity.get("active")?;

    println!("Loaded user: {} (age: {}, active: {})", name, age, is_active);

    Ok(())
}
```

### Working with Any Type

Handle flexible data types with the Any pattern:

```rust
use vantage::{Any, Value};

async fn any_type_examples(db: &Database) -> Result<(), VantageError> {
    let mut entity = Entity::new("flexible_data");

    // Store different types in the same field
    entity.set("data", Any::String("Hello World".to_string()));
    entity.save(&db).await?;

    // Later, change the type
    entity.set("data", Any::Object(json!({
        "type": "complex",
        "values": [1, 2, 3, 4],
        "nested": {
            "key": "value"
        }
    })));
    entity.save(&db).await?;

    // Retrieve and handle different types
    let data_field = entity.get_any("data")?;
    match data_field {
        Any::String(s) => println!("String value: {}", s),
        Any::Object(obj) => {
            println!("Object value: {}", obj);

            // Extract nested values
            if let Some(values) = obj.get("values") {
                if let Some(array) = values.as_array() {
                    for value in array {
                        println!("Array item: {}", value);
                    }
                }
            }
        },
        Any::Number(n) => println!("Number value: {}", n),
        Any::Boolean(b) => println!("Boolean value: {}", b),
        Any::Array(arr) => {
            println!("Array with {} items", arr.len());
            for item in arr {
                println!("  Item: {:?}", item);
            }
        },
        Any::Null => println!("Null value"),
    }

    Ok(())
}
```

### Schema Evolution

Handle schema changes and migrations dynamically:

```rust
async fn schema_evolution(db: &Database) -> Result<(), VantageError> {
    // Legacy data structure
    let legacy_user = Entity::from_map("users", hashmap!{
        "full_name" => Value::String("John Doe".to_string()),
        "email_address" => Value::String("john@example.com".to_string()),
        "is_admin" => Value::Bool(true),
    });

    // Migrate to new schema on-the-fly
    let mut modern_user = Entity::new("users");

    // Split full_name into first_name and last_name
    if let Ok(full_name) = legacy_user.get::<String>("full_name") {
        let parts: Vec<&str> = full_name.split_whitespace().collect();
        modern_user.set("first_name", parts.get(0).unwrap_or(&""));
        modern_user.set("last_name", parts.get(1).unwrap_or(&""));
    }

    // Rename field
    if let Ok(email) = legacy_user.get::<String>("email_address") {
        modern_user.set("email", email);
    }

    // Convert boolean to enum
    if let Ok(is_admin) = legacy_user.get::<bool>("is_admin") {
        let role = if is_admin { "admin" } else { "user" };
        modern_user.set("role", role);
    }

    // Add new fields with defaults
    modern_user.set("created_at", Utc::now());
    modern_user.set("updated_at", Utc::now());
    modern_user.set("version", 2); // Schema version

    modern_user.save(&db).await?;

    Ok(())
}
```

### API Integration

Handle external API responses with dynamic entities:

```rust
use serde_json::Value as JsonValue;

async fn api_integration(db: &Database) -> Result<(), VantageError> {
    // Simulated API response
    let api_response: JsonValue = json!({
        "users": [
            {
                "id": 123,
                "profile": {
                    "displayName": "Alice Smith",
                    "avatar": "https://example.com/avatar1.jpg",
                    "bio": "Software Engineer"
                },
                "settings": {
                    "notifications": true,
                    "privacy": "public"
                },
                "customFields": [
                    {"key": "department", "value": "Engineering"},
                    {"key": "location", "value": "San Francisco"}
                ]
            }
        ]
    });

    // Convert API response to entities
    if let Some(users_array) = api_response["users"].as_array() {
        for user_data in users_array {
            let mut user_entity = Entity::new("api_users");

            // Handle nested objects
            user_entity.set("external_id", user_data["id"].as_i64().unwrap());
            user_entity.set("display_name", user_data["profile"]["displayName"].as_str().unwrap());
            user_entity.set("avatar_url", user_data["profile"]["avatar"].as_str().unwrap());
            user_entity.set("bio", user_data["profile"]["bio"].as_str().unwrap());

            // Store complex nested data as Any
            user_entity.set("settings", Any::from_json(&user_data["settings"])?);

            // Handle dynamic custom fields
            if let Some(custom_fields) = user_data["customFields"].as_array() {
                let mut custom_data = HashMap::new();
                for field in custom_fields {
                    if let (Some(key), Some(value)) =
                        (field["key"].as_str(), field["value"].as_str()) {
                        custom_data.insert(key.to_string(), value.to_string());
                    }
                }
                user_entity.set("custom_fields", Any::Object(serde_json::to_value(custom_data)?));
            }

            // Add metadata
            user_entity.set("imported_at", Utc::now());
            user_entity.set("source", "external_api");

            user_entity.save(&db).await?;
        }
    }

    Ok(())
}
```

### Type Conversion and Validation

Handle type conversions and validation for Any fields:

```rust
use vantage::{Entity, TypeConverter, Validator};

async fn type_handling(db: &Database) -> Result<(), VantageError> {
    let mut entity = Entity::new("flexible_records");

    // Store mixed types
    entity.set("user_input", "123.45"); // String that looks like a number
    entity.set("config_flag", "true");   // String that looks like a boolean
    entity.set("json_data", r#"{"items": [1, 2, 3]}"#); // JSON string

    // Convert types safely
    let numeric_value: f64 = entity.get_converted("user_input")?;
    let boolean_value: bool = entity.get_converted("config_flag")?;
    let json_object: JsonValue = entity.get_converted("json_data")?;

    println!("Converted number: {}", numeric_value);
    println!("Converted boolean: {}", boolean_value);
    println!("Parsed JSON: {}", json_object);

    // Validate data before saving
    entity.validate(|e| {
        // Custom validation rules
        if let Ok(value) = e.get::<f64>("user_input") {
            if value < 0.0 {
                return Err("user_input must be positive".into());
            }
        }

        if let Ok(json_str) = e.get::<String>("json_data") {
            if serde_json::from_str::<JsonValue>(&json_str).is_err() {
                return Err("json_data must be valid JSON".into());
            }
        }

        Ok(())
    })?;

    entity.save(&db).await?;

    Ok(())
}
```

### Custom Serialization

Implement custom serialization for complex types:

```rust
#[derive(Debug, Clone)]
struct CustomStruct {
    name: String,
    values: Vec<i32>,
    metadata: HashMap<String, String>,
}

impl From<CustomStruct> for Any {
    fn from(custom: CustomStruct) -> Self {
        let json = json!({
            "name": custom.name,
            "values": custom.values,
            "metadata": custom.metadata
        });
        Any::Object(json)
    }
}

impl TryFrom<Any> for CustomStruct {
    type Error = VantageError;

    fn try_from(any: Any) -> Result<Self, Self::Error> {
        match any {
            Any::Object(obj) => {
                let name = obj.get("name")
                    .and_then(|v| v.as_str())
                    .ok_or("Missing name field")?
                    .to_string();

                let values = obj.get("values")
                    .and_then(|v| v.as_array())
                    .ok_or("Missing values array")?
                    .iter()
                    .map(|v| v.as_i64().unwrap_or(0) as i32)
                    .collect();

                let metadata = obj.get("metadata")
                    .and_then(|v| v.as_object())
                    .map(|obj| {
                        obj.iter()
                            .map(|(k, v)| (k.clone(), v.as_str().unwrap_or("").to_string()))
                            .collect()
                    })
                    .unwrap_or_default();

                Ok(CustomStruct { name, values, metadata })
            },
            _ => Err("Expected object type".into()),
        }
    }
}

// Usage
async fn custom_serialization(db: &Database) -> Result<(), VantageError> {
    let mut entity = Entity::new("custom_data");

    let custom_data = CustomStruct {
        name: "Example".to_string(),
        values: vec![1, 2, 3, 4, 5],
        metadata: [
            ("created_by".to_string(), "system".to_string()),
            ("version".to_string(), "1.0".to_string()),
        ].iter().cloned().collect(),
    };

    // Store custom struct as Any
    entity.set("data", Any::from(custom_data));
    entity.save(&db).await?;

    // Load and convert back
    let loaded_entity = Entity::find("custom_data", entity.id(), &db).await?;
    let loaded_data: CustomStruct = loaded_entity.get_any("data")?.try_into()?;

    println!("Loaded custom data: {:?}", loaded_data);

    Ok(())
}
```

### Advanced Features

- **Dynamic schema inference** from data patterns
- **Automatic type coercion** with fallback handling
- **JSON path querying** for nested data extraction
- **Schema versioning** for data evolution tracking
- **Bulk operations** on heterogeneous datasets
- **Cross-format serialization** (JSON, XML, YAML, etc.)
- **Runtime validation rules** with custom predicates
- **Memory-efficient storage** for sparse data structures
