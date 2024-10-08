import path from "node:path";
import { fileURLToPath } from "node:url";
import { fixupPluginRules, includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import storybook from "eslint-plugin-storybook";
import globals from "globals";
import ts from "typescript-eslint";
import parser from "@typescript-eslint/parser";
import tailwind from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default ts.config(
  includeIgnoreFile(gitignorePath),
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.nodeBuiltin,
      parser,
      parserOptions: {
        projectService: true,
        tsconfigDirName: import.meta.dirname,
      },
    },
  },
  js.configs.recommended,
  ...ts.configs.strict,
  ...ts.configs.stylistic,
  // ...ts.configs.strictTypeChecked,
  // ...ts.configs.stylisticTypeChecked,
  {
    plugins: { react },
    rules: react.configs["jsx-runtime"].rules,
    languageOptions: {
      parserOptions: react.configs["jsx-runtime"].parserOptions,
    },
  },
  // react.configs.flat["jsx-runtime"],
  prettier,
  ...tailwind.configs["flat/recommended"],
  {
    settings: {
      tailwindcss: {
        // These are the default values but feel free to customize
        callees: ["classnames", "clsx", "ctl"],
        config: "tailwind.config", // returned from `loadConfig()` utility if not provided
        cssFiles: [
          "**/*.css",
          "!**/node_modules",
          "!**/.*",
          "!**/dist",
          "!**/build",
        ],
        cssFilesRefreshRate: 5_000,
        removeDuplicates: true,
        skipClassAttribute: false,
        whitelist: [],
        tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
        classRegex: "^class(Name)?$", // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
      },
    },
  },
  {
    files: [
      "*.stories.@(ts|tsx|js|jsx|mjs|cjs)",
      "*.story.@(ts|tsx|js|jsx|mjs|cjs)",
    ],
    plugins: {
      storybook: fixupPluginRules(storybook),
    },
    rules: {
      "react-hooks/rules-of-hooks": "off",
      "import/no-anonymous-default-export": "off",
      "storybook/await-interactions": "error",
      "storybook/context-in-play-function": "error",
      "storybook/default-exports": "error",
      "storybook/hierarchy-separator": "warn",
      "storybook/no-redundant-story-name": "warn",
      "storybook/prefer-pascal-case": "warn",
      "storybook/story-exports": "error",
      "storybook/use-storybook-expect": "error",
      "storybook/use-storybook-testing-library": "error",
    },
  },
  {
    files: [".storybook/main.@(js|cjs|mjs|ts)"],
    plugins: {
      storybook: fixupPluginRules(storybook),
    },
    rules: {
      "storybook/no-uninstalled-addons": "error",
    },
  },
  {
    files: ["!**/src/**"],
    ...ts.configs.disableTypeChecked,
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "as",
          objectLiteralTypeAssertions: "allow-as-parameter",
        },
      ],
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: ".*",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // "@typescript-eslint/no-misused-promises": [
      //   "error",
      //   { checksVoidReturn: false },
      // ],
      "@typescript-eslint/triple-slash-reference": [
        "error",
        { types: "prefer-import" },
      ],
      "@typescript-eslint/array-type": [
        "error",
        {
          default: "array-simple",
        },
      ],
      "no-console": [
        "error",
        {
          allow: ["debug", "error", "info", "trace", "warn"],
        },
      ],
    },
  },
);
