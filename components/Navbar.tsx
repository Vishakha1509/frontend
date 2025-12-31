"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.08],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.96)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        "hero",
        "about",
        "services",
        "portfolio",
        "careers",
        "contact",
      ];

      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });

      if (current) setActiveSection(`#${current}`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "#about", label: "ABOUT" },
    { href: "#services", label: "SERVICES" },
    { href: "#portfolio", label: "PORTFOLIO" },
    { href: "#careers", label: "CAREERS" },
    { href: "#contact", label: "CONTACT" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-lg border-b border-white/20 shadow-md"
            : ""
        }`}
        style={{
          backgroundColor: isScrolled ? backgroundColor : "transparent",
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* FULL WIDTH */}
        <div className="w-full">
          {/* EDGE-TO-EDGE CONTAINER (IMPORTANT) */}
          <div className="mx-auto w-full px-4 md:px-6">
            <div className="flex h-20 items-center justify-between">
              {/* LOGO */}
              <Link
                href="/"
                onClick={() => handleNavClick("/")}
                className={`text-2xl font-bold tracking-wide bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent ${
                  !isScrolled && "drop-shadow-sm"
                }`}
              >
                GROWTHIFY
              </Link>

              {/* DESKTOP MENU */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }
                    }}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      isScrolled ? "text-gray-700" : "text-white"
                    } ${
                      activeSection === link.href
                        ? "text-purple-600"
                        : "hover:text-purple-500"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* CTA BUTTON */}
                <Link
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                  className="ml-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg"
                >
                  Get Started
                </Link>
              </div>

              {/* MOBILE MENU TOGGLE */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden text-2xl ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <motion.div
                className="fixed top-20 inset-x-4 rounded-2xl bg-white p-6 shadow-xl md:hidden"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  href="#contact"
                  onClick={() => handleNavClick("#contact")}
                  className="mt-4 block rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 text-center font-semibold text-white"
                >
                  Get Started
                </Link>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
