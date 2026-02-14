import React from 'react';
import { motion } from 'framer-motion';

export const GlassNav = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6"
        >
            <div className="flex items-center gap-1 backdrop-blur-md bg-white/5 dark:bg-black/20 border border-white/10 px-2 py-2 rounded-full shadow-lg ring-1 ring-white/5">
                {['Work', 'About', 'Contact'].map((item) => (
                    <button
                        key={item}
                        className="relative px-6 py-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
                    >
                        {item}
                    </button>
                ))}

                <div className="mx-2 h-4 w-[1px] bg-white/10" />

                <button className="px-6 py-2 text-sm font-semibold text-white bg-white/10 rounded-full hover:bg-indigo-600 transition-colors">
                    Hire Me
                </button>
            </div>
        </motion.nav>
    );
};
