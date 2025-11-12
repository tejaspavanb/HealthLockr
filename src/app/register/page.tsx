"use client";

import Image from "next/image";
import { useState } from "react";

type Role = "USER" | "DOCTOR" | "HOSPITAL";

const roleHelperCopy: Record<Role, string> = {
 USER: "Patients collect personal medical history and control consent.",
 DOCTOR: "Doctors fetch records responsibly with patient authorization.",
 HOSPITAL: "Hospitals upload discharge packets directly to the vault.",
};

export default function RegisterPage() {
 const [role, setRole] = useState<Role>("USER");
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [aadhaarNumber, setAadhaar] = useState("");
 const [mciId, setMciId] = useState("");
 const [hospitalName, setHospitalName] = useState("");
 const [hospitalId, setHospitalId] = useState("");
 const [password, setPassword] = useState("");
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 async function submit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);
  setError(null);
  const res = await fetch("/api/auth/register", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({
    role,
    name,
    email,
    aadhaarNumber,
    mciId,
    hospitalName,
    hospitalId,
    password,
   }),
  });
  setLoading(false);

  if (res.ok) {
   window.location.href = "/login";
   return;
  }
  const data = await res.json().catch(() => ({}));
  setError(data?.error ?? "Registration failed");
 }

 return (
  <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
   <div className="relative w-full max-w-6xl overflow-hidden rounded-[3rem] border border-white/70 bg-white/90 shadow-2xl shadow-indigo-500/10 backdrop-blur">
    <div className="grid lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
     <div className="relative hidden flex-col justify-between bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-400 p-10 text-white lg:flex">
      <div className="flex items-center gap-3">
       <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
        <Image src="/logo.png" alt="HealthLockr logo" width={32} height={32} className="h-8 w-8 rounded-xl object-contain" />
       </span>
       <div className="leading-tight">
        <p className="text-lg font-semibold tracking-tight">HealthLockr</p>
        <p className="text-xs uppercase tracking-[0.3em] text-white/80">Consent-first medical vault</p>
       </div>
      </div>

      <div className="space-y-6">
       <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
        Start in minutes
       </p>
       <h1 className="text-3xl font-bold leading-tight">
        One platform for patients, doctors, and hospitals to stay aligned.
       </h1>
       <div className="space-y-4 rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Selected role</p>
        <p className="text-lg font-semibold capitalize">{role.toLowerCase()}</p>
        <p className="text-sm text-white/85">{roleHelperCopy[role]}</p>
       </div>
       <ul className="space-y-4 text-sm text-white/80">
        <li className="flex items-start gap-3">
         <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
          ✓
         </span>
         Upload PDFs or images with UploadThing endpoints—no storage setup required.
        </li>
        <li className="flex items-start gap-3">
         <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
          ✓
         </span>
         Role-aware dashboards route you to patient history, doctor lookup, or hospital uploads.
        </li>
        <li className="flex items-start gap-3">
         <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
          ✓
         </span>
         Automatic access logs keep every interaction accountable.
        </li>
       </ul>
      </div>

      <p className="text-xs text-white/70">
       Tip: create one account per role to experience the full workflow end to end.
      </p>
     </div>

     <div className="relative p-8 sm:p-10 lg:p-12">
      <div className="space-y-2">
       <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">
        Get started
       </p>
       <h2 className="text-3xl font-semibold text-slate-900">
        Create your HealthLockr account
       </h2>
       <p className="text-sm text-slate-600">
        Provide basic details, choose your role, and you’ll be guided to the right workspace.
       </p>
      </div>

      <form onSubmit={submit} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
       <div className="space-y-2 sm:col-span-2">
        <label className="block text-sm font-medium text-slate-800">Role</label>
        <select
         className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
         value={role}
         onChange={(e) => setRole(e.target.value as Role)}
        >
         <option value="USER">Patient</option>
         <option value="DOCTOR">Doctor</option>
         <option value="HOSPITAL">Hospital</option>
        </select>
       </div>

       <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-800">Full name</label>
        <input
         className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
         value={name}
         onChange={(e) => setName(e.target.value)}
         placeholder="Enter your full name"
        />
       </div>

       <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-800">Email</label>
        <input
         type="email"
         className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         placeholder="you@email.com"
        />
       </div>

       <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-800">Password</label>
        <input
         type="password"
         className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         placeholder="Minimum 6 characters"
        />
       </div>

       {(role === "USER" || role === "DOCTOR") && (
        <div className="space-y-2">
         <label className="block text-sm font-medium text-slate-800">
          Aadhaar number <span className="text-red-500">*</span>
         </label>
         <input
          className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          value={aadhaarNumber}
          onChange={(e) => setAadhaar(e.target.value)}
          placeholder="12-digit Aadhaar"
          required
         />
         <p className="text-xs text-slate-500">
          Required for patients and doctors to verify identity.
         </p>
        </div>
       )}

       {role === "DOCTOR" && (
        <div className="space-y-2">
         <label className="block text-sm font-medium text-slate-800">
          Medical council ID
         </label>
         <input
          className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          value={mciId}
          onChange={(e) => setMciId(e.target.value)}
          placeholder="Optional"
         />
        </div>
       )}

       {(role === "DOCTOR" || role === "HOSPITAL") && (
        <>
         <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-800">
           Hospital name <span className="text-red-500">*</span>
          </label>
          <input
           className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
           value={hospitalName}
           onChange={(e) => setHospitalName(e.target.value)}
           placeholder="e.g. Sunrise Medical Center"
           required
          />
         </div>
         <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-800">
           Hospital ID <span className="text-red-500">*</span>
          </label>
          <input
           className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
           value={hospitalId}
           onChange={(e) => setHospitalId(e.target.value)}
           placeholder="Internal hospital identifier"
           required
          />
         </div>
        </>
       )}

       {error && (
        <div className="sm:col-span-2 rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700">
         {error}
        </div>
       )}

       <div className="space-y-3 pt-2 sm:col-span-2">
        <button
         type="submit"
         disabled={loading}
         className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
        >
         {loading ? "Creating account..." : "Create account"}
        </button>
        <p className="text-sm text-slate-600">
         Already have an account?{" "}
         <a className="font-semibold text-indigo-600 hover:text-indigo-500" href="/login">
          Sign in
         </a>
        </p>
       </div>
      </form>
     </div>
    </div>
   </div>
  </main>
 );
}

