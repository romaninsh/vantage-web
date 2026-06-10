import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "https://vantage-ui.com";
const OUT = process.env.OUT_DIR ?? "snapshots";

const pages = [
  { path: "/", file: "home.png" },
  { path: "/download/", file: "download.png" },
  { path: "/examples/", file: "examples.png" },
  { path: "/features/", file: "features.png" },
  { path: "/follow/", file: "follow.png" },
  { path: "/framework/", file: "framework.png" },
  { path: "/solutions/", file: "solutions.png" },
  { path: "/solutions/app-builders/", file: "solutions-app-builders.png" },
  { path: "/solutions/developers/", file: "solutions-developers.png" },
  { path: "/solutions/internal-tools-teams/", file: "solutions-internal-tools-teams.png" },
];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();

for (const vp of viewports) {
  const dir = `${OUT}/${vp.name}`;
  mkdirSync(dir, { recursive: true });
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();
  for (const { path, file } of pages) {
    console.log(`Capturing ${BASE}${path} @ ${vp.name} → ${dir}/${file}`);
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.screenshot({ path: `${dir}/${file}`, fullPage: true });
  }
  await context.close();
}

await browser.close();
console.log("Done.");
