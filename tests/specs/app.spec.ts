import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import testData from '../data/testData.json';

const { credentials, testCases } = testData;

test.describe('Data-Driven Task Verification Tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(credentials.email, credentials.password);
    });

    test.describe('Verify Login State', () => {
        test('should successfully log in and display dashboard', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const isLoggedIn = await loginPage.isLoggedIn();
            expect(isLoggedIn).toBe(true);
        });
    });

    test.describe('Task Verification', () => {
        testCases.forEach((testCase) => {
            test(`${testCase.id}: Verify "${testCase.task}" in ${testCase.expectedColumn}`, async ({ page }) => {
                const dashboardPage = new DashboardPage(page);

                await dashboardPage.navigateToProject(testCase.project);

                // Verify task title exists in the correct column
                const taskTitleFound = await dashboardPage.verifyTaskTitleInColumn(
                    testCase.task,
                    testCase.expectedColumn
                );
                expect(taskTitleFound).toBe(true);

                // Verify each expected tag exists in the task card
                for (const tag of testCase.expectedTags) {
                    const tagFound = await dashboardPage.verifyTaskHasTag(
                        testCase.task,
                        testCase.expectedColumn,
                        tag
                    );
                    expect(tagFound).toBe(true);
                }
            });
        });
    });
});
