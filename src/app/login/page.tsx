"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [emailOrAadhaar, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginAs, setLoginAs] = useState<"USER" | "DOCTOR" | "HOSPITAL">("USER");

  async function handleLogin() {
    await signIn("credentials", {
      emailOrAadhaar,
      password,
      loginAs,
      callbackUrl: "/dashboard",
      redirect: true,
    });
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <label className="block text-sm">Login as</label>
        <select
          className="w-full rounded border px-3 py-2"
          value={loginAs}
          onChange={(e) => setLoginAs(e.target.value as any)}
        >
          <option value="USER">User</option>
          <option value="DOCTOR">Doctor</option>
          <option value="HOSPITAL">Hospital</option>
        </select>

        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Email or Aadhaar"
          value={emailOrAadhaar}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full rounded bg-black px-3 py-2 text-white"
          onClick={handleLogin}
        >
          Sign In
        </button>
      </div>
    </main>
  );
}


