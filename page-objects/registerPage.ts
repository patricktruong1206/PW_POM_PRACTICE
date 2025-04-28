import { Page, Locator } from '@playwright/test';
import { HelperBase } from './helperBase';
import type { RegisterFormProps } from '../typings/registerForm.types';

/**
 * Page Object Model for the Registration Page.
 *
 */
export class RegisterPage extends HelperBase {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly tncCheckbox: Locator;
  readonly registerButton: Locator;
  readonly countryDropdown: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.phoneNumberInput = page.locator('#phone');
    this.emailInput = page.locator('#emailAddress');
    this.passwordInput = page.locator('#password');
    this.tncCheckbox = page.locator('#exampleCheck1');
    this.registerButton = page.locator('#registerBtn');
    this.countryDropdown = page.locator('select#countries_dropdown_menu');
  }

  /**
   * Fills out and submits the registration form.
   *
   * @param form RegisterFormProps
   */
  async submitRegisterForm({
    firstName,
    lastName,
    phoneNumber,
    country,
    email,
    password,
    tncCheckbox,
  }: RegisterFormProps) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.phoneNumberInput.fill(phoneNumber);
    await this.selectDropdownOption(country);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (tncCheckbox) await this.tncCheckbox.check({ force: true });
    await this.registerButton.scrollIntoViewIfNeeded();
    await this.registerButton.click({ force: true });
  }

  /**
   * Selects a country from the dropdown by value.
   *
   * @param option The value of the country to select
   */
  async selectDropdownOption(option: string) {
    await this.countryDropdown.selectOption(option);
  }

  /**
   * Gets the text content of the registration alert message.
   *
   */
  async getRegisterAlertText() {
    await this.page.waitForSelector('#message');
    return this.page.locator('#message').textContent();
  }

  /**
   * Gets the browser validation message for a given input field.
   *
   * @param inputFieldLocator Locator
   */
  async getFieldValidationMessage(
    inputFieldLocator: Locator
  ): Promise<string | null> {
    const elementHandle = await inputFieldLocator.elementHandle();
    if (!elementHandle) {
      console.warn(`Element not found for locator: ${inputFieldLocator}`);
      return null;
    }
    return elementHandle.evaluate((el) => {
      const formElement = el as HTMLInputElement;
      formElement.checkValidity();
      return formElement.validationMessage;
    });
  }
}
