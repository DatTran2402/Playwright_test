import { Locator, Page } from "@playwright/test";

export default class PanelsPage {
    readonly addNewLink: Locator = this.page.locator('//a[text()="Add New"]');
    constructor(private readonly page: Page) { }

    async clickOnAddNewLink(): Promise<void> {
        await this.addNewLink.click();
    }
}