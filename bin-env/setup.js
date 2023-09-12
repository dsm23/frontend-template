import { writeFileSync } from "node:fs";
import path from "node:path";
import chalk from "chalk";
import inquirer from "inquirer";
import parser from "yargs-parser";

const argv = parser(process.argv.slice(2));

console.log(`
  To set up this project you need the dev environment variables use at runtime.

  They may exist in the wiki.
  But the mostly like place you will get them from is a fellow frontend developer.
`);

const questions = [
  {
    name: "firebaseApiKey",
    when: !argv.firebaseApiKey && !process.env.RUNTIME_FIREBASE_API_KEY,
    message: "Please enter the firebase api key:",
  },
  {
    name: "firebaseAuthDomain",
    when: !argv.firebaseAuthDomain && !process.env.RUNTIME_FIREBASE_AUTH_DOMAIN,
    message: "Please enter the firebase auth domain:",
  },
  {
    name: "firebaseProjectId",
    when: !argv.firebaseProjectId && !process.env.RUNTIME_FIREBASE_PROJECT_ID,
    message: "Please enter the firebase projectId:",
  },
  {
    name: "firebaseStorageBucket",
    when:
      !argv.firebaseStorageBucket &&
      !process.env.RUNTIME_FIREBASE_STORAGE_BUCKET,
    message: "Please enter the firebase storage bucket:",
  },
  {
    name: "firebaseMessagingSenderId",
    when:
      !argv.firebaseMessagingSenderId &&
      !process.env.RUNTIME_FIREBASE_MESSAGING_SENDER_ID,
    message: "Please enter the firebase messagingSenderId:",
  },
  {
    name: "firebaseAppId",
    when: !argv.firebaseAppId && !process.env.RUNTIME_FIREBASE_APP_ID,
    message: "Please enter the firebase appId:",
  },
];

inquirer
  .prompt(questions)
  .then(
    ({
      firebaseApiKey,
      firebaseAuthDomain,
      firebaseProjectId,
      firebaseStorageBucket,
      firebaseMessagingSenderId,
      firebaseAppId,
    }) => {
      const {
        RUNTIME_FIREBASE_API_KEY,
        RUNTIME_FIREBASE_AUTH_DOMAIN,
        RUNTIME_FIREBASE_PROJECT_ID,
        RUNTIME_FIREBASE_STORAGE_BUCKET,
        RUNTIME_FIREBASE_MESSAGING_SENDER_ID,
        RUNTIME_FIREBASE_APP_ID,
      } = process.env;

      // env vars are given precedence followed by args provided to the setup
      // followed by input given to prompts displayed by the setup script
      firebaseApiKey ||= RUNTIME_FIREBASE_API_KEY || argv.firebaseApiKey;
      firebaseAuthDomain ||=
        RUNTIME_FIREBASE_AUTH_DOMAIN || argv.firebaseAuthDomain;
      firebaseProjectId ||=
        RUNTIME_FIREBASE_PROJECT_ID || argv.firebaseProjectId;
      firebaseStorageBucket ||=
        RUNTIME_FIREBASE_STORAGE_BUCKET || argv.firebaseStorageBucket;
      firebaseMessagingSenderId ||=
        RUNTIME_FIREBASE_MESSAGING_SENDER_ID || argv.b2cClientId;
      firebaseAppId ||= RUNTIME_FIREBASE_APP_ID || argv.firebaseAppId;

      console.log("Writing config file...");
      const configFiles = [
        `.env.development.local`,
        `.env.playwright.local`,
        `.env.production.local`,
        `.env.test.local`,
      ].map((file) => path.resolve(file));

      const fileContents =
        [
          `# Do NOT commit this file to source control`,
          `RUNTIME_FIREBASE_API_KEY=${firebaseApiKey}`,
          `RUNTIME_FIREBASE_AUTH_DOMAIN=${firebaseAuthDomain}`,
          `RUNTIME_FIREBASE_PROJECT_ID=${firebaseProjectId}`,
          `RUNTIME_FIREBASE_STORAGE_BUCKET=${firebaseStorageBucket}`,
          `RUNTIME_FIREBASE_MESSAGING_SENDER_ID=${firebaseMessagingSenderId}`,
          `RUNTIME_FIREBASE_APP_ID=${firebaseAppId}`,
        ].join("\n") + "\n";

      configFiles.forEach((file) => {
        writeFileSync(file, fileContents, "utf8");
        console.log(`Config file ${chalk.yellow(file)} written`);
      });
      return {
        firebaseApiKey,
        firebaseAuthDomain,
        firebaseProjectId,
        firebaseStorageBucket,
        firebaseMessagingSenderId,
        firebaseAppId,
      };
    },
  )
  .then(
    ({
      firebaseApiKey,
      firebaseAuthDomain,
      firebaseProjectId,
      firebaseStorageBucket,
      firebaseMessagingSenderId,
      firebaseAppId,
    }) => {
      console.log("Writing docker compose file...");
      const configFiles = [`docker-compose.yml`].map((file) =>
        path.resolve(file),
      );

      const fileContents =
        [
          `services:`,
          `  build-web:`,
          `    build: .`,
          `    image: frontend-template`,
          `  web:`,
          `    depends_on:`,
          `      - build-web`,
          `    image: frontend-template`,
          `    ports:`,
          `      - 3000:80`,
          `    environment:`,
          `      - RUNTIME_FIREBASE_API_KEY=${firebaseApiKey}`,
          `      - RUNTIME_FIREBASE_AUTH_DOMAIN=${firebaseAuthDomain}`,
          `      - RUNTIME_FIREBASE_PROJECT_ID=${firebaseProjectId}`,
          `      - RUNTIME_FIREBASE_STORAGE_BUCKET=${firebaseStorageBucket}`,
          `      - RUNTIME_FIREBASE_MESSAGING_SENDER_ID=${firebaseMessagingSenderId}`,
          `      - RUNTIME_FIREBASE_APP_ID=${firebaseAppId}`,
        ].join("\n") + "\n";

      configFiles.forEach((file) => {
        writeFileSync(file, fileContents, "utf8");
        console.log(`${chalk.green("docker-compose.yml")} written`);
      });
      return {};
    },
  )
  .then(() => {
    console.log(`Adding ${chalk.yellow(".vscode/settings.json")}`);

    const configFile = path.resolve(".vscode/settings.json");

    const fileContents =
      [
        `{`,
        `  // Set the default`,
        `  "editor.formatOnSave": false,`,
        `  // Enable per-language`,
        `  "[javascript]": {`,
        `      "editor.formatOnSave": true,`,
        `      "editor.defaultFormatter": "esbenp.prettier-vscode"`,
        `  },`,
        `  "[javascriptreact]": {`,
        `      "editor.formatOnSave": true,`,
        `      "editor.defaultFormatter": "esbenp.prettier-vscode"`,
        `  },`,
        `  "[typescript]": {`,
        `      "editor.formatOnSave": true,`,
        `      "editor.defaultFormatter": "esbenp.prettier-vscode"`,
        `  },`,
        `  "[typescriptreact]": {`,
        `      "editor.formatOnSave": true,`,
        `      "editor.defaultFormatter": "esbenp.prettier-vscode"`,
        `  }`,
        `}`,
      ].join("\n") + "\n";

    writeFileSync(configFile, fileContents, "utf8");
    console.log(`${chalk.green(".vscode/settings.json")} written`);

    return {};
  })
  .then((_, error) => {
    console.log(
      `All set! You can now run ${chalk.yellow(
        "pnpm dev",
      )} to see it in action.`,
    );
  })
  .catch((error) => console.error(error));
