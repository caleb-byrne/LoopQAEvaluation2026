import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) { }

    async navigate() {
        await this.page.goto('/');
    }

    async login(email: string, password: string) {
        await this.page.getByRole('textbox', { name: /username/i }).fill(email);
        await this.page.getByRole('textbox', { name: /password/i }).fill(password);
        await this.page.getByRole('button', { name: /sign in/i }).click();
        await this.page.getByRole('button').first().waitFor({ state: 'visible', timeout: 10000 });
    }
}
