## Next.js 14, NextAuth.js v5, MongoDB, Typescript Example  
A demo project that uses NextAuth.js v5 for authentication, connects to MongoDB with Mongoose, and supports Google OAuth and email/password login.

## Features
- OAuth: Log in with Google.

- Credential Login: Log in with email and password.

- Email Verification: Confirm user's email address.

- Forgot Password: Reset user's password through an email.

- Two Factor Verification: Obtain a six-digit login code through an email.

- Settings Edit: Change user's settings, including name, password, and toggle Two-factor verification.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Environment Setup
Create a .env file in the root directory and add the following variables:

```env
# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Authentication
AUTH_SECRET="your_auth_secret_here" # Generate with: openssl rand -hex 32
TOKEN_SECRET="your_token_secret_here" # Generate with: openssl rand -hex 32

# MongoDB
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/database"

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Email Service (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_EMAIL_URL="https://api.resend.com/emails"

# SMTP Settings (Gmail)
EMAIL_USER="your_email@gmail.com"
EMAIL_PASSWORD="your_app_specific_password"

# Web3 Settings
NEXT_PUBLIC_NFT_STORAGE_KEY="your_nft_storage_key"
NEXT_PUBLIC_SOLANA_RPC_URL="https://api.devnet.solana.com"
```

GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET

- Navigate to [https://console.cloud.google.com](https://console.cloud.google.com/) .

- Create a new project.

- Head over to APIs & Services => Credentials.
  
- Click on CREATE CREDENTIALS => OAuth client ID.
  
- Choose the Web application.

- Add to Authorized JavaScript origins: http://localhost:3000 .

- Add to Authorized redirect URIs: http://localhost:3000/api/auth/callback/google.
  
- Finish by going to APIs & Services => OAuth consent screen and publishing the app.

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
