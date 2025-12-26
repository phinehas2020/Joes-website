import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const duration = 2000;
        const interval = 20;
        const steps = duration / interval;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            // Eased progress for more natural feel
            const easedProgress = 1 - Math.pow(1 - currentStep / steps, 3);
            setProgress(Math.min(easedProgress * 100, 100));

            if (currentStep >= steps) {
                clearInterval(timer);
                setTimeout(() => {
                    setIsComplete(true);
                    setTimeout(onComplete, 800);
                }, 300);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 z-[10001] flex flex-col items-center justify-center bg-[#FAF9F6]"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                    }}
                >
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-12"
                    >
                        <h1 className="font-serif text-4xl md:text-5xl tracking-[0.3em] text-[#1A1A1A]">
                            JOE'S
                        </h1>
                        <p className="text-center text-xs tracking-[0.4em] text-[#4A4A4A] mt-2">
                            FURNITURE
                        </p>
                    </motion.div>

                    {/* Progress bar */}
                    <div className="w-48 h-[1px] bg-[#E5E5E5] overflow-hidden">
                        <motion.div
                            className="h-full bg-[#D4A373]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: 'linear' }}
                        />
                    </div>

                    {/* Progress number */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 text-xs tracking-[0.3em] text-[#4A4A4A] font-light"
                    >
                        {Math.round(progress)}%
                    </motion.p>

                    {/* Animated line decoration */}
                    <motion.div
                        className="absolute bottom-20 left-1/2 -translate-x-1/2"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 0.3, scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#D4A373] to-transparent" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
