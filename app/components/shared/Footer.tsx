"use client";

import { motion } from 'motion/react';
import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/public/logo/icon.svg";

interface NavLink {
  href: string;
  label: string;
}

interface FooterContent {
  tagline?: string;
  quickLinksTitle?: string;
  contactTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  mapTitle?: string;
  copyright?: string;
}

interface FooterProps {
  navLinks?: NavLink[];
  content?: FooterContent;
}

export function Footer({ navLinks: customNavLinks, content }: FooterProps) {
  const defaultNavLinks: NavLink[] = [
    { href: '/', label: 'Accueil' },
    { href: '/formations', label: 'Formations' },
    { href: '/decouverte', label: 'Découverte' },
    { href: '/prix', label: 'Prix' },
    { href: '/sites', label: 'Sites de Plongée' },
    { href: '/equipe', label: "L'Équipe" },
    { href: '/contact', label: 'Contact' },
  ];

  const navLinks = customNavLinks || defaultNavLinks;

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12 md:text-left text-center">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 flex flex-col md:items-start items-center"
          >
              <Image src={logo} alt="Logo" className="h-20 md:h-40 w-auto" />
            <p className="text-gray-300 text-sm leading-relaxed">
              {content?.tagline || "Explorez les merveilles sous-marines de la Guadeloupe"}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">{content?.quickLinksTitle || "Liens Rapides"}</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[var(--primary)] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-center md:text-left flex flex-col md:items-start items-center'
          >
            <h4 className="text-lg font-semibold mb-4">{content?.contactTitle || "Contact"}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--primary)] mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{content?.address || "Plage de Malendure, Bouillante"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                <a href={`tel:${content?.phone?.replace(/\s/g, '') || "+590690123456"}`} className="text-gray-300 hover:text-[var(--primary)] transition-colors text-sm">
                  {content?.phone || "+590 690 12 34 56"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                <a href={`mailto:${content?.email || "contact@atlantis-plongee.gp"}`} className="text-gray-300 hover:text-[var(--primary)] transition-colors text-sm">
                  {content?.email || "contact@atlantis-plongee.gp"}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Map Section - Full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h4 className="text-lg font-semibold mb-4 text-center">{content?.mapTitle || "Où nous trouver"}</h4>
          <div className="rounded-2xl overflow-hidden shadow-xl border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.8!2d-61.77!3d16.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDA3JzEyLjAiTiA2McKwNDYnMTIuMCJX!5e0!3m2!1sfr!2sgp!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Où nous trouver"
            />
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            {content?.copyright || "© 2025 Atlantis Plongée Guadeloupe. Tous droits réservés."}
          </p>
        </div>
      </div>
    </footer>
  );
}
