import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-16 px-6 relative">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative -ml-4 md:-ml-8"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center mt-8">
            {/* Left - Portrait Image with Tape Effect */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.4 }}
              className="relative max-w-sm"
            >
              <div className="relative">
                {/* Tape pieces */}
                <div className="absolute -top-3 -left-3 w-12 h-6 bg-yellow-100/80 rotate-[-12deg] shadow-lg z-10 opacity-90" 
                     style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)' }} />
                <div className="absolute -top-3 -right-3 w-12 h-6 bg-yellow-100/80 rotate-[12deg] shadow-lg z-10 opacity-90"
                     style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)' }} />
                
                {/* Image with border */}
                <div className="border-2 border-black relative z-0">
                  <img 
                    src="/images/aboutme.JPG" 
                    alt="Amirul Hakim" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right - About Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About <span className="text-gradient">Me</span>
              </h2>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Hello, my name is <span className="text-gradient font-semibold">Amirul Hakim</span>. A detail-oriented Software Engineering graduate with hands-on experience in full-stack web development. Skilled in <span className="text-gradient font-semibold">HTML, CSS, JavaScript, React, C#, PHP (Laravel), MySQL, PostgreSQL</span> and <span className="text-gradient font-semibold">responsive UI design</span>. Developed multiple systems from scratch during internship and academic projects, including booking systems, attendance management systems and e-commerce platform. Experienced with GitHub version control and production deployment. Fluent in English and native in Malay.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

