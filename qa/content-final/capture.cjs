const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const BASE_URL = process.env.TARGET_URL || 'http://localhost:3000';
const OUTPUT = __dirname;

async function readyImages(section) {
  await section.evaluate((element) => Promise.all([...element.querySelectorAll('img')]
    .filter((img) => img.getClientRects().length > 0)
    .map((img) => {
      img.loading = 'eager';
      return Promise.race([img.decode().catch(() => {}), new Promise((resolve) => setTimeout(resolve, 2500))]);
    })));
}

function boardHtml() {
  const rows = [
    ['Opening', 'opening-desktop-1440x900.png', 'opening-mobile-390x844.png'],
    ['Hero', 'hero-desktop-1440x900.png', 'hero-mobile-390x844.png'],
    ['Thư ngỏ · thông tin buổi lễ', 'gate2-desktop-1440x900.png', 'gate2-mobile-390x844.png'],
    ['Lời kết', 'gate5-desktop-1440x900.png', 'gate5-mobile-390x844.png'],
  ];
  return `<!doctype html><html lang="vi"><meta charset="utf-8"><style>
    *{box-sizing:border-box}body{margin:0;background:#edf3f8;color:#17314e;font-family:Arial,sans-serif}
    .board{width:1540px;padding:36px 44px 48px;margin:auto}h1{font:600 30px Georgia,serif;margin:0 0 8px}
    .intro{font-size:14px;color:#5c7795;margin:0 0 24px;line-height:1.6}
    .row{background:#fbfaf7;border:1px solid #c8d9ea;padding:18px;margin-bottom:24px}
    h2{font:500 23px Georgia,serif;margin:0 0 14px}.grid{display:grid;grid-template-columns:1030px 300px;gap:24px;align-items:start}
    .label{font-size:11px;letter-spacing:.18em;color:#6c88a8;text-transform:uppercase;margin-bottom:7px}
    img{display:block;width:100%;height:auto;border:1px solid #dce7f2;background:white}
  </style><div class="board"><h1>Nguyễn Hồng Hạnh · Content Final Review</h1>
    <p class="intro">Tốt nghiệp lớp 12 · Trường THPT Chuyên Hà Giang · 03/10/2026 · 10:30 – 12:00<br>
    Screenshots from the current website at 1440 × 900 and 390 × 844.</p>
    ${rows.map(([title, desktop, mobile]) => `<section class="row"><h2>${title}</h2><div class="grid"><div><div class="label">Desktop</div><img src="${desktop}"></div><div><div class="label">Mobile</div><img src="${mobile}"></div></div></section>`).join('')}
  </div></html>`;
}

async function main() {
  fs.mkdirSync(OUTPUT, { recursive: true });
  const browser = await chromium.launch({ headless: false });
  try {
    for (const [width, height, device] of [[1440, 900, 'desktop'], [390, 844, 'mobile']]) {
      const context = await browser.newContext({ viewport: { width, height }, isMobile: width === 390, hasTouch: width === 390 });
      const page = await context.newPage();
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUTPUT, `opening-${device}-${width}x${height}.png`) });
      await page.getByRole('button', { name: 'Mở thiệp mời tốt nghiệp' }).filter({ visible: true }).click();
      await page.locator('aside[role="dialog"]').waitFor({ state: 'detached' });
      await page.waitForFunction(() => Math.abs(document.querySelector('#hero').getBoundingClientRect().top) < 2);
      await page.waitForTimeout(700);
      await page.screenshot({ path: path.join(OUTPUT, `hero-${device}-${width}x${height}.png`) });
      for (const gate of ['gate-2', 'gate-5']) {
        const section = page.locator(`#${gate}`);
        await section.scrollIntoViewIfNeeded();
        await page.waitForFunction((id) => document.getElementById(id)?.hasAttribute('data-entered'), gate);
        await page.waitForTimeout(550);
        await readyImages(section);
        await section.screenshot({ path: path.join(OUTPUT, `${gate.replace('-', '')}-${device}-${width}x${height}.png`) });
      }
      await context.close();
      console.log(`Captured content at ${width}x${height}`);
    }
    const htmlPath = path.join(OUTPUT, 'CONTENT-FINAL-REVIEW.html');
    fs.writeFileSync(htmlPath, boardHtml(), 'utf8');
    const board = await browser.newPage({ viewport: { width: 1540, height: 900 } });
    await board.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
    await board.evaluate(() => Promise.all([...document.images].map((img) => img.decode().catch(() => {}))));
    await board.screenshot({ path: path.join(OUTPUT, 'CONTENT-FINAL-REVIEW.png'), fullPage: true });
    await board.close();
    console.log('Content review board captured');
  } finally {
    await browser.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
