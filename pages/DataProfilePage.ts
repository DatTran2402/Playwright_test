import { Locator, Page, expect } from "@playwright/test";

export default class DataProfilePage {
    readonly addNewLink: Locator = this.page.locator('xpath=//a[text()="Add New"]');
    readonly profileNameTxt: Locator = this.page.locator('#txtProfileName');
    readonly FieldsCbb: Locator = this.page.locator('#cbbFields');
    readonly AddLevelBtn: Locator = this.page.locator('#btnAddSortField');
    constructor(private readonly page: Page) { }

    async clickAddNewLink(): Promise<void> {
        await this.addNewLink.click();
    }

    async clickControlBtn(control: string): Promise<void> {
        const controlXpath = '//input[@value="'+ control +'"]';
        await this.page.locator(controlXpath).click();
    }

    async verifyProfileSettingDisplay(page: string): Promise<Boolean> {
        const pageXpath = '//td[@class="profilesettingheader"]';
        if (await this.page.locator(pageXpath).textContent() === page)
            return true;
        else return false;
    }

    async verifySortItemDisplay(sortname: string): Promise<void> {
        const sortnameXpath = '//span[@class="sortFieldName" and text()="'+ sortname +'"]';
        await expect(this.page.locator(sortnameXpath)).toBeVisible();
    }
}