import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const ProductCard = ({ product, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            className="group"
        >
            <Link to={`/product/${product.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-white mb-6 group cursor-crosshair">
                    {/* Original Image */}
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
                    />

                    {/* Sketch Overlay (Full Fade Replacement) */}
                    <motion.img
                        src={product.sketch}
                        alt={`${product.name} sketch`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none scale-105"
                        initial={false}
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10" />

                    <button className="absolute bottom-20 left-1/2 -translate-x-1/2 btn bg-white/95 backdrop-blur-sm border-none translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-20 transition-all duration-500 whitespace-nowrap shadow-xl">
                        View Details
                    </button>
                </div>
            </Link>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-secondary mb-1">{product.category}</p>
                    <h3 className="text-xl font-serif">{product.name}</h3>
                </div>
                <p className="font-sans text-sm font-medium">{product.price}</p>
            </div>
        </motion.div>
    );
};

const ProductGrid = () => {
    return (
        <section id="collections" className="section-padding bg-white">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-xl">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-[10px] uppercase tracking-[0.4em] text-secondary block mb-4"
                        >
                            The 2024 Collection
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl"
                        >
                            Timeless designs, <br />
                            <span className="italic font-light">built for generations.</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <button className="text-sm uppercase tracking-widest border-b border-text-primary pb-1 hover:opacity-50">
                            View All Products
                        </button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
