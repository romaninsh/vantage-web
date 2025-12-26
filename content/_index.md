+++
title = "Vantage Framework"
description = "Bootstrap 5, Material Symbols & Google Fonts Test"
+++

# Vantage Framework

A modern web framework with integrated Bootstrap 5, Material Symbols, and Google Fonts.

```rust
fn main() {
    let framework = VantageFramework::new("Vantage", "1.0.0");
    println!("Framework: {:?}", framework);

    if framework.is_feature_enabled("bootstrap") {
        println!("✅ Bootstrap is enabled!");
    }
}
```
