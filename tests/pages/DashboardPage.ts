import { Page } from '@playwright/test';

export class DashboardPage {
    constructor(private page: Page) { }

    async navigateToProject(projectName: string) {
        await this.page.getByRole('button', { name: new RegExp(projectName) }).click();
        await this.page.waitForLoadState('load');
    }

    async verifyTaskTitleInColumn(taskName: string, columnName: string): Promise<boolean> {
        // Find the column heading h2 with the column name
        const columnHeading = this.page.locator(`//h2[contains(text(), '${columnName}')]`);
        const columnExists = await columnHeading.isVisible().catch(() => false);

        if (!columnExists) return false;

        // Find the task h3 heading within this column's scope (looking for h3 after the h2)
        const taskHeading = this.page.locator(`//h2[contains(text(), '${columnName}')]/ancestor::*//h3[contains(text(), '${taskName}')]`).first();
        return await taskHeading.isVisible().catch(() => false);
    }

    async verifyTaskHasTag(taskName: string, columnName: string, tag: string): Promise<boolean> {
        // Find the column heading h2 with the column name
        const columnHeading = this.page.locator(`//h2[contains(text(), '${columnName}')]`);
        const columnExists = await columnHeading.isVisible().catch(() => false);

        if (!columnExists) return false;

        // Find the task h3 heading within this column's scope
        const taskHeading = this.page.locator(`//h2[contains(text(), '${columnName}')]/ancestor::*//h3[contains(text(), '${taskName}')]`).first();
        const taskExists = await taskHeading.isVisible().catch(() => false);

        if (!taskExists) return false;

        // Find the tag span within this task's scope (looking for span after the h3)
        const tagElement = this.page.locator(`//h3[contains(text(), '${taskName}')]/ancestor::*//span[contains(text(), '${tag}')]`).first();
        return await tagElement.isVisible().catch(() => false);
    }
}
