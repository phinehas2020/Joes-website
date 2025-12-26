import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({
    children,
    className = '',
    strength = 0.3,
    radius = 100,
    as = 'button',
    ...props
}) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < radius) {
            const factor = 1 - distance / radius;
            setPosition({
                x: distanceX * strength * factor,
                y: distanceY * strength * factor,
            });
        }
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const Component = motion[as] || motion.button;

    return (
        <Component
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{
                type: 'spring',
                stiffness: 350,
                damping: 15,
                mass: 0.5,
            }}
            data-cursor="pointer"
            data-cursor-text=""
            {...props}
        >
            {children}
        </Component>
    );
};

export default MagneticButton;
