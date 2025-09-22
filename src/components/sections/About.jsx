import React from 'react'
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
    <section id="about" className="py-20 md:py-32">
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
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c045cca76f1f46c121d3fc/555766218_Frame4.png"
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
                I'm a passionate software engineer with a strong foundation in building scalable, 
                user-centric applications. Currently working at NetApp in Bangalore, I specialize 
                in full-stack development with a focus on modern web technologies and cloud solutions.
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