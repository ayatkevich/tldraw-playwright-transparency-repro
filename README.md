# tldraw Playwright Transparency Repro

Minimal Vite + React + tldraw + Playwright project for a Playwright-only tldraw background issue.

## Reproduction

```sh
npm install
npm run test:e2e:ui
```

Open the `tldraw-background.spec.ts` test in Playwright UI mode. The expected canvas background is the default tldraw beige background. In Playwright, the startup timeline can show a white spinner state and then the canvas appears transparent in the trace/screenshot viewer.

The test records:

- Playwright trace artifacts.
- `omitBackground: true` screenshots at navigation commit, early startup delays, loaded state, and 3s/10s settled states.
- `background-samples.json` with computed background styles for the element stack at the center of the viewport.

## Commands

```sh
npm run dev
npm run test:e2e
npm run test:e2e:headed
npm run test:e2e:ui
```

## Exact Package Versions

- `@playwright/test@1.60.0`
- `@vitejs/plugin-react@6.0.2`
- `react@19.2.7`
- `react-dom@19.2.7`
- `tldraw@5.1.0`
- `typescript@6.0.3`
- `vite@8.0.16`

The full dependency graph is pinned in `package-lock.json`.

## Setup References

- tldraw quick start: https://tldraw.dev/quick-start
- Playwright installation: https://playwright.dev/docs/intro
- Vite React scaffolding: https://vite.dev/guide/
