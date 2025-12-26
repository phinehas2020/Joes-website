import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const Process = () => {
    const [isHovering, setIsHovering] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(x, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const xPct = (e.clientX - centerX) / (rect.width / 2);
        const yPct = (e.clientY - centerY) / (rect.height / 2);
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovering(false);
    };

    return (
        <section id="process" className="section-padding bg-[#1A1A1A] text-white overflow-hidden relative">
            {/* Animated Background Gradient */}
            <motion.div 
                className="absolute inset-0 opacity-30"
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 50%, rgba(212, 163, 115, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 50%, rgba(212, 163, 115, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 50%, rgba(212, 163, 115, 0.1) 0%, transparent 50%)',
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative group"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            perspective: "1000px",
                        }}
                    >
                        <motion.div 
                            className="aspect-[4/5] overflow-hidden rounded-sm shadow-luxury-lg relative"
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d",
                            }}
                        >
                            {/* Image Reveal Mask */}
                            <motion.div
                                className="absolute inset-0 bg-[#1A1A1A] z-20"
                                initial={{ scaleX: 1 }}
                                whileInView={{ scaleX: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                                style={{ transformOrigin: "right" }}
                            />
                            
                            <motion.img
                                src="/images/process.png"
                                alt="Woodworking Process"
                                className="w-full h-full object-cover"
                                style={{
                                    filter: isHovering ? "grayscale(0%)" : "grayscale(40%)",
                                    scale: isHovering ? 1.05 : 1,
                                    transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
                                }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                            {/* Border Glow on Hover */}
                            <motion.div
                                className="absolute inset-0 border-2 border-accent/0 rounded-sm pointer-events-none"
                                animate={{
                                    borderColor: isHovering ? "rgba(212, 163, 115, 0.5)" : "rgba(212, 163, 115, 0)",
                                }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.div>

                        {/* Floating Accent Element */}
                        <motion.div 
                            className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 backdrop-blur-3xl rounded-full z-0"
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.2, 0.3, 0.2],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Additional Floating Element */}
                        <motion.div 
                            className="absolute -top-10 -left-10 w-48 h-48 bg-accent-light/10 backdrop-blur-3xl rounded-full z-0"
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.1, 0.2, 0.1],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1,
                            }}
                        />
                    </motion.div>

                    <div className="relative z-10">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-[10px] uppercase tracking-[0.4em] text-accent block mb-6 font-bold"
                        >
                            Our Philosophy
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="text-4xl md:text-6xl mb-10 leading-tight"
                        >
                            Honest materials. <br />
                            <span className="italic font-light text-white/80">Meticulous hands.</span>
                        </motion.h2>

                        {/* Process Steps */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="space-y-8 text-white/70 max-w-lg mb-12"
                        >
                            <p className="text-lg leading-relaxed">
                                Every piece at Joe's begins with a hand-selected slab of sustainable hardwood. We believe that true luxury lies in the details that aren't immediately visible.
                            </p>
                            <p className="leading-relaxed">
                                From traditional mortise and tenon joinery to the five-stage hand-rubbed oil finish, we prioritize longevity over speed. Our tables aren't just furniture; they are future family heirlooms.
                            </p>
                        </motion.div>

                        {/* Timeline Steps */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="space-y-6 mb-12"
                        >
                            {[
                                { step: "01", title: "Selection", desc: "Hand-picked sustainable hardwood" },
                                { step: "02", title: "Crafting", desc: "Traditional joinery techniques" },
                                { step: "03", title: "Finishing", desc: "Five-stage hand-rubbed oil" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 + i * 0.1 }}
                                    className="flex items-start gap-6 group cursor-pointer"
                                    whileHover={{ x: 10 }}
                                >
                                    <span className="text-accent/40 font-serif text-2xl group-hover:text-accent transition-colors">
                                        {item.step}
                                    </span>
                                    <div>
                                        <h4 className="text-white font-serif text-xl mb-1 group-hover:text-accent transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-white/50 text-sm">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                            className="pt-6"
                        >
                            <a href="#about" className="btn border-white/40 text-white backdrop-blur-sm shadow-glow hover:shadow-glow-lg">
                                Read Our Story
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
