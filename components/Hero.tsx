export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center h-[85vh] text-center relative z-10">

      <h1 className="text-7xl font-extrabold">
        ENTER THE
        <span className="text-cyan-400 drop-shadow-[0_0_30px_#00ffff]">
          {" "}GAMEVERSE
        </span>
      </h1>

      <p className="mt-6 text-gray-300 text-xl">
        Next Generation Gaming Platform
      </p>

      <button className="mt-8 px-10 py-4 rounded-full bg-cyan-500 text-black font-bold hover:scale-110 duration-300 shadow-[0_0_30px_#00ffff]">
        Play Now
      </button>

    </section>
  );
}