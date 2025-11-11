import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: "USER" | "DOCTOR" | "HOSPITAL";
      hospitalName?: string | null;
      hospitalId?: string | null;
      aadhaarNumber?: string | null;
    } & DefaultSession["user"];
  }
}


