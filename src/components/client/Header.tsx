"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function Header() {
  const role = useAppSelector((state) => state.auth.user?.role);

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 border-b">
      <h1 className="text-xl font-semibold">SmartRecruiters</h1>

      <nav className="flex gap-2">
        <Link
          href="/vacancies"
          className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
        >
          Vacancies
        </Link>

        {role === "USER" && (
          <>
            <Link
              href="/saved"
              className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
            >
              Saved
            </Link>
            <Link
              href="/applied"
              className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
            >
              Applied
            </Link>
          </>
        )}

        {role === "HR" && (
          <>
            <Link
              href="/hr/AllUsers"
              className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
            >
              All Users
            </Link>
            <Link
              href="/hr/MyVacancies"
              className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
            >
              My Vacancies
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
