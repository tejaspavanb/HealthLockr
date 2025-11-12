"use client";

import { useCallback, useState } from "react";
import DoctorPatientAccessPanel from "@/components/doctor/DoctorPatientAccessPanel";
import DoctorAccessLogsPanel from "@/components/doctor/DoctorAccessLogsPanel";

export default function DoctorDashboard() {
 const [logsRefreshSignal, setLogsRefreshSignal] = useState(0);

 const handleLogsChanged = useCallback(() => {
  setLogsRefreshSignal((value) => value + 1);
 }, []);

 return (
  <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6">
   <DoctorPatientAccessPanel onLogsChanged={handleLogsChanged} />
   <DoctorAccessLogsPanel refreshSignal={logsRefreshSignal} />
  </div>
 );
}
