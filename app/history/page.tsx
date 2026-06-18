"use client";

import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchTransactions = async () => {
    try {
      const user = localStorage.getItem("user");

      if (!user) return;

      const parsedUser = JSON.parse(user);

      const res = await fetch("/api/transactions", {
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
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();

    const interval = setInterval(() => {
      fetchTransactions();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        📜 Transaction History
      </h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {transactions.length === 0 ? (
          <div className="p-6 text-center">
            No Transactions Found
          </div>
        ) : (
          transactions.map((item) => (
            <div
              key={`${item.type}-${item.id}-${item.created_at}`}
              className="border-b p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {item.type === "deposit"
                    ? "💰 Deposit"
                    : "💸 Withdraw"}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                    item.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : item.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : item.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.status
                    ? item.status.toUpperCase()
                    : "APPROVED"}
                </span>
              </div>

              <div
                className={`text-lg font-bold ${
                  item.type === "deposit"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.type === "deposit"
                  ? "+"
                  : "-"}
                Rs {item.amount}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}