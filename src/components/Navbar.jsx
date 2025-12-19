import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="container flex justify-between items-center">
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
          <a href="#collections" className="hover:opacity-50">Collections</a>
          <a href="#about" className="hover:opacity-50">Our Story</a>
        </div>

        <a href="/" className="text-3xl md:text-4xl font-serif font-semibold tracking-tighter">
          JOE'S
        </a>

        <div className="flex items-center gap-6">
          <button className="hidden md:block hover:opacity-50 transition-opacity">
            <Search size={20} />
          </button>
          <button className="hover:opacity-50 transition-opacity relative">
            <ShoppingBag size={20} />
          </button>
          <button 
            className="md:hidden hover:opacity-50 transition-opacity"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-serif font-semibold">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8 text-4xl font-serif">
              <a href="#collections" onClick={() => setMobileMenuOpen(false)}>Collections</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>Our Story</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)}>Process</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
