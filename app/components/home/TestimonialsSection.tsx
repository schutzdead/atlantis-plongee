"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { WaveUnderline } from '../shared/WaveUnderline';
import { useGoogleReviews, GoogleReview } from '@/hooks/useGoogleReviews';

interface TestimonialItem {
  name: string;
  role: string;
  text: string;
}

interface TestimonialsSectionProps {
  content: {
    title: string;
    subtitle: string;
    items: TestimonialItem[];
  };
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const { reviews: googleReviews, rating: globalRating, totalReviews, isLoading, error } = useGoogleReviews();

  // Utiliser les avis Google si disponibles, sinon fallback sur les avis Contentful
  const useGoogleData = googleReviews.length > 0 && !error;

  const testimonials = useGoogleData
    ? googleReviews.map((review: GoogleReview) => ({
        name: review.name,
        role: review.relativeTime,
        text: review.text,
        rating: review.rating,
        photoUrl: review.photoUrl,
      }))
    : content.items.map((item) => ({
        ...item,
        rating: 5,
      }));

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      items.push({ ...testimonials[index], originalIndex: index });
    }
    return items;
  };

  // Skeleton loader pendant le chargement
  if (isLoading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 sm:mb-16">
            <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-[340px] animate-pulse">
                <div className="flex gap-1 mb-4 justify-center">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-5 h-5 bg-gray-200 rounded" />
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-4/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
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

          {/* Afficher la note globale Google si disponible */}
          {useGoogleData && globalRating > 0 && (
            <div className="flex items-center justify-center gap-2 mt-4 mb-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(globalRating)
                        ? 'fill-[#FFD700] text-[#FFD700]'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-slate-900">{globalRating.toFixed(1)}</span>
              <span className="text-slate-500">({totalReviews} avis Google)</span>
            </div>
          )}

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mt-4">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[rgb(var(--primaryrgb)/0.9)] hover:bg-[var(--primary)] text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
            aria-label="Avis précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[rgb(var(--primaryrgb)/0.9)] hover:bg-[var(--primary)] text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
            aria-label="Avis suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden px-16">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {getVisibleTestimonials().map((testimonial, idx) => (
                  <div
                    key={idx}
                    className={`bg-white rounded-3xl p-6 my-4 shadow-sm border border-gray-100 h-[340px] max-h-[340px] min-h-[340px] flex flex-col justify-between ${
                      idx === 2 ? 'hidden lg:flex' : idx === 1 ? 'hidden md:flex' : ''
                    }`}
                  >
                    {/* Rating */}
                    <div>
                      <div className="flex gap-1 mb-4 justify-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-slate-700 text-base sm:text-lg mb-6 leading-relaxed text-center flex-1 overflow-auto">
                        &quot;{testimonial.text}&quot;
                      </p>
                    </div>
                    {/* Author */}
                    <div className="flex items-end gap-3">
                        <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                      <div>
                        <div className="font-bold text-slate-900">{testimonial.name}</div>
                        <div className="text-sm text-slate-500">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[var(--primary)] w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Voir l'avis ${index + 1}`}
              />
            ))}
          </div>

          {/* Lien vers Google Maps */}
          {useGoogleData && (
            <div className="text-center mt-8">
              <a
                href="https://maps.app.goo.gl/pQwNs2tWqALWus5s9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--primary)] hover:underline font-medium"
              >
                Voir tous les avis sur Google
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
