# Every page loads Google/Cloudflare/jsdelivr assets; Mermaid and Prism CSS lack SRI

- **Severity:** medium
- **Category:** security
- **Location:** `themes/vantage/templates/base.html:9`

The base template pulls fonts from Google Fonts, Bootstrap and Mermaid from jsdelivr, and Prism from cdnjs on every page view, sending each visitor's IP and referrer to three third parties — an awkward look for a site whose pitch is "no data leaving your machine". The Mermaid `<script>` (base.html:46) and the Prism theme CSS (base.html:25) are loaded without `integrity` attributes, so a CDN compromise could inject arbitrary script site-wide; Mermaid is also dead weight, since no content file uses the mermaid shortcode at all.

```
<link href="https://fonts.googleapis.com/css2?family=Inter:…" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css" rel="stylesheet">
...
<!-- Mermaid.js for diagrams -->
<script src="https://cdn.jsdelivr.net/npm/mermaid@10.9.0/dist/mermaid.min.js"></script>
```

**Recommendation:** Drop the unused Mermaid bundle (or load it only from the mermaid shortcode), add `integrity`+`crossorigin` to the remaining CDN resources, and consider self-hosting Inter/Material Symbols/Bootstrap from the S3 bucket to align delivery with the privacy positioning.
