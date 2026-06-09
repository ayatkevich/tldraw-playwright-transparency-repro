import { writeFile } from 'node:fs/promises'
import { expect, test, type Page } from '@playwright/test'

type ElementBackground = {
  backgroundColor: string
  className: string
  display: string
  id: string | null
  opacity: string
  position: string
  rect: {
    height: number
    width: number
    x: number
    y: number
  }
  tagName: string
  testId: string | null
  visibility: string
}

type BackgroundSample = {
  center: {
    x: number
    y: number
  }
  elements: ElementBackground[]
  label: string
  timeMs: number
  viewport: {
    height: number
    width: number
  }
}

test('keeps an opaque tldraw canvas background in Playwright', async ({
  page,
}, testInfo) => {
  const samples: BackgroundSample[] = []

  const record = async (label: string) => {
    samples.push(await sampleCenterBackgroundStack(page, label))
    await page.screenshot({
      omitBackground: true,
      path: testInfo.outputPath(`${label}.png`),
    })
  }

  await page.goto('/', { waitUntil: 'commit' })
  await record('00-navigation-commit')

  for (const delayMs of [50, 100, 250, 500, 1000, 2000]) {
    await page.waitForTimeout(delayMs)
    await record(`after-${delayMs}ms`)
  }

  await expect(page.getByTestId('tldraw-shell')).toBeVisible()
  await expect(page.locator('.tl-container')).toBeVisible()
  await expect(page.locator('.tl-background')).toBeVisible()
  await record('loaded')

  await page.waitForTimeout(3000)
  await record('settled-after-3s')

  await page.waitForTimeout(7000)
  await record('settled-after-10s')

  const backgroundSamplesPath = testInfo.outputPath('background-samples.json')
  await writeFile(backgroundSamplesPath, JSON.stringify(samples, null, 2))
  await testInfo.attach('background-samples.json', {
    contentType: 'application/json',
    path: backgroundSamplesPath,
  })

  const tldrawBackgroundColor = await page
    .locator('.tl-background')
    .evaluate((element) => getComputedStyle(element).backgroundColor)

  expect(tldrawBackgroundColor).not.toBe('rgba(0, 0, 0, 0)')

  const loadedSample = samples.at(-1)
  const opaqueCenterBackgrounds =
    loadedSample?.elements.filter((element) =>
      isOpaqueBackgroundColor(element.backgroundColor),
    ) ?? []

  expect(
    opaqueCenterBackgrounds,
    JSON.stringify(loadedSample, null, 2),
  ).not.toHaveLength(0)
})

async function sampleCenterBackgroundStack(
  page: Page,
  label: string,
): Promise<BackgroundSample> {
  return page.evaluate((sampleLabel) => {
    const center = {
      x: Math.floor(window.innerWidth / 2),
      y: Math.floor(window.innerHeight / 2),
    }

    return {
      center,
      elements: document.elementsFromPoint(center.x, center.y).map((element) => {
        const style = getComputedStyle(element)
        const rect = element.getBoundingClientRect()

        return {
          backgroundColor: style.backgroundColor,
          className:
            typeof element.className === 'string' ? element.className : '',
          display: style.display,
          id: element.getAttribute('id'),
          opacity: style.opacity,
          position: style.position,
          rect: {
            height: Math.round(rect.height),
            width: Math.round(rect.width),
            x: Math.round(rect.x),
            y: Math.round(rect.y),
          },
          tagName: element.tagName.toLowerCase(),
          testId: element.getAttribute('data-testid'),
          visibility: style.visibility,
        }
      }),
      label: sampleLabel,
      timeMs: Math.round(performance.now()),
      viewport: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
    }
  }, label)
}

function isOpaqueBackgroundColor(backgroundColor: string) {
  return (
    backgroundColor !== 'transparent' &&
    backgroundColor !== 'rgba(0, 0, 0, 0)' &&
    !backgroundColor.endsWith(', 0)') &&
    !backgroundColor.endsWith(' 0)')
  )
}
