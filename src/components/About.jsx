import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.floor(end * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
    return (
        <section id="about" className="section-padding bg-white relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-light/5 rounded-full blur-3xl" />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <motion.div 
                        className="lg:col-span-5"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-[10px] uppercase tracking-[0.4em] text-accent block mb-6 font-bold"
                        >
                            The Joe's Story
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-5xl mb-8 leading-tight"
                        >
                            Born from a love for <span className="italic text-accent">raw texture</span> and <span className="italic text-accent">precise geometry.</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div 
                        className="lg:col-start-7 lg:col-span-6"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-secondary space-y-6"
                        >
                            <p className="text-lg leading-relaxed">
                                For over three decades, Joe has been refining the art of the coffee table. What started in a small garage in 1984 has evolved into a studio known for its uncompromising stance on quality and its obsession with the "minimal heritage" aesthetic.
                            </p>
                            <p className="leading-relaxed">
                                We don't follow trends. We observe nature and the way people interact with their living spaces. Our tables are designed to be the quiet anchor of a room—present, powerful, yet unassuming.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Enhanced Stats Section */}
                <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-12">
                    {[
                        { label: 'Founded', value: 1984, isYear: true },
                        { label: 'Artisans', value: 12, suffix: '' },
                        { label: 'Trees Planted', value: 5000, suffix: '+' },
                        { label: 'Heirlooms Made', value: 2500, suffix: '' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                                delay: i * 0.1,
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="text-center group"
                        >
                            <div className="relative inline-block">
                                <motion.p 
                                    className="text-5xl md:text-6xl font-serif mb-3 text-gradient"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {stat.isYear ? (
                                        stat.value
                                    ) : (
                                        <>
                                            <AnimatedCounter 
                                                end={stat.value} 
                                                duration={2}
                                            />
                                            {stat.suffix}
                                        </>
                                    )}
                                </motion.p>
                                {/* Decorative underline */}
                                <motion.div
                                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-accent rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "60%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + 0.5, duration: 0.6 }}
                                />
                            </div>
                            <p className="text-[10px] uppercase tracking-widest text-secondary mt-4 font-bold opacity-60 group-hover:opacity-100 transition-opacity">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Decorative Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-32 max-w-3xl mx-auto text-center"
                >
                    <div className="relative">
                        <svg className="absolute -top-6 -left-6 w-12 h-12 text-accent/20" fill="currentColor" viewBox="0 0 32 32">
                            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z"/>
                        </svg>
                        <p className="text-2xl md:text-3xl font-serif italic text-secondary/80 leading-relaxed">
                            "Every piece tells a story of patience, precision, and the pursuit of timeless beauty."
                        </p>
                        <p className="text-sm uppercase tracking-widest text-accent mt-6 font-bold">— Joe, Founder</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
