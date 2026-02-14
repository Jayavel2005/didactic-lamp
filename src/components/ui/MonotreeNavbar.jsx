import React from 'react';
import { ChevronDown } from 'lucide-react';

const MonotreeNavbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
            <div className="max-w-[1400px] mx-auto px-6 md:px-8 h-20 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-neutral-900">Monotree</span>
                </div>

                {/* Center Links */}
                <div className="hidden md:flex items-center gap-8">
                    {['Product', 'Why us', 'About us', 'Cases', 'Blog'].map((item) => (
                        <div key={item} className="group relative cursor-pointer py-2">
                            <span className="text-sm font-medium text-neutral-600 group-hover:text-black transition-colors">
                                {item}
                            </span>
                            {item === 'Product' && <ChevronDown className="inline-block ml-1 w-4 h-4 text-neutral-400" />}
                        </div>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <button className="hidden md:block px-5 py-2.5 rounded-lg bg-neutral-100 text-sm font-semibold text-neutral-900 hover:bg-neutral-200 transition-colors">
                        Book a demo
                    </button>

                    <button className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black">
                        English <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default MonotreeNavbar;
