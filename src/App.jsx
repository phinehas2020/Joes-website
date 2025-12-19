import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import ProductDetails from './components/ProductDetails'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
    setIsCartOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container min-h-screen bg-[#FAF9F6]">
        <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
          </Routes>
        </main>
        <Footer />
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartCount={cartCount}
        />
      </div>
    </Router>
  )
}

export default App
