"use client";

import { motion } from 'motion/react';
import { BubbleButton } from '../shared/BubbleButton';

interface CTASectionProps {
  content: {
    title: string;
    description: string;
    button: string;
  };
}

export function CTASection({ content }: CTASectionProps) {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-[var(--primary)] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
            {content.title}
          </h2>
          <div className="flex justify-center mt-3 mb-6">
            <svg
              width="40"
              height="24"
              viewBox="0 0 40 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 18c1 .8 2 1.5 4 1.5 4 0 4-3 8-3 4.2 0 3.8 3 8 3 4 0 4-3 8-3 2 0 3 .7 4 1.5"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/95 mb-8 sm:mb-12 leading-relaxed">
            {content.description}
          </p>
          <BubbleButton
            size="lg"
            variant="white"
            className="rounded-full text-base sm:text-lg font-semibold"
            onClick={() => window.location.hash = 'contact'}
          >
            {content.button}
          </BubbleButton>
        </motion.div>
      </div>

      {/* Wave Shape at Bottom */}
      <div className="absolute -bottom-1 left-0 right-0 h-16">
        <svg
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 54"
          fill="#0f172a"
        >
          <path d="M0,40 C240,10 480,10 720,30 C960,50 1200,50 1440,30 L1440,54 L0,54 Z" />
        </svg>
      </div>
    </section>
  );
}
