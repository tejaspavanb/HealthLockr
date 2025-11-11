"use client";

import { useState } from "react";

type Role = "USER" | "DOCTOR" | "HOSPITAL";

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
  <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-4xl items-center justify-center px-4 py-10">
   <div className="w-full rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
    <div className="space-y-2">
     <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
      Get started
     </p>
     <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
      Create your HealthLockr account
     </h1>
     <p className="text-sm text-slate-600">
      Choose your role and provide the required details to join the platform.
     </p>
    </div>

    <form onSubmit={submit} className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
     <div className="sm:col-span-2">
      <label className="block text-sm font-medium text-slate-800">Role</label>
      <select
       className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
       value={role}
       onChange={(e) => setRole(e.target.value as Role)}
      >
       <option value="USER">Patient</option>
       <option value="DOCTOR">Doctor</option>
       <option value="HOSPITAL">Hospital</option>
      </select>
     </div>

     <div>
      <label className="block text-sm font-medium text-slate-800">Full name</label>
      <input
       className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
       value={name}
       onChange={(e) => setName(e.target.value)}
      />
     </div>

     <div>
      <label className="block text-sm font-medium text-slate-800">Email</label>
      <input
       type="email"
       className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
      />
     </div>

     <div>
      <label className="block text-sm font-medium text-slate-800">Password</label>
      <input
       type="password"
       className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
      />
     </div>

     <div>
      <label className="block text-sm font-medium text-slate-800">
       Aadhaar number
      </label>
      <input
       className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
       value={aadhaarNumber}
       onChange={(e) => setAadhaar(e.target.value)}
       placeholder="12-digit Aadhaar"
      />
      <p className="mt-1 text-xs text-slate-500">
       Required for patients and doctors to verify identity.
      </p>
     </div>

     {role === "DOCTOR" && (
      <div>
       <label className="block text-sm font-medium text-slate-800">
        Medical council ID
       </label>
       <input
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        value={mciId}
        onChange={(e) => setMciId(e.target.value)}
       />
      </div>
     )}

     {(role === "DOCTOR" || role === "HOSPITAL") && (
      <>
       <div>
        <label className="block text-sm font-medium text-slate-800">
         Hospital name
        </label>
        <input
         className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
         value={hospitalName}
         onChange={(e) => setHospitalName(e.target.value)}
        />
       </div>
       <div>
        <label className="block text-sm font-medium text-slate-800">
         Hospital ID
        </label>
        <input
         className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
         value={hospitalId}
         onChange={(e) => setHospitalId(e.target.value)}
        />
       </div>
      </>
     )}

     {error && (
      <div className="sm:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
       {error}
      </div>
     )}

     <div className="sm:col-span-2">
      <button
       type="submit"
       disabled={loading}
       className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
      >
       {loading ? "Creating account..." : "Create account"}
      </button>
      <p className="mt-3 text-sm text-slate-600">
       Already have an account?{" "}
       <a
        className="font-semibold text-indigo-600 hover:text-indigo-500"
        href="/login"
       >
        Sign in
       </a>
      </p>
     </div>
    </form>
   </div>
  </main>
 );
}

