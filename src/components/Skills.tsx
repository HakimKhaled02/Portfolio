import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiPhp,
  SiLaravel,
  SiBootstrap,
  SiMysql,
  SiGithub,
  SiVisualstudiocode,
  SiReact,
  SiDotnet,
  SiFigma,
  SiCsharp
} from 'react-icons/si'
import { FaJs, FaCss3Alt, FaHtml5, FaGitAlt, FaCode, FaDatabase, FaTools, FaCog, FaServer, FaWindowMaximize } from 'react-icons/fa'
import { BsCodeSlash, BsFileEarmarkCode } from 'react-icons/bs'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'HTML', icon: FaHtml5, color: 'text-iridescent-orange' },
        { name: 'CSS', icon: FaCss3Alt, color: 'text-iridescent-blue' },
        { name: 'JavaScript', icon: FaJs, color: 'text-iridescent-yellow' },
        { name: 'TypeScript', icon: SiTypescript, color: 'text-iridescent-purple' },
        { name: 'PHP', icon: SiPhp, color: 'text-iridescent-blue' },
        { name: 'C#', icon: SiCsharp, color: 'text-iridescent-purple' },
      ]
    },
    {
      title: 'Frameworks and Technologies',
      skills: [
        { name: 'Laravel', icon: SiLaravel, color: 'text-red-500' },
        { name: 'Bootstrap', icon: SiBootstrap, color: 'text-purple-500' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-iridescent-pink' },
        { name: 'ASP.NET Core', icon: SiDotnet, color: 'text-blue-500' },
        { name: 'React.js', icon: SiReact, color: 'text-iridescent-blue' },
      ]
    },
    {
      title: 'Database',
      skills: [
        { name: 'MySQL', icon: SiMysql, color: 'text-blue-400' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-iridescent-blue' },
      ]
    },
    {
      title: 'Tools and Platforms',
      skills: [
        { name: 'Git', icon: FaGitAlt, color: 'text-iridescent-orange' },
        { name: 'GitHub', icon: SiGithub, color: 'text-white' },
        { name: 'VS Code', icon: SiVisualstudiocode, color: 'text-blue-400' },
        { name: 'Cursor', icon: FaCode, color: 'text-iridescent-purple' },
        { name: 'Figma', icon: SiFigma, color: 'text-purple-400' },
        { name: 'XAMPP', icon: FaServer, color: 'text-orange-500' },
        { name: 'cPanel', icon: FaWindowMaximize, color: 'text-orange-400' },
      ]
    },
    {
      title: 'Core Concepts',
      skills: [
        { name: 'REST API', icon: BsCodeSlash, color: 'text-iridescent-green' },
        { name: 'MVC', icon: FaCog, color: 'text-iridescent-purple' },
        { name: 'OOP', icon: BsFileEarmarkCode, color: 'text-iridescent-blue' },
        { name: 'SDLC', icon: FaTools, color: 'text-iridescent-pink' },
        { name: 'Agile Methodology', icon: FaCog, color: 'text-iridescent-yellow' },
        { name: 'Responsive UI', icon: FaWindowMaximize, color: 'text-iridescent-blue' },
        { name: 'CRUD operations', icon: FaDatabase, color: 'text-iridescent-green' },
      ]
    }
  ]

  return (
    <section id="skills" className="py-12 px-6 relative">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
          >
            <span className="text-gradient">Skills</span> & Technologies
          </motion.h2>

          <div className="space-y-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="glass-effect rounded-xl p-4 neumorphic"
              >
                <h3 className="text-lg font-bold mb-3 text-white inline-block mr-4 min-w-[200px]">
                  {category.title}:
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-secondary/50 hover:bg-dark-secondary transition-colors"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <skill.icon className={`text-2xl ${skill.color}`} />
                      <span className="text-sm text-gray-300 font-medium whitespace-nowrap">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

