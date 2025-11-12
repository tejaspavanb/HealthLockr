"use client";

import { useState } from "react";
import UserRecordsPanel from "@/components/user/UserRecordsPanel";
import UserAccessLogsPanel from "@/components/user/UserAccessLogsPanel";

export default function UserDashboard() {
 const [otp, setOtp] = useState<string | null>(null);
 const [otpExpires, setOtpExpires] = useState<string | null>(null);
 const [generatingOtp, setGeneratingOtp] = useState(false);

 async function generateOtp() {
  setGeneratingOtp(true);
  const res = await fetch("/api/otp/generate", { method: "POST" });
  setGeneratingOtp(false);
  if (!res.ok) {
   alert("Failed to generate OTP");
   return;
  }
  const data = await res.json();
  setOtp(data.code);
  setOtpExpires(new Date(data.expires).toLocaleString());
 }

 return (
  <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6">
   <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-lg sm:p-8">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
     <div>
      <h2 className="text-2xl font-semibold sm:text-3xl">My records</h2>
      <p className="mt-1 text-sm text-indigo-100">
       Generate a one-time code to share secure access with your doctor.
      </p>
     </div>
     <button
      onClick={generateOtp}
      disabled={generatingOtp}
      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-80"
     >
      {generatingOtp ? "Generating..." : "Generate consent OTP"}
     </button>
    </div>
    {otp && (
     <div className="mt-6 rounded-2xl bg-white/10 p-5 backdrop-blur">
      <p className="text-sm uppercase tracking-wide text-indigo-100">
       Share this code with your doctor
      </p>
      <div className="mt-2 text-3xl font-semibold tracking-[0.35em] text-white">
       {otp}
      </div>
      <p className="mt-2 text-xs text-indigo-100">
       Expires at {otpExpires}
      </p>
     </div>
    )}
   </section>

   <UserRecordsPanel />

   <UserAccessLogsPanel />
  </div>
 );
}
