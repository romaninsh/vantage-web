# Download page shows a truncated sha256 that can't be used to verify anything

- **Severity:** low
- **Category:** omissions
- **Location:** `themes/vantage/templates/download.html:47`

Both the stable and nightly download blocks render the manifest checksum as `sha256: {{ manifest.sha256 | truncate(length=16, end="…") }}` — 16 hex characters of a 64-character digest. A truncated hash gives the security signal without the security: nobody can actually run `shasum -a 256` against it. The release pipeline already uploads a full `.dmg.sha256` file next to each artifact (vantage-ui `release.yaml:201`), so the full value is one link away.

```
<p class="text-muted small mb-0">
    <code>sha256: {{ manifest.sha256 | truncate(length=16, end="…") }}</code>
</p>
```

**Recommendation:** Show the full digest (small monospace, or behind a copy button), or link to the published `<dmg>.sha256` file. Keep the truncated form only as the visible label if space matters.
