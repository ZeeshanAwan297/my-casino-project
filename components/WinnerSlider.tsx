"use client";

export default function WinnerSlider() {

  const winners = [
    { name: "A***", amount: "Rs 12,500" },
    { name: "H***", amount: "Rs 8,900" },
    { name: "U***", amount: "Rs 25,000" },
    { name: "B***", amount: "Rs 15,700" },
    { name: "Z***", amount: "Rs 18,400" },
    { name: "S***", amount: "Rs 9,600" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-500 bg-[#08111f] h-14 flex items-center">

      {/* Left Label */}
      <div className="bg-cyan-500 text-black font-bold px-5 h-full flex items-center shrink-0">
        LIVE WINNERS
      </div>

      {/* Moving Content */}
      <div className="flex-1 overflow-hidden">

        <div className="animate-marquee whitespace-nowrap">

          {[...winners, ...winners].map((winner, index) => (
            <span
              key={index}
              className="inline-block mx-10 text-white font-semibold"
            >
              🏆 {winner.name} won
              <span className="text-green-400 ml-2">
                {winner.amount}
              </span>
            </span>
          ))}

        </div>

      </div>

    </div>
  );
}