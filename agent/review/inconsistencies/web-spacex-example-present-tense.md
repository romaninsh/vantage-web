# SpaceX example pitched as "see it in action" but is tagged Coming soon and not in the repo

- **Severity:** medium
- **Category:** inconsistencies
- **Location:** `content/solutions/developers.md:73`

The developers page closes with "See it in action — The **SpaceX GraphQL example** points the console at a public GraphQL API … so you can see exactly how a schema becomes a UI", with a primary CTA "See the GraphQL example". The example catalog (`static/examples-catalog.yaml`) marks spacex as `status: "coming"`, and `origin/main` of vantage-ui-examples contains only `apps/bakery` — spacex exists only on a feature branch. A visitor clicking through lands on a "Coming soon" card with no source to view, undercutting the page's credibility right at its conversion point.

```
## See it in action

The **[SpaceX GraphQL example](/examples/)** points the console at a public
GraphQL API — launches, rockets and capsules as browsable, drillable tables —
so you can see exactly how a schema becomes a UI.
-- static/examples-catalog.yaml --
  - slug: spacex
    status: "coming"
```

**Recommendation:** Either merge the spacex example to the examples repo main and flip the catalog to `available` before launch, or rewrite the section future-tense ("landing in the examples repo soon") like the internal-tools page already does for the AWS console example.
