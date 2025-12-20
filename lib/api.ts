import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface Service {
  id: number
  title: string
  description: string
  icon: string | null
  order: number
  created_at: string
}

export interface Portfolio {
  id: number
  title: string
  description: string
  image_url: string | null
  category: string
  link: string | null
  order: number
  created_at: string
}

export interface Testimonial {
  id: number
  client_name: string
  client_designation: string | null
  content: string
  image_url: string | null
  rating: number
  order: number
  created_at: string
}

export interface SiteSettings {
  site_name: string
  hero_title: string
  hero_subtitle: string
  about_title: string
  about_description: string
  phone_1: string
  phone_2: string | null
  email: string | null
  whatsapp_number: string | null
  address: string | null
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export const fetchServices = async (): Promise<Service[]> => {
  const response = await api.get('/services/')
  // Handle paginated response (DRF returns { results: [...], count: ... })
  return Array.isArray(response.data) ? response.data : (response.data.results || [])
}

export const fetchPortfolio = async (): Promise<Portfolio[]> => {
  const response = await api.get('/portfolio/')
  // Handle paginated response
  return Array.isArray(response.data) ? response.data : (response.data.results || [])
}

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const response = await api.get('/testimonials/')
  // Handle paginated response
  return Array.isArray(response.data) ? response.data : (response.data.results || [])
}

export const fetchSiteSettings = async (): Promise<SiteSettings> => {
  const response = await api.get('/settings/')
  return response.data
}

export const submitContact = async (data: ContactFormData): Promise<void> => {
  await api.post('/contact/', data)
}

