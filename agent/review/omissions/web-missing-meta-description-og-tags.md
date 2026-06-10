# No meta descriptions, Open Graph/Twitter tags, or canonical URLs anywhere

- **Severity:** high
- **Category:** omissions
- **Location:** `themes/vantage/templates/base.html:3`

The `<head>` in `base.html` contains only charset, viewport, title, stylesheets and a favicon. Every content page carefully sets a `description` in frontmatter (e.g. `content/features.md:3`), but no template ever renders it as `<meta name="description">`, and there are no `og:title`/`og:description`/`og:image` or Twitter card tags, nor a canonical link. For a marketing site this means search snippets are whatever Google scrapes, and links shared on Bluesky/LinkedIn — the project's two stated channels — unfurl with no image or summary.

```
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{% block title %}{{ config.title }}{% endblock title %}</title>
    <!-- Google Fonts -->
    ...
    <link rel="icon" type="image/svg+xml" href="{{ get_url(path='favicon.svg') }}">
</head>
```

**Recommendation:** Add a head block emitting `<meta name="description">` from `page.description | section.description` (with a config-level fallback), `og:*` and `twitter:card` tags using `static/images/vantage-ui-app.png` as the default share image, and `<link rel="canonical" href="{{ current_url }}">`.
