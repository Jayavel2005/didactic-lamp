import React, { useRef, useLayoutEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Neon Nexus",
        description: "A futuristic fintech dashboard built for real-time crypto high-frequency trading.",
        tags: ["React", "D3.js", "WebSockets"],
        year: "2024",
        color: "#1E1E1E",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Zenith OS",
        description: "A spatial computing UI kit meant for the next generation of AR headsets.",
        tags: ["Three.js", "React Fiber", "GLSL"],
        year: "2024",
        color: "#2A2A2A",
        img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
    },
    {
        title: "Aether Lens",
        description: "AI-powered computer vision brand identity and marketing site.",
        tags: ["Next.js", "GSAP", "Locomotive"],
        year: "2023",
        color: "#121212",
        img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Echo Valley",
        description: "An immersive 3D web experience for a virtual music festival.",
        tags: ["WebGL", "Tone.js", "Blender"],
        year: "2023",
        color: "#000000",
        img: "https://images.unsplash.com/photo-1614850523018-c4612c5bda72?q=80&w=2070&auto=format&fit=crop"
    }
];

const Card = ({ project, index, range, targetScale }) => {
    const container = useRef(null);
    const { title, description, tags, year, color, img } = project;
    const scale = 1 - ((projects.length - index) * 0.05);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Scale and Fade effect as it scrolls up
            // We use the parent container as trigger roughly
            // Ideally, we want the card to scale down as it hits the top and next card comes in
            // For now, simpler CSS sticky is handled, we just add entrance feel
        }, container);
        return () => ctx.revert();
    }, []);


    return (
        <div ref={container} className="h-auto lg:h-screen flex items-center justify-center sticky lg:sticky lg:top-0 mb-6 lg:mb-0">
            <div
                className="relative flex flex-col lg:flex-row w-full max-w-[1000px] h-auto lg:h-[60vh] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl origin-top transition-transform duration-500 will-change-transform border border-white/10"
                style={{
                    backgroundColor: color,
                    top: `calc(-5% + ${index * 25}px)`
                }}
            >
                {/* Left Content */}
                <div className="w-full lg:w-2/5 p-6 lg:p-12 flex flex-col justify-between relative z-10 order-2 lg:order-1 bg-inherit">
                    <div className="pt-6 lg:pt-0">
                        <div className="flex items-center gap-3 mb-3 lg:mb-4">
                            <span className="text-[10px] lg:text-xs font-mono text-white/50 border border-white/20 px-2 py-1 lg:px-3 rounded-full uppercase tracking-wider">{year}</span>
                        </div>
                        <h2 className="text-xl lg:text-4xl font-bold text-white mb-2 lg:mb-4 leading-tight">{title}</h2>
                        <p className="text-white/70 text-xs lg:text-base leading-relaxed">{description}</p>
                    </div>

                    <div className="mt-6 lg:mt-8 pb-4 lg:pb-0">
                        <div className="flex flex-wrap gap-2 mb-6 lg:mb-8">
                            {tags.map((tag, i) => (
                                <span key={i} className="text-[10px] lg:text-xs font-medium text-white/40 bg-white/5 px-2 py-1 lg:px-3 lg:py-1.5 rounded-md">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <button className="group flex items-center gap-2 lg:gap-3 text-white font-semibold hover:text-emerald-400 transition-colors text-sm lg:text-base">
                            View Case Study
                            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all">
                                <ArrowUpRight size={14} className="lg:w-4 lg:h-4" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Right Image - HIDDEN ON MOBILE */}
                <div className="hidden lg:block w-full lg:w-3/5 relative h-full overflow-hidden group order-1 lg:order-2">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img
                        src={img}
                        alt={title}
                        className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                </div>
            </div>
        </div>
    )
}

const SelectedWorks = () => {
    const container = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Apply scale effect to cards as they stack
            // Select all card *inner* containers
            const cards = document.querySelectorAll('.sticky > div');

            // We can't easily ScrollTrigger inside the mapping loop without creating refs for all
            // But with sticky CSS, we mostly just need them to stack.
            // The scaling effect is an enhancement.
            // For simplicity and robustness in this format, we'll let CSS Sticky do the heavy lifting
            // and maybe add a simple reveal.
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative w-full bg-[#FAFAF9] rounded-t-[3rem] -mt-10 pt-20 pb-20 z-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20 text-center">
                <h2 className="text-sm font-mono font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">Selected Works</h2>
                <h3 className="text-4xl md:text-7xl font-black text-[#1A332F] text-center tracking-tighter">
                    FEATURED <span className="text-neutral-300">PROJECTS</span>
                </h3>
            </div>

            <div className="w-full px-4 md:px-8">
                {projects.map((project, i) => {
                    const targetScale = 1 - ((projects.length - i) * 0.05);
                    return <Card key={i} index={i} project={project} range={[i * 0.25, 1]} targetScale={targetScale} />
                })}
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-20">
                <button className="px-10 py-5 bg-[#1A332F] text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl flex items-center gap-3">
                    VIEW ALL ARCHIVES <ArrowUpRight size={20} />
                </button>
            </div>
        </section>
    );
};

export default SelectedWorks;
