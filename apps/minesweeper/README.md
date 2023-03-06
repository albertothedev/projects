# Minesweeper

Minesweeper game with leaderboard built with Next.js and MongoDB. TypeScript is enabled globally. SCSS is used for styling, Redux for state management, Passport and JWT for user authentication, Bcrypt for password hashing, and Mongoose for database manipulation.

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

- **NEXT_PUBLIC_JWT_SECRET**: JWT secret.
- **NEXT_PUBLIC_FIREBASE_PROJECT_ID**: Firebase project id.
- **NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL**: Firebase client email.
- **NEXT_PUBLIC_FIREBASE_PRIVATE_KEY**: Firebase private key.

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
