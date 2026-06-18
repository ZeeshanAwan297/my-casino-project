import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 border-b border-cyan-500">

      <h1 className="text-3xl font-bold text-cyan-400">
        GameVerse
      </h1>

      <div className="flex items-center gap-8">

        <a href="#">Home</a>
        <a href="#">Games</a>
        <a href="#">News</a>
        <a href="#">Contact</a>

        <Link
          href="/login"
          className="px-5 py-2 rounded-full bg-cyan-500 text-black font-bold hover:scale-105 transition"
        >
          Login
        </Link>

      </div>

    </nav>
  );
}