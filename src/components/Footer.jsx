import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Send } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setEmail('');
        }, 3000);
    };

    return (
        <footer id="contact" className="bg-white relative overflow-hidden">
            {/* Wave Divider */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path 
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                        className="fill-primary"
                    />
                </svg>
            </div>

            <div className="container pt-32 pb-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    <motion.div 
                        className="lg:col-span-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-serif font-semibold mb-8 text-gradient">JOE'S</h2>
                        <p className="text-secondary text-sm leading-relaxed max-w-xs">
                            Handcrafting minimal heritage furniture in our workshop since 1984. Built to last a lifetime.
                        </p>
                        
                        {/* Decorative Element */}
                        <motion.div 
                            className="mt-8 w-16 h-1 bg-gradient-to-r from-accent to-accent-light rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: 64 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-accent">Navigation</h4>
                        <ul className="space-y-4 text-sm">
                            {['Collections', 'Our Process', 'About Us', 'Shipping & Returns'].map((item, i) => (
                                <motion.li 
                                    key={item}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + i * 0.05 }}
                                >
                                    <a 
                                        href={`#${item.toLowerCase().replace(/\s+/g, '')}`} 
                                        className="hover:text-accent transition-colors relative group inline-block"
                                    >
                                        {item}
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-accent">Connect</h4>
                        <div className="flex gap-6">
                            {[
                                { Icon: Instagram, label: 'Instagram' },
                                { Icon: Twitter, label: 'Twitter' },
                                { Icon: Facebook, label: 'Facebook' }
                            ].map(({ Icon, label }, i) => (
                                <motion.a 
                                    key={label}
                                    href="#" 
                                    className="hover:text-accent transition-colors relative group"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                >
                                    <Icon size={20} />
                                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {label}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                        
                        <motion.div 
                            className="mt-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <p className="text-[10px] uppercase tracking-widest text-secondary/60 mb-2">Location</p>
                            <p className="text-sm text-secondary">Portland, Oregon</p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-accent">Newsletter</h4>
                        <p className="text-sm text-secondary mb-6 leading-relaxed">
                            Join for early access to new collections and exclusive offers.
                        </p>
                        
                        <form onSubmit={handleSubmit} className="relative">
                            <div className="flex items-center border-b border-black/20 focus-within:border-accent transition-colors">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    required
                                    className="bg-transparent py-3 text-sm w-full focus:outline-none placeholder:text-secondary/40"
                                />
                                <motion.button 
                                    type="submit" 
                                    className="ml-4 text-accent hover:text-accent-dark transition-colors"
                                    whileHover={{ scale: 1.1, x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Send size={18} />
                                </motion.button>
                            </div>
                            
                            {/* Success Message */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ 
                                    opacity: isSubmitted ? 1 : 0,
                                    y: isSubmitted ? 0 : -10
                                }}
                                className="absolute -bottom-8 left-0 text-[10px] uppercase tracking-widest text-accent font-bold"
                            >
                                ✓ Subscribed!
                            </motion.div>
                        </form>
                    </motion.div>
                </div>

                <motion.div 
                    className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-secondary/60">
                        © 2024 Joe's Furniture. All Rights Reserved.
                    </p>
                    <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-secondary/60">
                        <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
                    </div>
                </motion.div>

                {/* Back to Top Button */}
                <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 w-12 h-12 bg-accent text-white rounded-full shadow-luxury hover:shadow-luxury-lg flex items-center justify-center z-40"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 19V5M5 12l7-7 7 7"/>
                    </svg>
                </motion.button>
            </div>
        </footer>
    );
};

export default Footer;
