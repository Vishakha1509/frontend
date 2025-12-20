"use client";

import { useState, useEffect } from "react";
import { submitContact, fetchSiteSettings } from "@/lib/api";
import type { SiteSettings } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Send,
  Rocket,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

export default function Contact() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    fetchSiteSettings().then(setSettings).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await submitContact(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      label: "Email",
      value: settings?.email,
      type: "email",
      icon: Mail,
      color: "from-purple-400 to-purple-600",
    },
    {
      label: "Phone",
      value: settings?.phone_1,
      value2: settings?.phone_2,
      type: "tel",
      icon: Phone,
      color: "from-pink-400 to-pink-600",
    },
    {
      label: "Address",
      value: settings?.address,
      type: "address",
      icon: MapPin,
      color: "from-blue-400 to-blue-600",
    },
  ];

  const fieldIcons = {
    name: User,
    email: Mail,
    phone: Phone,
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
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
            Get In Touch
          </motion.span>

          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Let's Work Together
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Have a project in mind? We'd love to hear from you
          </motion.p>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mt-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                {["name", "email", "phone"].map((field, index) => {
                  const IconComponent =
                    fieldIcons[field as keyof typeof fieldIcons];
                  return (
                    <motion.div
                      key={field}
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.input
                        type={
                          field === "email"
                            ? "email"
                            : field === "phone"
                            ? "tel"
                            : "text"
                        }
                        id={field}
                        name={field}
                        required={true}
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field)}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all peer placeholder-transparent"
                        placeholder={field}
                        whileFocus={{ scale: 1.01 }}
                      />
                      <motion.label
                        htmlFor={field}
                        className={`absolute left-4 transition-all pointer-events-none ${
                          focusedField === field ||
                          formData[field as keyof typeof formData]
                            ? "-top-3 text-sm bg-white px-2 text-purple-600"
                            : "top-4 text-gray-500"
                        }`}
                        animate={{
                          y:
                            focusedField === field ||
                            formData[field as keyof typeof formData]
                              ? -28
                              : 0,
                          scale:
                            focusedField === field ||
                            formData[field as keyof typeof formData]
                              ? 0.85
                              : 1,
                        }}
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </motion.label>

                      {/* Field icon - Lucide */}
                      <motion.div
                        className="absolute right-4 top-4"
                        animate={{
                          scale: focusedField === field ? 1.2 : 1,
                        }}
                      >
                        <IconComponent
                          className={`w-5 h-5 transition-colors ${
                            focusedField === field
                              ? "text-purple-500"
                              : "text-gray-400"
                          }`}
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all resize-none peer placeholder-transparent"
                    placeholder="message"
                    whileFocus={{ scale: 1.01 }}
                  />
                  <motion.label
                    htmlFor="message"
                    className={`absolute left-4 transition-all pointer-events-none ${
                      focusedField === "message" || formData.message
                        ? "-top-3 text-sm bg-white px-2 text-purple-600"
                        : "top-4 text-gray-500"
                    }`}
                    animate={{
                      y:
                        focusedField === "message" || formData.message
                          ? -28
                          : 0,
                      scale:
                        focusedField === "message" || formData.message
                          ? 0.85
                          : 1,
                    }}
                  >
                    Message
                  </motion.label>
                </motion.div>

                {/* Centered Send Message Button */}
                <motion.div
                  className="flex justify-center pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.div>

                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      className="p-4 bg-green-50 border-2 border-green-200 rounded-xl text-green-800 flex items-center gap-3"
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    >
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span>Thank you! We'll get back to you soon.</span>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-800 flex items-center gap-3"
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    >
                      <XCircle className="w-6 h-6 text-red-600" />
                      <span>Something went wrong. Please try again.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          {/* Contact Information Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {settings &&
              contactInfo
                .filter((item) => item.value)
                .map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 group cursor-pointer hover:shadow-2xl transition-shadow"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                    >
                      <div className="flex items-center gap-5">
                        <motion.div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <IconComponent className="w-7 h-7 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1 text-lg">
                            {item.label}
                          </h4>
                          {item.type === "email" ? (
                            <a
                              href={`mailto:${item.value}`}
                              className="text-purple-600 hover:text-purple-700 font-medium text-base"
                            >
                              {item.value}
                            </a>
                          ) : item.type === "tel" ? (
                            <div className="flex flex-col gap-1">
                              <a
                                href={`tel:${item.value}`}
                                className="text-purple-600 hover:text-purple-700 font-medium text-base"
                              >
                                {item.value}
                              </a>
                              {item.value2 && (
                                <a
                                  href={`tel:${item.value2}`}
                                  className="text-purple-600 hover:text-purple-700 font-medium text-base"
                                >
                                  {item.value2}
                                </a>
                              )}
                            </div>
                          ) : (
                            <p className="text-gray-600 text-base">
                              {item.value}
                            </p>
                          )}
                        </div>

                        {/* Arrow indicator */}
                        <motion.div
                          className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}

            {/* Call to Action Card */}
            <motion.div
              className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-8 rounded-2xl shadow-xl text-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center">
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Rocket className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">
                  Ready to Get Started?
                </h3>
                <p className="text-white/80 mb-4">
                  Let's bring your ideas to life
                </p>
                <motion.div
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.3)",
                  }}
                >
                  <span>We respond within 24 hours</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
