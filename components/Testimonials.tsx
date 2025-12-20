'use client'

import { useEffect, useState } from 'react'
import { fetchTestimonials } from '@/lib/api'
import type { Testimonial } from '@/lib/api'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    fetchTestimonials()
      .then((data) => {
        if (Array.isArray(data)) {
          setTestimonials(data)
        } else if (data && typeof data === 'object') {
          const paginatedData = data as { results?: Testimonial[] }
          if (Array.isArray(paginatedData.results)) {
            setTestimonials(paginatedData.results)
          } else {
            setTestimonials([])
          }
        } else {
          setTestimonials([])
        }
      })
      .catch((error) => {
        console.error('Error fetching testimonials:', error)
        setTestimonials([])
      })
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length <= 1) return

    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      const next = prev + newDirection
      if (next < 0) return testimonials.length - 1
      if (next >= testimonials.length) return 0
      return next
    })
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  }

  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center text-white/50 text-lg py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No testimonials available
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-purple-500/20 backdrop-blur-sm text-purple-300 rounded-full text-sm font-semibold mb-4 border border-purple-500/30"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Testimonials
          </motion.span>

          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              What Clients Say
            </span>
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        {/* Carousel */}
        <div className="relative" style={{ perspective: '1500px' }}>
          <div className="relative h-[500px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  rotateY: { duration: 0.4 },
                }}
                className="absolute w-full max-w-4xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
                  {/* Quote Icon */}
                  <motion.div
                    className="text-6xl text-purple-400 mb-6 opacity-50"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  >
                    "
                  </motion.div>

                  {/* Content */}
                  <motion.p
                    className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {testimonials[currentIndex].content}
                  </motion.p>

                  {/* Rating */}
                  <motion.div
                    className="flex justify-center gap-2 mb-6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                  >
                    {[...Array(testimonials[currentIndex].rating || 5)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-yellow-400 text-2xl"
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                        whileHover={{ scale: 1.3, rotate: 360 }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Client Info */}
                  <motion.div
                    className="flex items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {testimonials[currentIndex].image_url ? (
                      <motion.div
                        className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white/20"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Image
                          src={testimonials[currentIndex].image_url}
                          alt={testimonials[currentIndex].client_name || 'Client'}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold"
                        whileHover={{ scale: 1.1 }}
                      >
                        {(testimonials[currentIndex].client_name || 'C').charAt(0).toUpperCase()}
                      </motion.div>
                    )}
                    <div className="text-left">
                      <h4 className="text-white font-bold text-lg">
                        {testimonials[currentIndex].client_name || 'Anonymous'}
                      </h4>
                      {testimonials[currentIndex].client_designation && (
                        <p className="text-white/60">
                          {testimonials[currentIndex].client_designation}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <motion.button
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              ←
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'w-2 bg-white/30'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              →
            </motion.button>
          </div>
        </div>

        {/* All Testimonials Grid (Optional) */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 cursor-pointer"
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                {testimonial.image_url ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image_url}
                      alt={testimonial.client_name || 'Client'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {(testimonial.client_name || 'C').charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h4 className="text-white font-semibold">
                    {testimonial.client_name || 'Anonymous'}
                  </h4>
                  {testimonial.client_designation && (
                    <p className="text-white/60 text-sm">
                      {testimonial.client_designation}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-white/70 text-sm line-clamp-3">
                {testimonial.content}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}