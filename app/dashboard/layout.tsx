"use client";
import React, { useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import Sidebar from "./_components/Sidebar";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useKindeBrowserClient();
  const convex = useConvex();
  const router = useRouter();

  const hasCheckedTeam = React.useRef(false)

  const checkTeam = async () => {
    if (user?.email && !hasCheckedTeam.current) {
      hasCheckedTeam.current = true
      const result = await convex.query(api.teams.getTeam, { email: user.email });
      if (result?.length === 0) {
        router.push("/teams/create");
      }
    }
  };

  useEffect(() => {
    if (user && !hasCheckedTeam.current) {
      checkTeam();
    }
  }, [user]);

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="h-screen w-full fixed hidden md:block">
        <Sidebar />
      </div>
      <div className="grid col-span-4 md:col-span-3 md:ml-1/4">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
