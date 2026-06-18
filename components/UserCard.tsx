"use client";

import { useEffect, useState } from "react";

export default function UserCard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-6">
      <h2 className="text-cyan-400 text-xl font-bold">
        Welcome Back
      </h2>

      <p className="text-white text-2xl mt-3">
        {user?.username || "Guest"}
      </p>

      <p className="text-gray-400 mt-2">
        {user?.email || "No Email"}
      </p>

      <div className="mt-4">
        <span className="bg-purple-500 px-4 py-2 rounded-full text-white">
          VIP LEVEL 1
        </span>
      </div>
    </div>
  );
}