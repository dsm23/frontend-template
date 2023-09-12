import chalk from "chalk";
import { say } from "cowsay";
import figlet from "figlet";

console.log(`

${chalk.green("Hey there! 👋")}

${figlet.textSync("Template")}

Thanks for joining the team. Feel free to get creative.
To get you going really quickly this project includes a setup step.

${chalk.yellow.bold(
  "pnpm setup-env",
)} help automating the addition of the following environment variables into a config file:
  - ${chalk.yellow("RUNTIME_FIREBASE_API_KEY")}
  - ${chalk.yellow("RUNTIME_FIREBASE_AUTH_DOMAIN")}
  - ${chalk.yellow("RUNTIME_FIREBASE_PROJECT_ID")}
  - ${chalk.yellow("RUNTIME_FIREBASE_STORAGE_BUCKET")}
  - ${chalk.yellow("RUNTIME_FIREBASE_MESSAGING_SENDER_ID")}
  - ${chalk.yellow("RUNTIME_FIREBASE_APP_ID")}

When this is done run:

${chalk.yellow("pnpm dev")} or ${chalk.yellow(
  "pnpm start",
)} to start a development environment at ${chalk.green("http://localhost:3000")}

or

${chalk.yellow(
  "pnpm build",
)} to create a production site ready in ${chalk.green("./public")}

then

${chalk.yellow("pnpm preview")} to run the production site in ${chalk.green(
  "./public",
)} but it does need runtime enviroment variables in the shell not the .env file

${say({ text: "Let's get coding!", f: "dragon-and-cow" })}
`);
