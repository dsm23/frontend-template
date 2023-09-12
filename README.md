# Frontend Template

## Getting started

Install

```sh
pnpm install
```

A .env file is required to run. More information on the wiki around the correct [.env file](https://dev.azure.com/ITSharedService/My%20Westminster/_wiki/wikis/My-Westminster.wiki/48/file-.env.development-(or-.env.production))

Run command:

```sh
pnpm run dev
```

## Vscode

It is recommended that you edit with [Vscode](https://code.visualstudio.com/). Example .vscode/settings.json file:

```json
{
  // Set the default
  "editor.formatOnSave": false,
  // Enable per-language
  "[javascript]": {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Docker compose

We don't need docker to run the application but ultimately the application gets bundled up and
deployed into a docker container and deployed on Azure so the closest we can emulate this locally
is by wrapping the application in a docker image and deploying as a container. The easiest way
to run as a container is with docker compose. This is a template for a docker-compose.yml:

```yml
services:
  web:
    build: .
    ports:
      - <PORT>:80
    environment:
      - RUNTIME_FIREBASE_API_KEY=<some-value>
      - RUNTIME_FIREBASE_AUTH_DOMAIN=<some-value>
      - RUNTIME_FIREBASE_PROJECT_ID=<some-value>
      - RUNTIME_FIREBASE_STORAGE_BUCKET=<some-value>
      - RUNTIME_FIREBASE_MESSAGING_SENDER_ID=<some-value>
      - RUNTIME_FIREBASE_APP_ID=<some-value>

```

## Current Setup

uses:

* [x] github actions
* [x] .editorconfig
* [x] prettier
* [x] eslint
* [x] postcss
* [x] tailwindcss
* [x] typescript
* [x] @total-typescript/ts-reset
* [x] zod
* [x] react-hook-form
* [x] vite
* [x] vitest
* [x] playwright
* [x] storybook
* [x] runtime variables
* [x] cowsay (the most important one)
