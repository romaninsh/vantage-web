+++
title = "A tour of Vantage UI"
description = "Part two: the features of Vantage UI, built on the Vantage framework."
date = 2026-10-04
draft = true

[taxonomies]
categories = ["Releases"]

[extra]
featured = true
+++

Everything in the [previous post](@/blog/vantage-1-0/index.md) was the framework: generic data primitives that know nothing about your business. Vantage UI adds the other half, generic widgets and screens, and leaves the part in between to you: structure written in YAML, and code written in [Rhai](https://rhai.rs/).

A Vantage UI project is a folder, with one sub-folder per kind of thing:

```
datasource/   where the data lives
table/        the shape of each table, and how tables relate
page/         the screens
menu/         the sidebar
action/       dialogs, commands, calls to outside services
form/ view/   form layouts and summary tabs
application.yaml   theme, variables, profiles
```

Save a file and the open window rebuilds in place, keeping your scroll position, sort, filters and selection. A file with a mistake keeps its last working version on screen and logs what went wrong.

### Data sources

Every driver from the framework is available. "Connect your data" opens a wizard with a step per source; credentials go into the project's `.env`, never into YAML, and if you have no database yet, Vantage can run one for you in a container.

![The setup wizard runs the bakery's own database in a container: start it, watch it turn green, seed it.](/images/changelog/0.40/01-full.webp)

A source that is slow or failing retries by itself and keeps the rows already on screen, and a four-bar indicator in the title bar shows each source's health.

### Tables

You have already seen `table/invoice.yaml`. On top of what the framework does with it, Vantage UI reads the types and flags to present values properly: dates at the precision you choose, money with its currency sign, status fields as coloured tags, and a column with a fixed set of values as a dropdown. A table can also be defined by a query, for grouped totals or a worklist of overdue invoices, and a table with a million rows opens as quickly as one with ten.

### Pages

A page is a list of components arranged in rows and columns, about twenty-five of them: grids, forms, KPI cards, charts, file browsers, markdown documents, progress bars and live logs among them. Dropdowns at the top of a dashboard narrow the query itself, so every total and chart recomputes for the slice you picked. The menu file lists your pages in the sidebar, or in the macOS menu bar.

![Filter dropdowns narrow the query itself, so the KPI cards, charts and breakdown all recompute.](/images/changelog/0.36/01-full.webp)

{% <blog.example title="Customers and invoices"> %}
Here is a complete page for invoices:

```yaml
title: Invoices
body:
  - kind: binder
    name: invoices
    observe: invoice
    params:
      columns: [number, customer.name, total, paid]
      default_sort: { column: number, direction: desc }
```

Without a line of code, that gives you a grid that loads as you scroll, Add and Delete buttons, a Details form with Save and Revert and a searchable customer dropdown, a Lines tab from the `has_many` relation, and search, sorting and column widths that are remembered for next time. One more line, `filter: ["~number", ">total"]`, adds a filter panel.
{% </blog.example> %}

![Edit records in place: Add and Delete, and a Details form whose reference field is a searchable dropdown.](/images/changelog/0.28/01-full.webp)

### Forms and actions

Forms follow the table by default, and a file in `form/` lays one out when you want more control. Editing is safe: fields you haven't touched follow other people's changes, a rejected save keeps your edits and shows the reason under the field, and a new record gets its identity when the form opens, so a retried Create can't make a duplicate.

Actions open forms and confirmations, call outside services, move a record only to the states valid from its current one, run command-line tools in a real terminal, or walk through multi-step wizards that save nothing until the end.

![Every operation opens as a form: pick the bakery, write the slogan, launch the campaign.](/images/changelog/0.40/02-full.webp)

### Where code begins

Everything so far has been structure. Code enters only where behaviour is specific to your business, and it arrives in small pieces of Rhai. Each script has a time limit, so a mistake ends in an error rather than a frozen window.

{% <blog.example title="Customers and invoices"> %}
A "Mark paid" action on every invoice row:

```yaml
row_actions:
  - label: Mark paid
    icon: Check
    action: |
      row.paid = row.total;
      row.save();
```

The two lines under `action:` are all the code this feature needs.
{% </blog.example> %}

The bakery example app gives an idea of the proportions: about 1,040 lines of YAML across 34 files, against 20 lines of standalone script.

### Your AI agent writes it

You don't have to write the YAML yourself either. Every project comes with instructions for AI coding agents such as Claude Code or Cursor, plus a local MCP connection the agent uses to check its own work: it reads the logs, runs read-only queries and opens the page it is changing, so you watch each edit land.

### Sharing

Apps you install in Vantage update themselves, swapping changed files under the running window. Enterprise builds add central credentials with work-account sign-in, your own name and icon, and operations written in Rust.

## 0.42 today, 1.0 next week

That is the whole stack: a generic data framework, generic widgets, and a thin layer of structure and code that is yours to maintain. Everything in this post is in Vantage 0.42, which you can [download now](/download/), and the [release notes](/download/) show how it got here, release by release.

Version 1.0 comes out next week, with some new features I'll introduce when it ships.
