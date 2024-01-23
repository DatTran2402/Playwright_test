import { Locator, Page, expect } from "@playwright/test";

export default class DataProfilePage {
    readonly addNewLink: Locator = this.page.locator('xpath=//a[text()="Add New"]');
    readonly profileNameTxt: Locator = this.page.locator('#txtProfileName');
    readonly SortFieldsCbb: Locator = this.page.locator('#cbbFields');
    readonly AddLevelBtn: Locator = this.page.locator('#btnAddSortField');
    constructor(private readonly page: Page) { }

    async clickAddNewLink(): Promise<void> {
        await this.addNewLink.click();
    }

    async clickControlBtn(control: string): Promise<void> {
        const controlXpath = '//input[@value="'+ control +'"]';
        await this.page.locator(controlXpath).click();
    }

    async gotoProfileSettingOptionPage(pageheader: string): Promise<void> {
        const pageXpath = '//td[@class="profilesettingheader"]';
        // if (await this.page.locator(pageXpath).textContent() === page)
        //     return true;
        // else return false;
        let header = await this.page.locator(pageXpath).textContent();
        while (header != pageheader) {
            this.clickControlBtn('Next');
            await this.page.waitForTimeout(1000);
            header = await this.page.locator(pageXpath).textContent();
        }
    }

    async verifySortItemDisplay(sortname: string): Promise<void> {
        await this.SortFieldsCbb.selectOption(sortname);
        await this.AddLevelBtn.click();
        const sortnameXpath = '//span[@class="sortFieldName" and text()="'+ sortname +'"]';
        await expect(this.page.locator(sortnameXpath)).toBeVisible();
    }


}