"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Ticket, HelpCircle, Sparkles } from 'lucide-react';
import { BubbleButton } from '../shared/BubbleButton';

interface PrixContentProps {
  content: any;
}

export function PrixContent({ content }: PrixContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 bg-[var(--primary)] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
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
              <div className="w-20 h-20 bg-[rgb(var(--primaryrgb)/0.2)] backdrop-blur-sm rounded-full flex items-center justify-center mx-auto border-2 border-[rgb(var(--primaryrgb)/0.3)]">
                <Ticket className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6">
              {content?.hero?.title || "Nos Tarifs"}
            </h1>
            <div className="flex justify-center mt-3 mb-6">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 18c1 .8 2 1.5 4 1.5 4 0 4-3 8-3 4.2 0 3.8 3 8 3 4 0 4-3 8-3 2 0 3 .7 4 1.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-[rgb(var(--primaryrgb)/0.95)] mb-6">
              {content?.hero?.subtitle || "Des prix transparents pour tous les niveaux"}
            </p>
            <p className="text-base sm:text-lg text-[rgb(var(--primaryrgb)/0.8)] max-w-2xl mx-auto">
              {content?.hero?.description || "Plongées d'exploration, formations et équipements"}
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
              {content?.exploration?.title || "Plongées d'Exploration"}
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
              {content?.exploration?.subtitle || "Pour les plongeurs certifiés"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {content?.exploration?.packages?.map((pkg: any, index: number) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative"
              >
                <div className={`relative h-full rounded-3xl p-8 shadow-xl transition-all duration-300 border-2 ${
                  pkg.popular
                    ? 'bg-[var(--primary)] border-[rgb(var(--primaryrgb)/0.8)] scale-105'
                    : 'bg-white border-gray-200 hover:border-[var(--primary)]'
                }`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[rgb(var(--primaryrgb)/0.9)] text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
                        <Sparkles className="w-4 h-4" />
                        Le Plus Populaire
                      </div>
                    </div>
                  )}

                  <div className={pkg.popular ? 'text-white' : 'text-slate-900'}>
                    <h3 className="text-2xl font-bold mb-4">{pkg.title}</h3>
                    <div className="mb-6">
                      <span className="text-5xl font-bold">{pkg.price}</span>
                    </div>
                    {pkg.save && (
                      <div className={`text-sm font-semibold mb-6 ${pkg.popular ? 'text-[rgb(var(--primaryrgb)/0.9)]' : 'text-[var(--primary)]'}`}>
                        {pkg.save}
                      </div>
                    )}

                    <ul className="space-y-4 mb-8">
                      {pkg.features?.map((feature: string, i: number) => (
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
                      Réserver
                    </BubbleButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Prices */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {content?.discovery?.title || "Tarifs Découverte"}
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
              {content?.discovery?.subtitle || "Première expérience sous-marine"}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              {content?.discovery?.items?.map((item: any, index: number) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`flex items-center justify-between p-6 ${
                    index !== content.discovery.items.length - 1 ? 'border-b border-gray-200' : ''
                  } hover:bg-[rgb(var(--primaryrgb)/0.05)] transition-colors duration-200`}
                >
                  <span className="font-semibold text-slate-900 text-lg">{item.title}</span>
                  <span className="text-2xl font-bold text-[var(--primary)]">{item.price}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              {content?.faq?.title || "Questions Fréquentes"}
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
              {content?.faq?.subtitle || "Tout ce que vous devez savoir"}
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {content?.faq?.items?.map((faq: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 text-left flex-1">
                      <HelpCircle className="w-6 h-6 text-[var(--primary)] flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 text-lg mb-2">
                          {faq.question}
                        </h3>
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: openFaq === index ? 'auto' : 0,
                            opacity: openFaq === index ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-600 leading-relaxed pt-2">
                            {faq.answer}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[var(--primary)]"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
