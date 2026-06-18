"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

  setMessage("Login Successful!");

  setTimeout(() => {
    router.push("/dashboard");
  }, 1000);
  
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-[150px] rounded-full left-10 top-20"></div>
      <div className="absolute w-96 h-96 bg-purple-500/20 blur-[150px] rounded-full right-10 bottom-20"></div>

      <div className="relative z-10 w-[420px] bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-[30px] p-8 shadow-[0_0_50px_rgba(0,255,255,0.2)]">
        <h1 className="text-5xl font-bold text-center text-cyan-400 mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl bg-white text-black placeholder-gray-500 border border-cyan-500/20 outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl bg-white text-black placeholder-gray-500 border border-cyan-500/20 outline-none focus:ring-2 focus:ring-cyan-400"
        />

        {message && (
          <div className="mb-4 text-center text-white">
            {message}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full p-4 rounded-xl bg-cyan-500 text-black font-bold hover:scale-105 transition shadow-[0_0_30px_#00ffff]"
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-cyan-400 hover:text-cyan-300"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}