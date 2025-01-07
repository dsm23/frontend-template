import fs from "node:fs";
import path from "node:path";
import { defineConfig, devices } from "@playwright/test";
import { parse } from "dotenv";

const PORT = process.env.PORT || 3000;

/**
 * Functions copied from vite https://github.com/vitejs/vite/blob/4215e22696dfec4e030749a1ad001777bf4dc2bb/packages/vite/src/node/env.ts
 */
function tryStatSync(file: string): fs.Stats | undefined {
  try {
    return fs.statSync(file, { throwIfNoEntry: false });
  } catch {
    // Ignore errors
  }
}

export function loadEnv(envDir: string): Record<string, string> {
  const env: Record<string, string> = {};
  const envFiles = [
    /** default file */ `.env`,
    /** local file */ `.env.local`,
    /** mode file */ `.env.playwright`,
    /** mode local file */ `.env.playwright.local`,
  ];

  const parsed = Object.fromEntries(
    envFiles.flatMap((file) => {
      const filePath = path.join(envDir, file);
      if (!tryStatSync(filePath)?.isFile()) return [];

      return Object.entries(parse(fs.readFileSync(filePath)));
    }),
  );

  // only keys that start with prefix are exposed to client
  for (const [key, value] of Object.entries(parsed)) {
    env[key] = value;
  }

  // check if there are actual env variables starting with VITE_*
  // these are typically provided inline and should be prioritized
  for (const key in process.env) {
    env[key] = process.env[key] as string;
  }

  return env;
}

process.env = loadEnv(".");
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./playwright-tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "html",
  use: {
    baseURL: `http://localhost:${PORT}`,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright-tests/setup/auth.json",
      },
      dependencies: ["setup"],
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: "playwright-tests/setup/auth.json",
      },
      dependencies: ["setup"],
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: "playwright-tests/setup/auth.json",
      },
      dependencies: ["setup"],
    },
  ],

  webServer: {
    command: "bun run dev",
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
  },
});
