import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const ProductCard = ({ product, index }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };



    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
        >
            <Link to={`/product/${product.id}`}>
                <div className="relative aspect-video overflow-hidden bg-[#F3F3F3] mb-8 group cursor-none rounded-sm shadow-luxury hover:shadow-luxury-lg transition-shadow duration-500">


                    {/* Glow Border Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
                        <div className="absolute inset-0 border-2 border-accent/30 rounded-sm" />
                    </div>

                    {/* Original Image */}
                    <motion.img
                        src={product.image}
                        alt={product.name}
                        style={{
                            transform: "translateZ(50px)",
                        }}
                        className="w-full h-full object-cover transition-all duration-[1200ms] ease-in-out group-hover:scale-110 group-hover:opacity-0"
                    />

                    {/* Overlay Image (Sketch or On State) */}
                    {(product.sketch || product.imageOn) && (
                        <motion.img
                            src={product.sketch || product.imageOn}
                            alt={`${product.name} alternate view`}
                            style={{
                                transform: "translateZ(75px)",
                            }}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-[1200ms] ease-in-out pointer-events-none scale-110"
                        />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    {/* View Button */}
                    <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
                        style={{ transform: "translateZ(100px)" }}
                    >
                        <motion.div
                            className="w-24 h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[10px] uppercase tracking-widest font-bold text-black border border-black/10 shadow-2xl"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1.1 }}
                            animate={{ scale: 0 }}
                            transition={{ duration: 0.5, ease: "backOut" }}
                            style={{ scale: 0 }}
                        >
                            <motion.span
                                className="group-hover:scale-100"
                                initial={{ scale: 0 }}
                                animate={{ scale: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                View
                            </motion.span>
                        </motion.div>
                    </div>

                    {/* Shimmer Effect on Hover */}
                    <motion.div
                        className="absolute inset-0 bg-shimmer opacity-0 group-hover:opacity-100 pointer-events-none z-20"
                        animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            </Link>
            <div className="flex justify-between items-start pt-2">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-2 opacity-60 group-hover:opacity-100 transition-opacity">{product.category}</p>
                    <h3 className="text-2xl font-serif tracking-tight group-hover:text-accent transition-colors duration-300">{product.name}</h3>
                </div>
                <p className="font-sans text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">{product.price}</p>
            </div>
        </motion.div>
    );
};

const ProductGrid = () => {
    return (
        <section id="collections" className="section-padding bg-white relative">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-8">
                    <div className="max-w-xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-[10px] uppercase tracking-[0.5em] text-accent block mb-6 font-semibold"
                        >
                            The 2024 Collection
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-5xl md:text-7xl leading-[1.1]"
                        >
                            Timeless designs, <br />
                            <span className="italic font-light text-secondary/60">built for generations.</span>
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
