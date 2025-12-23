import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { ArrowLeft, Plus, Minus, Share2, Info } from 'lucide-react';
import { playClickSound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

const ProductDetails = ({ addToCart }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === id);
    const { setTextColor, setLogoColor } = useTheme();
    const [activeImg, setActiveImg] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isLampOn, setIsLampOn] = useState(false);

    // Check if this is the special lamp product to enable the global effect
    const isLampProduct = product?.id === 'luminous-lamp';

    // Default theme (Light Mode) vs Dark Mode (Lamp OFF)
    // The user requested: Lamp OFF = Dark Mode. Lamp ON = Light Mode (Radiating Light).
    // So if isLampProduct is true:
    //   - isLampOn = true -> Light Background (Light is On)
    //   - isLampOn = false -> Dark Background (Light is Off)

    // To achieve the seamless "light radiating" effect, we will use a full-screen overlay.
    const containerRef = useRef(null);

    // Effect to update Global Theme (Navbar visibility)
    useEffect(() => {
        if (isLampProduct) {
            if (isLampOn) {
                setTextColor('text-black');
                setLogoColor('text-black');
            } else {
                setTextColor('text-white');
                setLogoColor('text-white');
            }
        } else {
            // Default reset for other products
            setTextColor('text-black');
            setLogoColor('text-black');
        }

        // Cleanup: Reset to default when leaving page
        return () => {
            setTextColor('text-black');
            setLogoColor('text-black');
        };
    }, [isLampProduct, isLampOn, setTextColor, setLogoColor]);

    if (!product) return <div className="h-screen flex items-center justify-center font-serif text-2xl text-reveal">Product not found.</div>;

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        })
    };

    return (

        <section className={`pt-40 pb-32 min-h-screen relative overflow-hidden transition-colors duration-[1500ms] ${isLampProduct && !isLampOn ? 'bg-[#121212] text-white/90' : 'bg-[#121212] text-black'}`}>

            {/* The Light Ray Layer (Volumetric Soft Burst) */}
            <AnimatePresence>
                {isLampProduct && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: isLampOn ? 1 : 0,
                            scale: isLampOn ? 40 : 0
                        }}
                        transition={{
                            duration: 1.5,
                            ease: [0.22, 1, 0.36, 1] // Custom ease for smooth "burst" feel
                        }}
                        className="absolute z-0 pointer-events-none bg-[#FAF9F6]"
                        style={{
                            top: '50%',
                            left: '20%',
                            width: '10vh', // Start small relative to screen
                            height: '10vh',
                            borderRadius: '50%',
                            // Soft edge mask to make it look like light, not a solid circle
                            maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                            marginTop: '-5vh', // Centering adjustments
                            marginLeft: '-5vh'
                        }}
                    />
                )}
            </AnimatePresence>

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Link to="/" className={`inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold mb-16 hover:text-accent transition-colors group ${isLampProduct && !isLampOn ? 'text-white/60' : 'text-black/60'}`}>
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Collection
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Image Gallery */}
                    <div className="lg:col-span-7 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            ref={containerRef}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            className="relative aspect-video bg-white overflow-hidden cursor-none shadow-2xl"
                        >
                            {/* Main Image Base Layer */}
                            <img
                                src={product.gallery[activeImg]}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms]"
                                style={{ transform: isHovering ? 'scale(1.02)' : 'scale(1)' }}
                            />

                            {/* Lamp ON Layer (Smooth Fade) */}
                            {product.imageOn && activeImg === 0 && (
                                <img
                                    src={product.imageOn}
                                    alt={`${product.name} Lit`}
                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out pointer-events-none ${isLampOn ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ transform: isHovering ? 'scale(1.02)' : 'scale(1)' }}
                                />
                            )}

                            {/* Light Switch for Lamp Product (Only on primary image) */}
                            {product.imageOn && activeImg === 0 && (
                                <button
                                    onClick={() => {
                                        setIsLampOn(!isLampOn);
                                        playClickSound();
                                    }}
                                    className="absolute top-8 right-8 z-30 group"
                                    aria-label="Toggle Light"
                                >
                                    <div className={`w-16 h-28 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl flex flex-col justify-between p-2 transition-colors duration-500 ${isLampOn ? 'bg-black/10' : 'bg-white/10'}`}>
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 rounded-2xl pointer-events-none" />

                                        {/* Screw heads */}
                                        <div className="w-full flex justify-between px-1 opacity-40">
                                            <div className="w-1.5 h-1.5 rounded-full bg-black/50" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-black/50" />
                                        </div>

                                        {/* The Switch Itself */}
                                        <div className="relative w-full h-full flex items-center justify-center my-2">
                                            <div className={`w-8 h-14 bg-[#f0f0f0] rounded shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_-2px_4px_rgba(0,0,0,0.1)] transition-transform duration-200 relative overflow-hidden ${isLampOn ? 'bg-gradient-to-b from-[#e0e0e0] to-white' : 'bg-gradient-to-t from-[#e0e0e0] to-white'}`}>
                                                {/* Toggle Rocker Animation */}
                                                <motion.div
                                                    animate={{ rotateX: isLampOn ? 25 : -25 }}
                                                    className="w-full h-full bg-[#f8f8f8] shadow-inner"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full flex justify-between px-1 opacity-40">
                                            <div className="w-1.5 h-1.5 rounded-full bg-black/50" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-black/50" />
                                        </div>
                                    </div>
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white px-2 py-1 rounded">
                                        {isLampOn ? 'Off' : 'On'}
                                    </span>
                                </button>
                            )}

                            {/* X-Ray Sketch Layer (Only for primary image and if sketch exists) */}
                            {activeImg === 0 && product.sketch && (
                                <>
                                    <div
                                        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                                        style={{
                                            opacity: isHovering ? 1 : 0,
                                            backgroundImage: `url(${product.sketch})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            maskImage: `radial-gradient(circle 140px at ${mousePos.x}% ${mousePos.y}%, black 0%, black 70%, transparent 100%)`,
                                            WebkitMaskImage: `radial-gradient(circle 140px at ${mousePos.x}% ${mousePos.y}%, black 0%, black 70%, transparent 100%)`
                                        }}
                                    />
                                </>
                            )}
                        </motion.div>

                        <div className="grid grid-cols-4 gap-6">
                            {product.gallery.map((img, i) => (
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    className={`aspect-square overflow-hidden border-2 transition-all duration-500 ${activeImg === i ? 'border-accent shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details Info */}
                    <div className="lg:col-span-5 flex flex-col pt-4">
                        <div className="mb-12">
                            <motion.span
                                custom={1} variants={fadeIn} initial="hidden" animate="visible"
                                className="text-[10px] uppercase tracking-[0.5em] text-accent mb-6 block font-bold"
                            >
                                {product.category}
                            </motion.span>
                            <motion.h1
                                custom={2} variants={fadeIn} initial="hidden" animate="visible"
                                className="text-6xl md:text-7xl font-serif mb-6 tracking-tight"
                            >
                                {product.name}
                            </motion.h1>
                            <motion.p
                                custom={3} variants={fadeIn} initial="hidden" animate="visible"
                                className={`text-3xl font-light ${isLampProduct && !isLampOn ? 'text-white/80' : 'text-secondary/80'}`}
                            >
                                {product.price}
                            </motion.p>
                        </div>

                        <div className="mb-16">
                            <motion.p
                                custom={4} variants={fadeIn} initial="hidden" animate="visible"
                                className={`leading-relaxed mb-10 text-xl font-light transition-colors duration-1000 ${isLampProduct && !isLampOn ? 'text-white/60' : 'text-secondary/70'}`}
                            >
                                {product.description}
                            </motion.p>

                            <motion.div
                                custom={5} variants={fadeIn} initial="hidden" animate="visible"
                                className="space-y-6"
                            >
                                <h4 className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black opacity-40">
                                    <Info size={12} /> Details & Materials
                                </h4>
                                <ul className={`grid grid-cols-1 gap-y-3 text-sm transition-colors duration-1000 ${isLampProduct && !isLampOn ? 'text-white/60' : 'text-secondary/80'}`}>
                                    {product.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 border border-accent rounded-full" /> {f}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        <motion.div
                            custom={6} variants={fadeIn} initial="hidden" animate="visible"
                            className="flex flex-col gap-8 mt-auto"
                        >
                            <div className="flex gap-4">
                                <button
                                    onClick={addToCart}
                                    className="btn-primary flex-1 py-6 text-[11px] uppercase tracking-[0.3em] font-black"
                                >
                                    Add to Collection
                                </button>
                                <button className="btn px-8 border-black/5 hover:border-black/20">
                                    <Share2 size={18} />
                                </button>
                            </div>
                            <p className="text-[9px] uppercase tracking-[0.3em] text-secondary/40 text-center font-bold">
                                Hand-rubbed finish • Sustainably harvested • Life-time warranty
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
