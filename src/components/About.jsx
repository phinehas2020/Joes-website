import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="section-padding bg-white">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-5">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-[10px] uppercase tracking-[0.4em] text-secondary block mb-6"
                        >
                            The Joe's Story
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl mb-8"
                        >
                            Born from a love for <span className="italic">raw texture</span> and <span className="italic">precise geometry.</span>
                        </motion.h2>
                    </div>

                    <div className="lg:col-start-7 lg:col-span-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-secondary space-y-6"
                        >
                            <p className="text-lg">
                                For over three decades, Joe has been refining the art of the coffee table. What started in a small garage in 1984 has evolved into a studio known for its uncompromising stance on quality and its obsession with the "minimal heritage" aesthetic.
                            </p>
                            <p>
                                We don't follow trends. We observe nature and the way people interact with their living spaces. Our tables are designed to be the quiet anchor of a room—present, powerful, yet unassuming.
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {[
                        { label: 'Founded', value: '1984' },
                        { label: 'Artisans', value: '12' },
                        { label: 'Trees Planted', value: '5k+' },
                        { label: 'Heirlooms Made', value: '2.5k' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <p className="text-3xl font-serif mb-2">{stat.value}</p>
                            <p className="text-[10px] uppercase tracking-widest text-secondary">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
