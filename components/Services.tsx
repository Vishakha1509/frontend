'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchServices } from '@/lib/api'
import type { Service } from '@/lib/api'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const serviceIcons: { [key: string]: string } = {
  code: '💻',
  marketing: '📈',
  video: '🎬',
  design: '🎨',
  seo: '🔍',
  app: '📱',
}

// Map service titles to image paths
const getServiceImage = (title: string): string | null => {
  const titleLower = title.toLowerCase()
  if (titleLower.includes('web development') || titleLower.includes('web dev')) {
    return '/portfolio/web-dev.jpg'
  } else if (titleLower.includes('digital marketing') || titleLower.includes('digital')) {
    return '/portfolio/digital.jpg'
  } else if (titleLower.includes('video editing') || titleLower.includes('video')) {
    return '/portfolio/video-editing.jpg'
  }
  return null
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group"
    >
      <motion.div
        className="relative bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: 'translateZ(10px)' }}
        />

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6)',
            backgroundSize: '300% 300%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="absolute inset-[2px] bg-gradient-to-br from-white to-gray-50 rounded-2xl" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
          {/* Service Image */}
          {getServiceImage(service.title) ? (
            <motion.div
              className="mb-4 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={getServiceImage(service.title)!}
                alt={service.title}
                width={300}
                height={180}
                className="w-full h-32 object-cover"
              />
            </motion.div>
          ) : (
            /* Fallback Icon with floating animation */
            <motion.div
              className="text-4xl mb-4 inline-block"
              whileHover={{ 
                scale: 1.2,
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {serviceIcons[service.icon || 'code'] || '💼'}
              </motion.div>
            </motion.div>
          )}

          {/* Title */}
          <motion.h3
            className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3"
            whileHover={{ x: 5 }}
          >
            {service.title}
          </motion.h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {service.description}
          </p>

          {/* Learn more button */}
          <motion.button
            className="group/btn flex items-center gap-2 text-purple-600 font-semibold text-sm"
            whileHover={{ x: 5 }}
          >
            Learn More
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['200% 0%', '-200% 0%'],
          }}
          transition={{
            duration: 1.5,
            ease: 'linear',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    fetchServices()
      .then((data) => {
        setServices(Array.isArray(data) ? data : [])
      })
      .catch((error) => {
        console.error('Error fetching services:', error)
        setServices([])
      })
  }, [])

  return (
    <section id="services" className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What We Offer
          </motion.span>
          
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Our Services
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transforming ideas into digital reality with cutting-edge solutions
          </motion.p>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mt-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Services Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            View All Services
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}