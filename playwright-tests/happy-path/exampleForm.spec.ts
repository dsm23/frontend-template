import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { test } from "./base";
import { ROUTES } from "../../src/constants/routes";

const getAccessibilityScan = async (page: Page) => {
  const analysis = await new AxeBuilder({ page }).analyze();

  return analysis.violations;
};

test("example form", async ({ homePage, page }) => {
  await page.goto("/login");

  await page.waitForURL(`${ROUTES.LOGIN}**`);

  await page.locator("button", { hasText: "Sign in with Google" }).click();

  await page.waitForEvent("popup");

  await page.waitForURL(ROUTES.HOME);

  await homePage.goto();

  await homePage.fillFirstName("John");

  await homePage.fillLastName("Doe");

  await homePage.checkEmployed();

  await homePage.selectFavouriteColour("blue");

  await homePage.selectToppings(["chicken", "ham"]);

  await homePage.clickSauces("mustard");

  await homePage.clickStooge("moe");

  await homePage.fillNotes("This is a notes textarea");

  await homePage.submitForm();

  await page.waitForURL(ROUTES.PROTECTED_PAGE);

  const toaster = await page.getByLabel("Notifications (F8)").locator("li");

  await toaster.waitFor({ state: "hidden" });
});

test("should not have any automatically detectable accessibility issues", async ({
  page,
}) => {
  await page.goto(ROUTES.LOGIN);

  expect(await getAccessibilityScan(page)).toEqual([]);

  await page.goto(ROUTES.HOME);

  expect(await getAccessibilityScan(page)).toEqual([]);

  await page.goto("/shadcn");

  expect(await getAccessibilityScan(page)).toEqual([]);
});

test("should not have any automatically detectable accessibility issues, protected", async ({
  page,
}) => {
  await page.goto(ROUTES.PROTECTED_PAGE);

  expect(await getAccessibilityScan(page)).toEqual([]);
});
