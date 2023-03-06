# Projects monorepo

A [Turborepo](https://turbo.build/repo) monorepo for my projects.

## What's inside?

This [Turborepo](https://turbo.build/repo) monorepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `minesweeper`: minesweeper web game
- `portfolio`: portfolio website
- `snake`: snake web game
- `eslint-config-custom`: `eslint` configuration
- `stylelint-config-custom`: `stylelint` configuration
- `tsconfig`: `typescript` configuration

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This monorepo uses the following tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Stylelint](https://stylelint.io/) for style linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```bash
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```bash
pnpm run dev
```

### Lint

To lint all apps and packages, run the following command:

```bash
pnpm run lint
```
