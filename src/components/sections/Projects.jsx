import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import projectsData from '@/data/projects.json'

const ProjectCard = ({ project, index }) => (
  <motion.div
    className="group bg-white dark:bg-gray-900/80 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col hover:border-blue-300 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
  >
    <div className="overflow-hidden">
      <img
        src={project.image_url}
        alt={project.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-6 flex-grow flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h3>
        {project.project_url && (
          <a
            href={project.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            <Github className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </a>
        )}
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-grow">{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tech_stack.map((tech) => (
          <Badge key={tech} variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  </motion.div>
)

const ProjectSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 space-y-4 border border-gray-200 dark:border-gray-800">
    <Skeleton className="h-48 w-full" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <div className="flex gap-2">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
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

  return (
    <section id="projects" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <ProjectSkeleton key={i} />
            ))
          ) : (
            projects.map((project, index) => <ProjectCard key={project.id || index} project={project} index={index} />)
          )}
        </div>
      </div>
    </section>
  )
}

export default Projects