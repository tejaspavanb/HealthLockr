"use client";

import { useCallback, useEffect, useState } from "react";

type AccessLog = {
  id: string;
  createdAt: string;
  purpose: string;
  actor?: { name?: string | null; email?: string | null; role?: string | null };
  record?: { title: string | null };
};

export default function UserAccessLogsPanel() {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [loading, setLoading] = useState(false);

  const loadLogs = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/me/access-logs");
    const data = await res.json();
    setLogs(data.logs || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">Access history</h3>
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
            No one has accessed your records yet.
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
              Viewed by {log.actor?.name || log.actor?.email || "Unknown"} ({log.actor?.role})
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Record: {log.record?.title || "Unknown record"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

