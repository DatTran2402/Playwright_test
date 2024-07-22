import { expect, test } from '@playwright/test';
import DashboardMainPage from '../pages/dashboardMainPage';
import LoginPage from '../pages/LoginPage';
import AddPageForm from '../pages/AddPageForm';
import DialogHandle from '../element/DialogHandle';

test('Verify that "Public" pages can be visible and accessed by all users of working repository', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const addPageForm = new AddPageForm(page);

    await loginPage.go();
    await loginPage.login('administrator', '');

    await dashboardMainPage.clickAddNewPage();

    await addPageForm.addNewPage('NewPage', 'Select parent', '2', 'Execution Dashboard', true);
    await dashboardMainPage.logout();
    
    await loginPage.login('test', 'TEST');

    await expect(addPageForm.newPageIsDisplay('NewPage')).toBe(true);
    await dashboardMainPage.navigateToParentPage('NewPage');
})

test('Verify that user can remove any main parent page except "Overview" page successfully and the order of pages stays persistent as long as there is not children page under it', async ({ page }) => {
    const deletePageMessage ='Are you sure you want to remove this page?';
    const cannotDeleteMessage="Cannot delete page 'Test' since it has child page(s).";
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const addPageForm = new AddPageForm(page);
    const dialogHandle = new DialogHandle(page);

    await loginPage.go();
    await loginPage.login('administrator', '');

    await dashboardMainPage.clickAddNewPage();

    await addPageForm.addNewPage('Test', '', '2', 'Execution Dashboard', true);

    await dashboardMainPage.clickAddNewPage();
    
    await addPageForm.addNewPage('TestChild', 'Test', '2', '', true);

    await dashboardMainPage.navigateToParentPage('Test');
    await dialogHandle.cannotDeletePageDialogHandle(cannotDeleteMessage, deletePageMessage);
    await dashboardMainPage.removePage();

    await dashboardMainPage.navigateToChildPage('Test', 'TestChild');
    await dialogHandle.deletePageDialogHandle(deletePageMessage);
    await dashboardMainPage.removePage();

    await dashboardMainPage.navigateToParentPage('Test');
    await dialogHandle.deletePageDialogHandle(deletePageMessage);
    await dashboardMainPage.removePage();
})