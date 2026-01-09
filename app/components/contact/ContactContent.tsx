"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react';
import { BubbleButton } from '../shared/BubbleButton';

interface ContactContentProps {
  content: any;
}

export function ContactContent({ content }: ContactContentProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto border-2 border-white/30">
                <Mail className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6">
              {content?.hero?.title || "Contactez-Nous"}
            </h1>
            <div className="flex justify-center mt-3 mb-6">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 18c1 .8 2 1.5 4 1.5 4 0 4-3 8-3 4.2 0 3.8 3 8 3 4 0 4-3 8-3 2 0 3 .7 4 1.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/95 mb-6">
              {content?.hero?.subtitle || "Une question ? Besoin d'informations ?"}
            </p>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              {content?.hero?.description || "Notre équipe vous répond dans les plus brefs délais"}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 54" fill="white">
            <path d="M0,40 C240,10 480,10 720,30 C960,50 1200,50 1440,30 L1440,54 L0,54 Z" />
          </svg>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-200">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {content?.form?.title || "Envoyez-nous un message"}
                </h2>
                <p className="text-slate-600 mb-8">
                  {content?.form?.subtitle || "Remplissez le formulaire ci-dessous"}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                      {content?.form?.fields?.name?.label || "Nom complet"}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={content?.form?.fields?.name?.placeholder || "Jean Dupont"}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--primary)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                      {content?.form?.fields?.email?.label || "Email"}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={content?.form?.fields?.email?.placeholder || "jean.dupont@example.com"}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--primary)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                      {content?.form?.fields?.phone?.label || "Téléphone"}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={content?.form?.fields?.phone?.placeholder || "+590 690 12 34 56"}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--primary)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">
                      {content?.form?.fields?.subject?.label || "Sujet"}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={content?.form?.fields?.subject?.placeholder || "Réservation de plongée"}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--primary)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                      {content?.form?.fields?.message?.label || "Message"}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={content?.form?.fields?.message?.placeholder || "Décrivez votre demande..."}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--primary)] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <BubbleButton
                      type="submit"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      {content?.form?.submit || "Envoyer le message"}
                    </BubbleButton>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {content?.info?.address?.label || "Adresse"}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {content?.info?.address?.value || "Plage de Malendure, 97125 Bouillante, Guadeloupe"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {content?.info?.hours?.label || "Horaires"}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {content?.info?.hours?.value || "Tous les jours de 8h à 18h"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {content?.info?.phone?.label || "Téléphone"}
                    </h3>
                    <a
                      href={`tel:${content?.info?.phone?.value || "+590690123456"}`}
                      className="text-[var(--primary)] hover:text-[rgb(var(--primaryrgb)/0.8)] font-semibold"
                    >
                      {content?.info?.phone?.value || "+590 690 12 34 56"}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 pt-4 border-t border-gray-200">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {content?.info?.email?.label || "Email"}
                    </h3>
                    <a
                      href={`mailto:${content?.info?.email?.value || "contact@atlantis-plongee.gp"}`}
                      className="text-[var(--primary)] hover:text-[rgb(var(--primaryrgb)/0.8)] font-semibold break-all"
                    >
                      {content?.info?.email?.value || "contact@atlantis-plongee.gp"}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
