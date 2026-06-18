"use client";



import { useState } from "react";

import Image from "next/image";



export default function DepositPage() {


  const [selectedMethod, setSelectedMethod] = useState("");

  const [selectedBank, setSelectedBank] = useState("");



  const [amount, setAmount] = useState("");

  const [accountNumber, setAccountNumber] = useState("");

  const [accountName, setAccountName] = useState("");

  const [trxId, setTrxId] = useState("");



  const [screenshot, setScreenshot] = useState<File | null>(null);

  const [preview, setPreview] = useState("");



  const [showHistory, setShowHistory] = useState(false);

  const [history, setHistory] = useState<any[]>([]);


  const [showRequests, setShowRequests] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(false);



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

    "Soneri Bank",

    "Dubai Islamic Bank",

    "BankIslami",

    "Silk Bank",

    "Summit Bank",

    "Standard Chartered",

    "National Bank of Pakistan",

    "Habib Metropolitan Bank",

    "Samba Bank",

    "Punjab Provincial Cooperative Bank",

  ];



  // (Optional) history function safe stub

  const fetchHistory = async () => {

    try {

      const res = await fetch("/api/deposit-history");

      const data = await res.json();

      setHistory(data?.history || []);

    } catch (err) {

      console.log(err);

    }

  };



  const handleDeposit = async () => {

    if (!selectedMethod) return alert("Please select payment method");



    if (!amount || !accountNumber || !accountName || !trxId) {

      return alert("Please fill all fields");

    }
 // ✅ Amount sirf numbers
  if (!/^\d+$/.test(amount)) {
    return alert(
      "Amount must contain numbers only"
    );
  }

  // ✅ Account Number sirf numbers
  if (!/^\d+$/.test(accountNumber)) {
    return alert(
      "Account Number must contain numbers only"
    );
  }



    const user = localStorage.getItem("user");

    if (!user) return alert("Please login first");



    const parsedUser = JSON.parse(user);



    setLoading(true);



    try {

      let uploadedImagePath = "";



      // ✅ upload screenshot first (if exists)

      if (screenshot) {

        const formData = new FormData();

        formData.append("file", screenshot);



        const uploadRes = await fetch("/api/upload", {

          method: "POST",

          body: formData,

        });



        const uploadData = await uploadRes.json();



        if (!uploadData.success) {

          setLoading(false);

          return alert("Screenshot upload failed");

        }



        uploadedImagePath = uploadData.imagePath;

      }



      // ✅ deposit request

      const res = await fetch("/api/deposit-request", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          userId: parsedUser.id,

          method: selectedMethod,

          bankName: selectedBank,

          amount,

          accountNumber,

          accountName,

          trxId,

          screenshot: uploadedImagePath,

        }),

      });



      const data = await res.json();



      if (!data.success) {

        return alert(data.message || "Deposit failed");

      }



      alert("Deposit Request Submitted Successfully ✅");



      // reset form

      setAmount("");

      setAccountNumber("");

      setAccountName("");

      setTrxId("");

      setPreview("");

      setSelectedMethod("");

      setSelectedBank("");

      setScreenshot(null);

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  };



  return (

    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-5xl mx-auto">



        {/* HEADER */}

        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-8 rounded-3xl shadow-2xl">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-4xl font-bold">Deposit Funds</h1>

              <p className="mt-2 text-white/80">

                Select payment method and submit deposit request.

              </p>

            </div>

<button
  type="button"
  onClick={() => {
    console.log("History clicked");

    setShowHistory((prev) => {
      const next = !prev;

      if (!prev) {
        fetchHistory();
      }

      return next;
    });
  }}
  className="relative z-50 bg-black/30 px-5 py-3 rounded-2xl border border-white/20"
>
  🕒 Deposit History
</button>

          </div>

        </div>



        {/* PAYMENT METHODS */}

        <div className="bg-zinc-900 mt-8 p-8 rounded-3xl border border-zinc-800">

          <h2 className="text-2xl font-bold mb-6">

            Select Payment Method

          </h2>



          <div className="grid md:grid-cols-3 gap-4">



            {/* Easypaisa */}

            <button

              onClick={() => {

                setSelectedMethod("Easypaisa");

                setSelectedBank("");

              }}

              className={`p-5 rounded-2xl border ${

                selectedMethod === "Easypaisa"

                  ? "bg-green-600"

                  : "bg-zinc-800"

              }`}

            >

              <Image

                src="/payment/easypaisa.png"

                alt="Easypaisa"

                width={80}

                height={80}

              />

              <h3 className="font-bold mt-2">Easypaisa</h3>

            </button>



            {/* JazzCash */}

            <button

              onClick={() => {

                setSelectedMethod("JazzCash");

                setSelectedBank("");

              }}

              className={`p-5 rounded-2xl border ${

                selectedMethod === "JazzCash"

                  ? "bg-red-600"

                  : "bg-zinc-800"

              }`}

            >

              <Image

                src="/payment/jazzcash.png"

                alt="JazzCash"

                width={80}

                height={80}

              />

              <h3 className="font-bold mt-2">JazzCash</h3>

            </button>



            {/* Bank */}

            <button

              onClick={() => setSelectedMethod("Bank Transfer")}

              className={`p-5 rounded-2xl border ${

                selectedMethod === "Bank Transfer"

                  ? "bg-blue-600"

                  : "bg-zinc-800"

              }`}

            >

              <Image

                src="/payment/bank.png"

                alt="Bank"

                width={80}

                height={80}

              />

              <h3 className="font-bold mt-2">Bank Transfer</h3>

            </button>

          </div>

        </div>



        {/* FORM */}

        {selectedMethod && (

          <div className="bg-zinc-900 mt-8 p-8 rounded-3xl border border-zinc-800 space-y-4">


<input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  placeholder="Amount"
  value={amount}
  onChange={(e) =>
    setAmount(
      e.target.value.replace(/\D/g, "")
    )
  }
  className="w-full p-4 bg-zinc-800 rounded-xl"
/>



           <input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  placeholder="Account Number"
  value={accountNumber}
  onChange={(e) =>
    setAccountNumber(
      e.target.value.replace(/\D/g, "")
    )
  }
  className="w-full p-4 bg-zinc-800 rounded-xl"
/>



            <input

              type="text"

              placeholder="Account Name"

              value={accountName}

              onChange={(e) => setAccountName(e.target.value)}

              className="w-full p-4 bg-zinc-800 rounded-xl"

            />



            <input

              type="text"

              placeholder="TRX ID"

              value={trxId}

              onChange={(e) => setTrxId(e.target.value)}

              className="w-full p-4 bg-zinc-800 rounded-xl"

            />



            {/* Screenshot */}

            <input

              type="file"

              accept="image/*"

              onChange={(e) => {

                const file = e.target.files?.[0];

                if (file) {

                  setScreenshot(file);

                  setPreview(URL.createObjectURL(file));

                }

              }}

            />



            {preview && (

              <img

                src={preview}

                className="w-full max-h-[300px] object-contain"

              />

            )}



            <button

              onClick={handleDeposit}

              disabled={loading}

              className="w-full bg-cyan-500 p-4 rounded-xl font-bold"

            >

              {loading ? "Submitting..." : "Submit Deposit"}

            </button>

          </div>

        )}

      </div>

    </main>

  );

}