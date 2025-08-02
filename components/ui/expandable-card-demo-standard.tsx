"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const cards = [
  {
    description: "Embark on epic quests and playful puzzles",
    title: "Adventure Awaits",
    ctaText: "Begin",
    ctaLink: "#",
    content: () => (
      <p>
        Every coding journey becomes a thrilling adventure as you explore
        challenges, defeat bugs, and unlock your creativity.
      </p>
    ),
  },
  {
    description: "Uncover your unique programming strengths",
    title: "Discover Your Powers",
    ctaText: "Reveal",
    ctaLink: "#",
    content: () => (
      <p>
        Each challenge helps you grow, revealing your hidden talents and
        pushing you toward mastery and confidence in code.
      </p>
    ),
  },
  {
    description: "Work together and win together",
    title: "Team Up For Success",
    ctaText: "Join Team",
    ctaLink: "#",
    content: () => (
      <p>
        Collaborate with new friends, turning teamwork into a powerful tool
        for shared learning and epic breakthroughs.
      </p>
    ),
  },
];

export default function ExpandableCardDemo() {
  return (
    <div className="px-4 py-8 text-white">
      <ul className="max-w-5xl mx-auto flex flex-col w-full gap-6">
        {cards.map((card, index) => (
          <motion.li
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{
              scale: 1.04,
              translateY: -4,
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
            }}
            className={`relative rounded-2xl border border-white/[0.1] p-6 backdrop-blur bg-white/5 overflow-hidden group transition-all duration-300 ${
              index === 0 ? "scale-105 z-10 shadow-xl" : ""
            }`}
          >
            {/* Glow Ring on Hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />

            {/* Glow Spotlight on first card */}
            {index === 0 && (
              <div className="absolute -inset-1 rounded-2xl bg-pink-500/20 blur-2xl opacity-30 z-[-1]" />
            )}

            <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
            <p className="text-sm text-white/80 mb-2">{card.description}</p>
            <div className="text-sm text-white/70 mb-4">
              {typeof card.content === "function" ? card.content() : card.content}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
