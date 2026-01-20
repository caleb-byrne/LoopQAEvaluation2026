import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    constructor(private page: Page) { }

    async navigateToProject(projectName: string) {
        const projectButton = this.page.getByRole('button', { name: new RegExp(projectName) });
        await projectButton.click({ timeout: 10000 });
        await this.page.waitForLoadState('load');
    }

    /**
     * Helper method to find the column container by column name
     * Returns the container (generic div) that holds all tasks for this column
     */
    private async getColumnContainer(columnName: string): Promise<Locator | null> {
        const columnHeading = this.page.getByRole('heading', { level: 2, name: new RegExp(columnName) });
        const columnExists = await columnHeading.isVisible({ timeout: 5000 }).catch(() => false);

        if (!columnExists) {
            console.error(`Column "${columnName}" not found on the page`);
            return null;
        }

        // The column container is a sibling generic element after the heading
        return columnHeading.locator(`xpath=following-sibling::*[1]`);
    }

    /**
     * Helper method to find a task card by task name within a column container
     */
    private async getTaskCardInContainer(columnContainer: Locator, taskName: string): Promise<Locator | null> {
        // Find all h3 headings (task titles) in this column
        const taskHeading = columnContainer.getByRole('heading', { level: 3, name: new RegExp(taskName) });
        const taskExists = await taskHeading.isVisible({ timeout: 5000 }).catch(() => false);

        if (!taskExists) {
            console.error(`Task "${taskName}" not found in column`);
            return null;
        }

        // The task card is the ancestor generic container of the h3
        return taskHeading.locator(`xpath=ancestor::*[2]`);
    }

    async verifyTaskTitleInColumn(taskName: string, columnName: string): Promise<boolean> {
        const columnContainer = await this.getColumnContainer(columnName);
        if (!columnContainer) return false;

        const taskHeading = columnContainer.getByRole('heading', { level: 3, name: new RegExp(taskName) });
        return await taskHeading.isVisible().catch(() => false);
    }

    async verifyTaskHasTag(taskName: string, columnName: string, tag: string): Promise<boolean> {
        const columnContainer = await this.getColumnContainer(columnName);
        if (!columnContainer) return false;

        const taskCard = await this.getTaskCardInContainer(columnContainer, taskName);
        if (!taskCard) return false;

        // Find the tag text within this specific task card
        const tagElement = taskCard.getByText(new RegExp(`^${tag}$`));
        return await tagElement.isVisible().catch(() => false);
    }
}
