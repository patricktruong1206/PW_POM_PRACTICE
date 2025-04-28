import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'


test.beforeEach(async({page})=>{
    await page.goto('https://qa-practice.netlify.app')
   
})

test.describe('Formlayout test suite',()=>{

    test("Login page success with valid credential", async ({ page }) => {
      const pm = new PageManager(page);
      const emailValue = "admin@admin.com";
      const passwordValue = "admin123";
      await pm.navigateTo().formLoginPage();
      await pm
        .onFormLoginPage()
        .submitLoginFormWithNameEmail(emailValue, passwordValue);
      await expect(
        page.locator(".section-header", { hasText: "SHOPPING CART" })
      ).toContainText("SHOPPING CART");
    });

    test("Login page success with invalid credential", async ({ page }) => {
      const pm = new PageManager(page);
      const loginPage = pm.onFormLoginPage();
      const emailValue = "admi123@admin.com";
      const passwordValue = "admin123";
      const expectedAlert =
        "Bad credentials! Please try again! Make sure that you've registered.";
      await pm.navigateTo().formLoginPage();
      await loginPage.submitLoginFormWithNameEmail(emailValue, passwordValue);
      const actualAlertText = await loginPage.getLoginAlertText();
      expect(actualAlertText).toContain(expectedAlert);
    });

    test("Register success with valid value", async ({ page }) => {
      const pm = new PageManager(page);
      const registerPage = pm.onFormRegisterPage();

      const firstName = "Jack";
      const lastName = "Smith";
      const phoneNumber = "84868460288";
      const countryName = "Vietnam";
      const email = "test@admin.com";
      const passwordValue = "admin123";
      const tncValue = true;
      const expectedAlert = "The account has been successfully created!";

      await pm.navigateTo().formRegisterPage();
      await registerPage.submitRegisterForm(
        firstName,
        lastName,
        phoneNumber,
        countryName,
        email,
        passwordValue,
        tncValue
      );

      const actualAlertText = await registerPage.getRegisterAlertText();
      expect(actualAlertText).toContain(expectedAlert);
    })

    test("Register fail when not input required email", async ({ page }) => {
      const pm = new PageManager(page);
      const registerPage = pm.onFormRegisterPage();
      const expectedAlert = "Please fill out this field.";

      await pm.navigateTo().formRegisterPage();
      await registerPage.registerButton.click()

      const actualAlertText = await registerPage.getFieldValidationMessage(registerPage.emailInput);
      expect(actualAlertText).toContain(expectedAlert);
    });    
    
    test("Register fail when not input required password", async ({ page }) => {
        const pm = new PageManager(page);
        const registerPage = pm.onFormRegisterPage();
        const email='test@test.com'
        const expectedAlert = "Please fill out this field.";
  
        await pm.navigateTo().formRegisterPage();
        await registerPage.emailInput.fill(email)
        await registerPage.registerButton.click()
  
        const actualAlertText = await registerPage.getFieldValidationMessage(registerPage.passwordInput);
        expect(actualAlertText).toContain(expectedAlert);
      });   
})

