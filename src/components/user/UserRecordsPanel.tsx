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

export default function UserRecordsPanel() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(true);

  const loadRecords = useCallback(async () => {
    setLoadingRecords(true);
    const res = await fetch("/api/me/records");
    const data = await res.json();
    setRecords(data.records || []);
    setLoadingRecords(false);
  }, []);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  return (
    <div className="space-y-8">
      <RecordUploader
        variant="self"
        onUploaded={() => {
          void loadRecords();
        }}
      />

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
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                View document
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

