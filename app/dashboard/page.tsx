"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import UserCard from "@/components/UserCard";
import WalletCard from "@/components/WalletCard";
import StatsCard from "@/components/StatsCard";
import LiveGames from "@/components/LiveGames";
import WinnerSlider from "@/components/WinnerSlider";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showGames, setShowGames] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/login");
    }
  }, [router]);

  return (
    <main className="h-screen overflow-hidden bg-black flex">
      {/* MENU BUTTON */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-5 left-5 z-[60] bg-[#111827] p-3 rounded-xl"
      >
        <div className="flex flex-col gap-1">
          <span className="w-7 h-1 bg-white rounded"></span>
          <span className="w-7 h-1 bg-white rounded"></span>
          <span className="w-7 h-1 bg-white rounded"></span>
        </div>
      </button>

      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* WINNER SLIDER */}
        <div className="ml-16">
          <WinnerSlider />
        </div>

        {/* TOP CARDS */}
        <div className="grid lg:grid-cols-2 gap-6 mt-4">
          <UserCard />
          <WalletCard />
        </div>

        {/* GAMES SECTION */}
        <div className="mt-6 max-w-[49%]">
          <div
            onClick={() => setShowGames(!showGames)}
            className="cursor-pointer bg-[#111827] border border-slate-800 rounded-3xl p-5 hover:border-cyan-500 transition"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-white text-2xl font-bold">
                🎮 Games
              </h2>

              <span className="text-cyan-400 text-2xl">
                {showGames ? "−" : "+"}
              </span>
            </div>
          </div>

          {showGames && (
            <div className="mt-4">
              <div
                onClick={() => router.push("/crash")}
                className="cursor-pointer overflow-hidden rounded-2xl bg-[#1f2937] border border-slate-700 hover:border-orange-500 transition-all duration-300"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src="/crash-banner.jpg"
                    alt="Crash Game"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white text-xl font-bold">
                        Crash Game
                      </h3>

                      <p className="text-slate-400 text-sm">
                        Play & Win Multipliers
                      </p>
                    </div>

                    <button className="bg-orange-500 px-4 py-2 rounded-lg text-white font-bold">
                      PLAY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <StatsCard
            title="Referral Earnings"
            value="$0"
          />

          <StatsCard
            title="Total Deposits"
            value="$0"
          />

          <StatsCard
            title="Total Withdrawals"
            value="$0"
          />
        </div>

        {/* LIVE GAMES */}
        <div className="mt-8">
          <LiveGames />
        </div>
      </div>
    </main>
  );
}