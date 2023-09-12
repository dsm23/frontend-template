import { test, expect } from "@playwright/test";

test.describe("footer", () => {
  test("no 404 links", async ({ browserName, page }) => {
    // https://playwright.dev/docs/api/class-page#page-goto
    test.fixme(
      browserName === "chromium" || browserName === "firefox",
      "One of the links in the footer links to a pdf. Firefox cannot read the pdf contents and chromium can't in headless mode",
    );

    await page.goto("/");

    const footer = page.locator("footer");

    const links = footer.locator("a");

    await expect(links).toHaveCount(17);

    for (let i = 1; i < (await links.count()); i++) {
      await links.nth(i).click();

      const popup = await page.waitForEvent("popup");

      await popup.waitForLoadState("load");

      await expect(popup.getByText(/Error: 404/i)).not.toBeVisible();
      await expect(popup.getByText(/404/i)).not.toBeVisible();
      await expect(popup.getByText(/Page not found/i)).not.toBeVisible();

      await popup.close();
    }
  });
});
