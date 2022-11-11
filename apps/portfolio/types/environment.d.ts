declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_LINKEDIN_URL: string;
      NEXT_PUBLIC_GITHUB_URL: string;
      NEXT_PUBLIC_EMAIL_ACCOUNT: string;
      NEXT_PUBLIC_SNAKE_UI_URL: string;
      NEXT_PUBLIC_MINESWEEPER_UI_URL: string;
      NEXT_PUBLIC_TASKOUT_UI_URL: string;
      NEXT_PUBLIC_LOLDATA_UI_URL: string;
      NEXT_PUBLIC_SNAKE_SOURCE_URL: string;
      NEXT_PUBLIC_MINESWEEPER_SOURCE_URL: string;
      NEXT_PUBLIC_TASKOUT_SOURCE_URL: string;
      NEXT_PUBLIC_LOLDATA_SOURCE_URL: string;
      EMAIL_ACCOUNT: string;
      EMAIL_PASSWORD: string;
    }
  }
}

export {};
