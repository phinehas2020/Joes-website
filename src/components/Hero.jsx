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

    return (
        <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image with Parallax Effect */}
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-black/30 z-10" />
                <img
                    src="/images/hero.png"
                    alt="Joe's Heritage Coffee Table"
                    className="w-full h-full object-cover grayscale-[20%] brightness-[0.8]"
                />
            </motion.div>

            <motion.div
                style={{ opacity }}
                className="container relative z-20 text-center text-white"
            >
                <motion.span
                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, letterSpacing: "0.4em" }}
                    transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
                    className="block text-sm uppercase mb-8 font-medium text-white/70"
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
                            <motion.span key={i} variants={charVariants} className="inline-block">
                                {char}
                            </motion.span>
                        ))}
                    </div>
                    <div className="flex justify-center overflow-hidden pb-8 italic font-light text-white/80">
                        {subtitleWords.map((char, i) => (
                            <motion.span key={i} variants={charVariants} className="inline-block">
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
                    <a href="#collections" className="btn border-white/40 text-white hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm">
                        Explore Collection
                    </a>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-4 z-20"
            >
                <span className="text-[10px] uppercase tracking-[0.5em]">Scroll to Discover</span>
                <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
                    <motion.div
                        animate={{ y: [0, 64] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-white/60"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
