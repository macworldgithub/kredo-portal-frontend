This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend API

The portal reads its API base URL from `NEXT_PUBLIC_API_URL`. Copy `.env.example` to
`.env.local` and set the URL to the running NestJS backend, for example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the backend in a separate terminal from `../kredo-portal-backend` after
configuring its `.env` and MongoDB connection:

```bash
npm run start:dev
```

Then run the frontend with `npm run dev`. Sign in using the credentials configured
through the backend's `MASTER_EMAIL`/`MASTER_PASSWORD` or
`PARTNER_EMAIL`/`PARTNER_PASSWORD` environment variables. The frontend fetches
partner and master workspace data from the API and persists mutations through the
corresponding API endpoints.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Install as a PWA

The production site includes a web app manifest and service worker. Deploy it over
HTTPS (or run the production server on `localhost`), then use the browser's
**Install app** or **Add to Home Screen** option. The service worker caches the
app's static assets and an offline notice; authenticated pages and API responses
are not cached.

The portal layout uses responsive Tailwind breakpoints, with a compact bottom
navigation on phones and the full sidebar on larger screens. For a production
PWA check on localhost, run `npm run build` and then `npm run start`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Deploy this Next.js project as a Vercel project with `kredo-platform` as its
project root. Vercel detects Next.js automatically. Set `NEXT_PUBLIC_API_URL`
in the Vercel project's Production (and Preview, if needed) environment
variables to the deployed backend URL, including `/api`, for example:

```env
NEXT_PUBLIC_API_URL=https://your-kredo-backend.vercel.app/api
```

Deploy `kredo-portal-backend` as a separate Vercel project with that directory
as its project root. Configure MongoDB Atlas, SMTP, master account, and CORS
environment variables as described in the backend README. Never commit `.env`.

After both deployments finish, test sign-in, portal API requests, signup, and
password recovery on the HTTPS frontend.
