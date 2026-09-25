+++
title = "Is Rust enterprise yet? A year on"
description = "Over a year ago I made a list of what the Rust ecosystem lacked in order to dominate enterprise apps. I have worked hard, and today I'm happy to share my work with the Rust community as Vantage — 30 open-source crates and an AI-first desktop app builder written in Rust and GPUI."
date = 2026-09-24

[taxonomies]
categories = ["Engineering"]

[extra]
featured = true
cover = "cover.svg"
+++

## I said Rust wasn't ready for enterprise. Here is why.

Rust adoption so far has been focused on [dev-tools](https://github.com/BurntSushi/ripgrep), terminal applications, device drivers, parsers, compilers, [game engines](https://bevy.org/), and the internals of [other](https://github.com/astral-sh/uv) [language](https://oxc.rs/) toolchains.

What is notably missing — a presence in enterprise applications. The code powering API backends for web services is dominated by PHP, TypeScript and Java.

A year ago I [shared some thoughts](https://medium.com/@romaninsh/is-rust-enterprise-yet-79e30145e235) on why I think that is the case. Unlike the other use-cases listed, business code must evolve quickly. It must be safe to change and refactor. It should be modular.

But perhaps even more important — it must be concise and well abstracted. Rust's lack of object-orientation leaves early adopters disappointed.

To be competitive, Rust requires a framework that delivers:

- **An entity system** — business objects as native Rust types, with attributes, relations, validation and operations, in a syntax you would understand without comments.
- **Code ecosystem that scales** — strict separation of concerns and responsibilities, [domain-driven design](https://en.wikipedia.org/wiki/Domain-driven_design), and the capability to handle hundreds of microservices and hundreds of data tables, middleware APIs, transitions, refactoring, contracts and more.
- **Behaviour-altering plugins** — one of the success metrics for business apps is how fast a new engineer can master the code. How can complexity be distributed through behaviour-altering layers invisible to business functionality implementers?
- **Multi-database support** — companies constantly migrate — Oracle to [PostgreSQL](https://www.postgresql.org/), adopting [event-driven development](https://en.wikipedia.org/wiki/Event-driven_architecture). Rust frameworks are not comfortable with cross-database handling.

I have built all of the above capabilities in [Vantage](https://github.com/romaninsh/vantage) — my open-source framework. That's not the first time I have published one. In 2010 I published [Agile Toolkit](https://www.atk4.org/) — a PHP framework which still exists today and has lived through thousands of professional web projects.

## Vantage, a framework that makes Rust enterprise-ready

When I made that last post, I was still debugging query engines, but since then so many new layers were added to Vantage. Bottom to top: **types**, **queries**, **model**, **vista**, **lens**, **dio**, **scenery**, **servo**.

You can use only the layers you need. Here is a very basic and brief introduction:

- **types** introduces the concept of a remote record collection. It's like `Vec<MyEntity>`, but the entity lives elsewhere — `Record<MyEntity>`. The trick here is to have strong type support as records serialise/deserialise (or hydrate).
- **queries** introduces the core component for building vendor-specific query engines. That's like [SeaORM](https://www.sea-ql.org/SeaORM/), but supporting virtually any database (15+) and also capable of building virtually any query (even nested).
- **model** introduces `Table<MyEntity, DB>` — and it's a fundamental primitive when working with remote row-based collections or tables. Tables also work with REST APIs and CSV files, and it's what allows business code to use your persistences generically.
- **vista** is the type erasure and capability gate for all implementations of tables. It helps you avoid generics, sealing type safety and all business actions inside a universal type.
- **lens** is a mechanism for managing a local cache if your code is long-running. It regulates how Vista's request-response design (CRUD operations plus custom actions) becomes a Diorama — a reactive shadow of a real record, table or aggregate value.
- **dio** is that shadow itself — the cached, composable handle the rest of your code holds instead of the remote source.
- **scenery** allows a local or remote viewport to temporarily observe a Diorama. In [Vantage UI](/download/), GUI tables rely on scenery to keep themselves auto-updated without polling. The API server uses sceneries while it maintains a connection to a browser or client to send real-time updates.
- **servo** represents a draft change or addition to a stored set. Unlike changing Vista directly, a servo exists over a longer time — for example, while a user populates a form or additional data is collected.

Vantage is designed for modern decentralised, eventually consistent data models, and instead of focusing on [ACID](https://en.wikipedia.org/wiki/ACID) design, it reinforces [idempotency](https://en.wikipedia.org/wiki/Idempotence) and operation retry mechanics, common in event-driven software architecture.

There are several paths that offer different use-patterns, for example:

- entity-based `Entity<MyType>` — strongly typed records — or `Record<AnyDbType>` — arbitrary records — similar to [serde_json](https://docs.rs/serde_json/)'s or [CBOR](https://cbor.io/)'s `Value`, but native to a specific database's type set.
- writing code for `Table<>` that relies on generics, or for `Vista`, which seals the type away.
- creating models in Rust with compile-time safety, or building models using a YAML/[Rhai](https://rhai.rs/) factory with programmatic logic.
- entity relations within one persistence and across persistences.
- working with a record in Vista (instant) or with the Diorama approach (eventual/cached/queued).

I'm excited to share all the technical details, but I will need to do this over many blog posts.

## Thirty-five years, deliberately spent

I wrote in [PHP 3.0](https://www.php.net/manual/en/history.php.php) and many languages since then, and worked with startups as well as the largest enterprise companies in the world. I understand code not only at a theoretical level, but also as a cloud engineer, DevOps and automation expert.

Vantage is a reflection on all the coding patterns and practices I've seen. Some I have adopted and incorporated; others I have rejected or avoided. All the core components of Vantage have been rewritten several times towards perfection — you can [trace the code through the modifications](https://github.com/romaninsh/vantage/commits/main/).

The low-level framework is hand-written, while the diverse database drivers are generated by an LLM through narrow guidelines and a [testing framework](https://romaninsh.github.io/vantage/new-persistence.html) designed to guardrail code.

## Vantage and AI

The reality is that software development has changed forever. Not everyone was embracing the PC revolution in 1980, but today everything is run by computers. AI is here to stay, and it will keep writing our code. We cannot stop it, but we can teach AI to write good code.

That is the intent of Vantage. Your organisation may not be looking to hire Rust engineers, but it already uses LLMs, which are proficient in Rust.

Why settle for an inferior language? Vantage is a framework for both humans and AI agents, so it costs nothing to adopt it.

## Let me know

If you would like to consider Rust + Vantage as your business framework, reach out to me on [LinkedIn](https://www.linkedin.com/in/romansmalinovskis).
