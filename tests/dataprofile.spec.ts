import { expect, test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardMainPage from '../pages/dashboardMainPage';
import DataProfilePage from '../pages/DataProfilePage';

test('Verify that Data Profiles are listed alphabetically', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const dataProfilePage = new DataProfilePage(page);

    await loginPage.go();
    await loginPage.login('administrator', '');

    await dashboardMainPage.navigateToDataProfliesPage();

    await dataProfilePage.verifyTableSort();
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