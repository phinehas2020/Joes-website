import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax-ish Effect */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img
                    src="/images/hero.png"
                    alt="Joe's Heritage Coffee Table"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            <div className="container relative z-20 text-center text-white">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="block text-sm uppercase tracking-[0.4em] mb-6 font-medium"
                >
                    Established 1984
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-6xl md:text-8xl lg:text-9xl mb-8 leading-none"
                >
                    Heritage <br />
                    <span className="italic font-light text-white/90">Reimagined</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <a href="#collections" className="btn border-white text-white hover:bg-white hover:text-black">
                        Explore Collection
                    </a>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
                    <motion.div
                        animate={{ y: [0, 48] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-white"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
