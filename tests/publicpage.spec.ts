import { expect, test } from '@playwright/test';
import DashboardMainPage from '../pages/dashboardMainPage';
import LoginPage from '../pages/LoginPage';
import AddPageForm from '../pages/AddPageForm';

test('Verify that "Public" pages can be visible and accessed by all users of working repository', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.go();
    await loginPage.login('administrator', '');

    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.clickAddNewPage();

    const addPageForm = new AddPageForm(page);
    await addPageForm.addNewPage('NewPage', 'Select parent', '2', 'Execution Dashboard', true);
    await addPageForm.newPageIsDisplay('NewPage');
})

test('Verify that user can remove any main parent page except "Overview" page successfully and the order of pages stays persistent as long as there is not children page under it', async ({ page }) => {
    const deletePageMessage ='Are you sure you want to remove this page?';
    const pagename = 'NewPage';
    const nonchildXpath = '//a[text()="'+ pagename +'" and @class="active"]';
    const haschildXpath = '//a[text()="'+ pagename +'" and @class="active haschild"]';
    const loginPage = new LoginPage(page);
    await loginPage.go();
    await loginPage.login('administrator', '');

    const dashboardMainPage = new DashboardMainPage(page);
    // await dashboardMainPage.clickAddNewPage();

    // const addPageForm = new AddPageForm(page);
    // await addPageForm.addNewPage('NewPage', 'Select parent', '2', 'Execution Dashboard', true);
    // await addPageForm.newPageIsDisplay('NewPage');
    await dashboardMainPage.navigateToNewPage(pagename);
    page.on('dialog', dialog => dialog.accept());
    await dashboardMainPage.removePage(pagename);

    if (await page.locator(haschildXpath).isVisible()) {
        throw new Error('This page has children page!');
    }
    else if (await page.locator(nonchildXpath).isVisible()) {
        page.on('dialog', dialog => {
            expect(dialog.message()).toBe(deletePageMessage);
            dialog.accept()
        });
        await dashboardMainPage.removePage(pagename);
    }
})