"use client";

import { useEffect, useState } from "react";

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin?: Date;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/admin/profile");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const isSuperAdmin = user?.role === "super_admin";
  const isAdmin = user?.role === "admin";

  return {
    user,
    loading,
    isSuperAdmin,
    isAdmin,
    refetch: fetchUser,
  };
}

