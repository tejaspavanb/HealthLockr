"use client";

import Image from "next/image";
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
   <div className="relative w-full max-w-5xl overflow-hidden rounded-[3rem] border border-white/60 bg-white/90 shadow-2xl shadow-indigo-500/10 backdrop-blur">
    <div className="absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-400 md:block" />
    <div className="grid md:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
     <div className="relative hidden flex-col justify-between p-10 text-white md:flex">
      <div className="flex items-center gap-3">
       <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
        <Image src="/logo.png" alt="HealthLockr logo" width={32} height={32} className="h-8 w-8 rounded-xl object-contain" />
       </span>
       <div className="leading-tight">
        <p className="text-lg font-semibold tracking-tight">HealthLockr</p>
        <p className="text-xs uppercase tracking-[0.3em] text-white/80">Secure medical vault</p>
       </div>
      </div>
      <div className="space-y-6">
       <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Why sign in?</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight">
         Access your consent dashboard &{" "}
         <span className="text-emerald-200">keep every visit accountable.</span>
        </h1>
       </div>
       <ul className="space-y-4 text-sm text-white/80">
        <li className="flex items-start gap-3">
         <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
          ✓
         </span>
         <span>Generate OTPs for doctors in seconds—share securely during the consult.</span>
        </li>
        <li className="flex items-start gap-3">
         <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
          ✓
         </span>
         <span>Review a tamper-proof access log after every appointment.</span>
        </li>
        <li className="flex items-start gap-3">
         <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
          ✓
         </span>
         <span>Upload and organize documents without leaving the dashboard.</span>
        </li>
       </ul>
      </div>
      <div className="space-y-2 text-xs text-white/70">
       <p>Powered by NextAuth • Multi-role aware • UploadThing secured storage</p>
      </div>
     </div>

     <div className="relative p-8 sm:p-10">
      <div className="absolute right-6 top-6 hidden rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-500 md:block">
       Need an account?{" "}
       <a href="/register" className="text-indigo-600 hover:text-indigo-500">
        Register
       </a>
      </div>
      <div className="space-y-2 text-left md:pt-6">
       <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">Welcome back</p>
       <h1 className="text-3xl font-semibold text-slate-900">Sign in to your workspace</h1>
       <p className="text-sm text-slate-600">
        Choose your role, enter your credentials, and you’ll be routed to the appropriate dashboard.
       </p>
      </div>

      <form onSubmit={handleLogin} className="mt-10 space-y-6">
       <div>
        <label className="block text-sm font-medium text-slate-800">
         Sign in as
        </label>
        <div className="relative mt-2">
         <select
          className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          value={loginAs}
          onChange={(e) => setLoginAs(e.target.value as any)}
         >
          <option value="USER">Patient</option>
          <option value="DOCTOR">Doctor</option>
          <option value="HOSPITAL">Hospital</option>
         </select>
        </div>
       </div>

       <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-800">
         Email or Aadhaar
        </label>
        <input
         className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
         value={emailOrAadhaar}
         onChange={(e) => setId(e.target.value)}
         placeholder="your@email.com or 12-digit ID"
        />
       </div>

       <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-800">Password</label>
        <input
         className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
         placeholder="Your password"
         type="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
        />
       </div>

       <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
       >
        {loading ? "Signing you in..." : "Sign in"}
       </button>

       <p className="text-center text-sm text-slate-600 md:hidden">
        Need an account?{" "}
        <a className="font-semibold text-indigo-600 hover:text-indigo-500" href="/register">
         Register now
        </a>
       </p>
      </form>
     </div>
    </div>
   </div>
  </main>
 );
}


