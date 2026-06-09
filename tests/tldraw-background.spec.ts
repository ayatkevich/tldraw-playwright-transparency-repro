import { test } from '@playwright/test'

test('renders the tldraw page', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('tldraw-shell').waitFor()
  await page.locator('.tl-container').waitFor()
  await page.waitForTimeout(2000)
  await page.pause()
})
