"use client";

import {
  FaHome,
  FaWallet,
  FaGamepad,
  FaMoneyBillWave,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { useRouter } from "next/navigation";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const router = useRouter();
  const handleLogout = () => {
  localStorage.removeItem("user");

  router.push("/login");
};
  return (
    <div
  className={`fixed left-0 top-0 z-50 w-72 min-h-screen bg-black/90 backdrop-blur-xl border-r border-cyan-500/20 p-6 transition-all duration-300 ${
    sidebarOpen
      ? "translate-x-0"
      : "-translate-x-full"
  }`}
>
      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        GAMING HUB
      </h1>

<button
  onClick={() => setSidebarOpen(false)}
  className="mb-8 flex flex-col gap-1"
>
  <span className="w-8 h-1 bg-cyan-400 rounded"></span>
  <span className="w-8 h-1 bg-cyan-400 rounded"></span>
  <span className="w-8 h-1 bg-cyan-400 rounded"></span>
</button>

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

        <button
  onClick={handleLogout}
  className="flex items-center gap-3 text-red-500 hover:text-red-400 mt-4"
>
  <FaSignOutAlt />
  Logout
</button>

      </div>
    </div>
  );
}