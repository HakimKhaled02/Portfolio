import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400"
          >
            © {currentYear} Amirul Hakim Dev. All rights reserved.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm md:mr-20 lg:mr-32"
          >
            Built with <span className="text-gradient">React</span> + <span className="text-gradient">TypeScript</span>
          </motion.p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

