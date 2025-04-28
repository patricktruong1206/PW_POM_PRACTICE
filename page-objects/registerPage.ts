import { Page, Locator, expect, ElementHandle } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class RegisterPage extends HelperBase {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly tncCheckbox: Locator;
  readonly registerButton: Locator;
  readonly dropdownSelector: string;
  readonly countryDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = this.page.locator("#firstName");
    this.lastNameInput = this.page.locator("#lastName");
    this.phoneNumberInput = this.page.locator("#phone");
    this.registerButton = this.page.locator("#registerBtn");
    this.countryDropdown = this.page.locator("select#countries_dropdown_menu");
    this.emailInput = this.page.locator("#emailAddress");
    this.tncCheckbox = this.page.locator("#exampleCheck1");
    this.passwordInput = this.page.locator("#password");
  }
  /**
   * this method will out the Inline form with user details
   * @param name - should be first and last name
   * @param email - valid email for the test user
   */
  async submitRegisterForm(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    country: string,
    email: string,
    passsword: string,
    tncCheckbox: boolean
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.phoneNumberInput.fill(phoneNumber);
    await this.selectDropdownOption(country);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(passsword);
    if (tncCheckbox) await this.tncCheckbox.check({ force: true });
    await this.registerButton.scrollIntoViewIfNeeded();
    await this.registerButton.click({ force: true });
  }

  async selectDropdownOption(option: string) {
    await this.countryDropdown.click();
    await this.countryDropdown.selectOption(option);
    await this.countryDropdown.click();
  }

  async getRegisterAlertText() {
    await this.page.waitForSelector("#message");
    return await this.page.locator("#message").textContent();
  }

  async getFieldValidationMessage(
    inputFieldLocator: Locator
  ): Promise<string | null> {
    // Get the ElementHandle for the input field
    // ElementHandle is needed to run evaluate on a specific element
    const elementHandle: ElementHandle<HTMLElement | SVGElement> | null =
      await inputFieldLocator.elementHandle();

    if (!elementHandle) {
      // Element not found for the provided locator
      console.warn(`Element not found for locator: ${inputFieldLocator}`);
      return null;
    }

    const validationMessage = await elementHandle.evaluate((el) => {
      const formElement = el as HTMLInputElement;

      // checkValidity() forces the browser to update validationMessage if needed.
      formElement.checkValidity();

      return formElement.validationMessage;
    });

    return validationMessage;
  }
}
