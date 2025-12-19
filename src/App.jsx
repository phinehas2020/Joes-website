import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Process from './components/Process'
import About from './components/About'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <ProductGrid />
        <About />
        <Process />
      </main>
      <Footer />
    </div>
  )
}

export default App
