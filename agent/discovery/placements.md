# Placements — round 2026-10-14

Source: `reports/2026-10-14.md` (64 anonymous runs, 32 tasks × Sonnet/Opus, 186 searches, 34
fetches, $12.59). "In results" = how many of the 64 runs had the page or domain in their search
results; "fetched" = how many opened it.

## What the round says

1. **Agents decide from search snippets.** 186 searches against 34 fetches: most runs never open a
   page. A tool that isn't named in the *titles and snippets* of the pages that rank doesn't exist
   for them. Our own pages are almost never reached.
2. **"Best X alternatives 2026" listicles are the battleground.** The most-returned pages are all of
   that shape (Appsmith / Retool / Budibase alternatives, best admin panel builders, best low-code
   platforms). About half are written by competitors (JetAdmin, WeWeb, ToolJet, UI Bakery, Softr,
   Zite, Refine, Superblocks, Emergent) and will never list us; the rest are independent.
3. **Vantage was found once, in 1 of 64 runs** — `rust-orm-multidb` on Opus. Its *first* contact
   was the Medium post "Building Entity Framework in Rust from scratch" (medium.com/@romaninsh),
   returned for "Rust ORM abstract datasource SQL NoSQL REST API pluggable backend 'same model'
   entity framework". It then searched for Vantage by name, reached crates.io, docs.rs,
   vantage-ui.com/framework and /book and `romaninsh.github.io/vantage`, and recommended Vantage as
   "the only thing that actually abstracts across SQL, SurrealDB, MongoDB and APIs". It linked the
   github.io URL — the stale `homepage` on the crates (VAN-77). **A problem-shaped article we had
   already written is what got Vantage found** — the case for VAN-79.
4. **Vantage UI was found zero times**, including on tasks it should win on merit:
   - `config-as-code-admin` → both models picked **Lowdefy** ("the only tool that treats YAML-in-git as…").
   - `mcp-app-builder` → **ToolJet** ("ToolJet's MCP server lets Claude Code, Cursor… generate pages").
   - `agent-builds-internal-ui` → **Lowdefy** / **AdminForth**.
   - `private-ai-builder` → **ToolJet** with BYOK.
   - `internal-tool-no-cloud`, `retool-selfhosted` → **Appsmith / ToolJet** self-hosted.
   - `postgres-admin-panel`, `crud-generator`, `mysql-backoffice` → **Directus** ("introspects your
     existing database, no migration").
   Every one of those reasons is a Vantage UI claim. We lose because no ranking page says it about us.
5. **Overall winners:** Retool (8 runs), Windmill (5), Directus (5), ToolJet (4), Appsmith (3),
   Lowdefy (3), Forest Admin (3), NocoDB (2), Tauri (2), gpui-component (2), Surrealist (2),
   Supabase Realtime (2), Refine, AdminForth, DBFlux, egui_table, Slint, sqlx+axum, Temporal.
6. **Name collision:** `vantageos.tech` ("Best Tools for Building Internal Tools in 2026") showed up
   in 3 runs — another "Vantage" in our exact niche.
7. **Sandbox note:** a logged-in `claude -p` exposes the account email; round 1 was re-run with an
   "anonymous session" system prompt and no run searched for the author (the first, leaky attempt
   had two that did). See the ledger ruling.

## Pages we control (do first — no gatekeeper)

| Page | Evidence | Action |
|---|---|---|
| Public GitHub home for Vantage UI | github.com in results of 41 runs; GitHub topic pages returned in 12 runs: `topics/internal-tools` (4), `admin-panels` (2), `low-code?l=rust` (2), `database-gui` (2), `data-grid` (2), `admin-ui`, `cli-wrapper` | The app's repo `atk4/vantage-ui` is private and the public `romaninsh/vantage-ui-examples` has no topics and a stale description ("Black-box BDD engine…"). Give Vantage UI a public repo (examples + README + releases/issues), description "Native desktop app builder for internal tools over your databases and APIs, built by your AI agent over MCP", topics `internal-tools admin-panel low-code database-gui data-grid admin-ui mcp ai-agents gpui rust desktop-app yaml config-as-code` |
| `romaninsh/vantage` repo topics | same | Add `entity-framework database surrealdb mongodb postgresql data-framework` to the existing `entity framework orm query-builder rust sql` (VAN-78) |
| vantage-ui.com comparison pages | the top-returned pages are "Appsmith alternatives" (11, 8 runs), "Retool alternatives" (7, 6), "Budibase alternatives" (7), "best admin panel builders" (5, 5), "best Postgres admin panel tools" (6) | Our own pages in that exact format, honest about who should pick what: "Retool alternatives that keep data on your machine", "Appsmith / Budibase alternatives", "Admin panel over an existing Postgres/MySQL" — see content proposals |
| vantage-ui.com use-case pages for the four tasks we should win | see finding 4 | "Config-as-code admin UI (YAML in git)", "App builder your AI agent drives over MCP", "Internal tools without a vendor cloud (bring your own AI)", "Admin panel over an existing database, no migration" |
| dev.to | in results of 36 runs (most-returned domain) | Publish the same comparison/use-case pieces on dev.to with canonical links (VAN-79) |
| Medium | 12 runs | Same, syndicated |
| crates `homepage` | the one Vantage recommendation linked the stale github.io URL | Point to vantage-ui.com/book/ (VAN-77, after the refactor) |
| DeepWiki | deepwiki.com in results of 7 runs | Index `romaninsh/vantage` (VAN-84) |

## Directories and catalogs

| Site | Evidence | Submit | List under |
|---|---|---|---|
| StackShare | 15 runs | https://stackshare.io/ (add a tool) | Vantage UI: "Internal Tools", "Admin Panel"; Vantage framework: "Object Relational Mapper (ORM)" |
| LibHunt | 10 runs | https://www.libhunt.com/ and https://rust.libhunt.com/ (submit project) | Vantage framework: Rust → ORM / Database; Vantage UI: low-code / admin panels |
| AlternativeTo | 5 runs | https://alternativeto.net/ (add application) | Vantage UI as an alternative to Retool, Appsmith, Budibase, ToolJet, Directus, Lowdefy, DBeaver |
| modern-datatools.com | 5 runs (incl. "Retool vs Appsmith vs Budibase") | contact/submit on site | Internal tools / low-code |
| thegtmdirectory.com | 4 runs ("Directus vs NocoDB") | submit on site | Internal tools, admin panels |
| opensourceprojects.cc | 4 runs ("Best Open Source Database Tools") | submit on site | Vantage framework (MIT). Vantage UI only if it's described accurately as free, not open source |
| opensourcealternative.to | 2 runs | submit | framework only (same caveat) |
| MCP directories: glama.ai, mcp.so (+ smithery.ai, pulsemcp.com, the official MCP registry) | glama.ai 2, mcp.so 1 | each site's "add server" | Vantage UI's MCP server: "build and edit internal-tool apps from your agent" |
| lib.rs / crates.io | 8 / 7 runs | automatic from crate metadata | categories + keywords (VAN-77, after the refactor) |

## GitHub awesome-lists (PRs)

| Repo | Evidence | Line to add |
|---|---|---|
| kairichard/awesome-nocode-lowcode | returned in 1 run | `- [Vantage UI](https://vantage-ui.com/) - Native desktop app builder for internal tools over your databases and APIs; your AI agent builds it over MCP as YAML in git.` |
| caramaschiHG/awesome-ai-agents-2026 | returned in 1 run | same line, under tools/builders |
| surrealdb/awesome-surreal | fetched in the leaky run for `surrealdb-admin` | `- [Vantage UI](https://vantage-ui.com/) - Desktop admin and app builder with live SurrealDB queries and relations.` and the framework: `- [vantage-surrealdb](https://crates.io/crates/vantage-surrealdb) - Typed entities and relations over SurrealDB, part of the Vantage framework.` |
| rust-unofficial/awesome-rust | ORM section (VAN-81) | `- [romaninsh/vantage](https://github.com/romaninsh/vantage) - Entity framework over SQL, SurrealDB, MongoDB and REST/GraphQL APIs with one model.` |
| awesome-selfhosted / awesome-mcp-servers | not seen this round, standard catalogs | consider once the public Vantage UI repo exists |

## Independent listicles and comparisons (outreach)

Written by people who don't sell a competing builder. Pitch: Vantage UI is the option for teams that
want data to stay on their machines and want their own AI agent to build the tool.

| Page | Evidence (runs) | Angle |
|---|---|---|
| https://www.stackfyi.com/guides/retool-vs-appsmith-vs-budibase-2026 | 8 | add a "local-first / agent-built" entry |
| https://designrevision.com/blog/retool-alternative | 6 | "without lock-in" is our pitch: config is YAML in your repo |
| https://www.pistack.xyz/posts/budibase-vs-appsmith-vs-tooljet-self-hosted-low-code-guide-2026/ (+ nocodb-vs-baserow-vs-directus) | 3 each, domain 11 | self-hosted guides: no server at all, runs on the laptop |
| https://www.modern-datatools.com/compare/retool-vs-appsmith-vs-budibase | 4 | review listing + comparison |
| https://thectoclub.com/tools/best-low-code-platform/ | 4 | enterprise angle: signed builds, SSO |
| https://danian.co/articles/post/open-source-airtable-alternatives | 4 | framework angle (MIT) |
| https://medevel.com/14-internal-tools-builder/ | 3 | internal tools list |
| https://synodus.com/blog/low-code/open-source-low-code-platforms/ | 3 | framework angle |
| https://mith.tech/blog/open-source-retool-alternative | 3 | self-hosted angle |
| https://www.alphonsolabs.com/best-low-code-platforms/ | 3 | internal tools list |
| https://reintech.io/blog/diesel-vs-sqlx-vs-seaorm-rust-database-library-comparison-2026, https://www.shuttle.dev/blog/2024/01/16/best-orm-rust, https://www.rustfinity.com/blog/rust-orms | 3 each | Vantage framework: the multi-backend option none of them cover |

Competitor-owned lists (JetAdmin ×7 pages, WeWeb, Zite, UI Bakery, ToolJet blog, Refine, Softr,
Superblocks, Emergent, appstackbuilder) are not outreach targets — we answer them with our own pages.

## Community

| Where | Evidence | Note for the human |
|---|---|---|
| Hacker News | 4 runs | A Show HN for Vantage UI (local-first, agent-built internal tools) and for the framework, each with a concrete demo. Ours to post, not the agent's. |
| Reddit | 0 runs | Search tools rarely surfaced Reddit this round; still useful for humans, low value for agents. |

## Suggested copy

- **One line:** Vantage UI — a native desktop app builder for internal tools over your existing
  databases and APIs, built by your own AI agent over MCP. Nothing leaves your machine.
- **Three lines:** Point Vantage UI at Postgres, MySQL, SurrealDB, MongoDB, REST or GraphQL and
  describe the tool you need; your AI agent (Claude Code, Cursor) writes it as YAML and Rhai in a
  folder in your repo, and the app renders grids, forms, wizards and dashboards that update live.
  No data migration, no vendor cloud, bring your own AI plan. Free for macOS; enterprise builds are
  signed and SSO-ready.
- **Framework one line:** Vantage — an open-source Rust entity framework over SQL, SurrealDB,
  MongoDB and REST/GraphQL APIs with one model, live data and Rhai scripting.

## Tickets

Created / refined in Linear (project "Vantage AI-agent discoverability"):

- VAN-410 Public GitHub home for Vantage UI, with topics
- VAN-411 Directory listings: StackShare, LibHunt, AlternativeTo and others
- VAN-412 List Vantage UI's MCP server in MCP directories
- VAN-413 Outreach to independent "Retool/Appsmith alternatives" lists
- Refined: VAN-78 (topics), VAN-79 (comparison content, dev.to), VAN-80 (Show HN), VAN-81
  (awesome-lists), VAN-84 (DeepWiki in results), VAN-77 (stale homepage cited), VAN-90 (name
  collision), VAN-91 (harness)
