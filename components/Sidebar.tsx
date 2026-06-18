"use client";

import {
  FaHome,
  FaWallet,
  FaGamepad,
  FaMoneyBillWave,
  FaUser,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-72 min-h-screen bg-black/40 backdrop-blur-xl border-r border-cyan-500/20 p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        GAMING HUB
      </h1>

      <div className="space-y-5">
        <button className="flex items-center gap-3 text-white hover:text-cyan-400">
          <FaHome /> Dashboard
        </button>

        <button className="flex items-center gap-3 text-white hover:text-cyan-400">
          <FaWallet /> Wallet
        </button>

        <button className="flex items-center gap-3 text-white hover:text-cyan-400">
          <FaMoneyBillWave /> Deposit
        </button>

        <button className="flex items-center gap-3 text-white hover:text-cyan-400">
          <FaMoneyBillWave /> Withdraw
        </button>

        <button className="flex items-center gap-3 text-white hover:text-cyan-400">
          <FaGamepad /> Games
        </button>

        <button className="flex items-center gap-3 text-white hover:text-cyan-400">
          <FaUser /> Profile
        </button>
      </div>
    </div>
  );
}