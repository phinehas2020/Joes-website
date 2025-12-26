import { useRef, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';

const Marquee = ({
    children,
    speed = 50,
    direction = 'left',
    pauseOnHover = true,
    className = ''
}) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const x = useMotionValue(0);
    const isPaused = useRef(false);

    useAnimationFrame((time, delta) => {
        if (isPaused.current) return;

        const contentWidth = contentRef.current?.offsetWidth || 0;
        const moveAmount = (speed * delta) / 1000;

        if (direction === 'left') {
            x.set(x.get() - moveAmount);
            if (Math.abs(x.get()) >= contentWidth / 2) {
                x.set(0);
            }
        } else {
            x.set(x.get() + moveAmount);
            if (x.get() >= 0) {
                x.set(-contentWidth / 2);
            }
        }
    });

    const handleMouseEnter = () => {
        if (pauseOnHover) isPaused.current = true;
    };

    const handleMouseLeave = () => {
        if (pauseOnHover) isPaused.current = false;
    };

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                ref={contentRef}
                className="flex whitespace-nowrap"
                style={{ x }}
            >
                {/* Duplicate content for seamless loop */}
                {children}
                {children}
            </motion.div>
        </div>
    );
};

// Pre-styled marquee banner component
export const MarqueeBanner = ({
    items = ['Handcrafted', 'Heritage', 'Sustainable', 'Timeless', 'Artisanal'],
    separator = '/',
    speed = 50,
    className = ''
}) => {
    return (
        <div className={`py-6 bg-[#1A1A1A] text-white overflow-hidden ${className}`}>
            <Marquee speed={speed} pauseOnHover={false}>
                <div className="flex items-center gap-8 px-4">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-8">
                            <span className="text-sm md:text-base uppercase tracking-[0.3em] font-light">
                                {item}
                            </span>
                            <span className="text-[#D4A373] text-lg">{separator}</span>
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    );
};

export default Marquee;
