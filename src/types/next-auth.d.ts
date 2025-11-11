import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: "USER" | "DOCTOR" | "HOSPITAL";
    } & DefaultSession["user"];
  }
}


