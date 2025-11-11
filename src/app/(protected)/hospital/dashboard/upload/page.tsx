"use client";

import { useState } from "react";
import { RecordUploader } from "@/components/RecordUploader";

export default function UploadPage() {
 const [refreshKey, setRefreshKey] = useState(0);

 return (
  <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
   <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/60">
    <div className="space-y-3">
     <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
      Hospital workspace
     </p>
     <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
      Upload patient documentation
     </h1>
     <p className="text-sm text-slate-600">
      Store lab reports, discharge summaries, and imaging securely in UploadThing.
      Patients and doctors will see the files immediately once uploaded.
     </p>
    </div>

    <div className="mt-8">
     <RecordUploader
      key={refreshKey}
      variant="patient"
      onUploaded={() => setRefreshKey((v) => v + 1)}
     />
    </div>
   </div>
  </div>
 );
}
