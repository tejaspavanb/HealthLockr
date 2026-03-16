# HealthLockr 🏥🔐

> **Consent-based health records platform** — inspired by India's DigiLocker, built for secure medical document storage, role-based access, and auditable doctor-patient interactions.

---

## Overview

India has no unified, patient-controlled health records infrastructure outside government systems. HealthLockr fills that gap with a consent-driven, role-based platform where:

- **Patients** own their records and control access
- **Doctors** request access and every view is logged for accountability
- **Hospitals** upload verified medical documents tied to patient identity (Aadhaar / email)

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Next.js 14 App                    │
│              (App Router + React Compiler)           │
├──────────────┬──────────────────┬────────────────────┤
│  User Portal │   Doctor Portal  │  Hospital Portal   │
│  (View own  │  (Search + View  │  (Upload records   │
│   records)  │   + Access Log)  │   for patients)    │
├──────────────┴──────────────────┴────────────────────┤
│              NextAuth (Credentials)                  │
│         Email / Aadhaar + Password Auth              │
├─────────────────────────────────────────────────────┤
│              Prisma ORM + PostgreSQL                 │
│    Users | Records | AccessLogs | Role Schema        │
└─────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Auth | NextAuth.js (Credentials Provider) |
| ORM | Prisma |
| Database | PostgreSQL (Neon recommended) |
| Styling | Tailwind CSS |
| Deployment | Vercel |

---

## Key Features

**Role-Based Access Control (RBAC)**
Three distinct roles — User, Doctor, Hospital — each with isolated portals and permissions enforced at the API layer.

**Dual Identity Support**
Authentication via Email or Aadhaar number, mirroring real-world Indian healthcare identity patterns.

**Auditable Access Logs**
Every doctor record view creates an `AccessLog` entry — patients can see who accessed their records and when. Full accountability trail.

**Hospital Record Upload**
Hospitals upload medical records (URL-based in MVP) tied to patient identity, creating a verified document chain.

---

## Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String?  @unique
  aadhaar   String?  @unique
  password  String
  role      Role     // USER | DOCTOR | HOSPITAL
  records   Record[]
  accessLogs AccessLog[]
}

model Record {
  id        String   @id @default(cuid())
  userId    String
  fileUrl   String
  uploadedBy String  // Hospital ID
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}

model AccessLog {
  id         String   @id @default(cuid())
  doctorId   String
  patientId  String
  accessedAt DateTime @default(now())
  patient    User     @relation(fields: [patientId], references: [id])
}
```

---

## Getting Started

**Prerequisites**
- Node.js 18+
- PostgreSQL URL (Neon, Supabase, or local)

**Installation**

```bash
git clone https://github.com/tejaspavanb/HealthLockr.git
cd HealthLockr
npm install
```

**Environment Setup**

Create `.env.local`:

```env
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB?sslmode=require
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-long-random-secret
```

**Database Setup**

```bash
npx prisma db push
npx prisma generate
```

**Run Locally**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## User Flows

```
Patient Login  →  View own medical records
                  See AccessLog (who viewed your records)

Doctor Login   →  Search patient by Email / Aadhaar
                  View records (auto-logged to AccessLog)

Hospital Login →  Upload record for patient by Email / Aadhaar
```

---

## Deployment

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Add environment variables from `.env.local`
4. Deploy — zero config needed with Next.js

---

## Roadmap

- [ ] File storage via Vercel Blob / AWS S3
- [ ] Email OTP login (passwordless)
- [ ] Consent tokens with QR code sharing
- [ ] At-rest encryption with per-patient keys
- [ ] Notification system for access events
- [ ] ABDM (Ayushman Bharat Digital Mission) API integration

---

## Why HealthLockr?

India's healthcare system lacks patient-controlled record portability. While ABHA exists at a national level, there's no lightweight, developer-friendly open platform for building on top of consent-based health data. HealthLockr is a proof-of-concept for what that infrastructure could look like.

---

## Author

**Tejas Pavan B** — Backend Engineer & CS Student at VTU, Bangalore  
[GitHub](https://github.com/tejaspavanb) · [LinkedIn](https://linkedin.com/in/tejaspavanb) · [Portfolio](https://tejaspavanb.github.io/)
