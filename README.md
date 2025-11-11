# HealthLockr

Secure, consent-based medical record access. Three roles:
- User: view own records
- Doctor: search users by Aadhaar/email and view records (access is logged)
- Hospital: upload records for users

## Stack
- Next.js 14 (App Router), React Compiler
- NextAuth (Credentials: email/Aadhaar + password)
- Prisma + PostgreSQL (Neon recommended)
- Tailwind CSS

## Prerequisites
- Node.js 18+
- A PostgreSQL URL (e.g., from Neon)

## Setup

1) Install dependencies
```bash
npm install
```

2) Configure environment
Create a file `.env.local` with:
```
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB?sslmode=require
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-long-random-string
```

3) Database
```bash
npx prisma db push
npx prisma generate
```

4) Dev
```bash
npm run dev
```

Open http://localhost:3000

## Roles and Flows

- Login:
  - Choose role (User, Doctor, Hospital)
  - Enter Email or Aadhaar + Password
- User:
  - See own records
- Hospital:
  - Upload record for a user by email/Aadhaar (stores URL in MVP)
- Doctor:
  - Search patient by email/Aadhaar
  - View record (logs an AccessLog entry)

## Deployment (Vercel)
- Push to GitHub
- Import repo in Vercel
- Add env vars in Vercel (.env.local values)
- Deploy

## Next steps (nice to have)
- File storage (Vercel Blob/S3)
- Email OTP login
- Consent tokens + QR codes
- At-rest encryption keys management
