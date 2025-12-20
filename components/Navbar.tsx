'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('/')
  const { scrollYProgress } = useScroll()

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Update active section based on scroll position
      const sections = ['hero', 'about', 'services', 'portfolio', 'testimonials', 'careers', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(`#${current}`)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '#about', label: 'ABOUT' },
    { href: '#services', label: 'SERVICES' },
    { href: '#portfolio', label: 'PORTFOLIO' },
    { href: '#careers', label: 'CAREERS' },
    { href: '#contact', label: 'CONTACT' },
  ]

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'backdrop-blur-lg border-b border-white/20 shadow-lg'
          : ''
          }`}
        style={{
          backgroundColor: isScrolled ? backgroundColor : 'transparent'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/"
                className="relative group flex flex-col items-start"
                onClick={() => handleNavClick('/')}
              >
                <div className="flex flex-col -ml-4">
                  <motion.span
                    className={`text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent ${!isScrolled && 'text-white'
                      }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    GROWTHIFY
                  </motion.span>

                </div>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault()
                        handleNavClick(link.href)
                      }
                    }}
                    className="relative group px-4 py-2"
                  >
                    <motion.span
                      className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'
                        } ${activeSection === link.href ? 'text-purple-600' : ''}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {link.label}
                    </motion.span>

                    {/* Active indicator */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: activeSection === link.href ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('#contact')
                  }}
                  className="ml-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className={`md:hidden z-50 relative w-10 h-10 flex items-center justify-center ${isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-6 h-5 flex flex-col justify-between"
                animate={isMobileMenuOpen ? 'open' : 'closed'}
              >
                <motion.span
                  className={`w-full h-0.5 ${isScrolled ? 'bg-gray-700' : 'bg-white'} rounded-full`}
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 },
                  }}
                />
                <motion.span
                  className={`w-full h-0.5 ${isScrolled ? 'bg-gray-700' : 'bg-white'} rounded-full`}
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                />
                <motion.span
                  className={`w-full h-0.5 ${isScrolled ? 'bg-gray-700' : 'bg-white'} rounded-full`}
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 },
                  }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                className="fixed top-20 right-4 left-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden md:hidden"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-6 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          if (link.href.startsWith('#')) {
                            e.preventDefault()
                          }
                          handleNavClick(link.href)
                        }}
                        className={`block px-4 py-3 rounded-xl font-medium transition-all ${activeSection === link.href
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                          }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                    className="pt-4"
                  >
                    <Link
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick('#contact')
                      }}
                      className="block w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center rounded-xl font-semibold shadow-lg"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}