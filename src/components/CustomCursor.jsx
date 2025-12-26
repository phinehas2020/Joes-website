import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [cursorState, setCursorState] = useState({
        isHovering: false,
        text: '',
        isHidden: false,
    });

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    // Smooth spring animation for cursor position
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = (e) => {
            const target = e.target.closest('[data-cursor]');
            if (target) {
                const cursorType = target.getAttribute('data-cursor');
                const cursorText = target.getAttribute('data-cursor-text') || '';

                if (cursorType === 'hide') {
                    setCursorState({ isHovering: false, text: '', isHidden: true });
                } else {
                    setCursorState({ isHovering: true, text: cursorText, isHidden: false });
                }
            }
        };

        const handleMouseLeave = (e) => {
            const target = e.target.closest('[data-cursor]');
            if (target) {
                setCursorState({ isHovering: false, text: '', isHidden: false });
            }
        };

        // Add hover detection for interactive elements
        const addHoverListeners = () => {
            const interactiveElements = document.querySelectorAll(
                'a, button, [data-cursor], input, textarea, select, [role="button"]'
            );

            interactiveElements.forEach((el) => {
                if (!el.hasAttribute('data-cursor')) {
                    el.setAttribute('data-cursor', 'pointer');
                }
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });

            return () => {
                interactiveElements.forEach((el) => {
                    el.removeEventListener('mouseenter', handleMouseEnter);
                    el.removeEventListener('mouseleave', handleMouseLeave);
                });
            };
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Initial setup and mutation observer for dynamic content
        const cleanup = addHoverListeners();

        const observer = new MutationObserver(() => {
            cleanup();
            addHoverListeners();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cleanup();
            observer.disconnect();
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Outer ring */}
            <motion.div
                className="fixed pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="flex items-center justify-center rounded-full border-2 border-[#D4A373]"
                    animate={{
                        width: cursorState.isHidden ? 0 : cursorState.isHovering ? 80 : 20,
                        height: cursorState.isHidden ? 0 : cursorState.isHovering ? 80 : 20,
                        opacity: cursorState.isHidden ? 0 : 1,
                        backgroundColor: cursorState.isHovering ? 'rgba(212, 163, 115, 0.1)' : 'transparent',
                    }}
                    transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 300,
                        mass: 0.5,
                    }}
                >
                    {/* Cursor text */}
                    <motion.span
                        className="text-[10px] uppercase tracking-[0.15em] text-white font-medium whitespace-nowrap"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: cursorState.text ? 1 : 0,
                            scale: cursorState.text ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {cursorState.text}
                    </motion.span>
                </motion.div>
            </motion.div>

            {/* Inner dot */}
            <motion.div
                className="fixed pointer-events-none z-[10000] w-1 h-1 bg-[#D4A373] rounded-full mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    opacity: cursorState.isHidden ? 0 : cursorState.isHovering ? 0 : 1,
                    scale: cursorState.isHovering ? 0 : 1,
                }}
                transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 300,
                }}
            />
        </>
    );
};

export default CustomCursor;
