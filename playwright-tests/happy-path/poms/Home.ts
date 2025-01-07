import type { Locator, Page } from "@playwright/test";
import { CommonLayout } from "../../shared-poms";

const colours = {
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff",
} as const;

const toppingsMap = {
  chicken: "chicken",
  ham: "ham",
  mushrooms: "mushrooms",
  cheese: "cheese",
  tuna: "tuna",
  pineapple: "pineapple",
} as const;

function stoogesMapped(this: HomePage) {
  return {
    larry: async () => await this.larryRadio.check(),

    moe: async () => await this.moeRadio.check(),

    curly: async () => await this.curlyRadio.check(),
  } as const;
}

function saucesMapped(this: HomePage) {
  return {
    ketchup: async () => await this.ketchupCheckbox.check(),

    mustard: async () => await this.mustardCheckbox.check(),

    mayonnaise: async () => await this.mayonnaiseCheckbox.check(),

    guacamole: async () => await this.guacamoleCheckbox.check(),
  } as const;
}

export class HomePage extends CommonLayout {
  readonly firstNameTextInput: Locator;
  readonly lastNameTextInput: Locator;
  readonly employedCheckbox: Locator;
  readonly favouriteColourSelect: Locator;
  readonly toppingsSelect: Locator;
  readonly ketchupCheckbox: Locator;
  readonly mustardCheckbox: Locator;
  readonly mayonnaiseCheckbox: Locator;
  readonly guacamoleCheckbox: Locator;
  readonly larryRadio: Locator;
  readonly moeRadio: Locator;
  readonly curlyRadio: Locator;
  readonly notesTextArea: Locator;
  readonly resetButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameTextInput = this.page.getByLabel(/First Name/i);
    this.lastNameTextInput = this.page.getByLabel(/Last Name/i);
    this.employedCheckbox = this.page.getByLabel(/Employed/i);
    this.favouriteColourSelect = this.page.getByLabel(/Favourite Colour/i);
    this.toppingsSelect = this.page.getByLabel(/Toppings/i);
    this.ketchupCheckbox = this.page.getByLabel(/Ketchup/i);
    this.mustardCheckbox = this.page.getByLabel(/Mustard/i);
    this.mayonnaiseCheckbox = this.page.getByLabel(/Mayonnaise/i);
    this.guacamoleCheckbox = this.page.getByLabel(/Guacamole/i);
    this.larryRadio = this.page.getByLabel(/Larry/i);
    this.moeRadio = this.page.getByLabel(/Moe/i);
    this.curlyRadio = this.page.getByLabel(/Curly/i);
    this.notesTextArea = this.page.getByLabel(/Notes/i);

    this.resetButton = this.page
      .getByRole("button")
      .filter({ hasText: /Reset/i });

    this.submitButton = this.page
      .getByRole("button")
      .filter({ hasText: /Submit/i });
  }

  async goto() {
    await this.page.goto("/shadcn");
  }

  async selectFavouriteColour(colour: keyof typeof colours) {
    await this.favouriteColourSelect.selectOption(colours[colour]);
  }

  async selectToppings(toppings: Array<keyof typeof toppingsMap>) {
    await this.toppingsSelect.selectOption(
      toppings.map((topping) => toppingsMap[topping]),
    );
  }

  async clickSauces(
    checkbox: keyof ReturnType<typeof saucesMapped> = "ketchup",
  ) {
    await saucesMapped.call(this)[checkbox]();
  }

  async clickStooge(radio: keyof ReturnType<typeof stoogesMapped> = "larry") {
    await stoogesMapped.call(this)[radio]();
  }

  async fillFirstName(text: string) {
    await this.firstNameTextInput.fill(text);
  }

  async fillLastName(text: string) {
    await this.lastNameTextInput.fill(text);
  }

  async fillNotes(text: string) {
    await this.notesTextArea.fill(text);
  }

  async checkEmployed() {
    await this.employedCheckbox.check();
  }

  async reset() {
    await this.resetButton.click();
  }

  async submitForm() {
    await this.submitButton.click();
  }
}
