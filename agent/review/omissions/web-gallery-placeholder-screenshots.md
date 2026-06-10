# Features gallery shows the same placeholder screenshot for all six UI elements

- **Severity:** medium
- **Category:** omissions
- **Location:** `content/features.md:40`

All six gallery cards on the Features page ("Data grids", "Tabs & drill-downs", "Forms, dialogs & actions", "Detail sheet", "Charts & dashboards", "Log viewer") point at the identical `images/vantage-ui-app.png`; the file's own comment admits the paths are placeholders to be swapped for real shots. positioning.md explicitly demands "Real screenshots, not stock illustrations", and showing one repeated image under captions like "Log viewer" or "Charts & dashboards" reads as if those features can't be shown — undercutting the Now-tagged claims around them.

```
# UI gallery — `image` paths are placeholders; swap each for a real screenshot of
# that element. Notes render under each image.
[[extra.gallery]]
title = "Data grids"
image = "images/vantage-ui-app.png"
...
[[extra.gallery]]
title = "Log viewer"
image = "images/vantage-ui-app.png"
```

**Recommendation:** Capture one real screenshot per gallery card before launch (the evolution shots in `static/images/evolution/` show this is feasible). If a feature can't be screenshotted yet, cut the card rather than repeat the hero image.
