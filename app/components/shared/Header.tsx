"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { BubbleButton } from './BubbleButton';
import Image from 'next/image';
import logo from "@/public/logo/icon.svg";
import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

interface HeaderProps {
  navLinks?: NavLink[];
  ctaLabel?: string;
}

export function Header({ navLinks: customNavLinks, ctaLabel }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      // Attendre que la vague remplisse avant d'afficher le contenu
      const timer = setTimeout(() => setShowContent(true), 600);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [mobileMenuOpen]);

  const defaultNavLinks: NavLink[] = [
    { href: '/decouverte', label: 'Découverte' },
    { href: '/exploration', label: 'Exploration' },
    { href: '/formations', label: 'Formations' },
    { href: '/prix', label: 'Prix' },
    { href: '/sites', label: 'Sites de Plongée' },
    { href: '/equipe', label: "L'Équipe" },
    { href: '/contact', label: 'Contact' },
  ];

  const navLinks = customNavLinks || defaultNavLinks;

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-300 ${
          mobileMenuOpen ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-lg'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between relative z-[60]">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center gap-3">
                <Image src={logo} alt="Logo" className="h-16 md:h-20 w-auto" />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-900 hover:text-[var(--primary)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="https://public.zuurit.com/fr/atlantisplongeeguadeloupe/booking" target="_blank">
                <BubbleButton>
                  {ctaLabel || "Réserver"}
                </BubbleButton>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 relative z-[60] text-slate-900`}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu avec effet de vague */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Vague qui remplit l'écran */}
            <motion.div
              className="fixed inset-0 z-[100] bg-[var(--primary)] lg:hidden"
              initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
              animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              {/* Effet de vague SVG en overlay */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-40 overflow-hidden"
                initial={{ y: -128 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <svg
                  className="absolute top-0 w-full h-full"
                  viewBox="0 0 1440 128"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <motion.path
                    d="M0,64 C240,100 480,100 720,70 C960,40 1200,40 1440,70 L1440,0 L0,0 Z"
                    fill="white"
                    initial={{ d: "M0,0 C240,0 480,0 720,0 C960,0 1200,0 1440,0 L1440,0 L0,0 Z" }}
                    animate={{ d: "M0,64 C240,100 480,100 720,70 C960,40 1200,40 1440,70 L1440,0 L0,0 Z" }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  />
                </svg>
              </motion.div>

              {/* Contenu du menu */}
              <AnimatePresence>
                {showContent && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center px-8 py-24 h-full overflow-y-auto"
                  >
                    <motion.div
                      className="space-y-4 w-full max-w-md pt-20"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.1
                          }
                        }
                      }}
                    >
                      {navLinks.map((link, index) => (
                        <motion.div
                          key={link.href}
                          variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: { opacity: 1, x: 0 }
                          }}
                        >
                          <Link
                            href={link.href}
                            onClick={handleNavClick}
                            className="block w-full text-left py-4 px-6 rounded-2xl transition-all text-white/90 hover:bg-white/10 text-xl"
                          >
                            <span className="flex items-center gap-3">
                              <span className="text-white/50 font-light text-sm">
                                0{index + 1}
                              </span>
                              {link.label}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                      <Link href="https://public.zuurit.com/fr/atlantisplongeeguadeloupe/booking" target="_blank">
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                          }}
                          className="pt-6"
                        >
                          <BubbleButton
                            variant="secondary"
                            className="w-full bg-white text-[var(--primary)] hover:bg-white/90 text-lg py-4"
                          >
                            {ctaLabel || "Réserver"}
                          </BubbleButton>
                        </motion.div>
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
