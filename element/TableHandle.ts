import { Page, expect } from "@playwright/test";

export default class TableHandle {
    constructor(private readonly page: Page) { }

    async getColumnIndex(columnname: string, tableXpath: string): Promise<number> {
        const table = await this.page.$(tableXpath);
        const headerContent = await table?.$$eval('th', ths => ths.map(th => th.textContent));
        const index_of_header = headerContent?.findIndex(th => th === columnname);

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
        return arrSort;
    }

    async VerifyTableDataEqual(arr1: Array<string>, columnname: string, tableXpath: string): Promise<void> {
        const index = await this.getColumnIndex('Data Profile', tableXpath);
        const tableContent = await this.getColumnContent(index, tableXpath);
        const isEqual = JSON.stringify(arr1) === JSON.stringify(tableContent);
        
        await expect(isEqual).toBe(true);
    }

    async VerifyTableSorted(columnname: string, tableXpath: string): Promise<void> {
        const index = await this.getColumnIndex(columnname, tableXpath);
        const columnContent = await this.getColumnContent(index, tableXpath);
        const columnContentSort = await this.SoftContent(columnContent);
        const isSorted = JSON.stringify(columnContent) === JSON.stringify(columnContentSort);
        await expect(isSorted).toBe(true);
    }
}

