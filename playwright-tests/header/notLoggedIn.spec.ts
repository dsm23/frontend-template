import { test, expect } from "@playwright/test";
import type { Locator } from "@playwright/test";

test.describe("header", () => {
  test("no 404 links", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("header").first();

    const links = footer.locator("a");

    await expect(links).toHaveCount(4);

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

  test("skip to main content", async ({ browserName, page }) => {
    test.fixme(browserName === "webkit", "Webkit doesn't focus on links");

    await page.goto("/");

    const skipToContentLink = page.getByRole("link", {
      name: /Skip to main content/i,
    });

    const getWidth = async () => {
      const box = (await skipToContentLink.boundingBox()) as NonNullable<
        Awaited<ReturnType<Locator["boundingBox"]>>
      >;

      return box.width;
    };

    expect(await getWidth()).toBe(1);

    await skipToContentLink.focus();

    expect(await getWidth()).toBeGreaterThan(1);

    await skipToContentLink.click();

    expect(await getWidth()).toBe(1);

    await expect(page).toHaveURL("/#main-content");
  });
});
