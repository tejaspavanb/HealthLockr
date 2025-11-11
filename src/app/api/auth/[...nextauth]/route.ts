import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";

const credentialsSchema = z.object({
  emailOrAadhaar: z.string().min(3),
  password: z.string().min(6),
  loginAs: z.enum(["USER", "DOCTOR", "HOSPITAL"]),
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    Credentials({
      name: "Email/Aadhaar + Password",
      credentials: {
        emailOrAadhaar: { label: "Email or Aadhaar", type: "text" },
        password: { label: "Password", type: "password" },
        loginAs: { label: "Login As", type: "text" },
      },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;

        const { emailOrAadhaar, password, loginAs } = parsed.data;

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: emailOrAadhaar.toLowerCase() },
              { aadhaarNumber: emailOrAadhaar },
            ],
          },
        });

        if (!user) return null;
        if (user.role !== loginAs) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email ?? undefined,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
          role: user.role,
        } as any;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // @ts-expect-error custom
        session.user.id = token.sub!;
        // @ts-expect-error custom
        session.user.role = token.role as "USER" | "DOCTOR" | "HOSPITAL";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // @ts-expect-error from authorize
        token.role = user.role;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT ?? 465),
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER!,
    pass: process.env.EMAIL_SERVER_PASSWORD!,
  },
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    EmailProvider({
      id: "email",
      name: "Email",
      server: transporter,
      from: process.env.EMAIL_FROM,
      maxAge: 10 * 60, // 10 minutes
      sendVerificationRequest: async ({ identifier, url }) => {
        await transporter.sendMail({
          to: identifier,
          from: process.env.EMAIL_FROM!,
          subject: "Your HealthLockr sign-in code",
          html: `<p>Use the link below to sign in:</p><p><a href="${url}">${url}</a></p><p>This link expires in 10 minutes.</p>`,
        });
      },
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/verify",
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
        // @ts-expect-error
        session.user.role = (user as any).role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };