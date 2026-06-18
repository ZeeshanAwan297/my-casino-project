"use client";

import Sidebar from "@/components/Sidebar";
import UserCard from "@/components/UserCard";
import WalletCard from "@/components/WalletCard";
import StatsCard from "@/components/StatsCard";
import LiveGames from "@/components/LiveGames";
import TransactionHistory from "@/components/TransactionHistory";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black flex">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Top Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          <UserCard />
          <WalletCard />
        </div>

        {/* Stats */}
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

        {/* Live Games */}
        <div className="mt-8">
          <LiveGames />
        </div>
      </div>
    </main>
  );
}