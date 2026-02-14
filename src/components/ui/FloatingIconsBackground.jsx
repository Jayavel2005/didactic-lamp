import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Code, Terminal, MousePointer2, Layout, PenTool, Sparkles, AppWindow, Cpu } from 'lucide-react';

const icons = [Code, Terminal, MousePointer2, Layout, PenTool, Sparkles, AppWindow, Cpu];

const FloatingIconsBackground = () => {
    const containerRef = useRef(null);
    const iconsRef = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const iconElements = iconsRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Configuration based on screen size
        const iconCount = width < 768 ? 8 : width < 1024 ? 15 : 25;

        // Clear previous icons if any (though React handles DOM, GSAP needs cleanup)
        // We are using a fresh render, but good to be safe with animations

        iconElements.forEach((icon, i) => {
            if (i >= iconCount) {
                if (icon) icon.style.display = 'none';
                return;
            } else {
                if (icon) icon.style.display = 'block';
            }

            // Random Initial Position
            gsap.set(icon, {
                x: Math.random() * width,
                y: Math.random() * height,
                rotation: Math.random() * 360,
                scale: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
                opacity: Math.random() * 0.07 + 0.04 // 0.04 to 0.11 (very subtle)
            });

            // Continuous Floating Motion
            const randomDuration = Math.random() * 20 + 20; // 20-40s duration
            const randomX = (Math.random() - 0.5) * 200; // -100 to 100
            const randomY = (Math.random() - 0.5) * 200; // -100 to 100

            // Floating
            gsap.to(icon, {
                x: `+=${randomX}`,
                y: `+=${randomY}`,
                rotation: `+=${Math.random() * 60 - 30}`,
                duration: randomDuration,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });

            // Pulse opacity slightly
            gsap.to(icon, {
                opacity: `+=${0.03}`,
                duration: Math.random() * 3 + 2,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });

        });

        const handleMouseMove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            iconElements.forEach((icon, i) => {
                if (i >= iconCount || !icon) return;

                const rect = icon.getBoundingClientRect();
                const iconX = rect.left + rect.width / 2;
                const iconY = rect.top + rect.height / 2;

                const dx = mouseX - iconX;
                const dy = mouseY - iconY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 200;

                if (distance < maxDist) {
                    const power = (maxDist - distance) / maxDist;
                    const moveX = -(dx / distance) * power * 30; // Repel by 30px max
                    const moveY = -(dy / distance) * power * 30;

                    gsap.to(icon, {
                        x: `+=${moveX}`,
                        y: `+=${moveY}`,
                        duration: 0.5,
                        overwrite: "auto" // Allow returning to float after interaction
                    });
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            gsap.killTweensOf(iconElements);
        };
    }, []);

    // Create a pool of icons
    const iconPool = [];
    // We create enough for max desktop, CSS/JS hides unused ones
    for (let i = 0; i < 30; i++) {
        const IconComponent = icons[i % icons.length];
        iconPool.push(
            <div
                key={i}
                ref={el => iconsRef.current[i] = el}
                className="absolute pointer-events-none text-emerald-900 mix-blend-multiply dark:text-emerald-500/20"
                style={{ left: 0, top: 0, willChange: "transform, opacity" }}
            >
                <IconComponent size={24} strokeWidth={1} />
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
        >
            {iconPool}
        </div>
    );
};

export default FloatingIconsBackground;
