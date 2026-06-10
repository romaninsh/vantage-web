# Framework page claims a shipped "axum server integration" that doesn't exist

- **Severity:** medium
- **Category:** inconsistencies
- **Location:** `themes/vantage/templates/framework.html:130`

Layer 9 of the abstraction stack says "Vantage ships connectors, including an axum server integration, DataGrid adapters for six Rust UI toolkits, and CLI helpers." In the vantage repo, `axum` appears only in `learn-3/Cargo.toml` — a learning scratch project, not a published connector — and no `vantage-*` crate provides a server integration (the page's own roadmap section correctly says the API-export crate "is in progress"). Also note the adapters are the unpublished `dataset-ui-adapters` package, not a crate named `vantage-ui-adapters` (vantage review: `inconsistencies/docs-ui-adapters-crate-name.md`).

```
<p>The top of the stack is yours — an API server, a command-line tool, a
bespoke UI. You write it, but you don't start cold: Vantage ships connectors,
including an axum server integration, DataGrid adapters for six Rust UI
toolkits, and CLI helpers.</p>
```

**Recommendation:** Remove "an axum server integration" from the shipped-connectors list (it belongs in the roadmap section lower on the same page), and describe the UI adapters accurately (bundled with the repo, not on crates.io).
