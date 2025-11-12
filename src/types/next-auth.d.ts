import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: "USER" | "DOCTOR" | "HOSPITAL";
    hospitalName?: string | null;
    hospitalId?: string | null;
    aadhaarNumber?: string | null;
  }

  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"] &
      Partial<User>;
  }

  interface AdapterUser extends User {}
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "USER" | "DOCTOR" | "HOSPITAL";
    hospitalName?: string | null;
    hospitalId?: string | null;
    aadhaarNumber?: string | null;
  }
}


