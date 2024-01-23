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
    await tableHandle.VerifyTableDataEqual(dataFromFile, 'Data Profile', tableXpath);
}) 

test('Verify that Data Profiles are listed alphabetically', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const tableHandle = new TableHandle(page);

    await loginPage.go();
    await loginPage.login('administrator', '');

    await dashboardMainPage.navigateToDataProfliesPage();
    const tableXpath = '//table[@class="GridView"]'
    await tableHandle.VerifyTableSorted('Data Profile', tableXpath);
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
    while (await dataProfilePage.isProfileSettingDisplay('Sort Fields') == false) {
        await dataProfilePage.clickControlBtn('Next');
    }
    
    await dataProfilePage.verifySortItemDisplay('Name');
    await dataProfilePage.verifySortItemDisplay('Location');
})