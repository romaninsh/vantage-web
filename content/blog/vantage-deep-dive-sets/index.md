+++
title = "Vantage Deep Dive: Thinking in Sets"
description = "An ORM hands you records one at a time. Vantage operates with Data Sets in real-time."
date = 2026-11-14

[taxonomies]
categories = ["Engineering"]
series = ["Deep Dive"]
tags = ["rust", "rhai", "datasets", "relations", "data abstraction"]

[extra]
cover = "cover.jpg"
hero = "hero.jpg"
hero_alt = "Sunrise over the Hook of Holland ferry terminal: loading ramps reach out from the quay to the water, with a row of wind turbines on the far bank."
hero_caption = "Sunrise at the Hook of Holland ferry terminal, after the overnight crossing from Harwich."
+++

In the [previous deep dive](@/blog/vantage-deep-dive-vista/index.md) I left a question mark between `Cart` and `Item`. I promised that a relation is easy to change later. Before we get to how relations are declared, I want to talk about the idea underneath them, because it is the reason Vantage looks the way it does.

In Vantage you work with Sets of Records most of the time.

## How simple code gets lost

A client runs a web shop and wants an admin dashboard that shows the total amount sitting in all open carts. Most software reaches the database through a [database abstraction layer](https://en.wikipedia.org/wiki/Database_abstraction_layer), and in practice that means picking one of two teams:

{% <blog.fork> %}
<div class="fork__ticket">
<span class="fork__label">Requirement</span>

Admin dashboard: total amount across all open carts.

</div>
<div class="fork__split"></div>
<div class="fork__branches">
<div class="fork__card">

**Team [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping)**

```python
total = 0
for cart in Cart.filter(status="open"):
    for line in cart.items:
        total += line.amount
```

<p class="fork__meter" style="--w: 8%">4 lines &middot; loads every cart</p>

</div>
<div class="fork__card">

**Team SQL**

```sql
SELECT SUM(i.amount)
FROM cart c
JOIN cart_item i ON i.cart_id = c.id
WHERE c.status = 'open'
```

<p class="fork__meter" style="--w: 8%">4 lines &middot; knows the schema</p>

</div>
</div>
<div class="fork__join"></div>
<div class="fork__ticket fork__ticket--change">
<span class="fork__label">New requirement</span>

Keep the dashboard live. Next quarter, carts move to MongoDB.

</div>
<div class="fork__stem"></div>
<div class="fork__card fork__card--rewrite">

**Both teams: rewrite**

<ul class="fork__pipe">
<li><span>cart service</span></li>
<li><span>outbox</span></li>
<li><span>Kafka</span></li>
<li><span>consumer</span></li>
<li><span>projection</span></li>
<li><span>read model</span></li>
<li><span>WebSocket</span></li>
</ul>

<p class="fork__extra">plus idempotency keys, retries, replays and projection rebuilds</p>
<p class="fork__meter" style="--w: 100%">months of work for a team &middot; {{<glossary.term id="tco" />}} for life</p>

</div>
{% </blog.fork> %}

I gave this requirement to AI agents. Each got the first ticket and chose a team: half wrote the SQL, half used their ORM. When I added that the code mustn't depend on the database, the agent wrote the loop. Then I added the second ticket, and every agent gave the same answer: the pipeline above, plus a view that runs behind the data. Their sketches fit on a page. Building and running each box takes a team months, which is why companies at this stage employ hundreds of engineers.

That is how most apps grow. You start with SQL or an ORM. When you have to scale, you rewrite and bring in a wide range of tools. Along the way the simple, readable code is lost in implementation detail, and the core of the app becomes hard to maintain.

## Define it now, don't rewrite later

Vantage takes the other road. Business code doesn't assume SQL and doesn't fetch records: it describes sets of records and traverses from set to set. SQL works in sets too, but SQL is implementation: it names tables, joins and an engine. A set is business code: it says which records you mean. In Vantage a data set is a {{<glossary.term id="vista" />}}, the primitive from the [previous deep dive](@/blog/vantage-deep-dive-vista/index.md), detached from how and where the data is stored. The code stays easy to read, and Vantage handles the implementation details, which you can still customise where you need to.

{% <blog.fork> %}
<div class="fork__ticket">
<span class="fork__label">Requirement</span>

Admin dashboard: total amount across all open carts.

</div>
<div class="fork__stem"></div>
<div class="fork__card fork__card--vantage">

**What you write**

```yaml
# table/cart.yaml
# Defines the Vista (a data set): columns, conditions and references.
datasource: shop_pg
columns:
  id: { type: string, flags: [id] }
  user: { type: string, references: user }
  status: { type: string, enum: [open, ordered] }
references:
  items: { table: cart_item, kind: has_many, foreign_key: cart }
```

```rhai
let report_vista = table("cart")
    .where("status", "open").ref("items");
```

<p class="fork__extra">Each step returns a new {{<glossary.term id="vista" />}}. Bind <code>report_vista</code> to a widget, and the widget totals the amount.</p>
<p class="fork__extra">You get, without writing it:</p>
<ul class="fork__chips">
<li>WebSocket API</li>
<li>live updates</li>
<li>REST and MCP</li>
<li>typed TypeScript client</li>
<li>sessions and scope</li>
<li>ACL and policies</li>
</ul>

<p class="fork__meter" style="--w: 14%">a dozen lines of YAML and Rhai</p>

</div>
<div class="fork__stem"></div>
<div class="fork__ticket fork__ticket--change">
<span class="fork__label">New requirement</span>

Keep the dashboard live. Next quarter, carts move to MongoDB.

</div>
<div class="fork__stem"></div>
<div class="fork__card fork__card--vantage">

**What you change**

```diff
# table/cart.yaml
- datasource: shop_pg
+ datasource: shop_mongo
```

<p class="fork__meter" style="--w: 2%">one line &middot; business code unchanged</p>

</div>
{% </blog.fork> %}

Live updates are among those details. Each data source reports its own changes: PostgreSQL through `LISTEN/NOTIFY`, MongoDB through change streams, and SurrealDB through `LIVE SELECT`, which can even push the totals of a [pre-computed view](https://surrealdb.com/docs/surrealql/statements/define/table) as the rows under it change. Vantage turns them into updates over its WebSocket API. The event pipeline from the first story still exists, but it is part of Vantage: it runs inside Vantage Server, and nobody on your team has to manage it. The [Enterprise edition](@/solutions/enterprise.md) goes a step further and plugs into the event architecture a company already runs, such as CDC with Debezium, scaling horizontally with it.

Moving the data to MongoDB takes one line because traversal doesn't depend on the database: each `ref()` turns one {{<glossary.term id="vista" />}} into the next, whether or not both tables share a database.

If you prefer to write Rust, Vantage offers all the base components as MIT-licensed open source: [Vista](https://docs.rs/vantage-vista/latest/vantage_vista/struct.Vista.html), [Factory](https://docs.rs/vantage-vista/latest/vantage_vista/trait.VistaFactory.html), [Diorama](https://docs.rs/vantage-diorama/latest/vantage_diorama/) and [Scenery](https://docs.rs/vantage-diorama/latest/vantage_diorama/trait.TableScenery.html). They are what {{<glossary.term id="vantage_server" />}} and {{<glossary.term id="vantage_ui" />}} run on.

## Conclusion

Follow the same app through four requirements. Each colour is code written at a different time, so a new colour means the code before it was rewritten.

{% <blog.lifespan> %}
<div class="life__scroll">
<div class="life__grid">
<span></span>
<span class="life__step">Launch<small>total across carts</small></span>
<span class="life__step">New database<small>cart data to MongoDB</small></span>
<span class="life__step">Live view<small>admin dashboard</small></span>
<span class="life__step">Load grows<small>10&times; the traffic</small></span>
<span class="life__lane">Typical stack</span>
<span class="life__seg" style="--c: var(--color-accent-400)">ORM or SQL</span>
<span class="life__seg life__seg--new" style="--c: #f472b6">queries, sync jobs</span>
<span class="life__seg life__seg--new" style="--c: var(--color-violet)">event pipeline</span>
<span class="life__seg life__seg--new" style="--c: #fbbf24">caches, replicas</span>
<span class="life__lane">Vantage</span>
<span class="life__seg life__seg--keep">business code written at launch</span>
</div>
</div>
<div class="life__stats">
<p class="life__stat"><b>~10&times;</b><span>faster to build an app than with an LLM alone, in our tests</span></p>
<p class="life__stat"><b>1 line</b><span>to move a table to another database</span></p>
<p class="life__stat"><b>0</b><span>rewrites of business code across all four</span></p>
</div>
{% </blog.lifespan> %}

Vantage pursues an architectural goal: keep business code apart from implementation. Business code works with {{<glossary.term id="vista" text="Vistas" />}}: which records you mean and how they relate. Storage, queries, live updates and scaling are implementation, and Vantage implements them once, beneath every table. That is where the speed comes from, and it is why the business code doesn't need replacing as the system grows.

Most of the cost of a business system comes after the first version. In companies where hundreds of engineers maintain a shared codebase, it is the rewrites and the infrastructure that follow every new requirement. Code written for Vantage is long-term code: it scales with the system instead of being replaced by it.
