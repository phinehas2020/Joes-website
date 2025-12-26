import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorPos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        document.body.classList.add('cursor-active');

        const handleMouseMove = (e) => {
            cursorPos.current = { x: e.clientX, y: e.clientY };
        };

        const animate = () => {
            // Smooth follow with easing
            currentPos.current.x += (cursorPos.current.x - currentPos.current.x) * 0.15;
            currentPos.current.y += (cursorPos.current.y - currentPos.current.y) * 0.15;

            if (cursorRef.current) {
                cursorRef.current.style.left = `${currentPos.current.x}px`;
                cursorRef.current.style.top = `${currentPos.current.y}px`;
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.classList.remove('cursor-active');
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed pointer-events-none z-[10000] w-5 h-5 border-2 border-accent rounded-full mix-blend-difference"
            style={{ transform: 'translate(-50%, -50%)' }}
        />
    );
};

export default CustomCursor;
