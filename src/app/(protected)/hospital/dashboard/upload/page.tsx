"use client";
import { useState } from "react";

export default function UploadPage() {
  const [ownerEmailOrAadhaar, setWho] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  async function submit() {
    const res = await fetch("/api/records/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ownerEmailOrAadhaar, title, description, fileUrl }),
    });
    if (!res.ok) alert("Upload failed");
    else alert("Uploaded");
  }

  return (
    <div className="p-6 space-y-3">
      <h2 className="text-xl font-semibold">Upload Document</h2>
      <input className="w-full border rounded px-3 py-2" placeholder="Patient Email or Aadhaar" value={ownerEmailOrAadhaar} onChange={(e)=>setWho(e.target.value)} />
      <input className="w-full border rounded px-3 py-2" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <input className="w-full border rounded px-3 py-2" placeholder="Description" value={description} onChange={(e)=>setDesc(e.target.value)} />
      <input className="w-full border rounded px-3 py-2" placeholder="File URL (MVP)" value={fileUrl} onChange={(e)=>setFileUrl(e.target.value)} />
      <button className="rounded bg-black text-white px-3 py-2" onClick={submit}>Upload</button>
    </div>
  );
}


