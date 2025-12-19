import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
      <div className="container flex justify-between items-center">
        <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-bold">
          <Link to="/#collections" className="hover:text-accent transition-colors">Collections</Link>
          <Link to="/#about" className="hover:text-accent transition-colors">Our Story</Link>
        </div>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-3xl md:text-4xl font-serif font-bold tracking-tight">
          JOE'S
        </Link>

        <div className="flex items-center gap-8">
          <button className="hidden md:block hover:text-accent transition-colors">
            <Search size={18} strokeWidth={2.5} />
          </button>
          <button
            onClick={onOpenCart}
            className="group relative"
          >
            <ShoppingBag size={20} strokeWidth={2} className="group-hover:text-accent transition-colors" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-accent text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
          <button
            className="md:hidden"
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
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-xl uppercase tracking-[0.4em] font-bold">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 border border-black/5 rounded-full">
                <X size={24} />
              </button>
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
                    className="hover:italic hover:pl-4 transition-all duration-500 block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto border-t border-black/5 pt-10">
              <p className="text-[10px] uppercase tracking-widest text-secondary/40">Handcrafted in Oregon</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
