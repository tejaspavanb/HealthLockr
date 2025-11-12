"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import clsx from "clsx";

const navItemClasses =
  "rounded-full px-4 py-2 text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";

type NavItem = {
  href: string;
  label: string;
};

function resolveNavItems(role?: string | null): NavItem[] {
  if (!role) return [];

  if (role === "USER") {
    return [
      { href: "/user/dashboard", label: "Dashboard" },
      { href: "/user/records", label: "My Records" },
      { href: "/user/access-logs", label: "Access Logs" },
    ];
  }

  if (role === "DOCTOR") {
    return [
      { href: "/doctor/dashboard", label: "Dashboard" },
      { href: "/doctor/access-patient-records", label: "Access Patient Records" },
      { href: "/doctor/access-logs", label: "Access Logs" },
    ];
  }

  if (role === "HOSPITAL") {
    return [
      { href: "/hospital/dashboard", label: "Dashboard" },
      { href: "/hospital/dashboard/upload", label: "Upload Docs" },
    ];
  }

  return [];
}

function isActive(pathname: string, href: string) {
  if (pathname === href) return true;
  return pathname.startsWith(`${href}/`);
}

export default function Header() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const pathname = usePathname();

  const navItems = resolveNavItems(role);

  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 shadow-lg shadow-indigo-500/20">
            <Image
              src="/logo.png"
              alt="HealthLockr logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg object-contain"
              priority
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              HealthLockr
            </span>
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-indigo-500">
              Secure medical vault
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {!session && (
            <>
              <Link
                href="/login"
                className={clsx(
                  navItemClasses,
                  "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900",
                )}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className={clsx(
                  navItemClasses,
                  "bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-lg shadow-indigo-500/30 hover:from-indigo-500 hover:to-sky-500",
                )}
              >
                Create account
              </Link>
            </>
          )}
          {session && (
            <>
              {navItems.map((item) => {
                const active = pathname ? isActive(pathname, item.href) : false;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      navItemClasses,
                      active
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                        : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <button
                className={clsx(
                  navItemClasses,
                  "border border-slate-200/60 text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700",
                )}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </button>
            </>
          )}
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          {!session ? (
            <Link
              href="/login"
              className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Sign in
            </Link>
          ) : navItems.length ? (
            <Link
              href={navItems[0].href}
              className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              {navItems[0].label}
            </Link>
          ) : (
            <button
              className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

