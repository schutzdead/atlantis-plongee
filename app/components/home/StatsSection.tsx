"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { BubbleButton } from '../shared/BubbleButton';
import Link from 'next/link';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  duration?: number;
}

function StatItem({ value, suffix, label, duration = 2 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

        // Fonction d'easing pour simuler un manomètre qui ralentit en approchant de la valeur
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOut * value));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, value, duration]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center"
    >
      {/* Compteur */}
      <div className="relative mb-2">
        <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--primary)]">
          {count}{suffix}
        </div>
      </div>

      {/* Label */}
      <p className="text-slate-600 text-sm sm:text-base">
        {label}
      </p>
    </div>
  );
}

interface StatItemData {
  value: string;
  label: string;
}

interface StatsSectionProps {
  content: {
    title: string;
    subtitle: string;
    items: StatItemData[];
    discoverTeamCta: string;
  };
}

export function StatsSection({ content }: StatsSectionProps) {
  // Parse value and suffix from content items
  const stats = content.items.map(item => {
    const match = item.value.match(/^(\d+)(.*)$/);
    return {
      value: match ? parseInt(match[1]) : 0,
      suffix: match ? match[2] : '',
      label: item.label,
    };
  });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-[rgb(var(--primaryrgb)/0.05)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {content.title}
          </h2>
          <div className="flex justify-center mb-4">
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
              <path
                d="M2 18c1.5 .8 3 1.5 6 1.5 6 0 6-3 12-3 6.3 0 5.7 3 12 3 6 0 6-3 12-3 3 0 4.5 .7 6 1.5"
                stroke="#06b6d4"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              duration={2 + index * 0.2}
            />
          ))}
        </div>

        {/* Bouton Découvrez l'équipe */}
        <div className="flex justify-center mt-12">
          <Link href="/equipe">
            <BubbleButton>
              {content.discoverTeamCta}
            </BubbleButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
