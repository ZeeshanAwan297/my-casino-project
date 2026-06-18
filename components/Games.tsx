"use client";

import { motion } from "framer-motion";
import { FaGamepad } from "react-icons/fa";

export default function Games() {
  const games = [
    {
      title: "Cyber Arena",
      desc: "Battle in futuristic arenas",
    },
    {
      title: "Shadow Ops",
      desc: "Elite tactical missions",
    },
    {
      title: "Galaxy War",
      desc: "Explore the universe",
    },
  ];

  return (
    <section className="py-20 px-10">
      <h2 className="text-5xl font-bold text-center mb-16 text-cyan-400">
        Featured Games
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              rotateY: 10,
            }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-lg border border-cyan-500/20 rounded-3xl p-8"
          >
            <div className="h-48 rounded-2xl bg-linear-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
              <FaGamepad size={70} className="text-cyan-400" />
            </div>

            <h3 className="text-2xl font-bold text-cyan-400 mt-5">
              {game.title}
            </h3>

            <p className="mt-3 text-gray-400">
              {game.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}