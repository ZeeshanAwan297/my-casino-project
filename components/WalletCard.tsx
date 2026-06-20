"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WalletCard() {
  const router = useRouter();

  
 const [balance, setBalance] = useState("0.00");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // =========================
  // FETCH BALANCE
  // =========================
  const fetchBalance = async () => {
    try {
      const user = localStorage.getItem("user");

      if (!user) return;

      const parsedUser = JSON.parse(user);

      const res = await fetch("/api/user-balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: parsedUser.id,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setBalance(data.balance.toString());

        parsedUser.balance = data.balance;

        localStorage.setItem(
          "user",
          JSON.stringify(parsedUser)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // FETCH NOTIFICATIONS
  // =========================
  const fetchNotifications = async () => {
    try {
      const user = localStorage.getItem("user");

      if (!user) return;

      const parsedUser = JSON.parse(user);

      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: parsedUser.id,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // AUTO REFRESH
  // =========================
  useEffect(() => {
    fetchBalance();
    fetchNotifications();

    const interval = setInterval(() => {
      fetchBalance();
      fetchNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-2xl h-[440px] flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <p className="text-slate-400 text-sm uppercase tracking-wider">
            Main Wallet
          </p>

          <h2 className="text-white font-bold text-2xl">
            Wallet Balance
          </h2>
        </div>

        {/* NOTIFICATION BUTTON */}
        <div className="relative">

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="h-12 w-12 rounded-xl bg-[#1f2937] text-white hover:bg-[#374151] transition"
          >
            🔔
          </button>

          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {notifications.length}
            </span>
          )}

          {showNotifications && (
            <div className="absolute right-0 top-14 w-96 bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 max-h-96 overflow-y-auto">

              <h3 className="font-semibold text-white mb-3">
                Notifications
              </h3>

              {notifications.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No Notifications
                </p>
              ) : (
                notifications.map((item: any) => (
                  <div
                    key={item.id}
                    className="border-b border-slate-700 py-2"
                  >
                    <p className="font-semibold text-white">
                      {item.title}
                    </p>

                    <p className="text-sm text-slate-300">
                      {item.message}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(
                        item.created_at
                      ).toLocaleString()}
                    </p>
                  </div>
                ))
              )}

            </div>
          )}

        </div>
      </div>

      {/* BALANCE */}
      <div className="mt-6">

        <h1 className="text-5xl font-extrabold text-white">
          Rs {balance}
        </h1>

        <p className="text-slate-400 mt-2">
          Available Balance
        </p>

      </div>


      {/* BUTTONS */}
     <div className="grid grid-cols-2 gap-4 mt-6">

        <button
          onClick={() => router.push("/deposit")}
          className="h-14 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition"
        >
          Deposit Funds
        </button>

        <button
          onClick={() => router.push("/withdraw")}
          className="h-14 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition"
        >
          Withdraw Funds
        </button>

      </div>

      {/* ACTION BUTTONS */}
<div className="grid md:grid-cols-2 gap-4 mt-5">
 <button
    onClick={() => router.push("/history")}
    className="h-14 rounded-xl bg-[#1f2937] border border-slate-700 text-white font-semibold hover:bg-[#374151] transition"
  >
    Transaction History
  </button>

  
</div>

      {/* FOOTER */}
      <div className="mt-auto border-t border-slate-800 pt-4">

        <p className="text-white/80 text-sm">
          Secure Wallet System
        </p>

        <p className="text-white text-xs mt-1">
          Deposit and withdraw funds instantly.
        </p>

      </div>

    </div>
  );
}