"use client";
import React, { useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import Sidebar from "./_components/Sidebar";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoading } = useKindeBrowserClient();
  const router = useRouter();
  
  // Check if user has a team
  const teams = useQuery(api.teams.getTeam, user?.email ? { email: user.email } : "skip");

  useEffect(() => {
    // Only redirect if we are sure the user has no teams
    if (!isLoading && teams !== undefined && teams?.length === 0) {
      router.push("/teams/create");
    }
  }, [teams, isLoading, router]);

  if (isLoading || teams === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 min-h-screen bg-white dark:bg-[#0b0b0c]">
      <div className="h-screen w-full fixed hidden md:block border-r border-gray-200 dark:border-[#1f1f23]">
        <Sidebar />
      </div>
      <div className="grid col-span-4 md:col-span-3 md:ml-[25%] w-full">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
