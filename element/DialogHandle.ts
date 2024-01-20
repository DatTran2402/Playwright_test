import { Page, expect } from "@playwright/test";

export default class DialogHandle {
    constructor(private readonly page: Page) {}

    async cannotDeletePageDialogHandle(cannotDeleteMessage: string, deletePageMessage: string): Promise<void> {
        this.page.once('dialog', async dialog => {
            this.page.once('dialog', async dialog => {
                await expect.soft(dialog.message().trim()).toEqual(cannotDeleteMessage);
                console.log(dialog.message());
                dialog.dismiss();
            });
            await expect(dialog.message()).toEqual(deletePageMessage);
            console.log(dialog.message());
            dialog.accept();
        });
    }

    async deletePageDialogHandle(deletePageMessage: string): Promise<void> {
        this.page.once('dialog', async dialog => {
            await expect.soft(dialog.message().trim()).toEqual(deletePageMessage);
            console.log(dialog.message());
            dialog.accept();
        });
    }
}