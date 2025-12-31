"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowUp,
  PhoneCall,
} from "lucide-react";

export default function Footer() {
  const [text, setText] = useState("");
  const fullText = "Turning Vision Into Destiny";
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        setIndex(index + 1);
      } else if (isDeleting && index > 0) {
        setText(fullText.slice(0, index - 1));
        setIndex(index - 1);
      } else {
        setTimeout(() => setIsDeleting(!isDeleting), 800);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Portfolio", href: "#portfolio" },
        { label: "Career", href: "#careers" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Web Development", href: "#services" },
        { label: "Digital Marketing", href: "#services" },
        { label: "SEO Optimization", href: "#services" },
        { label: "UI/UX Design", href: "#services" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "+91 8989282885", href: "tel:+918989282885" },
        { label: "+91 8815152801", href: "tel:+918815152801" },
        {
          label: "support@growthifyservices.in",
          href: "mailto:support@growthifyservices.in",
        },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "from-blue-600 to-blue-400" },
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/growthifyservices/?igsh=YnZqcXk3cGpnZWMy", 
      color: "from-pink-600 to-purple-600" 
    },
    { icon: Twitter, href: "#", color: "from-blue-400 to-cyan-400" },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/company/growthifyservices/posts/?feedView=all", 
      color: "from-blue-700 to-blue-500" 
    },
  ];

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />

      {/* FULL WIDTH CONTAINER (IMPORTANT) */}
      <div className="relative z-10 w-full px-4 md:px-6 py-16">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                GROWTHIFY
              </span>
              <div className="text-[10px] mt-1 tracking-[0.2em] uppercase min-h-[1.4em] bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {text}
              </div>
            </div>

            <p className="text-gray-400 mb-6 max-w-sm">
              Leading Website Development and Digital Marketing Company in
              Indore
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3">
              {socialLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}
                    whileHover={{ scale: 1.15, rotate: 360 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* LINKS */}
          {footerLinks.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.href, e)}
                      className="text-gray-400 hover:text-white transition flex items-center gap-2"
                    >
                      {section.title === "Contact" &&
                        link.href.startsWith("tel:") && (
                          <PhoneCall className="w-4 h-4 text-purple-400" />
                        )}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © {currentYear} Growthify Services. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <a className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a className="text-gray-400 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* SCROLL TO TOP */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg z-50"
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
