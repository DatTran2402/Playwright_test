import { Locator, Page, expect } from "@playwright/test";
const playwright = require('playwright');

export default class DashboardMainPage {
  readonly welcomeBtn: Locator = this.page.locator('xpath=//a[@href="#Welcome"]');
  readonly logoutBtn: Locator = this.page.locator('xpath=//a[text()="Logout"]');
  readonly myProfileBtn: Locator = this.page.locator('xpath=//a[text()="My Profile"]');
  readonly dataProfilesBtn: Locator = this.page.locator('xpath=//a[text()="Data Profiles"]');
  readonly PanelsBtn: Locator = this.page.locator('xpath=//a[text()="Panels"]');
  readonly overviewBtn: Locator = this.page.locator('xpath=//a[text()="Overview"]');
  readonly administerBtn: Locator = this.page.locator('xpath=//a[text()="Administer"]');
  readonly executionDashboardBtn: Locator = this.page.getByText('Execution Dashboard');
  readonly choosePanelsBtn: Locator = this.page.locator('#main-menu #btnChoosepanel');
  readonly globalSettingBtn: Locator = this.page.locator('#main-menu .mn-setting');
  readonly addPageBtn: Locator = this.page.locator('//li[@class = "mn-setting"]//a[text()="Add Page"]');
  readonly createProfileBtn: Locator = this.page.locator('//li[@class = "mn-setting"]//a[text()="Create Profile"]');
  readonly createPanelBtn: Locator = this.page.locator('//li[@class = "mn-setting"]//a[text()="Create Panel"]');
  readonly editBtn: Locator = this.page.locator('//li[@class = "mn-setting"]//a[text()="Edit"]');
  readonly deleteBtn: Locator = this.page.locator('//li[@class = "mn-setting"]//a[text()="Delete"]');
  constructor(private readonly page: Page) {}

  async displays(): Promise<void> {
    await expect(this.executionDashboardBtn).toHaveText('Execution Dashboard');
  }

  async navigateToOverviewPage(): Promise<void> {
    await this.overviewBtn.click();
  }

  async navigateToExecutionDashboardPage(): Promise<void> {
    await this.executionDashboardBtn.click();
  }

  async navigateToMyProfilePage(): Promise<void> {
    await this.welcomeBtn.hover();
    await this.myProfileBtn.click();
  }

  async navigateToDataProfliesPage(): Promise<void> {
    await this.administerBtn.hover();
    await this.dataProfilesBtn.click();
  }

  async navigateToPanelsPage(): Promise<void> {
    await this.administerBtn.hover();
    await this.PanelsBtn.click();
  }

  async logout(): Promise<void> {
    await this.welcomeBtn.hover();
    await this.logoutBtn.click();
  }

  async clickAddNewPage(): Promise<void> {
    await this.globalSettingBtn.hover();
    await this.addPageBtn.click();
  }

  async clickAddNewPanels(): Promise<void> {
    await this.globalSettingBtn.hover();
    await this.createPanelBtn.click();
  }

  async navigateToParentPage(pagename: string): Promise<void> {
    const dynamicXpath = '//a[text()="'+ pagename +'"]';
    await this.page.locator(dynamicXpath).click();
  }

  async navigateToChildPage(parentname: string, childname: string): Promise<void> {
    await this.page.locator('xpath=//a[text()="'+ parentname +'"]').hover();
    await this.page.locator('xpath=//a[text()="'+ childname +'"]').click();
  }

  async removePage(): Promise<void> {
    await this.globalSettingBtn.hover();
    await this.deleteBtn.click();
  }

  async clickChoosePanelsBtn(): Promise<void> {
    await this.choosePanelsBtn.click();
  }

  async checkControllerIsDisable(control: string) {
    const controlXpath = '//a[text()="'+ control +'"]';
    try {
        await this.page.locator(controlXpath).click({
            timeout: 100,
          });
        return false;
    } catch (error){
        if (error instanceof playwright.errors.TimeoutError) {
            return true;                
          }
    }
  }
}