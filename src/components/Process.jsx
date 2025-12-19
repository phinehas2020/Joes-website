import React from 'react';
import { motion } from 'framer-motion';

const Process = () => {
    return (
        <section id="process" className="section-padding bg-[#1A1A1A] text-white overflow-hidden">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] overflow-hidden">
                            <img
                                src="/images/process.png"
                                alt="Woodworking Process"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110"
                            />
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 backdrop-blur-3xl rounded-full z-0" />
                    </motion.div>

                    <div className="relative z-10">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-[10px] uppercase tracking-[0.4em] text-white/50 block mb-6"
                        >
                            Our Philosophy
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl mb-10 leading-tight"
                        >
                            Honest materials. <br />
                            <span className="italic font-light">Meticulous hands.</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8 text-white/70 max-w-lg"
                        >
                            <p className="text-lg leading-relaxed">
                                Every piece at Joe's begins with a hand-selected slab of sustainable hardwood. We believe that true luxury lies in the details that aren't immediately visible.
                            </p>
                            <p>
                                From traditional mortise and tenon joinery to the five-stage hand-rubbed oil finish, we prioritize longevity over speed. Our tables aren't just furniture; they are future family heirlooms.
                            </p>

                            <div className="pt-6">
                                <a href="#about" className="btn border-white text-white hover:bg-white hover:text-black">
                                    Read Our Story
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
