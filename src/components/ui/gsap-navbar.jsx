import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "../../lib/utils";

export const GsapNavbar = ({ items, className }) => {
    const containerRef = useRef(null);
    const linksRef = useRef([]);

    useGSAP(() => {
        // Initial entry animation
        gsap.from(containerRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            delay: 0.5,
        });

        // Staggered links entry
        gsap.from(linksRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 0.8,
        });
    }, { scope: containerRef });

    const handleMouseEnter = (index) => {
        gsap.to(linksRef.current[index], {
            scale: 1.2,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = (index) => {
        gsap.to(linksRef.current[index], {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200/20 bg-white/10 backdrop-blur-md shadow-lg dark:bg-black/10 dark:border-white/10",
                className
            )}
        >
            {items.map((item, index) => (
                <a
                    key={item.title}
                    href={item.href}
                    ref={(el) => (linksRef.current[index] = el)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 text-neutral-600 dark:text-neutral-300 transition-colors"
                    title={item.title}
                >
                    <div className="w-5 h-5">{item.icon}</div>
                    {/* Tooltip-like label appearing on hover could be added here or handled via GSAP too, but keeping it simple for stability first */}
                </a>
            ))}
        </div>
    );
};
