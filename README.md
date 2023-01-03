# Typescript Starter

A starter project for learning and setting up Typescript projects.

## Target Audience

There are so many flavours of how to start learning Typescript. This guide is mainly for experienced backend developers building NodeJS applications using Typescript.  
This guide assumes prior knowledge on programming, API development in another language and framework.

## Project Setup

As there are many ways of setting a Typescript project, this guide follows one of those many school of thoughts by embracing at a high level:

- ESLint + Prettier for formatting and code style
- TSNode for running the project
- Jest for testing

This project assumes a recent version of NodeJS (16+) and NPM (8+) installed on your machine and VSCode for editing and programming.  
`extensions.json` recommends installing following extensions to have higher productivity and editing experience.

```yaml
"dbaeumer.vscode-eslint",
"chris-noring.node-snippets",
"christian-kohler.npm-intellisense",
"esbenp.prettier-vscode"
```

## Running Project

At the root folder, install dependencies:

```sh
npm install
```

Run project from `index.ts` which is the entry point of the application:

```sh
npm run start
```

## Learning

This project is a starter with some opinions baked in for the productivity and modern software aspects.  
There is also step by step explanation of each part under [docs](/docs/) folder.

## Contribution

Please issue a new ticket and explain the need for contributions. All ideas are welcome.
