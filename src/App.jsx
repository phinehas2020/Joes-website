import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import ProductDetails from './components/ProductDetails'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import ScrollToTop from './components/ScrollToTop'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import { ThemeProvider, useTheme } from './context/ThemeContext' // Added useTheme

const ThemeWrapper = ({ children }) => {
  const { backgroundColor } = useTheme();
  return (
    <div
      className="app-container min-h-screen transition-colors duration-[1500ms] ease-in-out" // Added transition
      style={{ backgroundColor }}
    >
      {children}
    </div>
  );
};

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
    setIsCartOpen(true);
  };

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <CustomCursor />
        <ScrollProgress />
        <ThemeWrapper>
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
        </ThemeWrapper>
      </Router>
    </ThemeProvider>
  )
}

export default App
