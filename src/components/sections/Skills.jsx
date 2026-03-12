import React from 'react'
import { motion } from 'framer-motion'
import skillsData from '@/data/skills.json'

const categoryIcons = {
  'Languages': '{ }',
  'Frameworks': '< />',
  'Tools & Platforms': '>>_',
  'Concepts': '***',
}

const Skills = () => {
  const categories = Object.entries(skillsData)

  return (
    <section id="skills" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Tech Stack
        </motion.h2>

        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          {categories.map(([category, skills], catIndex) => (
            <motion.div
              key={category}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80 hover:border-teal-300 dark:hover:border-teal-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 px-2 py-1 rounded">
                  {categoryIcons[category] || '...'}
                </span>
                <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  {category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-300 hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-teal-500/10 dark:hover:text-teal-300 transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: catIndex * 0.1 + i * 0.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
