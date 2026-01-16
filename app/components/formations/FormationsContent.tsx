"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Clock, CheckCircle, Award, AlertTriangle, Download } from 'lucide-react';
import { ImageWithFallback } from '../shared/ImageWithFallback';
import { BubbleButton } from '../shared/BubbleButton';

type FormationFilter = 'all' | 'ecoleFrancaise' | 'padi';

interface Formation {
  titre: string;
  prix: string;
  courteDescription: string;
  dure: string;
  preRequis: string;
  lien: string;
  niveau: string;
  type: boolean; // true = PADI, false = École Française
  lienPadi: string | null;
  photo: {
    url: string;
  };
}

interface FormationsContentProps {
  content: any;
  articles: Formation[];
  imageHero?: any;
}

export function FormationsContent({ content: initialContent, articles, imageHero }: FormationsContentProps) {
  const content = initialContent;
  const [activeFilter, setActiveFilter] = useState<FormationFilter>('all');

  // Map articles to include organization type based on 'type' field
  const allFormations = (articles || []).map((f: Formation) => ({
    ...f,
    organization: f.type ? 'padi' : 'ecoleFrancaise'
  }));

  const filteredFormations = allFormations.filter((f) =>
    activeFilter === 'all' || f.organization === activeFilter
  );

  const filters = [
    { id: 'all' as FormationFilter, label: 'Toutes' },
    { id: 'ecoleFrancaise' as FormationFilter, label: 'École Française' },
    { id: 'padi' as FormationFilter, label: 'PADI' },
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative pt-14 pb-24 sm:pb-32 sm:pt-20 bg-[var(--primary)] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={imageHero?.[0]?.url || content?.hero?.image?.src}
            alt={content?.hero?.image?.alt || "Formation de plongée"}
            className="w-full h-full object-cover object-[50%_60%]"
          />
          <div className="absolute inset-0 bg-[rgb(var(--primaryrgb)/0.6)]" />
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
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6">
              {content?.hero?.title || "Formations de Plongée"}
            </h1>
            <div className="flex justify-center mt-3 mb-6">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 18c1 .8 2 1.5 4 1.5 4 0 4-3 8-3 4.2 0 3.8 3 8 3 4 0 4-3 8-3 2 0 3 .7 4 1.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/95 mb-6">
              {content?.hero?.subtitle || "Du débutant au professionnel"}
            </p>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              {content?.hero?.description || "Formations certifiées avec nos moniteurs diplômés"}
            </p>
          </motion.div>
        </div>

        {/* Wave Shape at Bottom */}
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
                onClick={() => setActiveFilter(filter.id)}
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

      {/* Formations Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Room Info */}
          {content?.info?.room && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto mb-12 text-center"
            >
              <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-[rgb(var(--primaryrgb)/0.2)]">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {content.info.room.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {content.info.room.description}
                </p>
              </div>
            </motion.div>
          )}

          {/* Additional Info boxes */}
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
            {content?.info?.ffessm && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6"
              >
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <h4 className="text-xl font-bold text-blue-900">
                    {content.info.ffessm.title}
                  </h4>
                </div>
                <p className="text-blue-800">
                  {content.info.ffessm.description}
                </p>
              </motion.div>
            )}

            {content?.info?.padi && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6"
              >
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <h4 className="text-xl font-bold text-blue-900">
                    {content.info.padi.title}
                  </h4>
                </div>
                <p className="text-blue-800">
                  {content.info.padi.description}
                </p>
              </motion.div>
            )}
          </div>

          {/* Formations Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredFormations.map((formation, index: number) => {
              return (
                <motion.div
                  key={`${formation.titre}-${index}`}
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
                        src={formation.photo?.url || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=800&fit=crop"}
                        alt={formation.titre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40" />

                      {/* Level Badge */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 font-semibold text-sm text-slate-900">
                        {formation.niveau}
                      </div>

                      {/* Organization Badge */}
                      <div className="absolute top-4 left-4 bg-[rgb(var(--primaryrgb)/0.9)] backdrop-blur-sm rounded-full px-4 py-2 font-semibold text-sm text-white">
                        {formation.organization === 'ecoleFrancaise' ? 'École FR' : 'PADI'}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        {formation.titre}
                      </h3>

                      {/* Price */}
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-[var(--primary)]">{formation.prix}</span>
                      </div>

                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {formation.courteDescription}
                      </p>

                      {/* Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm">
                          <Clock className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                          <span className="text-slate-700">
                            <span className="font-semibold">Durée:</span> {formation.dure}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                          <span className="text-slate-700">
                            <span className="font-semibold">Prérequis:</span> {formation.preRequis}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Award className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                          <span className="text-slate-700">
                            <span className="font-semibold">Niveau:</span> {formation.niveau}
                          </span>
                        </div>
                      </div>

                      {/* Spacer to push button to bottom */}
                      <div className="flex-1" />

                      {/* CTA Button */}
                      {formation.lienPadi ? (
                        <div className="grid grid-cols-2 gap-3 mt-auto">
                          <BubbleButton
                            className="text-sm"
                            onClick={() => window.open(formation.lien, '_blank')}
                          >
                            Réserver
                          </BubbleButton>
                          <BubbleButton
                            variant="outline"
                            className="flex items-center justify-center gap-2 text-sm"
                            onClick={() => window.open(formation.lienPadi!, '_blank')}
                          >
                            <Download className="w-4 h-4" />
                            Kit PADI
                          </BubbleButton>
                        </div>
                      ) : (
                        <BubbleButton
                          className="w-full mt-auto"
                          onClick={() => window.open(formation.lien, '_blank')}
                        >
                          Réserver cette formation
                        </BubbleButton>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
