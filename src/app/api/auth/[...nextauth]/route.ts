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
  session: { strategy: "jwt" },
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
          hospitalName: user.hospitalName,
          hospitalId: user.hospitalId,
          aadhaarNumber: user.aadhaarNumber,
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
        // @ts-expect-error custom
        session.user.hospitalName = token.hospitalName ?? null;
        // @ts-expect-error custom
        session.user.hospitalId = token.hospitalId ?? null;
        // @ts-expect-error custom
        session.user.aadhaarNumber = token.aadhaarNumber ?? null;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // @ts-expect-error from authorize
        token.role = user.role;
        // @ts-expect-error from authorize
        token.hospitalName = user.hospitalName ?? null;
        // @ts-expect-error from authorize
        token.hospitalId = user.hospitalId ?? null;
        // @ts-expect-error from authorize
        token.aadhaarNumber = user.aadhaarNumber ?? null;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };