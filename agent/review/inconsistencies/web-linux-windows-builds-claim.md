# "Linux & Windows builds available" — no such builds exist

- **Severity:** high
- **Category:** inconsistencies
- **Location:** `content/_index.md:8`

The hero caption claims "Linux & Windows builds available", but every release pipeline in vantage-ui (`release.yaml`, `nightly.yaml`) runs only on `warp-macos-15-arm64-6x` and produces a single Apple Silicon `.dmg`; the site's own download page offers only "Apple Silicon · macOS 13+" and nothing else. positioning.md flags platform as an unresolved assumption and recommends macOS-only copy until cross-platform is real. A visitor on Linux who clicks Download will find the caption was false.

```
hero_caption = "**Free for macOS.** Built on the open-source, MIT-licensed
[Vantage Framework](/framework/). Linux & Windows builds available."
-- vantage-ui .github/workflows/release.yaml --
    runs-on: warp-macos-15-arm64-6x
    ...
          dmg="Vantage-${version}-${arch}.dmg"
```

**Recommendation:** Drop "Linux & Windows builds available" or change it to a clearly future-tense roadmap line ("Linux & Windows are on the roadmap"). Keep the hero strictly to what ships: free for macOS (Apple Silicon).
