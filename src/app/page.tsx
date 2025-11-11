export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_0%_0%,#e0e7ff_0,rgba(255,255,255,0)_50%),radial-gradient(50rem_20rem_at_100%_0%,#fee2e2_0,rgba(255,255,255,0)_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              HealthLockr
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              A secure, consent-based platform that consolidates a patient’s medical history
              and enables verified doctors and hospitals to access it responsibly. Built for
              fast consultations, safer emergency care, and fewer repeat tests.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="/register" className="rounded-md bg-indigo-600 px-5 py-2.5 text-white shadow hover:bg-indigo-700">
                Create account
              </a>
              <a href="/login" className="rounded-md border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-50">
                Sign in
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              For demo: create three accounts for each role to experience uploads, search, and access logs.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-gray-900">Why HealthLockr?</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-5">
            <h3 className="font-medium text-gray-900">Patient‑centric</h3>
            <p className="mt-2 text-sm text-gray-600">
              Patients own their data. View your full history and decide who gets access. Every view is recorded.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-medium text-gray-900">Doctor access</h3>
            <p className="mt-2 text-sm text-gray-600">
              Verified doctors can look up a patient by email or Aadhaar with consent. Access is time‑bound and logged.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-medium text-gray-900">Hospital uploads</h3>
            <p className="mt-2 text-sm text-gray-600">
              Hospital staff upload lab reports and prescriptions straight to the patient’s vault—no paperwork lost.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t bg-gray-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">How it works</h2>
            <ol className="mt-6 space-y-4 text-gray-700">
              <li>
                <span className="font-medium text-gray-900">1. Create your account</span> — Choose your role:
                User (patient), Doctor, or Hospital. Add optional Aadhaar; doctors may add MCI ID.
              </li>
              <li>
                <span className="font-medium text-gray-900">2. Upload or fetch records</span> — Hospital users can
                upload reports to a patient by email/Aadhaar. Patients see them instantly.
              </li>
              <li>
                <span className="font-medium text-gray-900">3. Doctor lookup</span> — With consent, doctors search
                and view the patient’s records. Every view creates an Access Log.
              </li>
              <li>
                <span className="font-medium text-gray-900">4. Audit everything</span> — Patients can verify who
                accessed what and when for accountability.
              </li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Security & privacy</h2>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-gray-700">
              <li>Account security via email + password; Aadhaar stored for lookup only.</li>
              <li>Role‑based authorization: User, Doctor, Hospital.</li>
              <li>Server‑side access logging for every record view by a doctor.</li>
              <li>HTTPS in transit; database hosted on managed PostgreSQL (Neon).</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              Note: This is an academic prototype; production deployments should add client‑side encryption,
              consent tokens/QR, and secure object storage for files.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-gray-900">Who is it for?</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-5">
            <h3 className="font-medium text-gray-900">Patients</h3>
            <p className="mt-2 text-sm text-gray-600">
              Keep your medical history in one place and share responsibly. Track every access.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-medium text-gray-900">Doctors</h3>
            <p className="mt-2 text-sm text-gray-600">
              Get a unified view to save time, reduce repeat tests, and improve decisions.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-medium text-gray-900">Hospitals</h3>
            <p className="mt-2 text-sm text-gray-600">
              Streamline discharges and follow‑ups by uploading reports to a patient’s vault.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <a href="/register" className="rounded-md bg-indigo-600 px-5 py-2.5 text-white shadow hover:bg-indigo-700">
            Get started free
          </a>
        </div>
      </section>
    </main>
  );
}
