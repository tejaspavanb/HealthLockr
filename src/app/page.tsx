import clsx from "clsx";
import Image from "next/image";

const heroHighlights = [
  { label: "Patient owned", desc: "Only you decide who sees your history" },
  { label: "Consent first", desc: "Doctors need an OTP or identifier to view" },
  { label: "Full audit trail", desc: "Every access is logged and reviewable" },
];

const featureCards = [
  {
    title: "Unified medical vault",
    body: "Store prescriptions, lab reports, imaging, and discharge notes in a single timeline. Upload PDFs or images securely via UploadThing.",
    accent: "from-indigo-500 to-purple-500",
  },
  {
    title: "Doctor-friendly access",
    body: "Provide consent with a one-time code or identifier lookup. Doctors see only what they need, when they need it, and every visit is recorded.",
    accent: "from-cyan-500 to-sky-500",
  },
  {
    title: "Hospital automation",
    body: "Hospitals upload discharge packets directly to the patient’s vault, keeping follow-up care aligned and patients informed at all times.",
    accent: "from-emerald-500 to-teal-500",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Create your role-based account",
    desc: "Patient, Doctor, and Hospital roles unlock tailored dashboards. Optional Aadhaar / MCI ID improves lookup accuracy.",
  },
  {
    step: "02",
    title: "Collect and upload records",
    desc: "Patients upload past files; hospitals contribute new documents. Everything stays organized, timestamped, and searchable.",
  },
  {
    step: "03",
    title: "Grant access with consent",
    desc: "Generate a quick OTP for doctors or let them request via email/Aadhaar. Access windows are short-lived and auditable.",
  },
  {
    step: "04",
    title: "Review the access trail",
    desc: "Patients can inspect detailed logs to see who viewed what, reinforcing trust between care teams and families.",
  },
];

const securityPoints = [
  "Role-based authorization powered by NextAuth and Prisma.",
  "All uploads flow through signed UploadThing URLs with size restrictions.",
  "Every doctor view writes an immutable access log for patient review.",
  "Deployed on modern cloud infrastructure—ready for further hardening.",
];

const audience = [
  {
    title: "Patients & families",
    desc: "Carry your critical history everywhere. Share it instantly in emergencies or routine follow-ups.",
    highlight: "Peace of mind",
  },
  {
    title: "Doctors & specialists",
    desc: "See a complete view of a patient’s journey before the consult begins. Reduce redundant tests and miscommunication.",
    highlight: "Faster consults",
  },
  {
    title: "Hospitals & labs",
    desc: "Deliver discharge packets, lab reports, and imaging results directly to the patient vault, no more lost paperwork.",
    highlight: "Streamlined handoffs",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 top-[-6rem] -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-[50%] aspect-[1400/800] w-[120%] -translate-x-1/2 bg-[conic-gradient(from_120deg_at_50%_50%,rgba(79,70,229,0.3),rgba(14,165,233,0.3),rgba(192,132,252,0.25),rgba(125,211,252,0.25),rgba(79,70,229,0.3))]" />
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28 lg:pb-32">
          <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_400px]">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600 shadow shadow-indigo-500/10 backdrop-blur">
                <Image src="/logo.png" alt="HealthLockr" width={20} height={20} className="h-5 w-5 rounded-full object-contain" />
                HealthLockr
              </span>
              <div className="max-w-2xl space-y-5">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  Your{" "}
                  <span className="bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
                    consent-first medical vault
                  </span>
                  .
                </h1>
                <p className="text-lg text-slate-600 sm:text-xl">
                  HealthLockr unifies medical records across hospitals, puts patients in control, and gives care teams the
                  context they need—instantly and securely.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:brightness-105"
                >
                  Create your account
                </a>
                <a
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full border border-indigo-100 bg-white/80 px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700"
                >
                  Sign in instead
                </a>
              </div>
              <div className="grid gap-3 rounded-3xl border border-white/50 bg-white/70 p-5 shadow-sm shadow-indigo-500/10 backdrop-blur sm:grid-cols-3">
                {heroHighlights.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">{item.label}</p>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-white/60 via-white/30 to-indigo-100/40 shadow-xl shadow-indigo-500/20 backdrop-blur-lg" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/90 p-6 shadow-2xl shadow-indigo-500/20">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50/90 p-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Active consent session</p>
                    <p className="text-xs text-slate-500">OTP expires in 08:52</p>
                  </div>
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">Doctor</span>
                </div>
                <div className="mt-6 space-y-5">
                  <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">OTP</p>
                    <p className="mt-2 text-3xl font-extrabold tracking-[0.4em] text-slate-900">327 914</p>
                    <p className="mt-3 text-xs text-slate-500">Share only with verified doctors you trust.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">Records stored</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">128</p>
                      <p className="mt-1 text-xs text-slate-500">Prescriptions, labs, imaging</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Access log</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">24</p>
                      <p className="mt-1 text-xs text-slate-500">Every doctor visit recorded</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Trust signal</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">
                      HealthLockr keeps a tamper-proof audit trail for every document interaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl space-y-3">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Why teams love HealthLockr</h2>
            <p className="text-base text-slate-600">
              A modern interface, powered by secure APIs and built to keep patients in the loop—without slowing down doctors
              or hospital workflows.
            </p>
          </div>
          <a
            href="/register"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
          >
            Explore the demo dashboards →
          </a>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white p-6 shadow-lg shadow-indigo-500/10 transition hover:shadow-xl hover:shadow-indigo-500/20"
            >
              <div className="absolute inset-x-6 top-6 h-14 rounded-full bg-gradient-to-r opacity-10 group-hover:opacity-20"
                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
              />
              <div className={clsx("relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg shadow-indigo-500/20", card.accent)} />
              <h3 className="relative mt-6 text-xl font-semibold text-slate-900">{card.title}</h3>
              <p className="relative mt-3 text-sm leading-6 text-slate-600">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative border-y border-white/70 bg-white/80 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(60rem_40rem_at_0%_0%,rgba(79,70,229,0.15),transparent),radial-gradient(50rem_30rem_at_100%_0%,rgba(14,165,233,0.15),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">End-to-end journey</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Four simple steps to confident care</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item) => (
              <div key={item.step} className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg shadow-indigo-500/10">
                <span className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">{item.step}</span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Secure by design</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Security & privacy you can explain to patients</h2>
            <ul className="mt-8 space-y-4">
              {securityPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-slate-600">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-slate-500">
              Production deployments should add data-at-rest encryption, granular consent workflows, automated retention
              policies, and verified document signing. HealthLockr provides the extensible foundation.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 shadow-2xl shadow-indigo-900/40 text-slate-100">
            <div className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/30 via-transparent to-transparent blur-3xl" />
            <div className="relative space-y-6">
              <h3 className="text-lg font-semibold text-white">Trust dashboard</h3>
              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-indigo-200">Latest access</p>
                  <p className="mt-3 text-base font-semibold text-white">
                    Dr. Meera Shah viewed MRI Results.pdf <span className="text-xs text-indigo-200">2 minutes ago</span>
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-indigo-200">Alerts</p>
                  <p className="mt-3 text-sm text-slate-200">0 suspicious login attempts detected this month.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-indigo-200">Backups</p>
                  <p className="mt-3 text-2xl font-semibold text-white">Daily</p>
                  <p className="text-xs text-indigo-200">Snapshots stored for 30 days with point-in-time recovery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-[3rem] border border-white/60 bg-white/90 p-10 shadow-xl shadow-indigo-500/10 backdrop-blur">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Built for every role</p>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Designed around people, not just files</h2>
              <p className="text-sm text-slate-600">
                Whether you’re a patient keeping your family informed, a doctor preparing for consults, or a hospital team closing
                discharge checklists, HealthLockr delivers clarity at each step.
              </p>
            </div>
            <div className="grid gap-5">
              {audience.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">{item.highlight}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-indigo-100 bg-indigo-50/60 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">Ready to try?</p>
              <h3 className="mt-2 text-xl font-semibold text-indigo-900">Experience the full workflow in under five minutes.</h3>
              <p className="mt-1 text-sm text-indigo-600">
                Spin up one account per role, upload a mock report, and see the consent flow in action.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="/register"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
              >
                Launch demo workspace
              </a>
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-100"
              >
                I already have access
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
