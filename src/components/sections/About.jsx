import React from 'react'
import headshot from '@/assets/headshot.png'
import { motion } from 'framer-motion'

const About = () => {
  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
    }
  }

  return (
  <section id="about" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            className="lg:col-span-2"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src={headshot}
                alt="Shresth Jain"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/20 to-transparent"></div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:col-span-3"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              About Me
            </motion.h2>
            
            <motion.div
              className="space-y-6 text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p>
                  I'm an enthusiastic software engineer early in my career, with hands-on 
                  experience in building web applications and collaborating in agile teams. 
                  Currently working at NetApp in Bangalore, I enjoy learning new technologies 
                  and applying them to solve real-world problems. My language strengths include Java, 
                  Python, and C++, and I'm always eager to expand my skill set and 
                  take on new challenges.
              </p>
                            
              <p>
                Beyond just writing code, I'm deeply interested in the intersection of technology 
                and business. I believe the best software solutions come from understanding both 
                technical excellence and real-world user needs. My goal is to bridge that gap 
                and eventually build products that make a meaningful impact.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About