"use client";

import { useEffect, useState } from "react";

type Transaction = {
  id: string;
  amount: number;
  method: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: string;
};

export default function TransactionHistory({ userId }: { userId: string }) {
  const [history, setHistory] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/deposit-history?userId=${userId}`
      );

      const data = await res.json();

      if (data?.history) {
        setHistory(data.history);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchHistory();
  }, [userId]);

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mt-6">
      <h2 className="text-xl font-bold mb-4">
        Transaction History
      </h2>

      {loading && (
        <p className="text-zinc-400">Loading history...</p>
      )}

      {!loading && history.length === 0 && (
        <p className="text-zinc-500">No transactions found</p>
      )}

      <div className="space-y-3">
        {history.map((tx) => (
          <div
            key={tx.id}
            className="flex justify-between items-center bg-zinc-800 p-4 rounded-xl"
          >
            <div>
              <p className="font-semibold">
                💰 {tx.amount} PKR
              </p>

              <p className="text-sm text-zinc-400">
                {tx.method}
              </p>

              {tx.createdAt && (
                <p className="text-xs text-zinc-500">
                  {new Date(tx.createdAt).toLocaleString()}
                </p>
              )}
            </div>

            <div>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-bold ${
                  tx.status === "approved"
                    ? "bg-green-600"
                    : tx.status === "rejected"
                    ? "bg-red-600"
                    : "bg-yellow-600"
                }`}
              >
                {tx.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}