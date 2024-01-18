import { Locator, Page, expect } from "@playwright/test";

export default class AddPanelsForm {
    readonly addPanelsFormHeader: Locator = this.page.locator('xpath=//span[text()="Add New Panel"]');
    readonly dataProfileCbb: Locator = this.page.locator('#cbbProfile');
    readonly displayNameTxt: Locator = this.page.locator('#txtDisplayName');
    readonly seriesCbb: Locator = this.page.locator('#cbbSeriesField');
    readonly okBtn: Locator = this.page.locator('#OK');
    readonly okBtn2: Locator = this.page.locator('xpath = //input[contains(@onclick, "addPanelToPage")]');
    readonly cancelBtn: Locator = this.page.locator('#Cancel');
    constructor(private readonly page: Page) { }

    async addNewPanels(type: string, dataprofile: string ,displayname: string, series: string): Promise<void> {
        const typeXpath = '//label[contains(text(), "' + type + '")]/input';

        await expect(this.addPanelsFormHeader).toBeVisible();
        await this.page.locator(typeXpath).check();
        await this.dataProfileCbb.selectOption(dataprofile);
        await this.displayNameTxt.fill(displayname);
        await this.seriesCbb.selectOption(series);
        await this.okBtn.click();
        await this.okBtn2.click();
    }

    async addPanelFormDisplay(): Promise<void> {
        await expect(this.addPanelsFormHeader).toBeVisible();
    }
}