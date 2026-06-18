"use client";

import { useEffect, useState } from "react";

export default function AdminWithdrawsPage() {
  const [withdraws, setWithdraws] = useState([]);

  const fetchWithdraws = async () => {
    try {
      const res = await fetch(
        "/api/admin/withdraws"
      );

      const data = await res.json();

      if (data.success) {
        setWithdraws(data.withdraws);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const approveWithdraw = async (
    withdrawId: number
  ) => {
    try {
      const res = await fetch(
        "/api/admin/approve-withdraw",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            withdrawId,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          "Withdraw Approved Successfully ✅"
        );

        fetchWithdraws();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  const rejectWithdraw = async (
    withdrawId: number
  ) => {
    try {
      const res = await fetch(
        "/api/admin/reject-withdraw",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            withdrawId,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          "Withdraw Rejected Successfully ❌"
        );

        fetchWithdraws();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchWithdraws();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Withdraw Requests
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-zinc-900 rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-zinc-800">
              <th className="p-4 text-center">
                ID
              </th>

              <th className="p-4 text-center">
                User
              </th>

              <th className="p-4 text-center">
                Method
              </th>

              <th className="p-4 text-center">
                Amount
              </th>

              <th className="p-4 text-center">
                Status
              </th>

              <th className="p-4 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {withdraws.map((item: any) => (
              <tr
                key={item.id}
                className="border-b border-zinc-800 text-center"
              >
                <td className="p-4">
                  {item.id}
                </td>

                <td className="p-4">
                  {item.user_id}
                </td>

                <td className="p-4">
                  {item.method}
                </td>

                <td className="p-4">
                  Rs {item.amount}
                </td>

                <td className="p-4">
                  {item.status}
                </td>

                <td className="p-4">
                  {item.status ===
                  "pending" ? (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          approveWithdraw(
                            item.id
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          rejectWithdraw(
                            item.id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
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
    </main>
  );
}