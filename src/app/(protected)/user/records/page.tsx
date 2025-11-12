import UserRecordsPanel from "@/components/user/UserRecordsPanel";

export default function UserRecordsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900">My medical records</h1>
          <p className="text-sm text-slate-600">
            Upload, organise, and review your personal health documentation.
          </p>
        </div>
      </section>

      <UserRecordsPanel />
    </div>
  );
}

