import React from 'react'
import Layout from '@/components/Layout'
import Hero from '@/components/sections/Hero'
import Metrics from '@/components/sections/Metrics'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'

const Home = () => {
  return (
    <Layout>
      <Hero />
      {/* <Metrics /> */}
      <About />
      <Projects />
      <Experience />
      <Contact />
    </Layout>
  )
}

export default Home