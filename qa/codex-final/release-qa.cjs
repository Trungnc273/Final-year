const assert = require('node:assert/strict');
const { chromium } = require('playwright');

const TARGET_URL = process.env.TARGET_URL || 'http://localhost:3000';
const viewports = [
  [360, 800], [375, 812], [390, 844], [430, 932], [768, 1024],
  [1024, 768], [1280, 720], [1366, 768], [1440, 900], [1920, 1080],
];

async function openInvitation(page) {
  await page.getByRole('button', { name: 'Mở thiệp mời tốt nghiệp' }).filter({ visible: true }).click();
  await page.locator('aside[role="dialog"]').waitFor({ state: 'detached' });
  await page.waitForFunction(() => Math.abs(document.querySelector('#hero').getBoundingClientRect().top) < 2);
}

async function main() {
  assert.equal(Date.parse('2026-10-03T10:30:00+07:00'), Date.UTC(2026, 9, 3, 3, 30));
  assert.equal(Date.parse('2026-10-03T12:00:00+07:00'), Date.UTC(2026, 9, 3, 5, 0));
  const browser = await chromium.launch({ headless: false });
  const failures = [];
  const results = [];
  try {
    for (const [width, height] of viewports) {
      const context = await browser.newContext({
        viewport: { width, height },
        hasTouch: width <= 430,
        isMobile: width <= 430,
      });
      const page = await context.newPage();
      if (width === 390) {
        await page.addInitScript(() => {
          const NativeAudio = window.Audio;
          window.__capturedAudio = [];
          window.Audio = function (source) {
            const audio = new NativeAudio(source);
            window.__capturedAudio.push(audio);
            return audio;
          };
          window.Audio.prototype = NativeAudio.prototype;
        });
      }
      page.on('pageerror', (error) => failures.push(`${width}x${height} pageerror: ${error.message}`));
      page.on('console', (message) => {
        if (message.type() === 'error' && message.location().url.startsWith(TARGET_URL)) {
          failures.push(`${width}x${height} console: ${message.text()}`);
        }
      });
      page.on('response', (response) => {
        if (response.url().startsWith(TARGET_URL) && response.status() >= 400) {
          failures.push(`${width}x${height} asset: ${response.status()} ${response.url()}`);
        }
      });

      await page.goto(`${TARGET_URL}/?to=Nguy%E1%BB%85n%20Minh%20Anh`, { waitUntil: 'networkidle' });
      const closed = await page.evaluate(() => ({
        y: window.scrollY,
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        cover: document.querySelector('aside').getBoundingClientRect().toJSON(),
        mainInert: document.querySelector('main').inert,
      }));
      assert.equal(closed.y, 0);
      assert.equal(closed.mainInert, true);
      assert.ok(closed.cover.width >= width - 1 && closed.cover.height >= height - 1);
      assert.ok(closed.documentWidth <= closed.viewportWidth + 1);
      assert.ok(await page.locator('aside').getByText('Nguyễn Minh Anh').filter({ visible: true }).isVisible());
      if (width === 390 || width === 1440) {
        const coverText = await page.locator('aside').textContent();
        assert.ok(coverText.includes('Chào bạn,') && coverText.includes('Cảm ơn bạn'));
        assert.ok(coverText.includes('NGUYỄN HỒNG HẠNH'));
        assert.ok(!/đại học|cử nhân|bachelor|degree|Huyền Trang/i.test(coverText));
      }

      await page.locator('aside').focus();
      await page.mouse.wheel(0, 800);
      await page.keyboard.press('PageDown');
      await page.keyboard.press('Space');
      await page.keyboard.press('ArrowDown');
      if (width <= 430) {
        const cdp = await context.newCDPSession(page);
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: width / 2, y: height - 100 }] });
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: width / 2, y: 120 }] });
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      }
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(100);
      assert.equal(await page.evaluate(() => window.scrollY), 0, `pre-open scroll at ${width}x${height}`);

      await openInvitation(page);
      const opened = await page.evaluate(() => ({
        y: window.scrollY,
        heroTop: document.querySelector('#hero').getBoundingClientRect().top,
        heroWidth: document.querySelector('#hero').getBoundingClientRect().width,
        shellWidth: [...document.querySelectorAll('#hero > div')].find((element) => getComputedStyle(element).display !== 'none').getBoundingClientRect().width,
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        mainInert: document.querySelector('main').inert,
      }));
      assert.equal(opened.mainInert, false);
      assert.ok(Math.abs(opened.heroTop) < 2 && opened.y === 0, `hero top at ${width}x${height}`);
      assert.ok(opened.heroWidth >= width - 1 && opened.shellWidth >= width - 2, `full bleed at ${width}x${height}`);
      assert.ok(opened.documentWidth <= opened.viewportWidth + 1, `horizontal overflow at ${width}x${height}`);
      if (width === 390 || width === 1440) {
        const heroText = await page.locator('#hero').textContent();
        const gate2Text = await page.locator('#gate-2').textContent();
        assert.ok(heroText.includes('HỒNG HẠNH') && heroText.includes('03/10/2026'));
        assert.ok(gate2Text.includes('Nguyễn Minh Anh') && gate2Text.includes('OCTOBER 2026'));
        assert.ok(gate2Text.includes('Trường THPT Chuyên Hà Giang'));
        assert.ok(gate2Text.includes('10:30 – 12:00'));
        assert.ok(gate2Text.includes('03'));
        assert.ok(!/đại học|cử nhân|bachelor|degree|Huyền Trang/i.test(heroText + gate2Text));
      }
      await page.mouse.wheel(0, 550);
      await page.waitForTimeout(350);
      assert.ok((await page.evaluate(() => window.scrollY)) > 0, `scroll after open at ${width}x${height}`);
      await page.locator('#gate-5').scrollIntoViewIfNeeded();
      assert.ok(await page.locator('#gate-5').isVisible(), `closing reachable at ${width}x${height}`);

      if (width === 390) {
        const gallery = page.locator('#gate-3 [title="Nhấn để xem ảnh phóng to"]:visible').first();
        assert.ok((await gallery.getAttribute('aria-label')).startsWith('Phóng to ảnh: '));
        await gallery.click();
        const dialog = page.getByRole('dialog', { name: 'Phóng to ảnh hành trình thanh xuân' });
        assert.ok(await dialog.isVisible());
        assert.equal(await page.evaluate(() => document.body.style.position), 'fixed');
        const lockedPosition = await page.evaluate(() => -parseFloat(document.body.style.top));
        await page.getByRole('button', { name: 'Ảnh tiếp theo' }).click();
        assert.ok((await dialog.innerText()).includes('2 / 5'));
        await page.keyboard.press('ArrowLeft');
        assert.ok((await dialog.innerText()).includes('1 / 5'));
        await page.keyboard.press('Escape');
        await dialog.waitFor({ state: 'detached' });
        assert.equal(await page.evaluate(() => document.body.style.position), '');
        assert.ok(Math.abs((await page.evaluate(() => window.scrollY)) - lockedPosition) < 2);
        await gallery.click();
        await dialog.click({ position: { x: 3, y: 3 } });
        await dialog.waitFor({ state: 'detached' });
        await gallery.focus();
        await page.keyboard.press('Enter');
        assert.ok(await dialog.isVisible());
        await page.keyboard.press('Escape');
        await dialog.waitFor({ state: 'detached' });
        assert.ok(await gallery.evaluate((element) => document.activeElement === element));
        await page.keyboard.press('Space');
        assert.ok(await dialog.isVisible());
        await page.keyboard.press('Escape');
        await dialog.waitFor({ state: 'detached' });

        const audioAtOpen = await page.evaluate(() => {
          const audio = window.__capturedAudio?.[0];
          return { src: audio?.getAttribute('src'), paused: audio?.paused, loop: audio?.loop, volume: audio?.volume };
        });
        assert.equal(audioAtOpen.src, '/sounds/nhac_nen.mp3');
        assert.equal(audioAtOpen.paused, false);
        assert.equal(audioAtOpen.loop, true);
        assert.equal(audioAtOpen.volume, 0.45);
        await page.getByRole('button', { name: 'Tạm dừng nhạc nền' }).click();
        assert.equal(await page.evaluate(() => window.__capturedAudio[0].paused), true);
        await page.getByRole('button', { name: 'Phát nhạc nền' }).click();
        assert.equal(await page.evaluate(() => window.__capturedAudio[0].paused), false);
        assert.equal(await page.evaluate(() => window.__capturedAudio.length), 1);

        await page.evaluate(() => {
          window.__copiedUrl = '';
          Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
          Object.defineProperty(navigator, 'clipboard', {
            configurable: true,
            value: { writeText: async (value) => { window.__copiedUrl = value; } },
          });
        });
        await page.locator('#gate-5').getByRole('button', { name: 'Chia sẻ thiệp mời' }).filter({ visible: true }).click();
        assert.ok((await page.evaluate(() => window.__copiedUrl)).includes('to=Nguy'));
        assert.ok(await page.getByText('ĐÃ SAO CHÉP LIÊN KẾT').filter({ visible: true }).isVisible());
        await page.evaluate(() => {
          window.__sharedData = null;
          Object.defineProperty(navigator, 'share', {
            configurable: true,
            value: async (data) => { window.__sharedData = data; },
          });
          Object.defineProperty(navigator, 'canShare', { configurable: true, value: undefined });
        });
        await page.locator('#gate-5').getByRole('button', { name: 'Chia sẻ thiệp mời' }).filter({ visible: true }).click();
        assert.ok((await page.evaluate(() => window.__sharedData?.url)).includes('to=Nguy'));
        assert.ok(await page.getByText('ĐÃ CHIA SẺ THIỆP').filter({ visible: true }).isVisible());
        const mapLinks = await page.locator('a[href^="https://maps.app.goo.gl/"]').all();
        assert.ok(mapLinks.length > 0);
        const urls = await Promise.all(mapLinks.map((link) => link.getAttribute('href')));
        assert.equal(new Set(urls).size, 1);
        assert.equal(urls[0], 'https://maps.app.goo.gl/Jh46wc4Pf2cr67wX6');
      }

      results.push(`${width}x${height}: opening lock, hero top, full bleed, scrolling OK`);
      await context.close();
    }

    const longName = 'Nguyễn Thị Minh Anh Trần Hoàng Gia Bảo Phương';
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    await page.goto(`${TARGET_URL}/?to=${encodeURIComponent(longName)}`, { waitUntil: 'networkidle' });
    assert.ok(await page.locator('aside').getByText(longName).filter({ visible: true }).isVisible());
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
    const cta = await page.getByRole('button', { name: 'Mở thiệp mời tốt nghiệp' }).filter({ visible: true }).boundingBox();
    assert.ok(cta.y >= 0 && cta.y + cta.height <= 844);
    await openInvitation(page);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
    const longSalutation = page.locator('#gate-2 p').filter({ hasText: longName }).filter({ visible: true }).first();
    assert.ok(await longSalutation.isVisible());
    assert.ok(await longSalutation.evaluate((element) => element.scrollWidth <= element.clientWidth + 1));
    await context.close();

    const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const reducedPage = await reduced.newPage();
    await reducedPage.goto(TARGET_URL, { waitUntil: 'networkidle' });
    await openInvitation(reducedPage);
    assert.equal(await reducedPage.locator('#gate-2 .font-script:visible').first().evaluate((element) => getComputedStyle(element).opacity), '1');
    await reduced.close();

    const afterEvent = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const afterEventPage = await afterEvent.newPage();
    await afterEventPage.clock.install({ time: new Date('2026-10-04T03:30:00.000Z') });
    await afterEventPage.goto(TARGET_URL, { waitUntil: 'networkidle' });
    await openInvitation(afterEventPage);
    assert.ok(await afterEventPage.locator('#gate-2').getByText('Buổi lễ đã diễn ra').filter({ visible: true }).first().isVisible());
    await afterEvent.close();

    assert.deepEqual(failures, [], `browser errors: ${failures.join('; ')}`);
    console.log(results.join('\n'));
    console.log('Lightbox, audio, Web Share and clipboard, Maps, long name, reduced motion, console: OK');
  } finally {
    await browser.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
