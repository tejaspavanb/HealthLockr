"use client";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/me/records");
      const data = await res.json();
      setRecords(data.records || []);
    })();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-3">My Records</h2>
      <ul className="space-y-2">
        {records.map((r) => (
          <li key={r.id} className="border rounded p-2">
            <div className="font-medium">{r.title}</div>
            <div className="text-sm text-gray-600">{r.description}</div>
            {r.fileUrl && (
              <a className="text-indigo-600 underline text-sm" href={r.fileUrl} target="_blank">Open</a>
            )}
          </li>
        ))}
        {!records.length && <li className="text-sm text-gray-600">No records yet</li>}
      </ul>
    </div>
  );
}


