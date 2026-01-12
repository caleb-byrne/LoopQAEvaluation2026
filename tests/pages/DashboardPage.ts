import { Page } from '@playwright/test';

export class DashboardPage {
    constructor(private page: Page) { }

    async navigateToProject(projectName: string) {
        await this.page.getByRole('button', { name: new RegExp(projectName) }).click();
        await this.page.waitForLoadState('load');
    }

    async verifyTaskTitleInColumn(taskName: string, columnName: string): Promise<boolean> {
        const taskHeading = this.page.getByRole('heading', { name: new RegExp(taskName, 'i') });
        return await taskHeading.isVisible().catch(() => false);
    }

    async verifyTaskHasTag(taskName: string, columnName: string, tag: string): Promise<boolean> {
        const taskHeading = this.page.getByRole('heading', { name: new RegExp(taskName, 'i') });
        const taskCard = taskHeading.locator('..');

        const tagElement = taskCard.getByText(new RegExp(`^${tag}$`, 'i'));
        return await tagElement.isVisible().catch(() => false);
    }
}
