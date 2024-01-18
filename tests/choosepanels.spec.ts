import { expect, test } from '@playwright/test';
import DashboardMainPage from '../pages/dashboardMainPage';
import LoginPage from '../pages/LoginPage';
import ChoosePanelsForm from '../pages/ChoosePanelsForm';
import AddPageForm from '../pages/AddPageForm';
import AddPanelsForm from '../pages/AddPanelsForm';
import PanelsPage from '../pages/PanelsPage';

test('Verify that when "Choose panels" form is expanded all pre-set panels are populated and sorted correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const addPageForm = new AddPageForm(page);
    const addPanelsForm = new AddPanelsForm(page);
    const choosePanelsForm = new ChoosePanelsForm(page);

    await loginPage.go();
    await loginPage.login('administrator', '');

    await dashboardMainPage.clickAddNewPage();
    await addPageForm.addNewPage('Page1', 'Select parent', '2', 'Execution Dashboard', true);

    await dashboardMainPage.clickAddNewPanels();
    await addPanelsForm.addNewPanels('Chart', 'Action Implementation By Status', 'zbox', 'name');

    await dashboardMainPage.clickChoosePanelsBtn();
    await choosePanelsForm.choosePanelsFormDisplay();

    await choosePanelsForm.verifyNewPanelDisplay('zbox');
  })
  
  test('Verify that when "Add New Panel" form is on focused all other control/form is disabled or locked.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const panelsPage = new PanelsPage(page);
    const addPanelsForm = new AddPanelsForm(page);

    await loginPage.go();
    await loginPage.login('administrator', '');

    await dashboardMainPage.navigateToPanelsPage();
    await panelsPage.clickOnAddNewLink();
    await addPanelsForm.addPanelFormDisplay();

    await dashboardMainPage.overviewBtn.isEnabled() == false;
    await dashboardMainPage.executionDashboardBtn.isEnabled() == false;

    await dashboardMainPage.welcomeBtn.hover();
    await dashboardMainPage.logoutBtn.isEnabled() == false;

    await dashboardMainPage.administerBtn.hover();
    await dashboardMainPage.dataProfilesBtn.isEnabled() == false;

    await dashboardMainPage.navigateToDataProfliesPage();
  })