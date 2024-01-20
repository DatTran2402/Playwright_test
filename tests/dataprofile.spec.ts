import { expect, test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardMainPage from '../pages/dashboardMainPage';
import DataProfilePage from '../pages/DataProfilePage';
import TableHandle from '../element/TableHandle';
import DataHandle from '../element/DataHandle';

test('Verify that all Pre-set Data Profiles are populated correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const dataHandle = new DataHandle();
    const tableHandle = new TableHandle(page);
    const tableXpath = '//table[@class="GridView"]'

    await loginPage.go();
    await loginPage.login('administrator', '');

    await dashboardMainPage.navigateToDataProfliesPage();
    const dataFromFile = await dataHandle.getDataFormFileToArray('data.txt');
    console.log(dataFromFile);

    const index = await tableHandle.getColumnIndex('Data Profile', tableXpath);
    const tableContent = await tableHandle.getColumnContent(index, tableXpath);
    console.log(tableContent);
    const isEqual = await tableHandle.VerifyTableDataEqual(dataFromFile, tableContent);

    await expect(isEqual).toBe(true);
}) 

test('Verify that Data Profiles are listed alphabetically', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const tableHandle = new TableHandle(page);

    await loginPage.go();
    await loginPage.login('administrator', '');

    await dashboardMainPage.navigateToDataProfliesPage();
    const tableXpath = '//table[@class="GridView"]'
    const isSorted = await tableHandle.VerifyTableSorted('Data Profile', tableXpath);

    await expect(isSorted).toBe(true);
})

test('Verify that user is able to add levels of fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const dataProfilePage = new DataProfilePage(page);

    await loginPage.go();
    await loginPage.login('administrator', '');

    await dashboardMainPage.navigateToDataProfliesPage();
    await dataProfilePage.clickAddNewLink();

    await dataProfilePage.profileNameTxt.fill('Page1');
    while (await dataProfilePage.verifyProfileSettingDisplay('Sort Fields') == false) {
        await dataProfilePage.clickControlBtn('Next');
    }
    await dataProfilePage.FieldsCbb.selectOption('Name');
    await dataProfilePage.AddLevelBtn.click();
    await dataProfilePage.verifySortItemDisplay('Name');

    await dataProfilePage.FieldsCbb.selectOption('Location');
    await dataProfilePage.AddLevelBtn.click();
    await dataProfilePage.verifySortItemDisplay('Location');
})