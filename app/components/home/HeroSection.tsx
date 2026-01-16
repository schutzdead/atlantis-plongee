"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import { BubbleButton } from '../shared/BubbleButton';
import { ImageWithFallback } from '../shared/ImageWithFallback';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

interface HeroSectionProps {
  content: {
    slides: HeroSlide[];
    cta: string;
  };
  imageHero: any;
}

export function HeroSection({ content, imageHero }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const swipeThreshold = 50;

  const slides = content.slides;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const handleDragEnd = (event: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, isPlaying, isHovered]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 1.2,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
      },
    }),
  };

  const getTextVariants = (customDelay: number = 0) => ({
    enter: {
      y: 60,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.4 + customDelay * 0.15,
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  });
  

  return (
    <motion.section
      id="accueil"
      className="relative h-screen overflow-hidden bg-slate-950 touch-pan-y"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--primaryrgb)/0.4)] via-slate-950 to-blue-950/40" />

      {/* Image Slider */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {/* Main Image */}
            <div className="absolute inset-0" style={{ scale: 1.1 }}>
              <ImageWithFallback
                src={imageHero[currentSlide].url}
                alt="Photos de plongée en Guadeloupe"
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/20" />
            </div>

            {/* Animated Scan Lines Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 80, 115, 0.03) 2px, rgba(0, 80, 115, 0.03) 4px)',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Container */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6 sm:space-y-8"
              >
                {/* Subtitle */}
                <motion.div
                  variants={getTextVariants(0)}
                  className="overflow-hidden"
                >
                  <div className="inline-flex items-center gap-3 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full px-6 py-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    <span className="text-cyan-500/80 tracking-widest text-xs sm:text-sm font-semibold uppercase">
                      {slides[currentSlide].subtitle}
                    </span>
                  </div>
                </motion.div>

                {/* Main Title */}
                <motion.div
                  variants={getTextVariants(1)}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none">
                    {slides[currentSlide].title.split(' ').map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.5 + i * 0.1,
                          duration: 0.8,
                          ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
                        }}
                        className="inline-block mr-3 sm:mr-4"
                        style={{
                          textShadow: '0 0 40px rgba(6, 182, 212, 0.3)',
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h1>
                </motion.div>

                {/* Description */}
                <motion.div
                  variants={getTextVariants(2)}
                  className="overflow-hidden"
                >
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
                    {slides[currentSlide].description}
                  </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  variants={getTextVariants(3)}
                  className="overflow-hidden pt-4"
                >
                  <BubbleButton
                    size="lg"
                    className="group relative text-white rounded-full text-base sm:text-lg px-6 sm:px-6 py-3 sm:py-3"
                  >
                    <motion.span
                      className="relative z-10"
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {content.cta}
                    </motion.span>
                  </BubbleButton>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 sm:bottom-12 left-0 right-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {/* Progress Indicators */}
            <div className="flex items-center gap-3 sm:gap-4">
              {slides.map((slide, index) => (
                <motion.button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className="group relative"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Background Line */}
                  <div className={`h-1 rounded-full transition-all duration-500 ${
                    index === currentSlide
                      ? 'w-12 sm:w-20 bg-[var(--primary)]'
                      : 'w-6 sm:w-10 bg-white/20 hover:bg-white/40'
                  }`} />

                  {/* Active Progress Animation */}
                  {index === currentSlide && (
                    <motion.div
                      className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[rgb(var(--primaryrgb)/0.8)] to-[var(--primary)] rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: isPlaying && !isHovered ? '100%' : '0%' }}
                      transition={{ duration: 5, ease: 'linear' }}
                    />
                  )}

                  {/* Slide Number - hidden on mobile */}
                  <span className="hidden sm:block absolute -top-6 left-0 text-xs text-white/60 group-hover:text-[var(--primary)] transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Play/Pause Control */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-[rgb(var(--primaryrgb)/0.5)] transition-all duration-300 group"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-[var(--primary)] transition-colors" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-[var(--primary)] transition-colors ml-0.5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {[...Array(15)].map((_, i) => {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;

            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[rgb(var(--primaryrgb)/0.3)] rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                }}
              />
            );
          })}
        </div>
      )}
    </motion.section>
  );
}
