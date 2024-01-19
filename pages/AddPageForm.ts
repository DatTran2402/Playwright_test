import { Locator, Page, expect } from "@playwright/test";

export default class AddPageForm {
    readonly newPageFormHeader: Locator = this.page.locator('xpath=//h2[text()="New Page"]');
    readonly pageNameTxt: Locator = this.page.locator('#name');
    readonly parentPageDdb: Locator = this.page.locator('#parent');
    readonly columnNumberDdb: Locator = this.page.locator('#columnnumber');
    readonly displayAfterDdb: Locator = this.page.locator('#afterpage');
    readonly publicCheckbox: Locator = this.page.locator('#ispublic');
    readonly okBtn: Locator = this.page.locator('#OK');
    readonly cancelBtn: Locator = this.page.locator('#Cancel');
    constructor(private readonly page: Page) { }

    async addNewPage(pagename: string, parentpage: string, columnnumber: string, afterpage: string, ispublic: boolean): Promise<void> {
        await expect(this.pageNameTxt).toBeVisible();
        await this.pageNameTxt.fill(pagename);
        await this.parentPageDdb.selectOption(parentpage);
        await this.columnNumberDdb.selectOption(columnnumber);
        await this.displayAfterDdb.selectOption(afterpage);
        await this.publicCheckbox.setChecked(ispublic);
        await this.okBtn.click();
    }

    async newPageIsDisplay(pagename: string): Promise<boolean> {
        const dynamicXpath = '//a[text()="'+ pagename + '"]';
        console.log(dynamicXpath);
        const isDisplay = await this.page.locator(dynamicXpath).isVisible();
        console.log(isDisplay);
        return isDisplay;
    }
}