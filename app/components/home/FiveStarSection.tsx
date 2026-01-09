"use client";

import { motion } from 'motion/react';
import { Star, Award, Shield, Users } from 'lucide-react';

interface FeatureItem {
  title: string;
  description: string;
}

interface FiveStarSectionProps {
  content: {
    title: string;
    subtitle: string;
    features: FeatureItem[];
  };
}

export function FiveStarSection({ content }: FiveStarSectionProps) {
  const iconMap = [Star, Award, Shield, Users];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-[rgb(var(--primaryrgb)/0.05)] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* PADI 5 Star Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-full mb-6 shadow-lg"
          >
            <span className="font-bold">PADI 5 Star Dive Center</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {content.title}
          </h2>

          <div className="flex justify-center mt-3 mb-6">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M2 18c1 .8 2 1.5 4 1.5 4 0 4-3 8-3 4.2 0 3.8 3 8 3 4 0 4-3 8-3 2 0 3 .7 4 1.5" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </svg>
          </div>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {content.features.map((feature, index) => {
            const Icon = iconMap[index] || Star;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 bg-[var(--primary)] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
