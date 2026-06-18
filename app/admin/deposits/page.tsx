"use client";

import { useEffect, useState } from "react";

export default function AdminDepositsPage() {
  const [deposits, setDeposits] = useState<any[]>([]);
  const [loadingId, setLoadingId] =
    useState<number | null>(null);

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    try {
      const res = await fetch(
        "/api/admin/deposits"
      );

      const data = await res.json();

      if (data.success) {
        setDeposits(data.deposits);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const approveDeposit = async (
    requestId: number
  ) => {
    try {
      setLoadingId(requestId);

      const res = await fetch(
        "/api/admin/approve-deposit",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            requestId,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Deposit Approved ✅");

        fetchDeposits();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);

      alert("Approval Failed");
    }

    setLoadingId(null);
  };

  const rejectDeposit = async (
    requestId: number
  ) => {
    try {
      setLoadingId(requestId);

      const res = await fetch(
        "/api/admin/reject-deposit",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            requestId,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Deposit Rejected ❌");

        fetchDeposits();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);

      alert("Reject Failed");
    }

    setLoadingId(null);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">

        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-8 rounded-3xl mb-8">
          <h1 className="text-4xl font-bold">
            Deposit Requests
          </h1>

          <p className="mt-2 text-white/80">
            Manage all pending user deposits
          </p>
        </div>

        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">

            <table className="w-full">
              <thead>
                <tr className="bg-zinc-800">
                  <th className="p-4 text-left">
                    ID
                  </th>

                  <th className="p-4 text-left">
                    User ID
                  </th>

                  <th className="p-4 text-left">
                    Method
                  </th>

                  <th className="p-4 text-left">
                    Amount
                  </th>

                  <th className="p-4 text-left">
                    TRX ID
                  </th>

                  <th className="p-4 text-left">
                    Screenshot
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {deposits.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-zinc-800"
                  >
                    <td className="p-4">
                      #{item.id}
                    </td>

                    <td className="p-4">
                      {item.user_id}
                    </td>

                    <td className="p-4">
                      {item.method}
                    </td>

                    <td className="p-4 font-bold text-green-400">
                      Rs {item.amount}
                    </td>

                    <td className="p-4">
                      {item.trx_id}
                    </td>

                    <td className="p-4">
                      {item.screenshot ? (
                        <a
                          href={item.screenshot}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-cyan-500 px-4 py-2 rounded-xl"
                        >
                          View
                        </a>
                      ) : (
                        "No Screenshot"
                      )}
                    </td>

                    <td className="p-4">
                      {item.status ===
                      "approved" ? (
                        <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                          Approved
                        </span>
                      ) : item.status ===
                        "rejected" ? (
                        <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
                          Rejected
                        </span>
                      ) : (
                        <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      {item.status ===
                      "pending" ? (
                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              approveDeposit(
                                item.id
                              )
                            }
                            disabled={
                              loadingId ===
                              item.id
                            }
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl font-bold"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              rejectDeposit(
                                item.id
                              )
                            }
                            disabled={
                              loadingId ===
                              item.id
                            }
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl font-bold"
                          >
                            Reject
                          </button>

                        </div>
                      ) : (
                        "-"
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>
      </div>
    </main>
  );
}