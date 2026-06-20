"use client";

import { useEffect, useState } from "react";

export default function CrashPage() {
  const [bet, setBet] = useState("");
  const [multiplier, setMultiplier] = useState(1);
  const [running, setRunning] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [status, setStatus] = useState("Loading...");
  const [loading, setLoading] = useState(false);

  const [countdown, setCountdown] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);
  const [betPlaced, setBetPlaced] = useState(false);


  
  const [progress, setProgress] = useState(0);
const [exploded, setExploded] = useState(false);
const [autoPlay, setAutoPlay] = useState(false);

const [showWinPopup, setShowWinPopup] = useState(false);
const [winAmount, setWinAmount] = useState(0);


const [displayMultiplier,setDisplayMultiplier] = useState(1);


  // LIVE GAME STATE
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/crash", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "state",
          }),
        });

        const data = await res.json();

        setMultiplier(data.multiplier || 1);
        const currentMultiplier = data.multiplier || 1;
        setTimeout(()=>{

setDisplayMultiplier(data.multiplier || 1);

},300);

setProgress(
  Math.min(currentMultiplier / 15, 1)
);
        setRunning(data.running);

        const progress = Math.min(data.multiplier / 10, 1);

        if (data.running) {
         setExploded(false);
         }


        if (data.running) {
          setStatus("Game Running 🚀");
          setCrashed(false);
          setExploded(false);
          setShowCountdown(false);
        } else {
          setStatus("CRASHED 💥");
          setCrashed(true);

          setExploded(true);
          setBetPlaced(false);
  setShowWinPopup(false)
          

          if (data.countdownEnd) {
            const seconds = Math.max(
              0,
              Math.ceil(
                (data.countdownEnd - Date.now()) / 1000
              )
            );

            setCountdown(seconds);
            setShowCountdown(seconds > 0);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // COUNTDOWN TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setShowCountdown(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // PLACE BET
  const placeBet = async () => {

  if (running) {
    alert("Round already started");
    return;
  }
    try {
      const user = localStorage.getItem("user");

      if (!user) {
        alert("Please Login");
        return;
      }

      if (!bet || Number(bet) <= 0) {
        alert("Enter Valid Bet");
        return;
      }

      setLoading(true);

      const parsedUser = JSON.parse(user);

      const res = await fetch("/api/crash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "bet",
          userId: parsedUser.id,
          betAmount: Number(bet),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      alert("Bet Placed Successfully ✅");
      setBetPlaced(true);
    } catch (error) {
      console.log(error);
      alert("Error placing bet");
    } finally {
      setLoading(false);
    }
  };

  // CASHOUT
  const cashout = async () => {
    try {
      const user = localStorage.getItem("user");

      if (!user) {
        alert("Please Login");
        return;
      }

      const parsedUser = JSON.parse(user);

      const res = await fetch("/api/crash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "cashout",
          userId: parsedUser.id,
          betAmount: Number(bet),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);

const planeX = 40 + progress * 850;

const planeY =
  60 +
  Math.sin(progress * 10) * 40 +
  progress * 240;

        return;
      }

      setWinAmount(data.winAmount);
setShowWinPopup(true);
setBetPlaced(false);
        
      setBetPlaced(false);

    } catch (error) {
      console.log(error);
      alert("Cashout Failed");
    }
  };
const safeProgress = Math.min(progress, 0.88);
  return (
   <div className="min-h-screen bg-[#0b0f1a] text-white flex justify-center items-center p-4">

     <div className="w-full max-w-5xl h-[95vh] bg-[#141942] rounded-3xl overflow-hidden shadow-2xl flex flex-col">

  {/* TOP BUTTONS */}
  <div className="grid grid-cols-2 gap-3 p-4">

    <button className="border border-orange-500 text-orange-400 rounded-xl py-3 font-bold">
      T&C
    </button>

    <button className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl py-3 font-bold">
      HISTORY
    </button>

  </div>

 {/* GAME AREA */}
<div className="relative flex-1 overflow-hidden bg-[#1b1f4d]">

  {/* Grid Lines */}
  <div className="absolute inset-0">

    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute w-full border-t border-dashed border-gray-600/40"
        style={{ top: `${i * 70}px` }}
      />
    ))}

  </div>
<svg
  className="absolute inset-0 w-full h-full"
  viewBox="0 0 1000 420"
>
  <path
    d="
      M40 360
      C140 360 180 260 280 180
      C360 120 460 260 560 180
      C660 110 760 260 860 120
      C920 80 970 160 990 60
    "
    stroke="#FFD700"
    strokeWidth="6"
    fill="none"
    strokeLinecap="round"

    pathLength="1"

    strokeDasharray="1"
    strokeDashoffset={1 - progress}
  />
</svg>

  {/* Plane */}
 <div
  className="absolute"
  style={{
  left: `${40 + safeProgress * 780}px`,
  bottom: `${
    50 +
    Math.sin(safeProgress * 10) * 30 +
    safeProgress * 180
  }px`,
  transition: "all 0.2s linear",
}}
>
    <img
  src="/plane.png"
  alt="plane"
  className={`w-24 h-24 object-contain ${
    exploded ? "animate-ping" : ""
  }`}

style={{
  transform: `rotate(${-15 + Math.sin(multiplier) * 10}deg)`
}}

/>
  </div>

  {/* Status */}
  <div className="absolute top-6 left-0 right-0 text-center">

    <p className="text-gray-300 text-xl">
      {status}
    </p>

  </div>

  {/* COUNTDOWN */}

{showCountdown && (

<div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">


<h1 className="text-8xl font-bold text-white">

{countdown}

</h1>


<div className="w-64 h-2 bg-gray-600 rounded-full overflow-hidden mt-5">


<div

className="h-full bg-orange-500 transition-all duration-1000"

style={{
width:`${(countdown / 5) * 100}%`
}}

/>


</div>


<p className="mt-4 text-xl text-orange-400">

Next Round Starting...

</p>


</div>

)}

{showWinPopup && (
  <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50">
    <div className="bg-green-500 text-white px-8 py-4 rounded-xl shadow-xl text-2xl font-bold">
      Won Rs {winAmount}
    </div>
  </div>
)}

  {/* Multiplier */}
  <div className="absolute bottom-10 right-10">

    <h1
      className={`text-8xl font-extrabold ${
        crashed
          ? "text-red-500"
          : "text-white"
      }`}
    >
      {multiplier.toFixed(2)}x
    </h1>

  </div>

</div>

{/* BETTING PANEL */}
<div className="p-3 bg-[#10153a] border-t border-[#2b356f] shrink-0">

  <div className="bg-[#161d4b] rounded-2xl p-3">

    {/* Amount Input Row */}
    <div className="flex gap-2 mb-3">

      <div className="relative flex-1">
        <input
  type="number"
  value={bet}
  onChange={(e) => setBet(e.target.value)}
  disabled={running || betPlaced}
  placeholder="Enter Bet"
  className="w-full bg-white text-black rounded-lg h-14 px-4 text-xl font-bold outline-none"
/>

        <button
          onClick={() => setBet("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-black text-xl"
        >
          ✕
        </button>
      </div>

      <button
        className="w-[170px] border border-orange-500 text-orange-400 rounded-lg font-bold"
      >
        ENABLE AUTOPLAY
      </button>

    </div>

    {/* Quick Bet Buttons */}
    <div className="grid grid-cols-3 gap-2 mb-3">

      {[200, 800, 2000, 6000, 20000, 70000].map((amount) => (
        <button
  key={amount}
  disabled={running || betPlaced}
  onClick={() => setBet(String(amount))}
  className="h-12 bg-[#27326f] rounded-lg font-bold text-white hover:bg-[#32408d] disabled:opacity-50 disabled:cursor-not-allowed"
>
  {amount}
</button>
      ))}

    </div>

    {/* Main Action Button */}
   {betPlaced ? (
  <button
    onClick={cashout}
    disabled={!running}
    className="w-full h-16 rounded-xl bg-green-500 text-white text-2xl font-bold"
  >
    CASH OUT ({multiplier.toFixed(2)}x)
  </button>
) : (
  <button
    onClick={placeBet}
    disabled={loading || running}
    className={`w-full h-16 rounded-xl text-white text-2xl font-bold ${
      running
        ? "bg-gray-600 cursor-not-allowed"
        : "bg-gradient-to-r from-orange-500 to-orange-600"
    }`}
  >
    {running ? "ROUND RUNNING" : "PLACE BET"}
  </button>
)}

  </div>

</div>

       </div>

          </div>

  );
  }