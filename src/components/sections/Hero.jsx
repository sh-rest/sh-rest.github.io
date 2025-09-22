import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Hero = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hi, I'm Shresth.{' '}
          <span className="block">
            I build software—and businesses.
          </span>
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl text-primary font-medium mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Software Engineer | Startup Aspirant | Builder
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-lg inline-flex items-center space-x-2 text-lg"
          >
            <span>See my Work</span>
            <ArrowDown className="h-5 w-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero