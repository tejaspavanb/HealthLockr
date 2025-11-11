"use client";

import { useSession, signOut } from "next-auth/react";
import clsx from "clsx";

const navItemClasses =
 "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";

export default function Header() {
 const { data: session } = useSession();
 const role = session?.user?.role;

 return (
  <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
   <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
    <a
     href="/"
     className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
    >
     HealthLockr
    </a>
    <nav className="flex items-center gap-2">
     {!session && (
      <>
       <a
        href="/login"
        className={clsx(navItemClasses, "text-slate-700 hover:bg-slate-100")}
       >
        Sign in
       </a>
       <a
        href="/register"
        className={clsx(
         navItemClasses,
         "bg-indigo-600 text-white hover:bg-indigo-500"
        )}
       >
        Create account
       </a>
      </>
     )}
     {session && (
      <>
       <a
        href="/dashboard"
        className={clsx(navItemClasses, "text-slate-700 hover:bg-slate-100")}
       >
        Dashboard
       </a>
       {role === "USER" && (
        <a
         href="/user/dashboard"
         className={clsx(navItemClasses, "text-slate-700 hover:bg-slate-100")}
        >
         My records
        </a>
       )}
       {role === "HOSPITAL" && (
        <a
         href="/hospital/dashboard/upload"
         className={clsx(navItemClasses, "text-slate-700 hover:bg-slate-100")}
        >
         Upload
        </a>
       )}
       {role === "DOCTOR" && (
        <a
         href="/doctor/dashboard"
         className={clsx(navItemClasses, "text-slate-700 hover:bg-slate-100")}
        >
         Patients
        </a>
       )}
       <button
        className={clsx(
         navItemClasses,
         "border border-slate-200 text-slate-700 hover:bg-slate-100"
        )}
        onClick={() => signOut({ callbackUrl: "/" })}
       >
        Sign out
       </button>
      </>
     )}
    </nav>
   </div>
  </header>
 );
}

