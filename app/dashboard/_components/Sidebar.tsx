"use client";

import Link from "next/link";
import React from "react";
import AuthButton from "../../_components/AuthButton";

export default function Sidebar() {
  return (
    <aside className="h-full w-64 bg-white dark:bg-[#0b0b0c] border-r border-gray-200 dark:border-[#1f1f23] p-4">
      <div className="mb-6">
        <AuthButton />
      </div>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="text-sm font-medium">
          Dashboard
        </Link>
        <Link href="/teams" className="text-sm font-medium">
          Teams
        </Link>
        <Link href="/settings" className="text-sm font-medium">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
