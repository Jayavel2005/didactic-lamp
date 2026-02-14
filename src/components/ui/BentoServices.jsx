import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    { title: "Creative Development", description: "WebGL & Three.js Experiences", col: "col-span-1 md:col-span-2" },
    { title: "UI/UX Design", description: "Figma Mastery", col: "col-span-1" },
    { title: "Performance", description: "Next.js Optimization", col: "col-span-1" },
    { title: "Motion", description: "GSAP & Framer Motion", col: "col-span-1 md:col-span-2" },
];

export const BentoServices = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".bento-item", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
                {services.map((service, i) => (
                    <div
                        key={i}
                        className={`bento-item group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 p-8 hover:bg-neutral-800/50 transition-colors duration-500 ${service.col}`}
                    >
                        <div className="relative z-10 h-full flex flex-col justify-end">
                            <h3 className="text-3xl font-bold text-white mb-2">{service.title}</h3>
                            <p className="text-neutral-400">{service.description}</p>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                ))}
            </div>
        </section>
    );
};
