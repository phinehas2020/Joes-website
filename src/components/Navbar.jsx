import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { textColor, logoColor } = useTheme();
  const { scrollYProgress } = useScroll();
  
  const navBlur = useTransform(scrollYProgress, [0, 0.1], [8, 16]);
  const navOpacity = useTransform(scrollYProgress, [0, 0.1], [0.7, 0.9]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}
      style={{
        backdropFilter: isScrolled ? `blur(${navBlur}px)` : 'none',
      }}
    >
      <div className="container flex justify-between items-center">
        <div className={`hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-bold ${isScrolled ? 'text-black' : textColor} transition-colors duration-500`}>
          <Link to="/#collections" className="hover:text-accent transition-colors relative group">
            Collections
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link to="/#about" className="hover:text-accent transition-colors relative group">
            Our Story
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
        </div>

        <Link to="/" className={`absolute left-1/2 -translate-x-1/2 text-3xl md:text-4xl font-serif font-bold tracking-tight ${isScrolled ? 'text-black' : logoColor} transition-all duration-500`}>
          <motion.span
            whileHover={{ scale: 1.05, letterSpacing: '0.1em' }}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            JOE'S
          </motion.span>
        </Link>

        <div className={`flex items-center gap-8 ${isScrolled ? 'text-black' : textColor} transition-colors duration-500`}>
          <motion.button 
            className="hidden md:block hover:text-accent transition-colors relative group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search size={18} strokeWidth={2.5} />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Search
            </span>
          </motion.button>
          <motion.button
            onClick={onOpenCart}
            className="group relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag size={20} strokeWidth={2} className="group-hover:text-accent transition-colors" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-accent text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black shadow-glow"
              >
                {cartCount}
              </motion.span>
            )}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Cart
            </span>
          </motion.button>
          <motion.button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={24} className={`${isScrolled ? 'text-black' : textColor}`} />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[59]"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white/95 backdrop-blur-xl z-[60] flex flex-col p-10 shadow-luxury-lg"
            >
              <div className="flex justify-between items-center mb-20">
                <motion.span 
                  className="text-xl uppercase tracking-[0.4em] font-bold text-gradient"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Menu
                </motion.span>
                <motion.button 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="p-2 border border-black/10 rounded-full hover:bg-black/5 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="flex flex-col gap-10 text-5xl font-serif">
                {['Collections', 'Our Story', 'Process', 'Contact'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i + 0.3 }}
                  >
                    <Link
                      to={`/#${item.toLowerCase().replace(' ', '')}`}
                      className="hover:italic hover:pl-4 hover:text-accent transition-all duration-500 block relative group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                      <motion.span 
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-[3px] bg-accent group-hover:w-8 transition-all duration-500"
                        style={{ marginLeft: '-2rem' }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="mt-auto border-t border-black/5 pt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-[10px] uppercase tracking-widest text-secondary/40 mb-4">Handcrafted in Oregon</p>
                <div className="flex gap-4">
                  {['Instagram', 'Twitter', 'Facebook'].map((social, i) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="text-[9px] uppercase tracking-wider text-secondary/60 hover:text-accent transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                    >
                      {social}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
