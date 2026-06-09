import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://127.0.0.1:42817',
    viewport: { width: 1000, height: 700 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 42817 --strictPort',
    reuseExistingServer: true,
    url: 'http://127.0.0.1:42817',
  },
})
