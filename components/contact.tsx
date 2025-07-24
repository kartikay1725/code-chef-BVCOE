"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, MapPin, Send, Github, Instagram, Linkedin, CheckCircle, Sparkles } from "lucide-react"
import { useState } from "react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after success animation
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setIsSubmitted(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-b from-[#121212] to-gray-900 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block p-2 md:p-3 bg-primary/10 rounded-full mb-4 md:mb-6"
          >
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary animate-bounce-slow" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold font-poppins text-white mb-4 md:mb-6">Get In Touch</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Ready to join our coding community? Let's connect and build something amazing together!
          </p>
        </motion.div>

        <div className="grid gap-12 md:gap-16 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold font-poppins text-white mb-8 md:mb-10"
            >
              Contact Information
            </motion.h3>

            <div className="space-y-6 md:space-y-8">
              {[
                {
                  icon: <Mail className="w-5 h-5 md:w-6 md:h-6" />,
                  title: "Email",
                  info: "codechef@university.edu",
                  color: "from-blue-500 to-cyan-500",
                  delay: 0.8,
                },
                {
                  icon: <Phone className="w-5 h-5 md:w-6 md:h-6" />,
                  title: "Phone",
                  info: "+1 (555) 987-6543",
                  color: "from-green-500 to-teal-500",
                  delay: 1.0,
                },
                {
                  icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />,
                  title: "Location",
                  info: "Computer Science Building, Room 301\nUniversity Campus",
                  color: "from-purple-500 to-pink-500",
                  delay: 1.2,
                },
              ].map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: contact.delay }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-start gap-4 md:gap-6 group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r ${contact.color} rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0`}
                  >
                    {contact.icon}
                  </motion.div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold font-poppins text-white text-base md:text-lg mb-1 md:mb-2 group-hover:text-primary transition-colors">
                      {contact.title}
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors whitespace-pre-line text-sm md:text-base break-words">
                      {contact.info}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              viewport={{ once: true }}
              className="mt-10 md:mt-12"
            >
              <h4 className="text-lg md:text-xl font-bold font-poppins text-white mb-4 md:mb-6">Follow Us</h4>
              <div className="flex gap-3 md:gap-4">
                {[
                  { icon: Github, href: "#", color: "hover:text-gray-300", bg: "hover:bg-gray-700" },
                  { icon: Linkedin, href: "#", color: "hover:text-blue-400", bg: "hover:bg-blue-900/20" },
                  { icon: Instagram, href: "#", color: "hover:text-pink-400", bg: "hover:bg-pink-900/20" },
                ].map(({ icon: Icon, href, color, bg }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 text-gray-400 ${color} ${bg} border border-gray-700 hover:border-primary/30`}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-700 hover:border-primary/30 transition-all duration-500 shadow-2xl">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl font-bold font-poppins text-white mb-6 md:mb-8"
              >
                Send us a Message
              </motion.h3>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 md:space-y-6"
                  >
                    {[
                      { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                      { name: "email", label: "Email Address", type: "email", placeholder: "your.email@example.com" },
                      { name: "subject", label: "Subject", type: "text", placeholder: "What's this about?" },
                    ].map((field, index) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium font-poppins text-gray-300 mb-2"
                        >
                          {field.label}
                        </label>
                        <motion.input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={`w-full px-3 md:px-4 py-2 md:py-3 bg-gray-800 border rounded-lg md:rounded-xl text-white focus:outline-none transition-all duration-300 text-sm md:text-base ${
                            focusedField === field.name
                              ? "border-primary shadow-lg shadow-primary/20 bg-gray-750"
                              : "border-gray-600 hover:border-gray-500"
                          }`}
                          placeholder={field.placeholder}
                          animate={{
                            scale: focusedField === field.name ? 1.02 : 1,
                          }}
                        />
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.3 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="message" className="block text-sm font-medium font-poppins text-gray-300 mb-2">
                        Message
                      </label>
                      <motion.textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={4}
                        className={`w-full px-3 md:px-4 py-2 md:py-3 bg-gray-800 border rounded-lg md:rounded-xl text-white focus:outline-none resize-none transition-all duration-300 text-sm md:text-base ${
                          focusedField === "message"
                            ? "border-primary shadow-lg shadow-primary/20 bg-gray-750"
                            : "border-gray-600 hover:border-gray-500"
                        }`}
                        placeholder="Tell us more about your inquiry..."
                        animate={{
                          scale: focusedField === "message" ? 1.02 : 1,
                        }}
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-semibold font-poppins py-3 md:py-4 px-4 md:px-6 rounded-lg md:rounded-xl transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span>Sending...</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="send"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Send className="w-4 h-4 md:w-5 md:h-5" />
                            <span>Send Message</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 md:py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6"
                    >
                      <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </motion.div>
                    <motion.h4
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-xl md:text-2xl font-bold font-poppins text-white mb-3 md:mb-4"
                    >
                      Message Sent Successfully!
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-gray-400 text-sm md:text-base"
                    >
                      Thank you for reaching out. We'll get back to you soon!
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
