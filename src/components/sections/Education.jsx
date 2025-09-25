import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, GraduationCap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import educationData from '@/data/education.json'

const EducationCard = ({ education, index }) => (
  <motion.div
    className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-800"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {education.degree} in {education.field_of_study}
        </h3>
        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
          {education.institution}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(education.start_date).getFullYear()} - {new Date(education.end_date).getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{education.location}</span>
          </div>
          {education.gpa && (
            <div className="flex items-center gap-1">
              <GraduationCap className="h-4 w-4" />
              <span>GPA: {education.gpa}</span>
            </div>
          )}
        </div>
      </div>
    </div>
    
    <p className="text-gray-600 dark:text-gray-400 mb-4">
      {education.details}
    </p>

    {education.coursework && education.coursework.length > 0 && (
      <div>
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
          Relevant Coursework
        </h4>
        <div className="flex flex-wrap gap-2">
          {education.coursework.map((course) => (
            <Badge 
              key={course} 
              variant="secondary" 
              className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
            >
              {course}
            </Badge>
          ))}
        </div>
      </div>
    )}
  </motion.div>
)

const EducationSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 rounded-lg p-6 space-y-4 border border-gray-200 dark:border-gray-800">
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-5 w-1/2" />
    <div className="flex gap-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-20" />
    </div>
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-20 rounded-full" />
      ))}
    </div>
  </div>
)

const Education = () => {
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setEducation(educationData)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="education" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Education</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {loading ? (
            Array.from({ length: 1 }).map((_, i) => (
              <EducationSkeleton key={i} />
            ))
          ) : (
            education.map((edu, index) => (
              <EducationCard key={edu.institution || index} education={edu} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Education