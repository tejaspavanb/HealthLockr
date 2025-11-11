"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
 const [emailOrAadhaar, setId] = useState("");
 const [password, setPassword] = useState("");
 const [loginAs, setLoginAs] = useState<"USER" | "DOCTOR" | "HOSPITAL">("USER");
 const [loading, setLoading] = useState(false);

 async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);
  await signIn("credentials", {
   emailOrAadhaar,
   password,
   loginAs,
   callbackUrl: "/dashboard",
   redirect: true,
  }).finally(() => setLoading(false));
 }

 return (
  <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
   <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/60">
    <div className="space-y-2 text-center">
     <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
      Welcome back
     </p>
     <h1 className="text-3xl font-semibold text-slate-900">Sign in to continue</h1>
     <p className="text-sm text-slate-600">
      Access your dashboard and manage secure health records.
     </p>
    </div>

    <form onSubmit={handleLogin} className="mt-8 space-y-5">
     <div>
      <label className="block text-sm font-medium text-slate-800">
       Sign in as
      </label>
      <select
       className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
       value={loginAs}
       onChange={(e) => setLoginAs(e.target.value as any)}
      >
       <option value="USER">Patient</option>
       <option value="DOCTOR">Doctor</option>
       <option value="HOSPITAL">Hospital</option>
      </select>
     </div>

     <div>
      <label className="block text-sm font-medium text-slate-800">
       Email or Aadhaar
      </label>
      <input
       className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
       value={emailOrAadhaar}
       onChange={(e) => setId(e.target.value)}
       placeholder="Enter your registered email or Aadhaar"
      />
     </div>

     <div>
      <label className="block text-sm font-medium text-slate-800">Password</label>
      <input
       className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
       placeholder="Your password"
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
      />
     </div>

     <button
      type="submit"
      disabled={loading}
      className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
     >
      {loading ? "Signing you in..." : "Sign in"}
     </button>

     <p className="text-center text-sm text-slate-600">
      Need an account?{" "}
      <a className="font-semibold text-indigo-600 hover:text-indigo-500" href="/register">
       Register now
      </a>
     </p>
    </form>
   </div>
  </main>
 );
}


