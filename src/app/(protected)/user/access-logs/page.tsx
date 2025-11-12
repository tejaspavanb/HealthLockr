import UserAccessLogsPanel from "@/components/user/UserAccessLogsPanel";

export default function UserAccessLogsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900">Access logs</h1>
          <p className="text-sm text-slate-600">
            Review who has viewed your records and why. Each action is tracked for your safety.
          </p>
        </div>
      </section>

      <UserAccessLogsPanel />
    </div>
  );
}

