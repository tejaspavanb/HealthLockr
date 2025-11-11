"use client";

import { useState, useEffect } from "react";
import { UploadButton } from "@/lib/uploadthing";

type UploadResult = {
 url: string;
 key: string;
 name: string;
 size: number;
};

type RecordUploaderProps = {
 variant: "self" | "patient";
 onUploaded?: () => void;
};

export function RecordUploader({ variant, onUploaded }: RecordUploaderProps) {
 const [ownerIdentifier, setOwnerIdentifier] = useState("");
 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [recordDate, setRecordDate] = useState("");
 const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
 const [submitting, setSubmitting] = useState(false);
 const [message, setMessage] = useState<string | null>(null);
 const [messageVariant, setMessageVariant] = useState<"info" | "error" | "success">("info");
 const [uploadError, setUploadError] = useState<string | null>(null);

 useEffect(() => {
  // Test if UploadThing endpoint is accessible
  fetch("/api/uploadthing", { method: "GET" })
   .then((res) => {
    if (!res.ok) {
     setUploadError("UploadThing endpoint not accessible. Check UPLOADTHING_TOKEN in .env");
    }
   })
   .catch(() => {
    setUploadError("Cannot connect to UploadThing. Check your configuration.");
   });
 }, []);

 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (!uploadResult) {
   setMessageVariant("error");
   setMessage("Please upload a document before submitting.");
   return;
  }
  if (variant === "patient" && !ownerIdentifier.trim()) {
   setMessageVariant("error");
   setMessage("Enter the patient's email or Aadhaar number.");
   return;
  }
  setSubmitting(true);
  setMessage(null);
  setMessageVariant("info");
  const isoRecordDate = new Date(recordDate);
  if (Number.isNaN(isoRecordDate.getTime())) {
   setSubmitting(false);
   setMessageVariant("error");
   setMessage("Choose a valid record date and time.");
   return;
  }

  const res = await fetch("/api/records/upload", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({
    ownerEmailOrAadhaar: variant === "patient" ? ownerIdentifier.trim() : undefined,
    title,
    description,
    recordDate: isoRecordDate.toISOString(),
    fileUrl: uploadResult.url,
    fileKey: uploadResult.key,
    fileName: uploadResult.name,
    fileSize: uploadResult.size,
   }),
  });
  setSubmitting(false);

  if (!res.ok) {
   const data = await res.json().catch(() => ({}));
   setMessageVariant("error");
   setMessage(data?.error ?? "Upload failed. Please try again.");
   return;
  }

  setMessageVariant("success");
  setMessage("Document uploaded successfully.");
  setTitle("");
  setDescription("");
  setRecordDate("");
  setUploadResult(null);
  setOwnerIdentifier("");
  onUploaded?.();
 }

 return (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
   <div className="mb-6">
    <h3 className="text-xl font-semibold text-slate-900">
     {variant === "self" ? "Add a record" : "Upload a patient record"}
    </h3>
    <p className="mt-1 text-sm text-slate-600">
     Upload PDFs or images. Files are securely stored with UploadThing.
    </p>
   </div>

   <form className="space-y-5" onSubmit={handleSubmit}>
    {variant === "patient" && (
     <div>
      <label className="block text-sm font-medium text-slate-800">
       Patient email or Aadhaar
      </label>
      <input
       className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
       value={ownerIdentifier}
       onChange={(e) => setOwnerIdentifier(e.target.value)}
       required
       placeholder="patient@example.com or 12-digit Aadhaar"
      />
     </div>
    )}

    <div className="grid gap-5 sm:grid-cols-2">
      <div>
       <label className="block text-sm font-medium text-slate-800">Title</label>
       <input
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. MRI results"
       required
       />
      </div>
      <div>
       <label className="block text-sm font-medium text-slate-800">
        Record date &amp; time
       </label>
       <input
        type="datetime-local"
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        value={recordDate}
        onChange={(e) => setRecordDate(e.target.value)}
       required
       />
      </div>
    </div>

    <div>
     <label className="block text-sm font-medium text-slate-800">Description</label>
     <textarea
      rows={4}
      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Add notes for future reference"
     />
    </div>

    <div className="space-y-2">
     <label className="block text-sm font-medium text-slate-800">
      Upload document
     </label>
     {uploadError && (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
       {uploadError}
      </div>
     )}
     <div className="flex items-center gap-3">
      <div className="[&_button]:!bg-indigo-600 [&_button]:!text-white [&_button]:!border-none [&_button]:!cursor-pointer [&_button[disabled]]:!bg-slate-300 [&_button[disabled]]:!cursor-not-allowed">
       <UploadButton
        endpoint="medicalRecord"
        content={{
         button: "Choose File",
         allowedContent: "PDF or images up to 16MB",
        }}
        className="ut-button:bg-indigo-600 ut-button:text-white ut-button:hover:bg-indigo-500 ut-button:px-4 ut-button:py-2 ut-button:rounded-lg ut-button:font-medium ut-allowed-content:text-slate-600 ut-allowed-content:text-xs"
        onClientUploadComplete={(res) => {
         if (!res?.length) return;
         const file = res[0];
         setUploadResult({
          key: file.key,
          url: file.url,
          name: file.name ?? "Document",
          size: file.size ?? 0,
         });
         setMessageVariant("info");
         setMessage("Document uploaded. Click save to finish.");
         setUploadError(null);
        }}
        onUploadError={(error: Error) => {
         setMessageVariant("error");
         setMessage(`Upload failed: ${error.message}`);
         setUploadError(error.message);
         console.error("UploadThing error:", error);
        }}
        onUploadBegin={(name) => {
         setMessageVariant("info");
         setMessage(`Uploading ${name}...`);
         setUploadError(null);
        }}
       />
      </div>
      {uploadResult && (
       <div className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
        <div className="font-medium">{uploadResult.name}</div>
        <div className="text-xs text-slate-500">
         {(uploadResult.size / (1024 * 1024)).toFixed(2)} MB
        </div>
       </div>
      )}
     </div>
    </div>

    {message && (
     <div
      className={
       messageVariant === "error"
        ? "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        : messageVariant === "success"
        ? "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        : "rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700"
      }
     >
      {message}
     </div>
    )}

    <button
     type="submit"
     disabled={submitting}
     className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
    >
     {submitting ? "Saving..." : "Save record"}
    </button>
   </form>
  </div>
 );
}

