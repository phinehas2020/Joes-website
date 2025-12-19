import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="bg-white pt-24 pb-12 border-t border-gray-100">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    <div className="lg:col-span-1">
                        <h2 className="text-3xl font-serif font-semibold mb-8">JOE'S</h2>
                        <p className="text-secondary text-sm leading-relaxed max-w-xs">
                            Handcrafting minimal heritage furniture in our workshop since 1984. Built to last a lifetime.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-8">Navigation</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#collections" className="hover:opacity-50">Collections</a></li>
                            <li><a href="#process" className="hover:opacity-50">Our Process</a></li>
                            <li><a href="#about" className="hover:opacity-50">About Us</a></li>
                            <li><a href="/shipping" className="hover:opacity-50">Shipping & Returns</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-8">Connect</h4>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-accent"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-accent"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-accent"><Facebook size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-8">Newsletter</h4>
                        <p className="text-sm text-secondary mb-6">Join for early access to new collections.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-transparent border-b border-text-primary py-2 text-sm w-full focus:outline-none focus:border-accent transition-colors"
                            />
                            <button type="submit" className="ml-4 text-[10px] uppercase tracking-widest font-bold">Join</button>
                        </form>
                    </div>
                </div>

                <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-secondary">
                        © 2024 Joe's Furniture. All Rights Reserved.
                    </p>
                    <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-secondary">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
