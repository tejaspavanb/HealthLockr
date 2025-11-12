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
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.role) {
          session.user.role = token.role;
        }
        session.user.hospitalName = token.hospitalName ?? null;
        session.user.hospitalId = token.hospitalId ?? null;
        session.user.aadhaarNumber = token.aadhaarNumber ?? null;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.hospitalName = user.hospitalName ?? null;
        token.hospitalId = user.hospitalId ?? null;
        token.aadhaarNumber = user.aadhaarNumber ?? null;
      }
      return token;
    },
  },
};
export async function hashPassword(plain: string) {
  const saltRounds = 10;
  return bcrypt.hash(plain, saltRounds);
}


