import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';

const CartSidebar = ({ isOpen, onClose, cartCount }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col p-8"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={24} />
                                <h2 className="text-2xl font-serif font-semibold">Shopping Bag ({cartCount})</h2>
                            </div>
                            <button onClick={onClose} className="hover:rotate-90 transition-transform duration-300">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            {cartCount === 0 ? (
                                <>
                                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-6">
                                        <ShoppingBag size={40} className="text-gray-300" />
                                    </div>
                                    <p className="text-secondary mb-8">Your bag is currently empty.</p>
                                    <button onClick={onClose} className="btn">Continue Shopping</button>
                                </>
                            ) : (
                                <div className="w-full text-left">
                                    <p className="text-sm text-secondary italic mb-8 border-b pb-4">Mock items showing for demonstration purposes.</p>
                                    <div className="space-y-6">
                                        <div className="flex gap-4">
                                            <div className="w-20 h-24 bg-primary flex-shrink-0" />
                                            <div>
                                                <h4 className="font-serif text-lg">Joe's Signature Item</h4>
                                                <p className="text-accent">$2,400.00</p>
                                                <p className="text-[10px] text-secondary mt-2">Quantity: 1</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {cartCount > 0 && (
                            <div className="mt-auto border-t pt-8 space-y-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] uppercase tracking-widest text-secondary font-semibold">Subtotal</span>
                                    <span className="text-2xl font-serif font-semibold">$2,400.00</span>
                                </div>
                                <button className="btn-primary w-full py-5 flex items-center justify-center gap-4 text-sm uppercase tracking-widest">
                                    Checkout Now <ArrowRight size={16} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
