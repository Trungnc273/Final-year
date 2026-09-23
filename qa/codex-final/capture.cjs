const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const TARGET_URL = process.env.TARGET_URL || 'http://localhost:3000';
const OUTPUT_DIR = __dirname;
const SCREENS = [
  { width: 1440, height: 900, name: 'desktop-1440x900', review: true },
  { width: 390, height: 844, name: 'mobile-390x844', review: true },
  { width: 360, height: 800, name: 'responsive-360x800' },
  { width: 430, height: 932, name: 'responsive-430x932' },
  { width: 768, height: 1024, name: 'responsive-768x1024' },
  { width: 1024, height: 768, name: 'responsive-1024x768' },
  { width: 1920, height: 1080, name: 'responsive-1920x1080' },
];

function reviewBoardHtml() {
  const rows = [
    ['Opening', 'opening-desktop-1440x900.png', 'opening-mobile-390x844.png'],
    ['Hero', 'hero-desktop-1440x900.png', 'hero-mobile-390x844.png'],
    ['Thư ngỏ / Save the Date', 'gate-2-desktop.png', 'gate-2-mobile.png'],
    ['Hành trình thanh xuân', 'gate-3-desktop.png', 'gate-3-mobile.png'],
    ['Lời cảm ơn', 'gate-4-desktop.png', 'gate-4-mobile.png'],
    ['Hẹn gặp lại', 'gate-5-desktop.png', 'gate-5-mobile.png'],
  ];
  return `<!doctype html><html lang="vi"><meta charset="utf-8"><style>
    *{box-sizing:border-box}body{margin:0;background:#e9f0f7;color:#17314e;font-family:Arial,sans-serif}
    .board{width:1540px;padding:38px 46px 48px;margin:auto}h1{font:600 30px Georgia,serif;margin:0 0 8px}
    .intro{color:#5c7795;margin:0 0 28px;font-size:14px}.row{background:#fbfaf7;border:1px solid #c8d9ea;padding:18px;margin-bottom:24px}
    h2{margin:0 0 14px;font:500 24px Georgia,serif}.grid{display:grid;grid-template-columns:1030px 300px;gap:24px;align-items:start}
    .label{font-size:11px;letter-spacing:.2em;color:#6c88a8;text-transform:uppercase;margin-bottom:8px}
    img{width:100%;height:auto;display:block;border:1px solid #dce7f2;background:white}
  </style><div class="board"><h1>Graduation Invitation · Release Candidate</h1><p class="intro">Opening → Hero → Thư ngỏ → Hành trình → Lời cảm ơn → Hẹn gặp lại · Desktop 1440 × 900 / Mobile 390 × 844</p>
    ${rows.map(([title, desktop, mobile]) => `<section class="row"><h2>${title}</h2><div class="grid"><div><div class="label">Desktop</div><img src="${desktop}"></div><div><div class="label">Mobile</div><img src="${mobile}"></div></div></section>`).join('')}
  </div></html>`;
}

function beforeAfterHtml() {
  return `<!doctype html><html lang="vi"><meta charset="utf-8"><style>
    *{box-sizing:border-box}body{margin:0;background:#e9f0f7;color:#17314e;font-family:Arial,sans-serif}
    .board{width:1580px;padding:36px 44px 48px;margin:auto}h1{font:600 30px Georgia,serif;margin:0 0 8px}
    p{color:#5c7795;font-size:14px;margin:0 0 22px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
    .card{background:#fbfaf7;border:1px solid #c8d9ea;padding:14px}.card h2{font:500 20px Georgia,serif;margin:0 0 12px}
    .card img{display:block;width:100%;height:auto;border:1px solid #dce7f2}
    .mobile img{width:390px;margin:auto}.mobile{text-align:center}
  </style><div class="board"><h1>Opening · Before / After</h1><p>Full viewport entrance, document scroll lock, edge-to-edge stationery, and a clear opening action.</p>
    <div class="grid"><div class="card"><h2>Desktop · Before</h2><img src="../baseline-desktop.png"></div><div class="card"><h2>Desktop · After</h2><img src="opening-desktop-1440x900.png"></div>
    <div class="card mobile"><h2>Mobile · Before</h2><img src="../baseline-mobile.png"></div><div class="card mobile"><h2>Mobile · After</h2><img src="opening-mobile-390x844.png"></div></div>
  </div></html>`;
}

function targetComparisonHtml() {
  const rows = [
    ['Gate 1 · Opening', 'gate1', 'opening-desktop-1440x900.png', 'opening-mobile-390x844.png'],
    ['Gate 2 · Thư ngỏ', 'gate2', 'gate-2-desktop.png', 'gate-2-mobile.png'],
    ['Gate 3 · Hành trình', 'gate3', 'gate-3-desktop.png', 'gate-3-mobile.png'],
    ['Gate 4 · Lời cảm ơn', 'gate4', 'gate-4-desktop.png', 'gate-4-mobile.png'],
    ['Gate 5 · Hẹn gặp lại', 'gate5', 'gate-5-desktop.png', 'gate-5-mobile.png'],
  ];
  return `<!doctype html><html lang="vi"><meta charset="utf-8"><style>
    *{box-sizing:border-box}body{margin:0;background:#e9f0f7;color:#17314e;font-family:Arial,sans-serif}
    .board{width:1540px;padding:36px 42px;margin:auto}h1{font:600 30px Georgia,serif;margin:0 0 8px}
    .intro{font-size:14px;color:#5c7795;margin:0 0 24px}.row{background:#fbfaf7;border:1px solid #c8d9ea;padding:18px;margin-bottom:24px}
    h2{font:500 23px Georgia,serif;margin:0 0 14px}.desktop{display:grid;grid-template-columns:1fr 1fr;gap:20px}
    .mobile{display:grid;grid-template-columns:260px 260px;gap:20px;justify-content:center;margin-top:18px}
    .label{font-size:11px;letter-spacing:.18em;color:#6c88a8;text-transform:uppercase;margin-bottom:7px}
    img{display:block;width:100%;height:auto;border:1px solid #dce7f2;background:white}
  </style><div class="board"><h1>Design Targets · Current Render</h1>
    <p class="intro">Composition review at desktop 1440 × 900 and mobile 390 × 844. Target images are low-resolution references; current screens use the source photographs and live content.</p>
    ${rows.map(([title, gate, desktop, mobile]) => `<section class="row"><h2>${title}</h2>
      <div class="desktop"><div><div class="label">Target · desktop</div><img src="../../design-targets/${gate}-desktop-target.png"></div>
      <div><div class="label">Current · desktop</div><img src="${desktop}"></div></div>
      <div class="mobile"><div><div class="label">Target · mobile</div><img src="../../design-targets/${gate}-mobile-target.png"></div>
      <div><div class="label">Current · mobile</div><img src="${mobile}"></div></div></section>`).join('')}
  </div></html>`;
}

async function screenshotBoard(browser, filename, html) {
  const htmlPath = path.join(OUTPUT_DIR, `${filename}.html`);
  fs.writeFileSync(htmlPath, html, 'utf8');
  const page = await browser.newPage({ viewport: { width: filename === 'FINAL-PRODUCT-REVIEW' ? 1540 : 1580, height: 900 } });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
  await page.evaluate(() => Promise.all([...document.images].map((img) => img.decode().catch(() => {}))));
  await page.screenshot({ path: path.join(OUTPUT_DIR, `${filename}.png`), fullPage: true });
  await page.close();
}

async function main() {
  const browser = await chromium.launch({ headless: false });
  try {
    for (const screen of SCREENS) {
      const context = await browser.newContext({
        viewport: { width: screen.width, height: screen.height },
        isMobile: screen.width <= 430,
        hasTouch: screen.width <= 430,
      });
      const page = await context.newPage();
      await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(950);
      if (screen.review) {
        await page.screenshot({ path: path.join(OUTPUT_DIR, `opening-${screen.name}.png`) });
      }
      await page.getByRole('button', { name: 'Mở thiệp mời tốt nghiệp' }).filter({ visible: true }).click();
      await page.locator('aside[role="dialog"]').waitFor({ state: 'detached' });
      await page.waitForFunction(() => {
        const hero = document.querySelector('#hero');
        return document.querySelector('main')?.inert === false
          && !document.querySelector('.opening-cover')
          && hero && Math.abs(hero.getBoundingClientRect().top) < 2;
      });
      await page.waitForTimeout(1100);
      const heroFile = screen.review ? `hero-${screen.name}.png` : `${screen.name}.png`;
      await page.screenshot({ path: path.join(OUTPUT_DIR, heroFile) });

      if (screen.review) {
        for (const gate of ['gate-2', 'gate-3', 'gate-4', 'gate-5']) {
          console.log(`Capturing ${gate} at ${screen.width}x${screen.height}`);
          const section = page.locator(`#${gate}`);
          await section.scrollIntoViewIfNeeded();
          await page.waitForFunction((id) => document.getElementById(id)?.hasAttribute('data-entered'), gate, { timeout: 10000 });
          await page.waitForTimeout(850);
          await section.evaluate((element) => Promise.all([...element.querySelectorAll('img')]
            .filter((img) => img.getClientRects().length > 0)
            .map((img) => {
              img.loading = 'eager';
              return Promise.race([
                img.decode().catch(() => {}),
                new Promise((resolve) => setTimeout(resolve, 2500)),
              ]);
            })));
          await section.screenshot({ path: path.join(OUTPUT_DIR, `${gate}-${screen.width === 1440 ? 'desktop' : 'mobile'}.png`) });
        }
        await page.evaluate(() => {
          document.documentElement.style.scrollBehavior = 'auto';
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(300);
        await page.screenshot({
          path: path.join(OUTPUT_DIR, `full-site-${screen.width === 1440 ? 'desktop-1440' : 'mobile-390'}.png`),
          fullPage: true,
        });
      }
      console.log(`Captured ${screen.width}x${screen.height}`);
      await context.close();
    }
    await screenshotBoard(browser, 'OPENING-BEFORE-AFTER', beforeAfterHtml());
    await screenshotBoard(browser, 'FINAL-PRODUCT-REVIEW', reviewBoardHtml());
    await screenshotBoard(browser, 'DESIGN-TARGET-COMPARISON', targetComparisonHtml());
    console.log('Review boards captured');
  } finally {
    await browser.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
