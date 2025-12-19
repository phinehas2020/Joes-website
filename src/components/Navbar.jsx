import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, onOpenCart }) => {
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 border-b border-gray-100 shadow-sm' : 'bg-transparent py-8 border-b border-transparent'}`}>
      <div className="container flex justify-between items-center">
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
          <Link to="/#collections" className="hover:opacity-50">Collections</Link>
          <Link to="/#about" className="hover:opacity-50">Our Story</Link>
        </div>

        <Link to="/" className="text-3xl md:text-4xl font-serif font-semibold tracking-tighter">
          JOE'S
        </Link>

        <div className="flex items-center gap-6">
          <button className="hidden md:block hover:opacity-50 transition-opacity">
            <Search size={20} />
          </button>
          <button
            onClick={onOpenCart}
            className="hover:opacity-50 transition-opacity relative"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
              >
                {cartCount}
              </motion.span>
            )}
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

            <div className="flex flex-col gap-8 text-4xl font-serif text-reveal">
              <Link to="/#collections" onClick={() => setMobileMenuOpen(false)}>Collections</Link>
              <Link to="/#about" onClick={() => setMobileMenuOpen(false)}>Our Story</Link>
              <Link to="/#process" onClick={() => setMobileMenuOpen(false)}>Process</Link>
              <Link to="/#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
