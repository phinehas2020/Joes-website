import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { ArrowLeft, Plus, Minus, Share2, Info } from 'lucide-react';

const ProductDetails = ({ addToCart }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === id);
    const [activeImg, setActiveImg] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef(null);

    if (!product) return <div className="h-screen flex items-center justify-center font-serif text-2xl">Product not found.</div>;

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    return (
        <section className="pt-32 pb-24 bg-primary min-h-screen">
            <div className="container">
                <Link to="/" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest mb-12 hover:opacity-50 transition-opacity">
                    <ArrowLeft size={16} /> Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Image Gallery */}
                    <div className="lg:col-span-7 space-y-8">
                        <div
                            ref={containerRef}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            className="relative aspect-[4/5] bg-white overflow-hidden cursor-none"
                        >
                            {/* Main Image */}
                            <img
                                src={product.gallery[activeImg]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />

                            {/* X-Ray Sketch Layer (Only for primary image) */}
                            {activeImg === 0 && (
                                <>
                                    <div
                                        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                                        style={{
                                            opacity: isHovering ? 1 : 0,
                                            backgroundImage: `url(${product.sketch})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            maskImage: `radial-gradient(circle 120px at ${mousePos.x}% ${mousePos.y}%, black 0%, black 70%, transparent 100%)`,
                                            WebkitMaskImage: `radial-gradient(circle 120px at ${mousePos.x}% ${mousePos.y}%, black 0%, black 70%, transparent 100%)`
                                        }}
                                    />

                                    {/* Custom Flashlight Position Tracker (Transparent) */}
                                    <motion.div
                                        animate={{ x: `${mousePos.x}%`, y: `${mousePos.y}%` }}
                                        transition={{ type: 'spring', damping: 35, stiffness: 250, restDelta: 0.001 }}
                                        className="absolute top-0 left-0 w-[1px] h-[1px] pointer-events-none z-20"
                                    />
                                </>
                            )}
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {product.gallery.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    className={`aspect-square overflow-hidden border-2 transition-all ${activeImg === i ? 'border-accent' : 'border-transparent'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details Info */}
                    <div className="lg:col-span-5 flex flex-col pt-4">
                        <div className="mb-8">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-secondary mb-4 block">{product.category}</span>
                            <h1 className="text-5xl md:text-6xl font-serif mb-4">{product.name}</h1>
                            <p className="text-2xl font-light text-accent">{product.price}</p>
                        </div>

                        <div className="mb-12">
                            <p className="text-secondary leading-relaxed mb-8 text-lg">
                                {product.description}
                            </p>

                            <div className="space-y-4">
                                <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold">
                                    <Info size={14} /> Key Features
                                </h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm text-secondary">
                                    {product.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <div className="w-1 h-1 bg-accent rounded-full" /> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 mt-auto">
                            <div className="flex gap-4">
                                <button
                                    onClick={addToCart}
                                    className="btn-primary w-full py-5 text-sm uppercase tracking-[0.2em] font-bold"
                                >
                                    Add to Cart
                                </button>
                                <button className="btn px-6 border-gray-200">
                                    <Share2 size={20} />
                                </button>
                            </div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-secondary text-center">
                                Free shipping on all US orders over $1,500. Handcrafted to order.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
