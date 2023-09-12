import type { Page } from "@playwright/test";

export abstract class CommonLayout {
  readonly page: Page;

  abstract goto(): Promise<void>;

  constructor(page: Page) {
    this.page = page;
  }
}
