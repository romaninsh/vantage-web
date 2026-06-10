# 404 page renders without site header and footer

- **Severity:** low
- **Category:** bugs
- **Location:** `themes/vantage/templates/404.html:5`

`404.html` extends `index.html` but fully overrides the `content` block, which is where `index.html` emits `nav::header()` and `nav::footer()`. The rendered `public/404.html` therefore contains no `<header id="topnav">` and no footer markup at all (verified by grepping the generated file) — visitors who hit a broken URL land on a bare error card with only a "Go Home" button and no way to navigate to Download, Features, etc. Extending `index.html` instead of `base.html` is also fragile: it inherits the homepage's `load_data` calls for nothing.

```
{% extends "index.html" %}
{% block content %}
<div class="row">
    <div class="col-lg-6 mx-auto text-center">
        ...
        <a href="{{ config.base_url }}" class="btn btn-primary">
```

**Recommendation:** Extend `base.html`, import the navigation macros, and wrap the error card with `{{ nav::header() }}` / `{{ nav::footer() }}` like every other page template.
