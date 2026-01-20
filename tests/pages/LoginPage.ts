import { Page, expect } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) { }

    async navigate() {
        await this.page.goto('/');
        // Wait for login form to be ready
        await expect(this.page.getByRole('heading', { name: /project board login/i })).toBeVisible();
    }

    async login(email: string, password: string) {
        await this.page.getByRole('textbox', { name: /username/i }).fill(email);
        await this.page.getByRole('textbox', { name: /password/i }).fill(password);
        await this.page.getByRole('button', { name: /sign in/i }).click();
        // Wait for dashboard to load by checking for the Projects heading
        await expect(this.page.getByRole('heading', { name: /projects/i })).toBeVisible({ timeout: 15000 });
    }

    async isLoggedIn(): Promise<boolean> {
        return await this.page.getByRole('heading', { name: /projects/i }).isVisible().catch(() => false);
    }
}
