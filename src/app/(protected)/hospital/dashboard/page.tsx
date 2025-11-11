export default function HospitalDashboard() {
 return (
  <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6">
   <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-8 text-white shadow-xl shadow-slate-900/20">
    <h1 className="text-3xl font-semibold sm:text-4xl">Hospital dashboard</h1>
    <p className="mt-3 max-w-2xl text-sm text-slate-200">
     Upload new patient records, collaborate with doctors, and keep your data secure in
     one place.
    </p>
    <div className="mt-6 flex flex-col gap-3 text-sm text-slate-100 sm:flex-row">
     <a
      href="/hospital/dashboard/upload"
      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
     >
      Upload patient record
     </a>
     <a
      href="/dashboard"
      className="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
     >
      Go to unified dashboard
     </a>
    </div>
   </section>

   <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-slate-900">Need to upload a record?</h2>
    <p className="mt-2 text-sm text-slate-600">
     Use the upload workflow to add discharge summaries, lab reports, and imaging.
    </p>
    <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-slate-600">
     <li>Supported files: PDF, JPEG, PNG (up to 16 MB)</li>
     <li>Aadhaar or email is required to link the record to the patient</li>
     <li>Access logs notify patients when doctors view their data</li>
    </ul>
    <a
     href="/hospital/dashboard/upload"
     className="mt-6 inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
    >
     Go to upload screen
    </a>
   </section>
  </div>
 );
}
