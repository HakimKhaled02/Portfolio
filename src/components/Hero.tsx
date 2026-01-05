import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa'

const Hero = () => {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/HakimKhaled02', label: 'GitHub' },
    { icon: FaLinkedin, href: 'http://linkedin.com/in/amirul-hakim-45951a315', label: 'LinkedIn' },
    { icon: FaWhatsapp, href: 'https://wa.me/60189531451', label: 'WhatsApp' },
    { icon: FaEnvelope, href: 'mailto:hakimkhaled02@gmail.com', label: 'Email' },
  ]

  return (
    <section id="home" className="min-h-screen flex flex-col justify-between relative px-6 md:px-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-iridescent rounded-full opacity-10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-iridescent rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-primary via-transparent to-dark-secondary" />
      </div>

      {/* Main Content - Centered Portfolio Text with Overlaid Name */}
      <div className="flex-1 flex items-center justify-center relative min-h-0 z-10">
        <div className="relative w-full text-center">
          {/* Large "full stack dev" text */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl md:text-9xl lg:text-[10rem] font-black text-gradient leading-none tracking-tight select-none whitespace-nowrap"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            full stack dev
          </motion.h1>

          {/* Full Stack Developer text below portfolio */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-3xl md:text-5xl lg:text-6xl font-normal text-white whitespace-nowrap mt-4 md:mt-6"
            style={{ 
              fontFamily: '"Brush Script MT", "Lucida Handwriting", "Dancing Script", cursive, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '0.05em',
              textShadow: '0 2px 10px rgba(255, 255, 255, 0.2)',
              transform: 'rotate(-2deg)'
            }}
          >
            Amirul Hakim
          </motion.h2>
        </div>
      </div>

      {/* Footer - Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="w-full pb-8 pr-20 md:pr-24 relative z-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-8 text-sm md:text-base">
          {/* GitHub */}
          <motion.a
            href={socialLinks[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-light relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.1 }}
          >
            <FaGithub className="text-base" />
            <span>{socialLinks[0].label}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-iridescent group-hover:w-full transition-all duration-300" />
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href={socialLinks[1].href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-light relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.1 }}
          >
            <FaLinkedin className="text-base" />
            <span>{socialLinks[1].label}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-iridescent group-hover:w-full transition-all duration-300" />
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href={socialLinks[2].href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-light relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <FaWhatsapp className="text-base" />
            <span>{socialLinks[2].label}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-iridescent group-hover:w-full transition-all duration-300" />
          </motion.a>

          {/* Email */}
          <motion.a
            href={socialLinks[3].href}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-light relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            whileHover={{ scale: 1.1 }}
          >
            <FaEnvelope className="text-base" />
            <span>{socialLinks[3].label}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-iridescent group-hover:w-full transition-all duration-300" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero

