# Homepage lacks the "Unlike everything else" pillars and a final CTA; pillars macro sits unused

- **Severity:** medium
- **Category:** suggestions
- **Location:** `themes/vantage/templates/index.html:70`

positioning.md's homepage outline is Hero → What-it-is strip → 3 pillars ("the spine": built by AI / config-as-code in git / runs on your machine) → features → three use cases → how it works → framework → roadmap teaser → final CTA. The built homepage goes Hero → feature grid → how-it-works → examples → framework → follow band: there is no pillars section (a ready `pillars()` macro exists in `macros/blocks.html:2` but is never invoked), no use-case band linking the three `/solutions/` pages, no roadmap/vision teaser, and no closing download CTA. The category-defining "unlike Retool / unlike Adminer" framing — sequencing item #2 in the doc — is therefore absent from the page that needs it most.

```
-- macros/blocks.html --
{# ===== Pillars (the "unlike everything else" spine) ===== #}
{% macro pillars(items) %}
...
{% endmacro %}
-- index.html: macro imported via blocks but pillars() never called --
{% import "macros/blocks.html" as blocks %}
```

**Recommendation:** Add an `[extra.pillars]` block to `content/_index.md` with the three differentiator pillars (privacy wording adjusted per the Sentry finding) and render it via the existing macro between the hero and the feature grid; add a use-cases band linking the solutions pages and a final "Download for Mac — free" CTA section.
