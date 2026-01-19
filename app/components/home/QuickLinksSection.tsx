"use client";

import { motion } from 'motion/react';
import { GraduationCap, DollarSign, Anchor, Compass, ArrowRight, Phone } from 'lucide-react';
import { WaveUnderline } from '../shared/WaveUnderline';
import { BubbleButton } from '../shared/BubbleButton';
import Link from 'next/link';

interface ServiceItem {
  title: string;
  description: string;
  cta: string;
  link: string;
}

interface QuickLinksSectionProps {
  content: {
    title: string;
    subtitle: string;
    bookDiveCta: string;
    services: ServiceItem[];
  };
}

export function QuickLinksSection({ content }: QuickLinksSectionProps) {
  const iconMap: Record<string, any> = {
    '/formations': GraduationCap,
    '/decouverte': Compass,
    '/prix': DollarSign,
    '/sites': Anchor,
    '/contact': Phone,
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
            {content.title}
          </h2>
          <WaveUnderline />
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mt-4">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {content.services.map((service, index) => {
            const Icon = iconMap[service.link] || Compass;
            return (
              <Link
                key={service.title}
                href={service.link}
                className="group relative w-full text-left block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="relative h-full bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-[var(--primary)] flex items-center justify-center shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="flex items-center text-[var(--primary)] group-hover:text-[rgb(var(--primaryrgb)/0.8)] font-semibold">
                        <span>{service.cta}</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Bouton Réserver une plongée */}
        <div className="flex justify-center mt-12">
          <a href="https://public.zuurit.com/fr/atlantisplongeeguadeloupe/booking" target="_blank" rel="noopener noreferrer">
            <BubbleButton>
              {content.bookDiveCta}
            </BubbleButton>
          </a>
        </div>
      </div>
    </section>
  );
}
