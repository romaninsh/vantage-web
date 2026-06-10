# "Credentials are only ever stored locally" is false today

- **Severity:** high
- **Category:** inconsistencies
- **Location:** `content/solutions/internal-tools-teams.md:55`

The internal-tools page makes two specific security promises: the share-flow step says the pushed config is "just code — no data, no credentials" (line 39), and the footnote states "access credentials are only ever stored locally". The vantage-ui review verified that the app uploads datasource YAML — which contains connection strings with embedded credentials — as Sentry attachments (`crates/app/src/infra/sentry_ctx.rs:138`), and additionally logs connection strings with credentials to console/MCP/Sentry (`crates/backend/src/connect/open.rs:84`). For the security-conscious team this page targets, this is the most damaging kind of claim to get wrong.

```
<p class="share-footnote"><span class="material-symbols-outlined">shield</span>
App config stays private to your organisation, and access credentials are
only ever stored locally.</p>
```

**Recommendation:** Remove or qualify the footnote until credential redaction lands in the app (strip credentials from Sentry attachments and logs). Alternatively, phrase it about intent and architecture ("credentials live in your local config, not in any Vantage cloud account") without the absolute "only ever".
