"use client";

import { motion } from 'motion/react';

export function WaveUnderline() {
  return (
    <div className="flex justify-center mt-3 mb-2">
      <motion.svg
        width="40"
        height="24"
        viewBox="0 0 40 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.path
          d="M2 18c1 .8 2 1.5 4 1.5 4 0 4-3 8-3 4.2 0 3.8 3 8 3 4 0 4-3 8-3 2 0 3 .7 4 1.5"
          stroke="#06b6d4"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          animate={{
            strokeDashoffset: [0, -50],
          }}
          style={{
            strokeDasharray: "10 5",
          }}
        />
      </motion.svg>
    </div>
  );
}
