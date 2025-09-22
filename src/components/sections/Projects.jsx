import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import projectsData from '@/data/projects.json'

const ProjectCard = ({ project, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: index * 0.1
      }
    }
  }

  return (
    <motion.div
      className="bg-card border border-border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="h-48 bg-muted relative overflow-hidden">
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{project.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech_stack.map((tech, techIndex) => (
            <Badge key={techIndex} variant="secondary" className="bg-primary/10 text-primary">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex-1">
            <ExternalLink className="h-4 w-4 mr-2" />
            Live Demo
          </Button>
          <Button variant="secondary" size="sm" className="flex-1">
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

const ProjectSkeleton = () => (
  <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-muted"></div>
    <div className="p-6">
      <div className="h-6 bg-muted rounded mb-3"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-muted rounded"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </div>
      <div className="flex gap-2 mb-6">
        <div className="h-6 w-16 bg-muted rounded-full"></div>
        <div className="h-6 w-20 bg-muted rounded-full"></div>
        <div className="h-6 w-14 bg-muted rounded-full"></div>
      </div>
      <div className="flex gap-3">
        <div className="h-8 bg-muted rounded flex-1"></div>
        <div className="h-8 bg-muted rounded flex-1"></div>
      </div>
    </div>
  </div>
)

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setProjects(projectsData)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Projects / Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for building innovative solutions.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <ProjectSkeleton key={index} />
              ))
            : projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))
          }
        </motion.div>
      </div>
    </section>
  )
}

export default Projects