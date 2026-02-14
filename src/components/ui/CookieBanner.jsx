import React, { useState } from 'react';
import { Cookie } from 'lucide-react';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90%] md:max-w-3xl">
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-200 p-2 md:p-3 flex flex-col md:flex-row items-center gap-4 md:gap-6">

                <div className="flex items-center gap-3 pl-3">
                    <div className="bg-neutral-900 text-white p-2 rounded-full">
                        <Cookie className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-neutral-900 whitespace-nowrap">Cookie Time</span>
                </div>

                <p className="text-sm text-neutral-500 text-center md:text-left flex-1">
                    We use cookies to enhance your experience. Learn more in our <a href="#" className="underline decoration-neutral-300 hover:decoration-neutral-900 hover:text-neutral-900 transition-colors">Cookie Policy</a>.
                </p>

                <div className="flex items-center gap-2 pr-1 w-full md:w-auto">
                    <button
                        onClick={() => setIsVisible(false)}
                        className="flex-1 md:flex-none px-6 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-sm font-semibold text-neutral-900 transition-colors"
                    >
                        Accept
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="flex-1 md:flex-none px-6 py-2 rounded-lg bg-transparent hover:bg-neutral-50 text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                        Reject
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CookieBanner;
