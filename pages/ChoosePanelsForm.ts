import { Locator, Page, expect } from "@playwright/test";

export default class ChoosePanelsForm {
    readonly choosePanelsForm: Locator = this.page.locator('//div[@class="ccpanels" and @style="display: block;"]');
    constructor(private readonly page: Page) { }

    async choosePanelsFormDisplay(): Promise<void> {
        await expect(this.choosePanelsForm).toBeVisible();
    }
}