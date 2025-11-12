"use client";

import { useCallback, useEffect, useState } from "react";

type AccessLog = {
  id: string;
  createdAt: string;
  purpose: string;
  patient?: { name?: string | null; email?: string | null };
  record?: { title?: string | null };
};

type DoctorAccessLogsPanelProps = {
  refreshSignal?: number;
};

export default function DoctorAccessLogsPanel({ refreshSignal }: DoctorAccessLogsPanelProps) {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [loading, setLoading] = useState(false);

  const loadLogs = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/doctor/my-access-logs");
    const data = await res.json();
    setLogs(data.logs || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  useEffect(() => {
    if (typeof refreshSignal === "number" && refreshSignal > 0) {
      void loadLogs();
    }
  }, [refreshSignal, loadLogs]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Recent access logs</h2>
        <button
          onClick={() => {
            void loadLogs();
          }}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      <div className="space-y-3">
        {!logs.length && !loading && (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            You have not accessed any records yet.
          </div>
        )}
        {loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            Loading access logs...
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
              Patient: {log.patient?.name || log.patient?.email || "Unknown"}
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Record: {log.record?.title || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

