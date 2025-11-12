"use client";

import { useState } from "react";

type RecordSummary = {
  id: string;
  title: string;
  description: string | null;
  recordDate: string;
  fileUrl: string;
  fileSize: number;
};

type PatientSummary = {
  id: string;
  name?: string | null;
  email?: string | null;
  aadhaarNumber?: string | null;
};

type AccessPanelProps = {
  onLogsChanged?: () => void;
};

export default function DoctorPatientAccessPanel({ onLogsChanged }: AccessPanelProps) {
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState<RecordSummary[]>([]);
  const [patient, setPatient] = useState<PatientSummary | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [otpPatient, setOtpPatient] = useState<PatientSummary | null>(null);
  const [otpRecords, setOtpRecords] = useState<RecordSummary[]>([]);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);

  async function searchByIdentifier() {
    if (!query.trim()) return;
    setLoadingSearch(true);
    const res = await fetch("/api/records/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientEmailOrAadhaar: query }),
    });
    const data = await res.json();
    setRecords(data.records || []);
    setPatient(data.patient || null);
    setOtpCode("");
    setLoadingSearch(false);
  }

  async function accessWithOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!otpCode.trim()) return;
    setLoadingOtp(true);
    const res = await fetch("/api/records/by-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otpCode: otpCode.trim() }),
    });
    const data = await res.json();
    if (!res.ok) {
      setOtpError(data?.error ?? "Unable to fetch records with this OTP.");
      setOtpRecords([]);
      setOtpPatient(null);
      setLoadingOtp(false);
      return;
    }
    setOtpError(null);
    setOtpRecords(data.records || []);
    setOtpPatient(data.patient);
    setLoadingOtp(false);
    onLogsChanged?.();
  }

  async function viewRecord(record: RecordSummary, context: { otp?: string; patientId?: string }) {
    const res = await fetch("/api/records/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recordId: record.id,
        purpose: context.otp ? "patient-consent" : "aadhaar-lookup",
        otpCode: context.otp,
        patientId: context.patientId,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data?.error || "Unable to open record.");
      return;
    }
    window.open(data.record?.fileUrl, "_blank", "noopener,noreferrer");
    onLogsChanged?.();
  }

  return (
    <>
      <section className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60">
        <h1 className="text-3xl font-semibold text-slate-900">Access patient records</h1>
        <p className="mt-2 text-sm text-slate-600">
          Use a patient-provided OTP for instant access or search by Aadhaar/email to view their
          record list.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <form
            onSubmit={accessWithOtp}
            className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5"
          >
            <h2 className="text-lg font-semibold text-slate-900">Access with consent OTP</h2>
            <p className="mt-1 text-sm text-indigo-700">
              Ask your patient to generate the OTP from their dashboard.
            </p>
            <div className="mt-4 space-y-3">
              <input
                className="w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Enter 6-digit OTP"
              />
              {otpError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {otpError}
                </div>
              )}
              <button
                type="submit"
                disabled={loadingOtp}
                className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {loadingOtp ? "Fetching..." : "View records"}
              </button>
            </div>
          </form>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Search by Aadhaar or email</h2>
            <p className="mt-1 text-sm text-slate-600">
              Look up a patient and open individual records. Each access is logged.
            </p>
            <div className="mt-4 flex gap-3">
              <input
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Patient email or Aadhaar"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={searchByIdentifier}
                type="button"
                disabled={loadingSearch}
                className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {loadingSearch ? "Searching..." : "Search"}
              </button>
            </div>
            {patient && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">{patient.name || patient.email}</div>
                <div>Aadhaar: {patient.aadhaarNumber || "N/A"}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {otpPatient && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Records unlocked via OTP for {otpPatient.name || otpPatient.email}
            </h2>
            <span className="text-sm text-slate-600">
              {otpRecords.length} {otpRecords.length === 1 ? "record" : "records"}
            </span>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {!otpRecords.length && (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
                No records available for this patient.
              </div>
            )}
            {otpRecords.map((record) => (
              <article
                key={record.id}
                className="rounded-3xl border border-indigo-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">{record.title}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {record.description || "No description provided"}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs uppercase text-slate-500">
                  <span>{new Date(record.recordDate).toLocaleString()}</span>
                  <span>{(record.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
                <a
                  href={record.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  Open record
                </a>
              </article>
            ))}
          </div>
        </section>
      )}

      {patient && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Records for {patient.name || patient.email}
            </h2>
            <span className="text-sm text-slate-600">
              {records.length} {records.length === 1 ? "record" : "records"}
            </span>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {!records.length && (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
                This patient has no records yet.
              </div>
            )}
            {records.map((record) => (
              <article
                key={record.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">{record.title}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {record.description || "No description provided"}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs uppercase text-slate-500">
                  <span>{new Date(record.recordDate).toLocaleString()}</span>
                  <span>{(record.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
                <button
                  onClick={() =>
                    void viewRecord(record, {
                      patientId: patient.id,
                    })
                  }
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Open record
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

