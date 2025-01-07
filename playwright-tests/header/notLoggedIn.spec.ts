import { test, expect } from "@playwright/test";
import type { Locator } from "@playwright/test";

test.describe("header", () => {
  test("no 404 links", async ({ page }) => {
    await page.goto("/");

    const header = page.locator("header").first();

    const links = header.locator("a");

    await expect(links).toHaveCount(4);

    for (let i = 1; i < (await links.count()); i++) {
      await links.nth(i).click();

      await expect(page.getByText(/Error: 404/i)).not.toBeVisible();
      await expect(page.getByText(/404/i)).not.toBeVisible();
      await expect(page.getByText(/Page not found/i)).not.toBeVisible();
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
