+++
title = "Use Cases"
description = "What Vantage UI is for — and what it could become."
template = "page.html"
+++

# Use Cases

> The purpose of Vantage is to use AI to explore the existing database, infrastructure and API landscape that a company has internally — create UI from it, and help build "model" code for the codebase that you can use inside any language, or even create facade-style middleware.

Vantage UI is in early access. The use cases below describe directions we are actively building toward. Some are working today, others are speculative — we mark which is which.

## Database admin replacement

Replace Retool, phpMyAdmin or homegrown internal admin panels with a native, version-controlled, local-first app. Connect to Postgres, MySQL, SQLite, SurrealDB and MongoDB from one sidebar — read records today, edit them in upcoming builds.

*Status: connect & browse working today; record editing in active development.*

## AWS infrastructure browser

Treat your AWS account as data. Browse S3 buckets, Lambda functions and CloudWatch log groups as if they were database tables — sort, filter, drill in. The same UI patterns that work for a Postgres table work for `s3://your-bucket/`.

*Status: foundational connectors working today; more AWS services to follow.*

## Custom REST API exploration

Point Vantage UI at any JSON REST endpoint and treat it as a typed table. JSONPlaceholder, your own internal microservice, a third-party SaaS — they show up alongside your databases and let you navigate references between them.

*Status: working today for paginated REST sources.*

## AI-assisted internal tooling

A coding agent connects to Vantage UI's local MCP server, introspects your data, and proposes YAML for new pages, tables and forms. You review the diff in your editor, the app reloads in place. The agent does the typing; you stay in the loop.

*Status: speculative — local MCP server is on the roadmap.*

## Generating model code in your language

Once Vantage understands your data landscape, the same model can be exported as Rust types, Python classes via FFI, or a thin facade middleware service. The UI is one consumer of that model — your own apps are another.

*Status: speculative — depends on Vantage Framework's model export tooling, which is in design.*

---

This list will grow as more shipping features make new use cases real. If you have a use case you want represented, open an issue on the [Vantage GitHub repository](https://github.com/romaninsh/vantage/issues).
