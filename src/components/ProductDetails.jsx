import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { products } from '../data/products';
import { ArrowLeft, Share2, Info, Power } from 'lucide-react';
import { playClickSound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

// Floating light particles component
const LightParticles = ({ isActive }) => {
    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: 20 + Math.random() * 60,
        y: 10 + Math.random() * 80,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 4,
    }));

    return (
        <AnimatePresence>
            {isActive && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute rounded-full"
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                width: particle.size,
                                height: particle.size,
                                background: 'radial-gradient(circle, rgba(255,250,240,0.9) 0%, rgba(255,200,100,0.4) 100%)',
                                boxShadow: '0 0 10px rgba(255,200,100,0.5)',
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0, 0.8, 0.4, 0.8, 0],
                                scale: [0, 1, 1.2, 1, 0],
                                y: [0, -30, -50, -80, -120],
                                x: [0, Math.random() * 20 - 10, Math.random() * 30 - 15],
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                                duration: particle.duration,
                                repeat: Infinity,
                                delay: particle.delay,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>
            )}
        </AnimatePresence>
    );
};

// Animated light rays component
const LightRays = ({ isActive }) => {
    const rays = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        rotation: (i * 30) - 180,
        length: 80 + Math.random() * 40,
        width: 2 + Math.random() * 3,
        delay: i * 0.05,
    }));

    return (
        <AnimatePresence>
            {isActive && (
                <div className="absolute top-[35%] left-[35%] pointer-events-none z-10">
                    {rays.map((ray) => (
                        <motion.div
                            key={ray.id}
                            className="absolute origin-left"
                            style={{
                                rotate: ray.rotation,
                                width: `${ray.length}vh`,
                                height: ray.width,
                            }}
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{
                                opacity: [0, 0.15, 0.1, 0.15, 0.1],
                                scaleX: 1,
                            }}
                            exit={{ opacity: 0, scaleX: 0 }}
                            transition={{
                                duration: 2,
                                delay: ray.delay,
                                repeat: Infinity,
                                repeatType: 'reverse',
                                ease: 'easeInOut',
                            }}
                        >
                            <div
                                className="w-full h-full"
                                style={{
                                    background: 'linear-gradient(90deg, rgba(255,220,150,0.6) 0%, rgba(255,200,100,0.2) 30%, transparent 100%)',
                                    filter: 'blur(2px)',
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            )}
        </AnimatePresence>
    );
};

// Glow orb behind lamp
const GlowOrb = ({ isActive }) => {
    return (
        <motion.div
            className="absolute top-[20%] left-[25%] w-[50vh] h-[50vh] pointer-events-none z-0"
            animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? [1, 1.1, 1] : 0.8,
            }}
            transition={{
                opacity: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
        >
            <div
                className="w-full h-full rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(255,200,100,0.4) 0%, rgba(255,180,80,0.2) 30%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />
        </motion.div>
    );
};

// Premium toggle switch
const LampSwitch = ({ isOn, onToggle }) => {
    return (
        <motion.button
            onClick={onToggle}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="pointer"
            data-cursor-text={isOn ? 'Off' : 'On'}
        >
            {/* Outer glow when on */}
            <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                    boxShadow: isOn
                        ? '0 0 40px rgba(255,200,100,0.6), 0 0 80px rgba(255,180,80,0.3)'
                        : '0 0 0px transparent',
                }}
                transition={{ duration: 0.5 }}
            />

            {/* Main button */}
            <div className={`relative w-20 h-20 rounded-full border-2 transition-all duration-500 flex items-center justify-center overflow-hidden ${isOn ? 'border-amber-300/50 bg-gradient-to-br from-amber-100 to-amber-200' : 'border-white/20 bg-white/5 backdrop-blur-sm'}`}>
                {/* Inner ring */}
                <div className={`absolute inset-2 rounded-full border transition-all duration-500 ${isOn ? 'border-amber-400/30' : 'border-white/10'}`} />

                {/* Power icon */}
                <motion.div
                    animate={{ rotate: isOn ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Power
                        size={28}
                        strokeWidth={1.5}
                        className={`transition-colors duration-500 ${isOn ? 'text-amber-600' : 'text-white/60'}`}
                    />
                </motion.div>

                {/* Shimmer effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: isOn ? ['-100%', '200%'] : '-100%' }}
                    transition={{ duration: 1.5, repeat: isOn ? Infinity : 0, repeatDelay: 3 }}
                />
            </div>

            {/* Label */}
            <motion.span
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-500 ${isOn ? 'text-amber-600' : 'text-white/40'}`}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {isOn ? 'On' : 'Off'}
            </motion.span>
        </motion.button>
    );
};

const ProductDetails = ({ addToCart }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === id);
    const { setTextColor, setLogoColor, setBackgroundColor } = useTheme();
    const [activeImg, setActiveImg] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isLampOn, setIsLampOn] = useState(false);

    const isLampProduct = product?.id === 'luminous-lamp';
    const containerRef = useRef(null);

    // 3D tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3deg', '-3deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3deg', '3deg']);

    const handleImageMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    const handleImageMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovering(false);
    };

    useEffect(() => {
        if (isLampProduct) {
            if (isLampOn) {
                setTextColor('text-black');
                setLogoColor('text-black');
                setBackgroundColor('#FFFAF0');
            } else {
                setTextColor('text-white');
                setLogoColor('text-white');
                setBackgroundColor('#0a0a0a');
            }
        } else {
            setTextColor('text-black');
            setLogoColor('text-black');
            setBackgroundColor('#FAF9F6');
        }

        return () => {
            setTextColor('text-black');
            setLogoColor('text-black');
            setBackgroundColor('#FAF9F6');
        };
    }, [isLampProduct, isLampOn, setTextColor, setLogoColor, setBackgroundColor]);

    if (!product) return <div className="h-screen flex items-center justify-center font-serif text-2xl">Product not found.</div>;

    const handleLampToggle = () => {
        setIsLampOn(!isLampOn);
        playClickSound();
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
        <section className={`pt-40 pb-32 min-h-screen relative overflow-hidden transition-colors duration-1000 ${isLampProduct && !isLampOn ? 'text-white/90' : 'text-black'}`}>

            {/* Ambient effects for lamp */}
            {isLampProduct && (
                <>
                    <GlowOrb isActive={isLampOn} />
                    <LightRays isActive={isLampOn} />

                    {/* Volumetric light burst */}
                    <motion.div
                        className="absolute z-0 pointer-events-none"
                        style={{
                            top: '30%',
                            left: '28%',
                            width: '30vh',
                            height: '30vh',
                        }}
                        animate={{
                            opacity: isLampOn ? 0.8 : 0,
                            scale: isLampOn ? [1, 1.2, 1] : 0.5,
                        }}
                        transition={{
                            opacity: { duration: 1 },
                            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                        }}
                    >
                        <div
                            className="w-full h-full rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(255,230,180,0.8) 0%, rgba(255,200,100,0.3) 40%, transparent 70%)',
                                filter: 'blur(20px)',
                            }}
                        />
                    </motion.div>
                </>
            )}

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Link
                        to="/"
                        className={`inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold mb-16 hover:text-accent transition-colors group ${isLampProduct && !isLampOn ? 'text-white/60' : 'text-black/60'}`}
                        data-cursor="pointer"
                        data-cursor-text="Back"
                    >
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
                            onMouseMove={handleImageMouseMove}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={handleImageMouseLeave}
                            className="relative aspect-[4/3] overflow-hidden cursor-none rounded-sm"
                            style={{
                                perspective: '1000px',
                            }}
                            data-cursor="pointer"
                            data-cursor-text="Explore"
                        >
                            {/* 3D tilting container */}
                            <motion.div
                                className="relative w-full h-full"
                                style={{
                                    rotateX: isLampProduct ? rotateX : 0,
                                    rotateY: isLampProduct ? rotateY : 0,
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                {/* Main Image */}
                                <motion.img
                                    src={product.gallery[activeImg]}
                                    alt={product.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    animate={{
                                        scale: isHovering ? 1.02 : 1,
                                        filter: isLampProduct && isLampOn && activeImg === 0 ? 'brightness(1.1)' : 'brightness(1)',
                                    }}
                                    transition={{ duration: 1.2 }}
                                />

                                {/* Lamp ON overlay */}
                                {product.imageOn && activeImg === 0 && (
                                    <motion.img
                                        src={product.imageOn}
                                        alt={`${product.name} Lit`}
                                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                                        animate={{
                                            opacity: isLampOn ? 1 : 0,
                                            scale: isHovering ? 1.02 : 1,
                                        }}
                                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                )}

                                {/* Floating particles */}
                                {isLampProduct && activeImg === 0 && (
                                    <LightParticles isActive={isLampOn} />
                                )}

                                {/* Light switch for lamp */}
                                {isLampProduct && activeImg === 0 && (
                                    <div className="absolute top-8 right-8 z-30">
                                        <LampSwitch isOn={isLampOn} onToggle={handleLampToggle} />
                                    </div>
                                )}

                                {/* X-Ray Sketch Layer */}
                                {activeImg === 0 && product.sketch && (
                                    <div
                                        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                                        style={{
                                            opacity: isHovering ? 1 : 0,
                                            backgroundImage: `url(${product.sketch})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            maskImage: `radial-gradient(circle 140px at ${mousePos.x}% ${mousePos.y}%, black 0%, black 70%, transparent 100%)`,
                                            WebkitMaskImage: `radial-gradient(circle 140px at ${mousePos.x}% ${mousePos.y}%, black 0%, black 70%, transparent 100%)`,
                                        }}
                                    />
                                )}

                                {/* Ambient light glow overlay for lamp when on */}
                                {isLampProduct && activeImg === 0 && (
                                    <motion.div
                                        className="absolute inset-0 pointer-events-none"
                                        animate={{
                                            opacity: isLampOn ? 1 : 0,
                                        }}
                                        transition={{ duration: 1 }}
                                        style={{
                                            background: 'radial-gradient(ellipse 50% 60% at 45% 35%, rgba(255,220,150,0.15) 0%, transparent 70%)',
                                        }}
                                    />
                                )}

                                {/* Vignette for drama */}
                                {isLampProduct && (
                                    <motion.div
                                        className="absolute inset-0 pointer-events-none"
                                        animate={{
                                            opacity: isLampOn ? 0 : 0.6,
                                        }}
                                        transition={{ duration: 1 }}
                                        style={{
                                            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
                                        }}
                                    />
                                )}
                            </motion.div>
                        </motion.div>

                        {/* Thumbnail gallery */}
                        <div className="grid grid-cols-4 gap-6">
                            {product.gallery.map((img, i) => (
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    className={`aspect-square overflow-hidden border-2 transition-all duration-500 rounded-sm ${activeImg === i
                                        ? isLampProduct && isLampOn
                                            ? 'border-amber-400 shadow-lg shadow-amber-200/30 scale-105'
                                            : 'border-accent shadow-lg scale-105'
                                        : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    data-cursor="pointer"
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:col-span-5 flex flex-col pt-4">
                        <div className="mb-12">
                            <motion.span
                                custom={1} variants={fadeIn} initial="hidden" animate="visible"
                                className={`text-[10px] uppercase tracking-[0.5em] mb-6 block font-bold ${isLampProduct && isLampOn ? 'text-amber-600' : 'text-accent'}`}
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
                                className={`text-3xl font-light transition-colors duration-1000 ${isLampProduct && !isLampOn ? 'text-white/80' : 'text-secondary/80'}`}
                            >
                                {product.price}
                            </motion.p>
                        </div>

                        {/* Lamp status indicator */}
                        {isLampProduct && (
                            <motion.div
                                custom={3.5} variants={fadeIn} initial="hidden" animate="visible"
                                className="mb-8"
                            >
                                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-500 ${isLampOn
                                    ? 'border-amber-300/50 bg-amber-100/20'
                                    : 'border-white/10 bg-white/5'}`}
                                >
                                    <motion.div
                                        className={`w-2 h-2 rounded-full ${isLampOn ? 'bg-amber-400' : 'bg-white/30'}`}
                                        animate={{
                                            scale: isLampOn ? [1, 1.3, 1] : 1,
                                            opacity: isLampOn ? [1, 0.7, 1] : 0.5,
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${isLampOn ? 'text-amber-600' : 'text-white/50'}`}>
                                        {isLampOn ? 'Light Active' : 'Light Inactive'}
                                    </span>
                                </div>
                            </motion.div>
                        )}

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
                                <h4 className={`flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black transition-colors duration-500 ${isLampProduct && !isLampOn ? 'text-white/40' : 'opacity-40'}`}>
                                    <Info size={12} /> Details & Materials
                                </h4>
                                <ul className={`grid grid-cols-1 gap-y-3 text-sm transition-colors duration-1000 ${isLampProduct && !isLampOn ? 'text-white/60' : 'text-secondary/80'}`}>
                                    {product.features.map((f, i) => (
                                        <motion.li
                                            key={i}
                                            className="flex items-center gap-3"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 + i * 0.1 }}
                                        >
                                            <motion.div
                                                className={`w-1.5 h-1.5 rounded-full border ${isLampProduct && isLampOn ? 'border-amber-400 bg-amber-400/30' : 'border-accent'}`}
                                                animate={isLampProduct && isLampOn ? { scale: [1, 1.2, 1] } : {}}
                                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                            />
                                            {f}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        <motion.div
                            custom={6} variants={fadeIn} initial="hidden" animate="visible"
                            className="flex flex-col gap-8 mt-auto"
                        >
                            <div className="flex gap-4">
                                <motion.button
                                    onClick={addToCart}
                                    className={`flex-1 py-6 text-[11px] uppercase tracking-[0.3em] font-black transition-all duration-500 ${isLampProduct && isLampOn
                                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                                        : isLampProduct && !isLampOn
                                            ? 'bg-white text-black hover:bg-white/90'
                                            : 'btn-primary'}`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    data-cursor="pointer"
                                    data-cursor-text="Add"
                                >
                                    Add to Collection
                                </motion.button>
                                <motion.button
                                    className={`px-8 border transition-colors duration-500 ${isLampProduct && !isLampOn
                                        ? 'border-white/20 text-white/60 hover:border-white/40'
                                        : 'border-black/10 hover:border-black/30'}`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    data-cursor="pointer"
                                >
                                    <Share2 size={18} />
                                </motion.button>
                            </div>
                            <p className={`text-[9px] uppercase tracking-[0.3em] text-center font-bold transition-colors duration-500 ${isLampProduct && !isLampOn ? 'text-white/30' : 'text-secondary/40'}`}>
                                {isLampProduct
                                    ? 'Hand-spun steel • Belgian linen • Fabric cord • Dimmable'
                                    : 'Hand-rubbed finish • Sustainably harvested • Life-time warranty'}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
