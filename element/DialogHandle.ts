import { Page, expect } from "@playwright/test";

export default class DialogHandle {
    constructor(private readonly page: Page) {}

    async cannotDeletePageDialogHandle(cannotDeleteMessage: string, deletePageMessage: string): Promise<void> {
        this.page.once('dialog', async dialog => {
            this.page.once('dialog', async dialog => {
                await expect.soft(dialog.message().trim()).toEqual(cannotDeleteMessage);
                dialog.dismiss();
            });
            await expect(dialog.message()).toEqual(deletePageMessage);
            dialog.accept();
        });
    }

    async deletePageDialogHandle(deletePageMessage: string): Promise<void> {
        this.page.once('dialog', async dialog => {
            await expect.soft(dialog.message().trim()).toEqual(deletePageMessage);
            dialog.accept();
        });
    }
}