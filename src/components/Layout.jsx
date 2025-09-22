import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Header from '@/components/shared/Header'

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}

export default Layout