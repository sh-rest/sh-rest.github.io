import React from 'react'
import { motion } from 'framer-motion'
import { GitCommit, Code, Coffee } from 'lucide-react'

const Metrics = () => {
  const metrics = [
    {
      icon: GitCommit,
      number: '10+',
      label: 'Projects Shipped',
      delay: 0.1
    },
    {
      icon: Code,
      number: '50,000+',
      label: 'Lines of Code',
      delay: 0.2
    },
    {
      icon: Coffee,
      number: '∞',
      label: 'Coffee Cups',
      delay: 0.3
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <IconComponent className="h-8 w-8 text-primary" />
                </motion.div>
                <motion.div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: metric.delay }}
                >
                  {metric.number}
                </motion.div>
                <div className="text-lg text-muted-foreground">
                  {metric.label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Metrics