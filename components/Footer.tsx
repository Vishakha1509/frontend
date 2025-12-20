"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
    {
      icon: Facebook,
      label: "Facebook",
      href: "#",
      color: "from-blue-600 to-blue-400",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "#",
      color: "from-pink-600 to-purple-600",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "#",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "#",
      color: "from-blue-700 to-blue-500",
    },
  ];

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative mb-4 inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col">
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  GROWTHIFY
                </span>
                <span className="text-[10px] font-semibold tracking-[0.2em] bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-1 uppercase min-h-[1.5em]">
                  {text}
                </span>
              </div>
            </motion.div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Leading Website Development and Digital marketing Company in
              Indore
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center text-white shadow-lg`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.6 }}
                    title={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (sectionIndex + 1) * 0.1 }}
            >
              <h4 className="font-bold mb-6 text-lg">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.href, e)}
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <motion.span
                        className="w-0 h-px bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-4 transition-all"
                        initial={{ width: 0 }}
                        whileHover={{ width: 16 }}
                      />
                      {section.title === "Contact" &&
                        link.href.startsWith("tel:") && (
                          <PhoneCall className="w-4 h-4 text-purple-400" />
                        )}
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        {/* <motion.div
          className="border-t border-white/10 pt-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Stay Updated
              </span>
            </h4>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for the latest updates and insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div> */}

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-gray-400 text-sm">
            Copyright © {currentYear} Growthify Services. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm  text-center md:text-left">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
