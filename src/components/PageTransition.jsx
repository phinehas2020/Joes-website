import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        filter: 'blur(10px)',
    },
    enter: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        filter: 'blur(10px)',
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
