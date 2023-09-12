import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { test } from "./base";

const getAccessibilityScan = async (page: Page) => {
  const analysis = await new AxeBuilder({ page }).analyze();

  return analysis.violations;
};

test("example form", async ({ homePage, page }) => {
  await homePage.goto();

  expect(await getAccessibilityScan(page)).toEqual([]);

  await homePage.fillFirstName("John");

  await homePage.fillLastName("Doe");

  await homePage.checkEmployed();

  await homePage.selectFavouriteColour("blue");

  await homePage.clickSauces("mustard");

  await homePage.clickStooge("moe");

  await homePage.fillNotes("This is a notes textarea");

  await homePage.submitForm();

  await page.waitForURL("/protected-page");

  expect(await getAccessibilityScan(page)).toEqual([]);
});
