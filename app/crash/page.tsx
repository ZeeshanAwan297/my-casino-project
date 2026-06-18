"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function CrashPage() {
  const [bet, setBet] = useState("");
  const [multiplier, setMultiplier] = useState(1);
  const [running, setRunning] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [status, setStatus] = useState("Waiting for round...");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    socket.on("round:start", () => {
      setRunning(true);
      setCrashed(false);
      setStatus("Game Started 🚀");
      setMultiplier(1);
    });

    socket.on("round:update", (data) => {
      setMultiplier(data.multiplier);
    });

    socket.on("round:crash", () => {
      setRunning(false);
      setCrashed(true);
      setStatus("CRASHED 💥");
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white flex">

      {/* LEFT PANEL */}
      <div className="w-1/4 p-4 bg-[#0f172a] border-r border-gray-800">
        <h2 className="text-xl font-bold mb-4">💰 Bet Panel</h2>

        <input
          className="w-full p-3 bg-black border border-gray-700 rounded"
          placeholder="Enter bet"
          value={bet}
          onChange={(e) => setBet(e.target.value)}
        />

        <button className="w-full mt-4 bg-green-500 py-3 rounded">
          Place Bet
        </button>

        <button className="w-full mt-3 bg-yellow-500 py-3 rounded">
          Cashout
        </button>
      </div>

      {/* CENTER */}
      <div className="flex-1 flex flex-col items-center justify-center relative">

        <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-[120px] rounded-full"></div>

        <p className="mb-6 text-gray-400">{status}</p>

        <h1
          className={`text-8xl font-extrabold ${
            crashed ? "text-red-500" : "text-green-400"
          }`}
        >
          {multiplier.toFixed(2)}x
        </h1>

        {crashed && (
          <p className="text-red-500 text-2xl mt-4">
            💥 CRASHED
          </p>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/4 p-4 bg-[#0f172a] border-l border-gray-800">
        <h2 className="text-xl font-bold mb-4">📊 Stats</h2>

        <div className="space-y-3 text-sm">
          <div className="p-3 bg-black rounded">Last Crash: 2.34x</div>
          <div className="p-3 bg-black rounded">Players: 128</div>
          <div className="p-3 bg-black rounded">Pool: $1,240</div>
        </div>
      </div>

    </div>
  );
}