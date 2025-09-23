import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import projectsData from '@/data/projects.json'

const ProjectCard = ({ project, index }) => (
  <motion.div
    className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover" />
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
      <div className="flex flex-wrap items-start mb-4 min-h-[3.5rem]">
        <p className="text-gray-600 dark:text-gray-400 text-sm flex-1 break-words mr-2">{project.description}</p>
        {project.project_url && (
          <Button
            asChild
            variant="secondary"
            className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700"
          >
            <a href={project.project_url} target="_blank" rel="noopener noreferrer">
              <Github className="h-7 w-7 text-gray-700 dark:text-gray-200" />
            </a>
          </Button>
        )}
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {project.tech_stack.map((tech) => (
          <Badge key={tech} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
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
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Projects / Portfolio</h2>
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