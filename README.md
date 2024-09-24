# Next Auth App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Getting Started

To run the project locally, follow these steps:

1. Create an account with [Neon Database](https://neon.tech/) (free tier available). Obtain a connection string for the database and set it as the `DATABASE_URL` environment variable. Follow the [step-by-step guide to connect the app](https://neon.tech/docs/get-started-with-neon/connect-neon).

2. Create an account with [Resend](https://resend.com/) (free tier available). Generate an API key and set it as the `RESEND_API_KEY` environment variable. You can follow the [step-by-step guide](https://resend.com/docs/send-with-nextjs), to obtain the API key.

   Note: If you're not using a purchased domain, emails will be sent to the email address associated with your Resend account.

3. Generate a random string for the `AUTH_SECRET` environment variable:

   - Use https://cli.authjs.dev
   - Or any other method for generating secure random strings

4. Set up OAuth with Google and GitHub to obtain ID and SECRET tokens. Include them as the following environment variables:

   - `AUTH_GITHUB_ID`
   - `AUTH_GITHUB_SECRET`
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`

   See GitHub guide for OAuth [here](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app). See Google guide for OAuth [here](https://developers.google.com/identity/sign-in/web/sign-in).

5. Install dependencies:

   If you don't have `pnpm` package manager installed or prefer not to use it, remove the `pnpm-lock.yaml` file and use `npm` or the package manager you prefer.

   Run `pnpm i` at the root of the project.

6. Run the following scripts to update the database schema:

   `pnpm db:generate`, `pnpm db:migrate` or `npm run db:generate`, `npm run db:migrate`

7. Start the development server:

   `pnpm dev` or `npm run dev`

## Resources

If you are not familiar with the different technologies used in this project, please refer to the respective docs.

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [NextAuth.js](https://next-auth.js.org)
- [Neon Postgres](https://neon.tech/home)
- [Drizzle ORM](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)
- [Zod](https://zod.dev)
- [React Hook Form](https://react-hook-form.com)
- [pnpm](https://pnpm.io)

## Learn More About T3

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!
