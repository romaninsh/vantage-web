# Code Review Findings — vantage-web2

Generated 2026-06-10 by an automated multi-agent review. Each file contains a snippet, severity, and recommendation.

**Total: 16** (security: 1 · bugs: 2 · inconsistencies: 8 · omissions: 4 · suggestions: 1)

## Security (1)

| Severity | Finding | Location |
|---|---|---|
| medium | [Every page loads Google/Cloudflare/jsdelivr assets; Mermaid and Prism CSS lack SRI](security/web-third-party-cdns-no-sri.md) | `themes/vantage/templates/base.html:9` |

## Bugs (2)

| Severity | Finding | Location |
|---|---|---|
| medium | [Remote examples catalog URL 404s — the declared "source of truth" doesn't exist](bugs/web-examples-catalog-remote-404.md) | `themes/vantage/templates/examples.html:12` |
| low | [404 page renders without site header and footer](bugs/web-404-page-missing-nav-footer.md) | `themes/vantage/templates/404.html:5` |

## Inconsistencies (8)

| Severity | Finding | Location |
|---|---|---|
| critical | ["No data leaving your machine" contradicted by always-on Sentry telemetry](inconsistencies/web-privacy-claims-vs-sentry.md) | `content/_index.md:7` |
| high | ["Credentials are only ever stored locally" is false today](inconsistencies/web-credentials-stored-locally-claim.md) | `content/solutions/internal-tools-teams.md:55` |
| high | ["Linux & Windows builds available" — no such builds exist](inconsistencies/web-linux-windows-builds-claim.md) | `content/_index.md:8` |
| high | ["MIT-licensed" claims rest on a LICENSE file with someone else's copyright](inconsistencies/web-mit-license-claim.md) | `content/_index.md:8` |
| medium | [Framework page claims a shipped "axum server integration" that doesn't exist](inconsistencies/web-axum-connector-claim.md) | `themes/vantage/templates/framework.html:130` |
| medium | ["One link installs Vantage and pulls the app" contradicts the examples page's "coming soon" handler](inconsistencies/web-one-link-install-claim.md) | `content/solutions/internal-tools-teams.md:50` |
| medium | [SpaceX example pitched as "see it in action" but is tagged Coming soon and not in the repo](inconsistencies/web-spacex-example-present-tense.md) | `content/solutions/developers.md:73` |
| low | ["Six-step process" disagrees with the book's nine-step persistence guide](inconsistencies/web-persistence-six-steps-vs-book-nine.md) | `themes/vantage/templates/framework.html:692` |

## Omissions (4)

| Severity | Finding | Location |
|---|---|---|
| high | [No meta descriptions, Open Graph/Twitter tags, or canonical URLs anywhere](omissions/web-missing-meta-description-og-tags.md) | `themes/vantage/templates/base.html:3` |
| medium | [Features gallery shows the same placeholder screenshot for all six UI elements](omissions/web-gallery-placeholder-screenshots.md) | `content/features.md:40` |
| medium | [Pages from the positioning site map are missing: How it works, Why Vantage, Roadmap](omissions/web-missing-sitemap-pages.md) | `content/` |
| low | [Download page shows a truncated sha256 that can't be used to verify anything](omissions/web-download-checksum-unverifiable.md) | `themes/vantage/templates/download.html:47` |

## Suggestions (1)

| Severity | Finding | Location |
|---|---|---|
| medium | [Homepage lacks the "Unlike everything else" pillars and a final CTA; pillars macro sits unused](suggestions/web-homepage-missing-pillars-cta.md) | `themes/vantage/templates/index.html:70` |
