import { expect, test as setup } from "@playwright/test";
import { ROUTES } from "../../src/constants/routes";
import { generateOTP } from "../lib/helpers/otp";
import { GooglePopUpPage } from "playwright-tests/happy-path/poms/GooglePopup";

const authFile = "playwright-tests/setup/auth.json";

setup("authenticate", async ({ page }) => {
  await page.goto(ROUTES.PROTECTED_PAGE);

  await page.waitForURL(`${ROUTES.LOGIN}**`);

  await page.locator("button", { hasText: "Sign in with Google" }).click();

  const popup = await page.waitForEvent("popup");

  const googlePopupPage = new GooglePopUpPage(popup);

  await googlePopupPage.login(
    process.env.GOOGLE_EMAIL,
    process.env.GOOGLE_PASSWORD,
  );

  const twoFACode = generateOTP(process.env.GOOGLE_OTP_SECRET);
  await googlePopupPage.enterCode(twoFACode);

  await page.waitForURL(ROUTES.PROTECTED_PAGE);

  await expect(
    page.getByRole("heading", { level: 1, name: /Protected Route/i }),
  ).toBeVisible();

  await page.context().storageState({ path: authFile });
});
