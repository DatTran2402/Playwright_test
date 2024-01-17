import { expect, test } from '@playwright/test';
import DashboardMainPage from '../pages/dashboardMainPage';
import LoginPage from '../pages/LoginPage';
import ChoosePanelsForm from '../pages/ChoosePanelsForm';

test('Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.go();
    await loginPage.login('administrator', '');
  
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.clickChoosePanelsBtn();

    const choosePanelsForm = new ChoosePanelsForm(page);
    await choosePanelsForm.choosePanelsFormDisplay();
  })
  