"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.replace("/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
