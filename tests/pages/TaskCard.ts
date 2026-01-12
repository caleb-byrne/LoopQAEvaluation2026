import { Page, Locator } from '@playwright/test';

export class TaskCard {
    constructor(private page: Page, private taskLocator: Locator, private taskName: string) { }

    async click() {
        await this.taskLocator.click();
    }
}
