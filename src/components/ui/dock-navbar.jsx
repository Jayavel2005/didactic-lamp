import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "../../lib/utils";

export const DockNavbar = ({ items, className }) => {
    const containerRef = useRef(null);
    const iconsRef = useRef([]);
    // Mouse x position relative to viewport
    const mouseX = useRef(null);

    // Responsive check
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useGSAP(() => {
        // Initial entry animation
        gsap.from(containerRef.current, {
            y: 100,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.2,
            ease: "power4.out",
            delay: 0.2,
        });

        // Staggered icons entry
        gsap.from(iconsRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)",
            delay: 0.5,
        });

        // Idle float animation
        gsap.to(containerRef.current, {
            y: "-=5",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.5 // Start after entry
        });

    }, { scope: containerRef });

    const handleMouseMove = (e) => {
        if (isMobile) return;

        mouseX.current = e.clientX;

        iconsRef.current.forEach((icon) => {
            if (!icon) return;
            const rect = icon.getBoundingClientRect();
            const iconCenterX = rect.left + rect.width / 2;
            const distance = Math.abs(mouseX.current - iconCenterX);

            // Map distance to scale
            // Close: 1.5, Medium: 1.25, Far: 1.0
            // Distance range: [0, 150] -> Scale range: [1.5, 1.0]
            const scale = gsap.utils.mapRange(0, 150, 1.6, 1, distance);
            const clampedScale = gsap.utils.clamp(1, 1.6, scale); // Ensure it doesn't go below 1 or above 1.6

            gsap.to(icon, {
                scale: clampedScale,
                duration: 0.3,
                ease: "power3.out",
                overwrite: "auto" // Important to prevent conflict with other tweens
            });
        });
    };

    const handleMouseLeave = () => {
        mouseX.current = null;
        iconsRef.current.forEach((icon) => {
            gsap.to(icon, {
                scale: 1,
                y: 0, // Reset any lift
                duration: 0.5,
                ease: "elastic.out(1, 0.4)",
                overwrite: "auto"
            });
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-end gap-3 px-4 pb-3 pt-3 rounded-2xl bg-neutral-900/40 backdrop-blur-2xl border border-white/10 shadow-lg shadow-black/10 origin-bottom", // origin-bottom important for scale from bottom
                className
            )}
            style={{
                // Ensure it feels like a dock
                height: "fit-content",
            }}
        >
            {items.map((item, index) => (
                <DockIcon
                    key={item.title}
                    item={item}
                    ref={(el) => (iconsRef.current[index] = el)}
                />
            ))}
        </div>
    );
};

const DockIcon = React.forwardRef(({ item }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const tooltipRef = useRef(null);

    // Separate GSAP context for internal icon animations if needed, 
    // but main scale is handled by parent. 
    // Here we handle tooltip and click effect.

    useGSAP(() => {
        if (isHovered) {
            gsap.to(tooltipRef.current, {
                opacity: 1,
                y: -10,
                duration: 0.2,
                ease: "power2.out"
            });
            // Lift icon slightly on simple hover (in addition to wave)
            if (ref.current) {
                gsap.to(ref.current, {
                    y: -8,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }

        } else {
            gsap.to(tooltipRef.current, {
                opacity: 0,
                y: 0,
                duration: 0.2,
                ease: "power2.in"
            });
            // Return y handled by parent mouseLeave, but we can do a local reset for just this icon leaving
            // wait.. parent loop handles all reset on container leave.
            // For individual item leave while still in dock, the wave logic handles scale, but y needs reset if we lift it.
            // The wave logic runs onMouseMove on container.
            // Let's let the wave logic dominate scale.
            // For y-axis lift, we can keep it here.
            if (ref.current) {
                gsap.to(ref.current, {
                    y: 0,
                    duration: 0.3,
                    // ease: "power2.out" // Let parent elastic reset take over if leaving whole dock
                });
            }
        }
    }, [isHovered]);

    const handleClick = (e) => {
        e.preventDefault();
        // Click animation
        gsap.to(ref.current, {
            scale: 0.8,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
            onComplete: () => {
                const element = document.querySelector(item.href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    };

    return (
        <div className="relative flex flex-col items-center">
            {/* Tooltip */}
            <div
                ref={tooltipRef}
                className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800/90 text-neutral-200 text-xs rounded-md border border-neutral-700 opacity-0 pointer-events-none whitespace-nowrap"
            >
                {item.title}
            </div>

            {/* Icon Button */}
            <a
                href={item.href}
                ref={ref}
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/40 border border-white/10 backdrop-blur-sm text-neutral-600 dark:text-neutral-300 transition-colors shadow-sm origin-bottom"
                style={{ willChange: "transform" }}
            >
                <div className="w-5 h-5 pointer-events-none">{item.icon}</div>
            </a>
        </div>
    );
});
DockIcon.displayName = "DockIcon";
