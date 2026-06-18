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
    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl p-6 shadow-xl relative">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <h2 className="text-black font-bold text-lg">
          Wallet Balance
        </h2>

        {/* NOTIFICATION BUTTON */}
        <div className="relative">

          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="text-2xl"
          >
            🔔
          </button>

          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {notifications.length}
            </span>
          )}

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl p-3 z-50 max-h-96 overflow-y-auto">

              <h3 className="font-bold mb-3">
                Notifications
              </h3>

              {notifications.length === 0 ? (
                <p className="text-gray-500">
                  No Notifications
                </p>
              ) : (
                notifications.map(
                  (item: any) => (
                    <div
                      key={item.id}
                      className="border-b py-2"
                    >
                      <p className="font-semibold text-black">
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-600">
                        {item.message}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(
                          item.created_at
                        ).toLocaleString()}
                      </p>
                    </div>
                  )
                )
              )}
            </div>
          )}

        </div>
      </div>

      {/* BALANCE */}
      <p className="text-4xl font-bold text-white mt-3">
        Rs {balance}
      </p>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-5">

        <button
          onClick={() =>
            router.push("/deposit")
          }
          className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90 transition"
        >
          Deposit
        </button>

        <button
          onClick={() =>
            router.push("/withdraw")
          }
          className="bg-white text-black px-5 py-2 rounded-xl hover:opacity-90 transition"
        >
          Withdraw
        </button>

      </div>

      {/* ACTION BUTTONS */}
<div className="flex flex-wrap gap-3 mt-4">

  <button
    onClick={() =>
      router.push("/history")
    }
    className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition"
  >
    📜 Transaction History
  </button>

  <button
    onClick={() =>
      router.push("/crash")
    }
    className="bg-red-500 text-white px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition"
  >
    🎮 Crash Game
  </button>

</div>

      {/* FOOTER */}
      <div className="mt-6 border-t border-white/20 pt-4">

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