"use client";

import { motion } from 'motion/react';
import { Users, Award, Heart, Anchor } from 'lucide-react';
import { ImageWithFallback } from '../shared/ImageWithFallback';

interface EquipeContentProps {
  content: any;
  articles: any;
  imageHero?: any;
}

interface TeamMember {
  nom: string;
  specialite: string;
  courteDescription: string;
  photo?: {
    url: string;
  } | null;
}

export function EquipeContent({ content, articles, imageHero }: EquipeContentProps) {
  const teamMembers: TeamMember[] = articles || [];
  
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative pt-14 pb-24 sm:pb-32 sm:pt-20 bg-[var(--primary)] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={imageHero?.[0]?.url}
            alt="Équipe de plongée"
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
                <Users className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6">
              {content?.hero?.title || "Notre Équipe"}
            </h1>
            <div className="flex justify-center mt-3 mb-6">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 18c1 .8 2 1.5 4 1.5 4 0 4-3 8-3 4.2 0 3.8 3 8 3 4 0 4-3 8-3 2 0 3 .7 4 1.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/95 mb-6">
              {content?.hero?.subtitle || "Des professionnels passionnés"}
            </p>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              {content?.hero?.description || "Une équipe dévouée à votre sécurité et votre plaisir"}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 54" fill="white">
            <path d="M0,40 C240,10 480,10 720,30 C960,50 1200,50 1440,30 L1440,54 L0,54 Z" />
          </svg>
        </div>
      </section>

      {/* Team Members Section */}
      {teamMembers.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                {content?.team?.title || "L'Équipe"}
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
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={`${member.nom}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    {/* Photo ou placeholder */}
                    {member.photo?.url ? (
                      <div className="relative h-64 overflow-hidden">
                        <ImageWithFallback
                          src={member.photo.url}
                          alt={`Portrait de ${member.nom}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-2xl font-bold text-white">
                            {member.nom}
                          </h3>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-[var(--primary)] to-[rgb(var(--primaryrgb)/0.8)] p-6 text-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                          {member.nom}
                        </h3>
                      </div>
                    )}

                    {/* Contenu */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Nom et spécialité si pas de photo */}
                      {member.specialite && member.specialite !== '-' && (
                        <div className="flex items-center gap-2 mb-3">
                          <Award className="w-5 h-5 text-[var(--primary)]" />
                          <span className="text-sm font-semibold text-[var(--primary)]">
                            {member.specialite}
                          </span>
                        </div>
                      )}

                      <p className="text-slate-600 leading-relaxed flex-1">
                        {member.courteDescription}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {content?.values?.title || "Nos Valeurs"}
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {content?.values?.map((value: any, index: number) => {
              const icons = [
                <Heart key="heart" className="w-10 h-10" />,
                <Award key="award" className="w-10 h-10" />,
                <Anchor key="anchor" className="w-10 h-10" />
              ];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-[rgb(var(--primaryrgb)/0.1)] rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--primary)]">
                    {icons[index % icons.length]}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
