import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/specs',
    testMatch: '**/*.spec.ts',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    timeout: 60000,
    expect: {
        timeout: 10000,
    },
    reporter: 'html',
    use: {
        baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app/',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        navigationTimeout: 30000,
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },


        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },
    ],

    webServer: undefined,
});
