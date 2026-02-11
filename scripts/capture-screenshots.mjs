import { spawn } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const ROOT = process.cwd();
const ARTIFACT_ROOT = path.join(ROOT, "artifacts", "screenshots");

const sectionIds = [
  "hero",
  "program-tracks",
  "track-tech-coding",
  "track-tech-talks",
  "track-business",
  "track-cultural",
  "track-esports",
  "track-robotics",
  "sponsors",
  "about",
  "contact",
];

const transitionCheckpoints = [
  {
    id: "transition-hero-to-program-wipe",
    from: "hero",
    to: "program-tracks",
    offsetFactor: 0.32,
  },
  {
    id: "transition-program-to-track-tech",
    from: "program-tracks",
    to: "track-tech-coding",
    offsetFactor: 0.32,
  },
  {
    id: "transition-track-to-sponsors",
    from: "track-robotics",
    to: "sponsors",
    offsetFactor: 0.28,
  },
  {
    id: "transition-sponsors-to-about",
    from: "sponsors",
    to: "about",
    offsetFactor: 0.28,
  },
];

const viewportConfigs = [
  {
    name: "desktop",
    viewport: { width: 1440, height: 900 },
  },
  {
    name: "mobile",
    viewport: { width: 390, height: 844 },
  },
];

function startPreviewServer() {
  const child = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1", "--port", String(PORT)], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.stdout.on("data", (chunk) => {
    process.stdout.write(`[preview] ${chunk}`);
  });

  child.stderr.on("data", (chunk) => {
    process.stderr.write(`[preview] ${chunk}`);
  });

  return child;
}

async function waitForServerReady(timeoutMs) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) {
        return true;
      }
    } catch {
      // keep retrying
    }

    await new Promise((resolve) => setTimeout(resolve, 350));
  }

  return false;
}

async function ensureDirs() {
  await rm(ARTIFACT_ROOT, { recursive: true, force: true });
  await mkdir(path.join(ARTIFACT_ROOT, "desktop"), { recursive: true });
  await mkdir(path.join(ARTIFACT_ROOT, "mobile"), { recursive: true });
}

async function captureViewport(browser, config) {
  const context = await browser.newContext({ viewport: config.viewport });
  const page = await context.newPage();
  const outputDir = path.join(ARTIFACT_ROOT, config.name);

  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForSelector("#hero .hero__title", { state: "visible", timeout: 15_000 });
  await page.waitForTimeout(900);

  for (const sectionId of sectionIds) {
    const sectionSelector = `#${sectionId}`;
    await page.waitForSelector(sectionSelector, { state: "attached", timeout: 12_000 });

    await page.waitForSelector(`${sectionSelector} h1, ${sectionSelector} h2, ${sectionSelector} h3`, {
      state: "attached",
      timeout: 8_000,
    });

    const sectionLocator = page.locator(sectionSelector);
    await sectionLocator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);

    await sectionLocator.screenshot({
      path: path.join(outputDir, `${sectionId}.png`),
    });
  }

  for (const checkpoint of transitionCheckpoints) {
    await page.waitForSelector(`#${checkpoint.from}`, { state: "attached", timeout: 12_000 });
    await page.waitForSelector(`#${checkpoint.to}`, { state: "attached", timeout: 12_000 });

    const transitionTop = await page.evaluate(({ fromId, toId, offsetFactor }) => {
      const fromNode = document.getElementById(fromId);
      const toNode = document.getElementById(toId);

      if (!fromNode || !toNode) {
        return 0;
      }

      const fromTop = fromNode.getBoundingClientRect().top + window.scrollY;
      const toTop = toNode.getBoundingClientRect().top + window.scrollY;
      const viewportOffset = window.innerHeight * offsetFactor;
      let desiredTop = toTop - viewportOffset;

      if (toTop <= fromTop) {
        desiredTop = fromTop + (toTop - fromTop) / 2;
      }

      const maxScrollTop = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

      return Math.max(0, Math.min(maxScrollTop, Math.round(desiredTop)));
    }, { fromId: checkpoint.from, toId: checkpoint.to, offsetFactor: checkpoint.offsetFactor });

    await page.evaluate((targetTop) => {
      window.scrollTo({ top: targetTop, behavior: "auto" });
    }, transitionTop);

    await page.waitForTimeout(650);

    const transitionTarget = page.locator(`#${checkpoint.to}`);
    const targetBox = await transitionTarget.boundingBox();
    const outOfViewport =
      !targetBox ||
      targetBox.y > config.viewport.height ||
      targetBox.y + targetBox.height < 0;

    if (outOfViewport) {
      await transitionTarget.scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
    }

    await page.screenshot({
      path: path.join(outputDir, `${checkpoint.id}.png`),
      fullPage: false,
    });
  }

  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  });

  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(outputDir, "full-page.png"),
    fullPage: true,
  });

  await context.close();
}

async function main() {
  await ensureDirs();

  let previewProcess = null;
  const alreadyRunning = await waitForServerReady(1000);

  if (!alreadyRunning) {
    previewProcess = startPreviewServer();
    const ready = await waitForServerReady(20_000);

    if (!ready) {
      throw new Error(`Preview server did not start at ${BASE_URL}`);
    }
  }

  const browser = await chromium.launch({ headless: true });

  try {
    for (const config of viewportConfigs) {
      process.stdout.write(`[screenshots] Capturing ${config.name}...\n`);
      await captureViewport(browser, config);
    }

    process.stdout.write(`[screenshots] Done. Files saved in ${ARTIFACT_ROOT}\n`);
  } finally {
    await browser.close();

    if (previewProcess) {
      previewProcess.kill("SIGTERM");
    }
  }
}

main().catch((error) => {
  console.error("[screenshots] Failed:", error.message);
  process.exit(1);
});
