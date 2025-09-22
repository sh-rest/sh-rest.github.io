import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
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
          <p className="text-lg text-muted-foreground">
            My professional journey and key achievements
          </p>
        </motion.div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-border"></div>

          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              className="relative pl-12 md:pl-20 pb-12 last:pb-0"
              variants={itemVariants}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-0 md:left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Briefcase className="h-4 w-4 text-white" />
              </motion.div>

              {/* Content */}
              <motion.div
                className="bg-card border border-border rounded-lg p-6 shadow-lg"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="text-primary font-medium">
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2 md:mt-0">
                    {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
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