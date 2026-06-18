"use client";

import { useState } from "react";

export default function WithdrawPage() {
  const [selectedMethod, setSelectedMethod] =
    useState("");

  const [selectedBank, setSelectedBank] =
    useState("");

  const [amount, setAmount] = useState("");

  const [accountNumber, setAccountNumber] =
    useState("");

  const [accountName, setAccountName] =
    useState("");

  const pakistanBanks = [
    "HBL",
    "UBL",
    "MCB Bank",
    "Allied Bank",
    "Bank Alfalah",
    "Meezan Bank",
    "Faysal Bank",
    "Askari Bank",
    "Bank Al Habib",
    "JS Bank",
  ];

  const handleWithdraw = async () => {
  if (!selectedMethod) {
    alert("Please select withdraw method");
    return;
  }

  if (
    !amount ||
    !accountNumber ||
    !accountName
  ) {
    alert("Please fill all fields");
    return;
  }

  const user = localStorage.getItem("user");

  if (!user) {
    alert("Please login first");
    return;
  }

  const parsedUser = JSON.parse(user);

  try {
    const res = await fetch(
      "/api/withdraw-request",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId: parsedUser.id,
          method: selectedMethod,
          bankName: selectedBank,
          amount,
          accountNumber,
          accountName,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert(
        "Withdraw Request Submitted Successfully ✅"
      );

      setAmount("");
      setAccountNumber("");
      setAccountName("");
      setSelectedMethod("");
      setSelectedBank("");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">

        <div className="bg-gradient-to-r from-red-500 to-purple-600 p-8 rounded-3xl">
          <h1 className="text-4xl font-bold">
            Withdraw Funds
          </h1>

          <p className="mt-2 text-white/80">
            Request withdrawal from your wallet
          </p>
        </div>

        <div className="bg-zinc-900 mt-8 p-8 rounded-3xl">

          <h2 className="text-2xl font-bold mb-6">
            Select Withdraw Method
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <button
              onClick={() =>
                setSelectedMethod(
                  "Easypaisa"
                )
              }
              className={`p-5 rounded-2xl border ${
                selectedMethod ===
                "Easypaisa"
                  ? "bg-green-600 border-green-400"
                  : "bg-zinc-800 border-zinc-700"
              }`}
            >
              Easypaisa
            </button>

            <button
              onClick={() =>
                setSelectedMethod(
                  "JazzCash"
                )
              }
              className={`p-5 rounded-2xl border ${
                selectedMethod ===
                "JazzCash"
                  ? "bg-red-600 border-red-400"
                  : "bg-zinc-800 border-zinc-700"
              }`}
            >
              JazzCash
            </button>

            <button
              onClick={() =>
                setSelectedMethod(
                  "Bank Transfer"
                )
              }
              className={`p-5 rounded-2xl border ${
                selectedMethod ===
                "Bank Transfer"
                  ? "bg-blue-600 border-blue-400"
                  : "bg-zinc-800 border-zinc-700"
              }`}
            >
              Bank Transfer
            </button>

          </div>
        </div>

        {selectedMethod && (
          <div className="bg-zinc-900 mt-8 p-8 rounded-3xl">

            <h2 className="text-3xl font-bold mb-5">
              {selectedMethod}
            </h2>

            {selectedMethod ===
              "Bank Transfer" && (
              <select
                value={selectedBank}
                onChange={(e) =>
                  setSelectedBank(
                    e.target.value
                  )
                }
                className="w-full bg-zinc-800 p-4 rounded-xl mb-4"
              >
                <option value="">
                  Select Bank
                </option>

                {pakistanBanks.map(
                  (bank) => (
                    <option
                      key={bank}
                      value={bank}
                    >
                      {bank}
                    </option>
                  )
                )}
              </select>
            )}

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              className="w-full bg-zinc-800 p-4 rounded-xl mb-4"
            />

            <input
              type="text"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) =>
                setAccountNumber(
                  e.target.value
                )
              }
              className="w-full bg-zinc-800 p-4 rounded-xl mb-4"
            />

            <input
              type="text"
              placeholder="Account Name"
              value={accountName}
              onChange={(e) =>
                setAccountName(
                  e.target.value
                )
              }
              className="w-full bg-zinc-800 p-4 rounded-xl mb-4"
            />

            <button
              onClick={handleWithdraw}
              className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-xl font-bold"
            >
              Submit Withdraw Request
            </button>

          </div>
        )}

      </div>
    </main>
  );
}