import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaArrowRight, FaHtml5, FaCss3Alt, FaJs, FaServer, FaWindowMaximize, FaCode } from 'react-icons/fa'
import { SiPhp, SiLaravel, SiMysql, SiTailwindcss, SiGithub, SiReact, SiTypescript, SiNodedotjs, SiPostgresql, SiExpress, SiCsharp, SiDotnet } from 'react-icons/si'
import { BsCodeSlash } from 'react-icons/bs'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Tech icon mapping with colors
  const getTechIcon = (tech: string) => {
    const techMap: { [key: string]: { icon: any, color: string } } = {
      'HTML': { icon: FaHtml5, color: 'text-iridescent-orange' },
      'CSS': { icon: FaCss3Alt, color: 'text-iridescent-blue' },
      'JavaScript': { icon: FaJs, color: 'text-iridescent-yellow' },
      'PHP': { icon: SiPhp, color: 'text-iridescent-blue' },
      'Laravel': { icon: SiLaravel, color: 'text-red-500' },
      'MySQL': { icon: SiMysql, color: 'text-blue-400' },
      'XAMPP': { icon: FaServer, color: 'text-orange-500' },
      'Tailwind CSS': { icon: SiTailwindcss, color: 'text-iridescent-pink' },
      'cPanel': { icon: FaWindowMaximize, color: 'text-orange-400' },
      'GitHub': { icon: SiGithub, color: 'text-white' },
      'React': { icon: SiReact, color: 'text-cyan-400' },
      'React.js': { icon: SiReact, color: 'text-cyan-400' },
      'TypeScript': { icon: SiTypescript, color: 'text-blue-500' },
      'Node.js': { icon: SiNodedotjs, color: 'text-green-500' },
      'PostgreSQL': { icon: SiPostgresql, color: 'text-blue-600' },
      'Express': { icon: SiExpress, color: 'text-gray-300' },
      'C#': { icon: SiCsharp, color: 'text-purple-500' },
      'ASP.NET Core': { icon: SiDotnet, color: 'text-blue-500' },
      'REST API': { icon: BsCodeSlash, color: 'text-green-400' },
    }
    return techMap[tech] || { icon: FaCode, color: 'text-white' }
  }

  const projects = [
    {
      client: 'INTERNSHIP PROJECT',
      year: '',
      location: '',
      category: 'FRONTEND WEB & MOBILE',
      title: 'ASIA SCHOOL OF ACCOUNTING & FINANCE (ASAF)',
      description: [
        'Comprehensive educational platform featuring program listings, student testimonials, and responsive design for both web and mobile experiences.',
        'Implemented automatic WhatsApp message generation based on user-submitted form data.'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'MySQL', 'XAMPP', 'Tailwind CSS', 'cPanel', 'GitHub'],
      splashImage: '/images/asafweb.png',
      previewImage: '/images/asafweb.png',
      mobilePreview: '/images/asafmobile.png',
      github: 'https://github.com/HakimKhaled02/ASAF.git',
      demo: 'https://asaf-institute.org/',
    },
    {
      client: 'INTERNSHIP PROJECT',
      year: '',
      location: '',
      category: 'FULL STACK WEB',
      title: 'INTERNATIONAL HALAL ECONOMIC AWARD (IHEA) 2026',
      description: [
        'Event platform featuring registration, eligibility checking, and comprehensive information about the International Halal Economic Award ceremony.'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'MySQL', 'XAMPP', 'Tailwind CSS', 'cPanel', 'GitHub'],
      splashImage: '/images/ihea.png',
      previewImage: '/images/ihea.png',
      mobilePreview: '/images/ihea.png',
      github: 'https://github.com/HakimKhaled02/IHEA.git',
      demo: 'https://ihea.islamic-economy.org/',
    },
    {
      client: 'PERSONAL PROJECT',
      year: '',
      location: '',
      category: 'FULL STACK WEB',
      title: 'EMPLOYEE ATTENDANCE MANAGEMENT SYSTEM',
      description: [
        'Comprehensive attendance management system with GPS tracking and real-time monitoring.',
        'Features include clock in/out with selfie capture, location tracking, employee management, and detailed reporting.'
      ],
      tech: ['React.js', 'C#', 'ASP.NET Core', 'Tailwind CSS', 'PostgreSQL', 'REST API'],
      splashImage: '/images/attendancepro.png',
      previewImage: '/images/attendancepro.png',
      mobilePreview: '/images/attendancepro.png',
      github: 'https://github.com/HakimKhaled02/attendancepro.git',
      demo: 'https://attendancepro-sigma.vercel.app',
    },
  ]

  return (
    <section id="projects" className="py-12 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            className="text-4xl md:text-5xl font-bold mb-10 text-center"
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>

          <div className="space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.2 }}
                className="relative overflow-hidden rounded-xl"
              >
                {/* Single Image */}
                <div className="relative w-full h-[700px] overflow-hidden">
                  <img 
                    src={project.previewImage || '/images/asafweb.png'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Dark Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                  
                  {/* Text Overlay - Positioned on Left */}
                  <div className={`absolute inset-0 flex items-start pt-16 md:pt-20 lg:pt-24 z-10`}>
                    <div className={`${index === 0 || index === 1 ? 'p-4 md:p-6 lg:p-8' : 'p-6 md:p-8 lg:p-12'} max-w-xl space-y-3 md:space-y-4`}>
                      {/* Header Info */}
                      <div className="flex items-center gap-2 text-white text-xs md:text-sm font-medium">
                        <span className="uppercase">{project.client}</span>
                        {project.year && project.location && (
                          <>
                            <FaArrowRight className="text-xs" />
                            <span>{project.year} | {project.location}</span>
                          </>
                        )}
                      </div>


                      {/* Title */}
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight uppercase">
                        {project.title}
                      </h3>

                      {/* Description */}
                      {Array.isArray(project.description) ? (
                        <ul className="text-white text-sm md:text-base leading-relaxed max-w-lg space-y-3 md:space-y-4 list-disc list-inside">
                          {project.description.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-white text-sm md:text-base leading-relaxed max-w-lg">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tech Stack and Button - Positioned at Bottom for All Projects */}
                  <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-0 p-4 md:p-6 lg:p-8 z-10 max-w-4xl">
                    {/* Tech Stack */}
                    <div className="grid grid-cols-5 gap-x-2 md:gap-x-3 lg:gap-x-4 gap-y-2 md:gap-y-3 mb-4 md:mb-6">
                      {project.tech.map((tech, techIndex) => {
                        const techData = getTechIcon(tech)
                        const Icon = techData.icon
                        return (
                          <div key={techIndex} className="flex items-center gap-1.5 md:gap-2 px-2 py-1.5 md:px-3 md:py-2 bg-black/50 backdrop-blur-sm rounded-lg">
                            <Icon className={`text-lg md:text-xl lg:text-2xl ${techData.color} drop-shadow-lg`} />
                            <span className="text-xs md:text-sm lg:text-base text-white font-medium drop-shadow-lg">{tech}</span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 md:gap-4">
                      <motion.button
                        className="px-5 py-2.5 md:px-6 md:py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2 w-fit text-xs md:text-sm uppercase"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(project.demo, '_blank')}
                      >
                        LIVE DEMO
                        <FaArrowRight className="text-xs" />
                      </motion.button>
                      <motion.button
                        className="px-5 py-2.5 md:px-6 md:py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2 w-fit text-xs md:text-sm uppercase"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        GITHUB REPO
                        <SiGithub className="text-xs" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

