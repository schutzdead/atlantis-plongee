"use client";

import { motion } from 'motion/react';
import { Bubble } from '@/hooks/useBubbleEffect';

interface BubbleEffectProps {
  bubbles: Bubble[];
}

export function BubbleEffect({ bubbles }: BubbleEffectProps) {
  return (
    <>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute w-2 h-2 bg-white/60 rounded-full pointer-events-none"
          style={{
            left: bubble.x,
            top: bubble.y,
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0,
            y: -80,
            x: (Math.random() - 0.5) * 40,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut"
          }}
        />
      ))}
    </>
  );
}
