import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error('Form submission error:', response.status, errorData)
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const contactInfo = [
    { icon: FaEnvelope, text: 'hakimkhaled02@gmail.com', href: 'mailto:hakimkhaled02@gmail.com' },
    { icon: FaPhone, text: '018-9531451', href: 'tel:+60189531451' },
    { icon: FaMapMarkerAlt, text: 'Available at Kuala Lumpur, Selangor, & Penang', href: '#' },
  ]

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            className="text-5xl md:text-6xl font-bold mb-16 text-center"
          >
            Get In <span className="text-gradient">Touch</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold mb-4 text-white">
                  Let's <span className="text-gradient">Connect</span>
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities 
                  to be part of your visions. Feel free to reach out!
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl glass-effect hover:bg-white/10 transition-colors group"
                    whileHover={{ scale: 1.05, x: 10 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-iridescent flex items-center justify-center">
                      <info.icon className="text-white text-xl" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {info.text}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSubmit}
              className="glass-effect rounded-3xl p-8 neumorphic space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-dark-secondary border border-white/10 text-white focus:outline-none focus:border-iridescent-blue transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-dark-secondary border border-white/10 text-white focus:outline-none focus:border-iridescent-blue transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-dark-secondary border border-white/10 text-white focus:outline-none focus:border-iridescent-blue transition-colors resize-none"
                  placeholder="Your Message"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-8 py-4 rounded-full bg-gradient-iridescent text-white font-semibold neumorphic disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: status !== 'sending' ? 1.05 : 1 }}
                whileTap={{ scale: status !== 'sending' ? 0.95 : 1 }}
              >
                {status === 'sending' 
                  ? 'Sending...' 
                  : status === 'success' 
                  ? 'Message Sent! ✓' 
                  : status === 'error'
                  ? 'Error - Try Again'
                  : 'Send Message'}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

