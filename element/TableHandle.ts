import { Locator, Page, expect } from "@playwright/test";

export default class TableHandle {
    constructor(private readonly page: Page) { }

    async getColumnIndex(columnname: string, tableXpath: string): Promise<number> {
        const table = await this.page.$(tableXpath);
        const headerContent = await table?.$$eval('th', ths => ths.map(th => th.textContent));
        console.log(headerContent);
        const index_of_header = headerContent?.findIndex(th => th === columnname);
        console.log('index=' + index_of_header);

        let tdIndex = 0;
        if (index_of_header != null) {
            tdIndex = index_of_header + 1;
        }

        return tdIndex;
    }

    async getColumnContent(tdIndex: number, tableXpath: string): Promise<Array<string>> {
        const tdElements = this.page.locator(``+ tableXpath+ `//td[${tdIndex}]`);
        const tdTexts = await tdElements.locator(':scope').allInnerTexts();
        return tdTexts;
    }

    async SoftContent(arr: Array<string>): Promise<Array<string>> {
        const arrSort = arr?.slice().sort();
        console.log(arrSort);
        return arrSort;
    }

    async VerifyTableSorted(columnname: string, tableXpath: string): Promise<boolean> {
        const index = await this.getColumnIndex(columnname, tableXpath);
        const columnContent = await this.getColumnContent(index, tableXpath);
        const columnContentSort = await this.SoftContent(columnContent);

        const isSorted = JSON.stringify(columnContentSort) === JSON.stringify(columnContent);
        console.log(isSorted)
        return isSorted;
    }
}

