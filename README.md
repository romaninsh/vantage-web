# Vantage UI Website

Static site for [vantage-ui.com](https://vantage-ui.com), built with
[Zola](https://www.getzola.org/) and [Tailwind CSS v4](https://tailwindcss.com/)
(standalone CLI — no Node project).

## Local Development

1. **Install tools**

   ```bash
   brew install zola tailwindcss
   ```

2. **Run locally**

   ```bash
   make dev
   ```

   This runs the Tailwind CLI in watch mode and `zola serve` together.
   Site will be available at `http://127.0.0.1:1111`.

3. **Production build**

   ```bash
   make build   # tailwindcss --minify + zola build → public/
   ```

## Snapshots

`make snapshots` captures full-page screenshots of all pages at desktop
(1440px) and mobile (390px) widths using Playwright. Use
`BASE_URL=http://127.0.0.1:1111 OUT_DIR=snapshots/local make snapshots`
to capture a local build.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`: Tailwind +
Zola build, sync to the `vantage-ui.com` S3 bucket, then CloudFront
invalidation. The workflow file must keep its name — vantage-ui's
nightly release workflow triggers it by filename to refresh the nightly
download manifest.
