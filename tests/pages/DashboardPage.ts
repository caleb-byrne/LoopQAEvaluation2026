import { Page } from '@playwright/test';

export class DashboardPage {
    constructor(private page: Page) { }

    async navigateToProject(projectName: string) {
        await this.page.getByRole('button', { name: new RegExp(projectName) }).click();
        await this.page.waitForLoadState('load');
    }

    async verifyTaskTitleInColumn(taskName: string, columnName: string): Promise<boolean> {
        // Find the column heading
        const columnHeading = this.page.getByRole('heading', { name: new RegExp(columnName, 'i') });
        const columnExists = await columnHeading.isVisible().catch(() => false);

        if (!columnExists) return false;

        // Find the column container
        const columnContainer = columnHeading.locator('xpath=ancestor::*[contains(@class, "column") or contains(@class, "container") or contains(@class, "section")][1]');

        // Find the task heading within this specific column
        const taskHeading = columnContainer.getByRole('heading', { name: new RegExp(taskName, 'i') });
        return await taskHeading.isVisible().catch(() => false);
    }

    async verifyTaskHasTag(taskName: string, columnName: string, tag: string): Promise<boolean> {
        // Find the column heading
        const columnHeading = this.page.getByRole('heading', { name: new RegExp(columnName, 'i') });
        const columnExists = await columnHeading.isVisible().catch(() => false);

        if (!columnExists) return false;

        // Find the column container
        const columnContainer = columnHeading.locator('xpath=ancestor::*[contains(@class, "column") or contains(@class, "container") or contains(@class, "section")][1]');

        // Find the task heading within this specific column
        const taskHeading = columnContainer.getByRole('heading', { name: new RegExp(taskName, 'i') });
        const taskExists = await taskHeading.isVisible().catch(() => false);

        if (!taskExists) return false;

        // Find the task card container
        const taskCard = taskHeading.locator('xpath=ancestor::*[contains(@class, "card") or contains(@class, "task") or contains(@class, "item")][1]');

        // Find the tag within this specific card only
        const tagElement = taskCard.getByText(new RegExp(`^${tag}$`, 'i'));
        return await tagElement.isVisible().catch(() => false);
    }
}
