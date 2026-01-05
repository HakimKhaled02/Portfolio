import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Arcade from './components/Arcade'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Animated background gradient */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(94, 231, 223, 0.15) 0%, transparent 50%)`
        }}
      />
      
      {/* Main content */}
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Arcade />
      <Contact />
      <Footer />
      <MusicPlayer />
    </div>
  )
}

export default App

