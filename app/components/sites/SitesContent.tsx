"use client";

import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Anchor, Gauge, Fish } from 'lucide-react';
import { ImageWithFallback } from '../shared/ImageWithFallback';
import { BubbleButton } from '../shared/BubbleButton';

type SiteFilter = 'all' | 'Pointe à Lézard' | 'Épaves';

interface Site {
  titre: string;
  prodonfeur: string;
  niveau: string;
  courteDescription: string;
  pointsForts: string[];
  horsParc: boolean;
  catgorie: string;
  photo: {
    url: string;
  };
}

interface SitesContentProps {
  content: any;
  articles: Site[];
  imageHero?: any;
}

export function SitesContent({ content, articles, imageHero }: SitesContentProps) {
  const [activeFilter, setActiveFilter] = useState<SiteFilter>('all');

  const filteredSites = activeFilter === 'all'
    ? articles || []
    : (articles || []).filter((site) => site.catgorie === activeFilter);

  const filters = [
    { id: 'all' as SiteFilter, label: content?.filters?.all || 'Tous les Sites' },
    { id: 'Pointe à Lézard' as SiteFilter, label: content?.filters?.pointeLezard || 'Pointe à Lézard' },
    { id: 'Épaves' as SiteFilter, label: content?.filters?.epaves || 'Épaves' },
  ];
  
  const gridRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative pt-14 pb-24 sm:pb-32 sm:pt-20 bg-[var(--primary)] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={imageHero?.[0]?.url || content?.hero?.image?.src}
            alt={content?.hero?.image?.alt || "Sites de plongée"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgb(var(--primaryrgb)/0.5)]" />
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
                <Anchor className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6">
              {content?.hero?.title || "Sites de Plongée"}
            </h1>
            <div className="flex justify-center mt-3 mb-6">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 18c1 .8 2 1.5 4 1.5 4 0 4-3 8-3 4.2 0 3.8 3 8 3 4 0 4-3 8-3 2 0 3 .7 4 1.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-white mb-6">
              {content?.hero?.subtitle || "Découvrez les trésors sous-marins"}
            </p>
            <p className="text-base sm:text-lg text-white max-w-2xl mx-auto">
              {content?.hero?.description || "Dans la Réserve Cousteau"}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 54" fill="white">
            <path d="M0,40 C240,10 480,10 720,30 C960,50 1200,50 1440,30 L1440,54 L0,54 Z" />
          </svg>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-4 sm:py-8 bg-white sticky top-20 z-40 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex sm:justify-center gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id)
                  gridRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeFilter === filter.id
                    ? 'bg-[var(--primary)] text-white shadow-lg'
                    : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Sites Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 scroll-mt-40 md:scroll-mt-60" ref={gridRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
{filteredSites.length > 0 ? (
              filteredSites.map((site, index: number) => (
                <motion.div
                  key={`${site.titre}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 flex flex-col">
                    {/* Image */}
                    <div className="relative h-56 sm:h-64 overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={site.photo?.url || "https://images.unsplash.com/photo-1682687221363-72518513620e?w=800&h=600&fit=crop"}
                        alt={site.titre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Badges Container */}
                      <div className="absolute top-4 left-4 right-4 flex flex-col items-end gap-2">
                        {/* Level Badge */}
                        <div className="bg-[rgb(var(--primaryrgb)/0.95)] backdrop-blur-sm rounded-full px-4 py-2 font-semibold text-sm text-white flex items-center gap-2">
                          <Gauge className="w-4 h-4" />
                          {site.niveau}
                        </div>

                        {/* Extra Badge (Hors parc) */}
                        {site.horsParc && (
                          <div className="bg-amber-500/95 backdrop-blur-sm rounded-full px-4 py-2 font-semibold text-sm text-white">
                            {content?.badges?.horsParc || "Hors parc"}
                          </div>
                        )}
                      </div>

                      {/* Name on image */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                          {site.titre}
                        </h3>
                        <div className="flex items-center gap-2 text-white/90 text-sm">
                          <span>{site.prodonfeur}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {site.courteDescription}
                      </p>

                      {/* Highlights */}
                      {site.pointsForts && site.pointsForts.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Fish className="w-5 h-5 text-[var(--primary)]" />
                            {content?.labels?.highlights || "Points forts"}
                          </h4>
                          <ul className="space-y-2">
                            {site.pointsForts.map((highlight: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-slate-600">
                                <span className="text-[var(--primary)] mt-1">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Spacer to push button to bottom */}
                      <div className="flex-1" />

                      {/* CTA Button */}
                      <a href="https://public.zuurit.com/fr/atlantisplongeeguadeloupe/booking" target="_blank" rel="noopener noreferrer" className="w-full mt-auto block">
                        <BubbleButton className="w-full">
                          {content?.buttons?.diveHere || "Plonger ici"}
                        </BubbleButton>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-600 text-lg">{content?.emptyState || "Aucun site de plongée trouvé pour cette catégorie."}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
