'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface JobPosition {
    id: number
    title: string
    department: string
    location: string
    location_display: string
    location_details?: string
    job_type: string
    job_type_display: string
    experience_required: string
    required_skills: string
    required_skills_list: string[]
    preferred_skills?: string
    preferred_skills_list: string[]
    description: string
    responsibilities?: string
    qualifications?: string
    salary_range?: string
    benefits?: string
    application_deadline?: string
    application_email: string
    external_application_url?: string
    is_featured: boolean
    is_deadline_passed: boolean
    created_at: string
}

export default function Career() {
    const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null)
    const [jobPositions, setJobPositions] = useState<JobPosition[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true)
                const response = await fetch('http://localhost:8000/api/jobs/')
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs')
                }
                const data = await response.json()
                setJobPositions(data.results || data)
                setError(null)
            } catch (err) {
                setError('Unable to load job openings. Please try again later.')
                console.error('Error fetching jobs:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [])

    return (
        <section id="careers" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />
                <motion.div
                    className="absolute bottom-20 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -30, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        Join Our Team
                    </motion.span>

                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                            Build Your Career With Us
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Join a team of passionate professionals and work on exciting projects
                    </motion.p>

                    <motion.div
                        className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mt-6"
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </motion.div>

                {/* Why Join Us Section */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-bold text-center mb-8">Why Join Growthify?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: '🚀', title: 'Growth Opportunities', desc: 'Continuous learning and career advancement' },
                            { icon: '💡', title: 'Innovation', desc: 'Work on cutting-edge technologies' },
                            { icon: '🤝', title: 'Great Culture', desc: 'Collaborative and supportive environment' },
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="text-4xl mb-3">{benefit.icon}</div>
                                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 text-sm">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Job Openings */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-bold text-center mb-8">Current Openings</h2>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                            <p className="mt-4 text-gray-600">Loading job openings...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-red-600 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
                            >
                                Retry
                            </button>
                        </div>
                    ) : jobPositions.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No job openings available at the moment.</p>
                            <p className="text-gray-500 mt-2">Check back soon for new opportunities!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {jobPositions.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-500"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setSelectedJob(job)}
                                    whileHover={{ scale: 1.01 }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold mb-2 text-gray-900">{job.title}</h3>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                                                    {job.department}
                                                </span>
                                                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                                                    {job.location_display}
                                                </span>
                                                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                                                    {job.job_type_display}
                                                </span>
                                                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                                                    {job.experience_required}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3">{job.description}</p>
                                            {job.required_skills_list && job.required_skills_list.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {job.required_skills_list.slice(0, 5).map((skill, idx) => (
                                                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                    {job.required_skills_list.length > 5 && (
                                                        <span className="px-2 py-1 text-gray-500 text-xs">
                                                            +{job.required_skills_list.length - 5} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <motion.button
                                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow text-sm"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Apply Now →
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    className="mt-16 text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-10 text-white"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">Don't See Your Role?</h2>
                    <p className="text-lg mb-6 opacity-90">
                        We're always looking for talented individuals. Send us your resume!
                    </p>
                    <motion.a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=hr@growthifyservices.in&su=Job Application"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-xl transition-shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Send Your Resume 
                    </motion.a>
                </motion.div>
            </div>

            {/* Job Application Modal */}
            {selectedJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                                    <p className="text-purple-600 font-medium">{selectedJob.department}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                        📍 {selectedJob.location_display}
                                    </span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                        💼 {selectedJob.job_type_display}
                                    </span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                        🎓 {selectedJob.experience_required}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                                    <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                                </div>

                                {selectedJob.responsibilities && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
                                        <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                                            {selectedJob.responsibilities}
                                        </div>
                                    </div>
                                )}

                                {selectedJob.required_skills_list && selectedJob.required_skills_list.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedJob.required_skills_list.map((skill, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="border-t pt-6 mt-8">
                                    <h3 className="text-xl font-bold mb-4">Apply Now</h3>
                                    <p className="text-gray-600 mb-6">
                                        Interested in this role? Send us your application directly via email.
                                        Please attach your resume and portfolio (if applicable).
                                    </p>

                                    <a
                                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=hr@growthifyservices.in&su=Application for ${selectedJob.title} - ${selectedJob.id}&body=Hi Hiring Team,%0D%0A%0D%0AI am interested in the ${selectedJob.title} position at Growthify.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0AKey Skills:%0D%0A-%20%0D%0A-%20%0D%0A%0D%0APortfolio/LinkedIn:%20%0D%0A%0D%0AThank you,%0D%0A[Your Name]`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all hover:scale-[1.02]"
                                    >
                                        Send Application
                                    </a>
                                    <p className="text-center text-sm text-gray-500 mt-3">
                                        Or email us at <span className="text-purple-600 font-medium">hr@growthifyservices.in</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    )
}

