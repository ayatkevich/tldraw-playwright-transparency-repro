# tldraw Playwright Transparency Repro

Minimal Vite + React + tldraw + Playwright UI Mode project for inspecting a Playwright-only tldraw background issue.

## Reproduction

```sh
npm install
npm run test:e2e:ui
```

Run the `renders the tldraw page` test in Playwright UI Mode. The test opens the tldraw page, waits for the canvas to mount, and pauses so the browser remains available for manual inspection.

`npm run test:e2e` is also mapped to Playwright UI Mode.

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
