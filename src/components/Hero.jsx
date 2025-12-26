import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

    const titleWords = "Heritage".split("");
    const subtitleWords = "Reimagined".split("");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.5,
            },
        },
    };

    const charVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
        },
    };

    // Floating particles data
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
    }));

    return (
        <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black vignette">
            {/* Background Image with Parallax Effect */}
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0 z-0"
            >
                {/* Gradient Overlay that shifts */}
                <motion.div 
                    className="absolute inset-0 z-10"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(26,26,26,0.3) 50%, rgba(0,0,0,0.5) 100%)',
                    }}
                    animate={{
                        background: [
                            'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(26,26,26,0.3) 50%, rgba(0,0,0,0.5) 100%)',
                            'linear-gradient(225deg, rgba(0,0,0,0.5) 0%, rgba(26,26,26,0.3) 50%, rgba(0,0,0,0.4) 100%)',
                            'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(26,26,26,0.3) 50%, rgba(0,0,0,0.5) 100%)',
                        ]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <img
                    src="/images/hero.png"
                    alt="Joe's Heritage Coffee Table"
                    className="w-full h-full object-cover grayscale-[20%] brightness-[0.8]"
                />
            </motion.div>

            {/* Floating Particles */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full bg-white/20 backdrop-blur-sm"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 50 - 25, 0],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <motion.div
                style={{ opacity }}
                className="container relative z-20 text-center text-white"
            >
                <motion.span
                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, letterSpacing: "0.4em" }}
                    transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
                    className="block text-sm uppercase mb-8 font-medium text-white/70 tracking-[0.4em]"
                >
                    Established 1984
                </motion.span>

                <motion.h1
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-7xl md:text-9xl lg:text-[12rem] mb-12 leading-[0.85] tracking-tighter"
                >
                    <div className="flex justify-center overflow-hidden pb-8">
                        {titleWords.map((char, i) => (
                            <motion.span 
                                key={i} 
                                variants={charVariants} 
                                className="inline-block"
                                whileHover={{ 
                                    scale: 1.1, 
                                    color: '#D4A373',
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                    <div className="flex justify-center overflow-hidden pb-8 italic font-light text-white/80">
                        {subtitleWords.map((char, i) => (
                            <motion.span 
                                key={i} 
                                variants={charVariants} 
                                className="inline-block"
                                whileHover={{ 
                                    scale: 1.1, 
                                    color: '#E9D8A6',
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="mb-32 relative z-30"
                >
                    <a 
                        href="#collections" 
                        className="btn border-white/40 text-white backdrop-blur-sm shadow-luxury hover:shadow-luxury-lg group relative overflow-hidden"
                    >
                        <span className="relative z-10">Explore Collection</span>
                        <motion.div
                            className="absolute inset-0 bg-white"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        />
                    </a>
                </motion.div>
            </motion.div>

            {/* Enhanced Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-4 z-20"
            >
                <span className="text-[10px] uppercase tracking-[0.5em] font-medium">Scroll to Discover</span>
                <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden rounded-full">
                    <motion.div
                        animate={{ y: [0, 64, 64] }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 2.5, 
                            ease: "easeInOut",
                            times: [0, 0.8, 1]
                        }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/80 to-white/40 rounded-full"
                    />
                </div>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: 2, 
                        ease: "easeInOut" 
                    }}
                    className="text-white/60"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
