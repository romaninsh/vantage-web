# Vantage Theme

A minimal, modern theme for Zola static site generator, designed for the Vantage Framework
documentation.

## Features

- Bootstrap 5 integration via CDN
- Material Symbols icons
- Google Fonts (Inter family)
- Responsive design
- Clean card-based layouts
- Minimal and fast

## Installation

1. Clone or download this theme into your `themes` directory:

```bash
cd themes
git clone <repository-url> vantage
```

2. Set the theme in your `config.toml`:

```toml
theme = "vantage"
```

## Configuration

### Basic Configuration

```toml
# config.toml
theme = "vantage"
title = "Your Site Title"
base_url = "https://your-site.com"

[extra]
# Optional: Custom logo
logo = "/logo.png"

# Optional: Navigation links
nav_links = [
    { name = "Documentation", url = "/docs/" },
    { name = "GitHub", url = "https://github.com/user/repo" }
]

# Optional: Footer text
footer_text = "Built with Zola"

# Optional: Favicon
favicon = "/favicon.ico"
```

## Templates

- `index.html` - Base template with Bootstrap, fonts, and navigation
- `page.html` - Individual page template
- `section.html` - Section listing template with card layouts
- `404.html` - Error page template

## Customization

You can override any template by creating a file with the same name in your site's `templates`
directory.

## License

MIT
