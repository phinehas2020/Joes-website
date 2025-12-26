import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './components/Home'
import ProductDetails from './components/ProductDetails'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import ScrollToTop from './components/ScrollToTop'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import SmoothScroll from './components/SmoothScroll'
import Preloader from './components/Preloader'
import PageTransition from './components/PageTransition'
import { ThemeProvider, useTheme } from './context/ThemeContext'

const ThemeWrapper = ({ children }) => {
  const { backgroundColor } = useTheme();
  return (
    <div
      className="app-container min-h-screen transition-colors duration-[1500ms] ease-in-out"
      style={{ backgroundColor }}
    >
      {children}
    </div>
  );
};

// Animated routes component
const AnimatedRoutes = ({ addToCart }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PageTransition>
              <ProductDetails addToCart={addToCart} />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
    setIsCartOpen(true);
  };

  return (
    <ThemeProvider>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <SmoothScroll>
        <Router>
          <ScrollToTop />
          <CustomCursor />
          <ScrollProgress />
          <ThemeWrapper>
            <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
            <main>
              <AnimatedRoutes addToCart={addToCart} />
            </main>
            <Footer />
            <CartSidebar
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cartCount={cartCount}
            />
          </ThemeWrapper>
        </Router>
      </SmoothScroll>
    </ThemeProvider>
  )
}

export default App
