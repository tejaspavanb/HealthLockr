"use client";
import { useState } from "react";

export default function DoctorDashboard() {
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState<any[]>([]);
  const [patient, setPatient] = useState<any>(null);

  async function search() {
    const res = await fetch("/api/records/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientEmailOrAadhaar: query }),
    });
    const data = await res.json();
    setRecords(data.records || []);
    setPatient(data.patient);
  }

  async function viewRecord(id: string) {
    const res = await fetch("/api/records/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordId: id, purpose: "treatment" }),
    });
    const data = await res.json();
    if (data.record?.fileUrl) window.open(data.record.fileUrl, "_blank");
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Doctor: Patient Lookup</h2>
      <div className="flex gap-2">
        <input className="border rounded px-3 py-2 flex-1" placeholder="Patient Email or Aadhaar" value={query} onChange={(e)=>setQuery(e.target.value)} />
        <button className="rounded bg-black text-white px-3 py-2" onClick={search}>Search</button>
      </div>

      {patient && (
        <div className="space-y-2">
          <div className="font-medium">Patient: {patient.name || patient.email}</div>
          <div className="text-sm text-gray-600">Records</div>
          <ul className="space-y-2">
            {records.map((r) => (
              <li key={r.id} className="flex items-center justify-between border rounded p-2">
                <div>
                  <div className="font-medium">{r.title}</div>
                  <div className="text-sm text-gray-600">{r.description}</div>
                </div>
                <button className="rounded bg-indigo-600 text-white px-3 py-1" onClick={() => viewRecord(r.id)}>Open</button>
              </li>
            ))}
            {!records.length && <li className="text-sm text-gray-600">No records</li>}
          </ul>
        </div>
      )}
    </div>
  );
}


