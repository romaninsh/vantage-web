# Pages from the positioning site map are missing: How it works, Why Vantage, Roadmap

- **Severity:** medium
- **Category:** omissions
- **Location:** `content/`

positioning.md's Part 3 site map calls for a dedicated `/how-it-works` agent page ("new — high priority … Your biggest differentiator deserves its own page"), an optional `/why` comparison page, and a `/roadmap` page that elevates export-to-code as the headline item. None exist: `content/` has only `_index`, `features`, `framework`, `download`, `examples`, `follow` and `solutions/*`. The agent story is currently a three-step strip on the homepage plus one section on Features, the roadmap is a flip-card deck buried at the bottom of Features, and there is no vs-Retool/Adminer framing anywhere — so the suggested nav (`Download · How it works · Use Cases · Why Vantage · Framework · Roadmap · GitHub`) cannot be assembled from what's built.

```
content/
  _index.md  features.md  framework.md  download.md  examples.md  follow.md
  solutions/{_index,internal-tools-teams,developers,app-builders}.md
# positioning.md:
### How it works / The agent `/how-it-works` _(new — high priority)_
### Why Vantage / vs the alternatives `/why` _(new — optional but valuable)_
### Roadmap `/roadmap`
```

**Recommendation:** Prioritise the `/how-it-works` agent page (real prompt → generated YAML → rendered console, honest limits), then a `/roadmap` page headlining export-to-code; the `/why` comparison can follow. Link them from the top nav per the positioning doc.
