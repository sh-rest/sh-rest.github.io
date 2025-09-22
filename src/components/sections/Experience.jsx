import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import experienceData from '@/data/experience.json'

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Present'
    return format(new Date(dateString), 'MMM yyyy')
  }

  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience
          </h2>
        </motion.div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Timeline line */}
          {/* <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-border"></div> */}

          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              className="relative pl-12 md:pl-20 pb-12 last:pb-0"
              variants={itemVariants}
            >
              {/* Timeline dot */}
                    <motion.div
                    className="absolute left-0 md:left-3 w-10 h-10 flex items-center justify-center"
                    style={{ top: '1rem' }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    >
                    <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgb(12,19,40)' }}>
                        <Briefcase className="h-5 w-5" style={{ color: 'rgb(84,130,244)' }} />
                    </span>
                    </motion.div>

                    {/* Content */}
              <motion.div
                className="p-0"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-col gap-1 mb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{exp.role}</h3>
                  <p className="ttext-md text-gray-700 dark:text-gray-300 font-medium">
                    {exp.company} &bull; {exp.location}
                  </p>
                </div>
                <p className="ttext-sm text-gray-600 dark:text-gray-400 mt-2">
                  {exp.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Experience