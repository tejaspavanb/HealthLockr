"use client";

import { useCallback, useEffect, useState } from "react";
import { RecordUploader } from "@/components/RecordUploader";

type MedicalRecord = {
 id: string;
 title: string;
 description: string | null;
 fileUrl: string;
 recordDate: string;
 createdAt: string;
 fileName: string;
 fileSize: number;
};

type AccessLog = {
 id: string;
 createdAt: string;
 purpose: string;
 actor?: { name?: string | null; email?: string | null; role?: string | null };
 record?: { title: string | null };
};

export default function UserDashboard() {
 const [records, setRecords] = useState<MedicalRecord[]>([]);
 const [otp, setOtp] = useState<string | null>(null);
 const [otpExpires, setOtpExpires] = useState<string | null>(null);
 const [logs, setLogs] = useState<AccessLog[]>([]);
 const [loadingRecords, setLoadingRecords] = useState(true);

 const loadRecords = useCallback(async () => {
  setLoadingRecords(true);
  const res = await fetch("/api/me/records");
  const data = await res.json();
  setRecords(data.records || []);
  setLoadingRecords(false);
 }, []);

 const loadLogs = useCallback(async () => {
  const res = await fetch("/api/me/access-logs");
  const data = await res.json();
  setLogs(data.logs || []);
 }, []);

 useEffect(() => {
  loadRecords();
  loadLogs();
 }, [loadRecords, loadLogs]);

 async function generateOtp() {
  const res = await fetch("/api/otp/generate", { method: "POST" });
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
      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
     >
      Generate consent OTP
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

   <RecordUploader variant="self" onUploaded={() => {
    loadRecords();
   }} />

   <section className="space-y-4">
    <div className="flex items-center justify-between">
     <h3 className="text-xl font-semibold text-slate-900">Recent documents</h3>
     <span className="text-sm text-slate-600">
      {records.length} {records.length === 1 ? "record" : "records"}
     </span>
    </div>
    <div className="grid gap-4 lg:grid-cols-2">
     {loadingRecords && (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
       Loading records...
      </div>
     )}
     {!loadingRecords && !records.length && (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-600 shadow-sm">
       No records yet. Upload your first document above.
      </div>
     )}
     {records.map((record) => (
      <article
       key={record.id}
       className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
      >
       <div>
        <h4 className="text-lg font-semibold text-slate-900">{record.title}</h4>
        <p className="mt-2 text-sm text-slate-600">
         {record.description || "No description provided"}
        </p>
       </div>
       <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>{new Date(record.recordDate).toLocaleString()}</span>
        <span>{(record.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
       </div>
       <a
        href={record.fileUrl}
        target="_blank"
        className="mt-4 inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
       >
        View document
       </a>
      </article>
     ))}
    </div>
   </section>

   <section className="space-y-4">
    <div className="flex items-center justify-between">
     <h3 className="text-xl font-semibold text-slate-900">Access history</h3>
     <button
      onClick={loadLogs}
      className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
     >
      Refresh
     </button>
    </div>
    <div className="space-y-3">
     {!logs.length && (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
       No one has accessed your records yet.
      </div>
     )}
     {logs.map((log) => (
      <div
       key={log.id}
       className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
      >
       <div className="flex items-center justify-between text-sm text-slate-600">
        <span>{new Date(log.createdAt).toLocaleString()}</span>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
         {log.purpose}
        </span>
       </div>
       <div className="mt-3 text-base font-semibold text-slate-900">
        Viewed by {log.actor?.name || log.actor?.email || "Unknown"} (
        {log.actor?.role})
       </div>
       <p className="mt-2 text-sm text-slate-600">
        Record: {log.record?.title || "Unknown record"}
       </p>
      </div>
     ))}
    </div>
   </section>
  </div>
 );
}
