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
  <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-6 h-[320px] flex flex-col justify-between">

    <div>
      <h2 className="text-cyan-400 text-xl font-bold">
        Welcome Back
      </h2>

      <p className="text-white text-3xl font-bold mt-4">
        {user?.username || "Guest"}
      </p>

      <p className="text-gray-400 mt-2">
        {user?.email || "No Email"}
      </p>
    </div>
    <div>
      <span className="bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 rounded-full text-white font-semibold">
        VIP LEVEL 1
      </span>

      <div className="grid grid-cols-2 gap-3 mt-6">

        <div className="bg-black/30 rounded-xl p-3">
          <p className="text-gray-400 text-sm">
            Account
          </p>

          <p className="text-green-400 font-bold">
            Active
          </p>
        </div>

        <div className="bg-black/30 rounded-xl p-3">
          <p className="text-gray-400 text-sm">
            Status
          </p>

          <p className="text-cyan-400 font-bold">
            Verified
          </p>
        </div>

      </div>
    </div>

  </div>
);
}