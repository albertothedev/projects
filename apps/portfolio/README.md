# Portfolio

Portfolio built with Next.js. TypeScript is enabled globally. SCSS is used for styling and Nodemailer for email sending.

## Getting started

1. Install dependencies:

   ```bash
   pnpm i
   ```

2. Start a development server:

   ```bash
   pnpm run dev
   ```

## Environment variables

Specified in `./.env.local`.

- **NEXT_PUBLIC_SNAKE_UI_URL**: Snake project demo URL.
- **NEXT_PUBLIC_MINESWEEPER_UI_URL**: Minesweeper project demo URL.
- **NEXT_PUBLIC_TASKOUT_UI_URL**: Taskout project demo URL.
- **NEXT_PUBLIC_LOLDATA_UI_URL**: Loldata project demo URL.
- **NEXT_PUBLIC_SNAKE_SOURCE_URL**: Snake project source URL.
- **NEXT_PUBLIC_MINESWEEPER_SOURCE_URL**: Minesweeper project source URL.
- **NEXT_PUBLIC_TASKOUT_SOURCE_URL**: Taskout project source URL.
- **NEXT_PUBLIC_LOLDATA_SOURCE_URL**: Loldata project source URL.
- **NEXT_PUBLIC_LINKEDIN_URL**: LinkedIn profile.
- **NEXT_PUBLIC_GITHUB_URL**: GitHub profile.
- **NEXT_PUBLIC_EMAIL_ACCOUNT**: Contact email account.
- **EMAIL_ACCOUNT**: Nodemailer email account.
- **EMAIL_PASSWORD**: Password for above-mentioned email account.

## Other commands

- Start a production server:

  ```bash
  pnpm start
  ```

- Build the app for production usage:

  ```bash
  pnpm run build
  ```

- Lint the app:

  ```bash
  pnpm run lint
  ```
