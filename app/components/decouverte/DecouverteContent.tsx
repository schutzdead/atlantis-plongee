"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Clock, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../shared/ImageWithFallback';
import { BubbleButton } from '../shared/BubbleButton';
import Link from 'next/link';

type DiscoveryTab = 'baptemes' | 'plongeesDecouverte';

interface DecouverteContentProps {
  content: any;
  articles: any;
}

export function DecouverteContent({ content, articles }: DecouverteContentProps) {
  const [activeTab, setActiveTab] = useState<DiscoveryTab>('baptemes');

  const currentDives = activeTab === 'baptemes'
    ? content?.baptemes || []
    : content?.plongeesDecouverte || [];

  const tabs = [
    { id: 'baptemes' as DiscoveryTab, label: 'Baptêmes & Initiations' },
    { id: 'plongeesDecouverte' as DiscoveryTab, label: 'Plongées Découverte' },
  ];

  console.log(articles);
  

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 bg-[var(--primary)] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={content?.hero?.image?.src || "https://images.unsplash.com/photo-1589772420961-7e737f42d5c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"}
            alt={content?.hero?.image?.alt || "Découverte de la plongée"}
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
              {content?.hero?.title || "Découverte de la Plongée"}
            </h1>
            <div className="flex justify-center mt-3 mb-6">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 18c1 .8 2 1.5 4 1.5 4 0 4-3 8-3 4.2 0 3.8 3 8 3 4 0 4-3 8-3 2 0 3 .7 4 1.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/95 mb-6">
              {content?.hero?.subtitle || "Première expérience sous-marine"}
            </p>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              {content?.hero?.description || "Baptêmes et plongées découverte pour tous"}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 54" fill="white">
            <path d="M0,40 C240,10 480,10 720,30 C960,50 1200,50 1440,30 L1440,54 L0,54 Z" />
          </svg>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 sm:py-12 bg-white sticky top-20 z-40 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 sm:px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[var(--primary)] text-white shadow-lg'
                    : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Dives Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Equipment Info */}
          {content?.info?.equipment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto mb-12 text-center"
            >
              <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-[rgb(var(--primaryrgb)/0.2)]">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {content.info.equipment.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {content.info.equipment.description}
                </p>
              </div>
            </motion.div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((dive: any, index: number) => (
              <motion.div
                key={dive.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100">
                  {/* Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <ImageWithFallback
                      src={dive?.photo?.url || "https://images.unsplash.com/photo-1645059986162-d077871822b6?w=600&h=800&fit=crop"}
                      alt={dive.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {dive?.titre}
                    </h3>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-[var(--primary)]">
                        {dive?.prix}
                      </span>
                      {dive.supplement && (
                        <p className="text-sm text-slate-500 mt-1">{dive.supplement}</p>
                      )}
                    </div>

                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {dive?.courteDescription}
                    </p>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-[var(--primary)]" />
                        <span className="text-slate-700">
                          <span className="font-semibold">Durée:</span> {dive?.dure}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-[var(--primary)]" />
                        <span className="text-slate-700">
                          <span className="font-semibold">Prérequis:</span> {dive?.preRequis}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href={dive?.lien} className="w-full">
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
