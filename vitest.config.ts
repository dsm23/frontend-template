import path from "node:path";
import {
  coverageConfigDefaults,
  defaultExclude,
  defineConfig,
} from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "~/components": path.resolve(__dirname, "./src/components"),
      "~/test-utils": path.resolve(__dirname, "./src/test-utils"),
      "~/utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  test: {
    exclude: [...defaultExclude, "**/playwright-tests/**"],
    coverage: {
      all: true,
      include: ["src/**/*.[jt]s?(x)"],
      exclude: [
        "src/**/*.stories.[jt]s?(x)",
        "src/test-utils/**",
        "src/mocks/**",
        "**/node_modules/**",
        "**/playwright-tests/**",
        ...coverageConfigDefaults.exclude,
      ],
      lines: 50,
      functions: 50,
      branches: 50,
      statements: 50,
    },
    environment: "jsdom",
    setupFiles: ["./src/setup.ts"],
    globals: false,
    logHeapUsage: true,
    watch: false,
  },
});
