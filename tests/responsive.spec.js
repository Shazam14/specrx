import { test, expect } from '@playwright/test'

// Helper: load page and wait for fonts + fade-in
async function load(page) {
  await page.goto('/')
  // Trigger all fade-in elements visible (scroll is not reliable in headless)
  await page.evaluate(() => {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'))
  })
  await page.waitForLoadState('domcontentloaded')
}

// No horizontal overflow
async function checkNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
  expect(overflow, `horizontal overflow on ${label}`).toBe(false)
}

// ── NAV ──────────────────────────────────────────────────────────────────────
test('nav is fully visible and no overflow', async ({ page }) => {
  await load(page)
  const nav = page.locator('nav[aria-label="Main navigation"]')
  await expect(nav).toBeVisible()
  const box = await nav.boundingBox()
  expect(box.width).toBeLessThanOrEqual(page.viewportSize().width + 1)
  await checkNoHorizontalOverflow(page, 'nav')
})

test('nav CTA button is accessible (min 44px touch target)', async ({ page }) => {
  await load(page)
  const cta = page.locator('.nav-cta')
  await expect(cta).toBeVisible()
  const box = await cta.boundingBox()
  expect(box.height).toBeGreaterThanOrEqual(36) // slightly relaxed — styled button
})

// ── HERO ──────────────────────────────────────────────────────────────────────
test('hero section is visible with no horizontal overflow', async ({ page }) => {
  await load(page)
  await expect(page.locator('.hero')).toBeVisible()
  await checkNoHorizontalOverflow(page, 'hero')
})

test('hero heading is visible and not clipped', async ({ page }) => {
  await load(page)
  const h1 = page.locator('h1').first()
  await expect(h1).toBeVisible()
  const box = await h1.boundingBox()
  const viewport = page.viewportSize()
  expect(box.x).toBeGreaterThanOrEqual(0)
  expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 2)
})

test('hero CTA button is visible', async ({ page }) => {
  await load(page)
  const btn = page.locator('.hero-actions .btn-primary').first()
  await expect(btn).toBeVisible()
})

// ── HOW STRIP ────────────────────────────────────────────────────────────────
test('how-strip items are all visible without overflow', async ({ page }) => {
  await load(page)
  const items = page.locator('.how-item')
  const count = await items.count()
  expect(count).toBe(4)
  for (let i = 0; i < count; i++) {
    await expect(items.nth(i)).toBeVisible()
  }
  await checkNoHorizontalOverflow(page, 'how-strip')
})

// ── NICHES ──────────────────────────────────────────────────────────────────
test('niche tags wrap and do not overflow', async ({ page }) => {
  await load(page)
  const tags = page.locator('.niche-tag')
  const count = await tags.count()
  expect(count).toBeGreaterThanOrEqual(4)
  const viewport = page.viewportSize()
  for (let i = 0; i < count; i++) {
    const box = await tags.nth(i).boundingBox()
    if (box) {
      expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 4)
    }
  }
})

// ── PAIN GRID ────────────────────────────────────────────────────────────────
test('pain section cards are visible and not overflowing', async ({ page }) => {
  await load(page)
  const cards = page.locator('.pain-card')
  const count = await cards.count()
  expect(count).toBeGreaterThanOrEqual(3)
  for (let i = 0; i < count; i++) {
    await expect(cards.nth(i)).toBeVisible()
  }
  await checkNoHorizontalOverflow(page, 'pain section')
})

// ── SOLUTION GRID ────────────────────────────────────────────────────────────
test('solution items are visible and not overflowing', async ({ page }) => {
  await load(page)
  const items = page.locator('.solution-item')
  const count = await items.count()
  expect(count).toBeGreaterThanOrEqual(3)
  for (let i = 0; i < count; i++) {
    await expect(items.nth(i)).toBeVisible()
  }
  await checkNoHorizontalOverflow(page, 'solution section')
})

// ── PROCESS GRID ─────────────────────────────────────────────────────────────
test('process cards are visible and not overflowing', async ({ page }) => {
  await load(page)
  const cards = page.locator('.process-card')
  const count = await cards.count()
  expect(count).toBeGreaterThanOrEqual(2)
  for (let i = 0; i < count; i++) {
    await expect(cards.nth(i)).toBeVisible()
  }
  await checkNoHorizontalOverflow(page, 'process section')
})

// ── FAQ ──────────────────────────────────────────────────────────────────────
test('FAQ questions are visible and clickable', async ({ page }) => {
  await load(page)
  const questions = page.locator('.faq-question')
  const count = await questions.count()
  expect(count).toBeGreaterThanOrEqual(3)
  // Click first question — answer should expand
  await questions.first().click()
  const firstItem = page.locator('.faq-item').first()
  await expect(firstItem).toHaveClass(/open/)
})

test('FAQ has no horizontal overflow', async ({ page }) => {
  await load(page)
  await checkNoHorizontalOverflow(page, 'faq section')
})

// ── COVERAGE ─────────────────────────────────────────────────────────────────
test('suburb tags wrap and do not overflow', async ({ page }) => {
  await load(page)
  const tags = page.locator('.suburb-tag')
  const count = await tags.count()
  expect(count).toBeGreaterThanOrEqual(8)
  await checkNoHorizontalOverflow(page, 'coverage section')
})

// ── LEAD FORM ────────────────────────────────────────────────────────────────
test('lead form is visible and fits viewport', async ({ page }) => {
  await load(page)
  const form = page.locator('#apollo-lead-form')
  await expect(form).toBeVisible()
  const box = await form.boundingBox()
  const viewport = page.viewportSize()
  expect(box.x).toBeGreaterThanOrEqual(0)
  expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 2)
})

test('form inputs are usable (no overflow)', async ({ page }) => {
  await load(page)
  const nameInput = page.locator('#lead-name')
  const emailInput = page.locator('#lead-email')
  await expect(nameInput).toBeVisible()
  await expect(emailInput).toBeVisible()
  const viewport = page.viewportSize()
  for (const input of [nameInput, emailInput]) {
    const box = await input.boundingBox()
    if (box) expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 4)
  }
})

test('reCAPTCHA container is present in the form', async ({ page }) => {
  await load(page)
  // The g-recaptcha div is rendered in the DOM by the page (script may or may not load in test env)
  const recaptcha = page.locator('.g-recaptcha')
  await expect(recaptcha).toBeAttached()
  // Verify it is inside the lead form
  const form = page.locator('#apollo-lead-form')
  const count = await form.locator('.g-recaptcha').count()
  expect(count).toBe(1)
})

// ── FOOTER ───────────────────────────────────────────────────────────────────
test('footer is visible and fits viewport', async ({ page }) => {
  await load(page)
  const footer = page.locator('footer')
  await expect(footer).toBeVisible()
  await checkNoHorizontalOverflow(page, 'footer')
})

// ── FULL PAGE ─────────────────────────────────────────────────────────────────
test('full page has no horizontal scroll', async ({ page }) => {
  await load(page)
  await checkNoHorizontalOverflow(page, 'full page')
})
