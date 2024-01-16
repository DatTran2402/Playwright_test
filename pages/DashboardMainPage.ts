import { Locator, Page, expect } from "@playwright/test";

export default class DashboardMainPage {
  readonly welcomeBtn: Locator = this.page.locator('xpath=//a[@href="#Welcome"]');
  readonly myProfileBtn: Locator = this.page.locator('xpath=//a[text()="Logout"]');
  readonly logoutBtn: Locator = this.page.locator('xpath=//a[text()="My Profile"]');
  readonly dataProfilesBtn: Locator = this.page.locator('xpath=//a[text()="Data Profiles"]');
  readonly PanelsBtn: Locator = this.page.locator('xpath=//a[text()="Panels"]');
  readonly overviewBtn: Locator = this.page.locator('xpath=//a[text()="Overview"]');
  readonly executionDashboardBtn: Locator = this.page.getByText('Execution Dashboard');
  readonly choosePanelsBtn: Locator = this.page.locator('#main-menu #btnChoosepanel');
  readonly globalSettingBtn: Locator = this.page.locator('#main-menu .mn-setting');
  readonly addPageBtn: Locator = this.page.locator('//li[@class = "mn-setting"]//a[text()="Add Page"]');
  readonly createProfileBtn: Locator = this.page.locator('//li[@class = "mn-setting"]//a[text()="Create Profile"]');
  readonly createPanelBtn: Locator = this.page.locator('//li[@class = "mn-setting"]//a[text()="Create Panel"]');
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
    await this.dataProfilesBtn.click();
  }

  async navigateToPanelsPage(): Promise<void> {
    await this.PanelsBtn.click();
  }

  async logout(): Promise<void> {
    await this.welcomeBtn.hover();
    await this.logoutBtn.click();
  }
}