import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const ProductCard = ({ product, index }) => {
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
        >
            <Link to={`/product/${product.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F3F3F3] mb-8 group cursor-none">
                    {/* Original Image */}
                    <motion.img
                        src={product.image}
                        alt={product.name}
                        style={{
                            transform: "translateZ(50px)",
                        }}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-0"
                    />

                    {/* Overlay Image (Sketch or On State) */}
                    {(product.sketch || product.imageOn) && (
                        <motion.img
                            src={product.sketch || product.imageOn}
                            alt={`${product.name} alternate view`}
                            style={{
                                transform: "translateZ(75px)",
                            }}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none scale-110"
                        />
                    )}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10" />

                    <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
                        style={{ transform: "translateZ(100px)" }}
                    >
                        <div className="w-24 h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[10px] uppercase tracking-widest font-bold text-black border border-black/10 shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 ease-out">
                            View
                        </div>
                    </div>
                </div>
            </Link>
            <div className="flex justify-between items-start pt-2">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-2 opacity-60">{product.category}</p>
                    <h3 className="text-2xl font-serif tracking-tight">{product.name}</h3>
                </div>
                <p className="font-sans text-sm font-medium opacity-80">{product.price}</p>
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
