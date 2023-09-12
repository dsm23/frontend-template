import { expect, test as setup } from "@playwright/test";
import { ROUTES } from "../../src/constants/routes";

const authFile = "playwright-tests/setup/auth.json";

setup("authenticate", async ({ page }) => {
  await page.goto(ROUTES.PROTECTED_PAGE);

  await page.waitForURL(`${process.env.MAINSITE_B2C_INSTANCE as string}/**`);
  await page
    .getByLabel("Sign in name", { exact: true })
    .fill(process.env.PLAYWRIGHT_TEST_USER_EMAIL as string);
  await page
    .getByLabel("Password")
    .fill(process.env.PLAYWRIGHT_TEST_USER_PASSWORD as string);
  await page.getByRole("button", { name: "Sign in" }).click();

  await page.waitForURL("/callbacks");

  await page.waitForURL(ROUTES.PROTECTED_PAGE);

  await expect(
    page.getByRole("heading", { level: 1, name: /Protected Route/i }),
  ).toBeVisible();

  await page.context().storageState({ path: authFile });
});
