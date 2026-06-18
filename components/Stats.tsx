"use client";

import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    { number: "500K+", title: "Active Players" },
    { number: "120+", title: "Games" },
    { number: "50+", title: "Tournaments" },
  ];

  return (
    <section className="py-20">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
          >
            <h2 className="text-5xl font-bold text-cyan-400">
              {stat.number}
            </h2>

            <p className="text-gray-400 mt-3">
              {stat.title}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}