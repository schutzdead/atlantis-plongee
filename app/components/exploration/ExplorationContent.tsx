"use client";

import { motion } from 'motion/react';
import { Compass, Clock, CheckCircle, Check, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../shared/ImageWithFallback';
import { BubbleButton } from '../shared/BubbleButton';
import Link from 'next/link';

interface Exploration {
  titre: string;
  prix: string;
  photo: {
    url: string;
  };
  courteDescription: string;
  dure: string;
  preRequis: string;
  lien: string;
}

interface PackageItem {
  id: string;
  title: string;
  price: string;
  priceAutonome: string;
  save?: string;
  popular?: boolean;
  features: string[];
}

interface PackagesSection {
  title: string;
  subtitle?: string;
  perDive?: string;
  items: PackageItem[];
  popularLabel?: string;
  encadreeLabel?: string;
  autonomeLabel?: string;
  ctaButton?: string;
}

interface ExplorationContentProps {
  content: any;
  articles: Exploration[];
}

export function ExplorationContent({ content, articles }: ExplorationContentProps) {
  const packages: PackagesSection | undefined = content?.packages;

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 bg-[var(--primary)] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={content?.hero?.image?.src || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"}
            alt={content?.hero?.image?.alt || "Plongées d'Exploration"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgb(var(--primaryrgb)/0.8)]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto border-2 border-white/30">
                <Compass className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6">
              {content?.hero?.title || "Plongées d'Exploration"}
            </h1>
            <div className="flex justify-center mt-3 mb-6">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 18c1 .8 2 1.5 4 1.5 4 0 4-3 8-3 4.2 0 3.8 3 8 3 4 0 4-3 8-3 2 0 3 .7 4 1.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/95 mb-6">
              {content?.hero?.subtitle || "Explorez les fonds marins"}
            </p>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              {content?.hero?.description || "Plongées pour plongeurs certifiés, encadrées ou en autonomie"}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 54" fill="white">
            <path d="M0,40 C240,10 480,10 720,30 C960,50 1200,50 1440,30 L1440,54 L0,54 Z" />
          </svg>
        </div>
      </section>

      {/* Exploration Packages */}
      {packages && (
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
                {packages.title}
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
              {packages.subtitle && (
                <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mt-4">
                  {packages.subtitle}
                </p>
              )}
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {packages.items?.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="relative"
                >
                  <div className={`relative h-full rounded-3xl p-8 shadow-xl transition-all duration-300 border-2 ${
                    pkg.popular
                      ? 'bg-[var(--primary)] border-[var(--primary)]/80 scale-105'
                      : 'bg-white border-gray-200 hover:border-[var(--primary)]'
                  }`}>
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-[var(--primary)]/90 text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
                          <Sparkles className="w-4 h-4" />
                          {packages.popularLabel || "Le Plus Populaire"}
                        </div>
                      </div>
                    )}

                    <div className={pkg.popular ? 'text-white' : 'text-slate-900'}>
                      <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                      <div className="mb-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-bold">{pkg.price}</span>
                          {index === 0 && packages.perDive && (
                            <span className="text-lg opacity-80">{packages.perDive}</span>
                          )}
                        </div>
                        <div className={`text-sm mt-1 ${pkg.popular ? 'text-white/70' : 'text-slate-600'}`}>
                          {packages.encadreeLabel || "Plongée encadrée"}
                        </div>
                        <div className={`text-sm font-semibold mt-2 ${pkg.popular ? 'text-white/90' : 'text-[var(--primary)]'}`}>
                          {pkg.priceAutonome} {packages.autonomeLabel || "en autonome"}
                        </div>
                      </div>
                      {pkg.save && (
                        <div className={`text-sm font-semibold mb-6 ${pkg.popular ? 'text-white/90' : 'text-[var(--primary)]'}`}>
                          {pkg.save}
                        </div>
                      )}

                      <ul className="space-y-4 mb-8 mt-8">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${pkg.popular ? 'text-white' : 'text-[var(--primary)]'}`} />
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <BubbleButton
                        className={`w-full ${
                          pkg.popular
                            ? 'bg-white text-[var(--primary)] hover:bg-gray-100'
                            : ''
                        }`}
                      >
                        {packages.ctaButton || "Réserver"}
                      </BubbleButton>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Plongées Exploration */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {content?.plongeesSection?.title || "Nos Plongées Exploration"}
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
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              {content?.plongeesSection?.subtitle || "Pour plongeurs certifiés"}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(articles || []).map((dive, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={dive?.photo?.url || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=800&fit=crop"}
                      alt={dive?.titre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {dive?.titre}
                    </h3>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-[var(--primary)]">
                        {dive?.prix}
                      </span>
                    </div>

                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {dive?.courteDescription}
                    </p>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                        <span className="text-slate-700">
                          <span className="font-semibold">Durée:</span> {dive?.dure}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                        <span className="text-slate-700">
                          <span className="font-semibold">Prérequis:</span> {dive?.preRequis}
                        </span>
                      </div>
                    </div>

                    {/* Spacer to push button to bottom */}
                    <div className="flex-1" />

                    {/* CTA Button */}
                    <Link href={dive?.lien || '#'} className="w-full mt-auto">
                      <BubbleButton className="w-full">
                        Réserver
                      </BubbleButton>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
