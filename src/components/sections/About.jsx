import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code2, Cpu, Palette } from 'lucide-react';
import Magnetic from '../ui/Magnetic';
import heroImg from '../../assets/hero_character.png';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const storyRef = useRef(null);
    const gridRef = useRef(null);
    const sigRef = useRef(null);
    const closingRef = useRef(null);
    const imageRef = useRef(null); // Added imageRef

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // 1. INTRO HERO (Cinematic Word Stagger)
            const words = titleRef.current.querySelectorAll('.word');
            gsap.fromTo(words,
                { y: 60, opacity: 0, scale: 0.9, rotate: 2 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    stagger: 0.05,
                    duration: 1.6,
                    ease: "expo.out", // Smooth Apple-style ease
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        viewport: { once: true }
                    }
                }
            );

            // 2. STORY SECTION (Parallax & Soft Stagger)
            // Image - Slide & Parallax
            gsap.fromTo(storyRef.current.querySelector('.image-col'),
                { x: -60, opacity: 0, scale: 0.98 },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.8,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: storyRef.current,
                        start: "top 80%",
                        viewport: { once: true }
                    }
                }
            );

            // Text - Soft Stagger
            const textElements = storyRef.current.querySelector('.text-col').children;
            gsap.fromTo(textElements,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: storyRef.current.querySelector('.text-col'),
                        start: "top 80%",
                        viewport: { once: true }
                    }
                }
            );

            // 3. SKILLS GRID (Premium Card Reveal)
            const cards = gridRef.current.children;
            gsap.fromTo(cards,
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    stagger: 0.15,
                    duration: 1.4,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 85%",
                        viewport: { once: true }
                    }
                }
            );

            // 4. PINNED SIGNATURE MOMENT
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sigRef.current,
                    start: "top top",
                    end: "+=2500", // Long scroll distance
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });

            // Sequence
            tl.fromTo(sigRef.current.querySelector('.step-1'),
                { opacity: 0, filter: "blur(20px)", scale: 0.8 },
                { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1, ease: "none" }
            )
                .to(sigRef.current.querySelector('.step-1'),
                    { opacity: 0, filter: "blur(20px)", scale: 1.2, duration: 1, ease: "none" },
                    "+=0.5"
                )
                .fromTo(sigRef.current.querySelector('.step-2'),
                    { opacity: 0, filter: "blur(20px)", scale: 0.8 },
                    { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1, ease: "none" },
                    "-=0.2"
                );

            // Background Pulse
            gsap.to(sigRef.current.querySelector('.bg-glow'), {
                scale: 1.5,
                opacity: 0.8,
                ease: "none",
                scrollTrigger: {
                    trigger: sigRef.current,
                    start: "top top",
                    end: "+=2500",
                    scrub: 1
                }
            });

            // 5. CLOSING (Quiet Confidence)
            gsap.fromTo(closingRef.current,
                { scale: 0.95, opacity: 0, y: 30 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: closingRef.current,
                        start: "top 85%",
                        viewport: { once: true }
                    }
                }
            );

            // === PLAY STORE WAVE ANIMATION ===
            gsap.to(".wave-ring", {
                scale: 1.5,
                opacity: 0,
                duration: 2.5,
                stagger: {
                    each: 0.8,
                    repeat: -1
                },
                ease: "power1.out"
            });

            // Pulse on Image
            gsap.to(imageRef.current, {
                boxShadow: "0 0 40px rgba(74, 222, 128, 0.2)",
                duration: 1.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Helper for splitting text into words
    const splitWords = (text) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="word inline-block mr-[0.2em] will-change-transform">
                {word}
            </span>
        ));
    };

    return (
        <section ref={containerRef} className="relative w-full bg-[#FAFAF9] overflow-hidden">
            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />

            {/* 1. INTRO HERO */}
            <div className="relative min-h-[90vh] flex items-center justify-center px-6 md:px-20">
                <div ref={titleRef} className="max-w-5xl text-center">
                    <h1 className="text-5xl md:text-8xl font-[350] tracking-tight text-[#1A332F] leading-[1.1]">
                        {splitWords("Hi, I build digital experiences that feel")}
                        <span className="word inline-block font-[550] italic text-teal-700 will-change-transform">human.</span>
                    </h1>
                </div>
            </div>

            {/* 2. WHO I AM (Story) */}
            <div ref={storyRef} className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-40 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-center">
                {/* Left: Image / Abstract - UPDATED WITH PLAY STORE WAVE ANIMATION */}
                <div className="image-col relative aspect-square max-w-[500px] mx-auto md:mx-0 flex items-center justify-center">

                    {/* WAVE ANIMATION CONTAINER (Behind Image) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Wave Rings - Animated via GSAP */}
                        <div className="wave-ring absolute w-[70vw] h-[70vw] max-w-[350px] max-h-[350px] rounded-full border-2 border-[#4ade80]" />
                        <div className="wave-ring absolute w-[70vw] h-[70vw] max-w-[350px] max-h-[350px] rounded-full border-2 border-[#2dd4bf]/80" />
                        <div className="wave-ring absolute w-[70vw] h-[70vw] max-w-[350px] max-h-[350px] rounded-full border border-[#4ade80]/60" />
                    </div>

                    {/* Profile Image Container */}
                    <div ref={imageRef} className="relative w-[68vw] h-[68vw] max-w-[340px] max-h-[340px] rounded-full overflow-hidden shadow-2xl z-10 group">
                        <div className="absolute inset-0 bg-[#E8EAE9]" />
                        <img
                            src={heroImg}
                            alt="Portrait"
                            className="w-full h-full object-cover object-top grayscale-0 opacity-100 transition-transform duration-[2s] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A332F]/60 to-transparent mix-blend-multiply" />
                    </div>
                </div>

                {/* Right: Text */}
                <div className="text-col">
                    <h2 className="text-xs font-mono font-bold tracking-[0.2em] text-teal-600 uppercase mb-8">Who I Am</h2>
                    <p className="text-2xl md:text-4xl text-[#1A332F] font-light leading-snug mb-8">
                        I’m a creative engineer blending design, motion, and code to craft meaningful digital experiences.
                    </p>
                    <p className="text-lg text-neutral-500 leading-relaxed max-w-md">
                        Beyond the pixels, I believe in software that respects the user's time and attention. I focus on micro-interactions, fluid navigations, and accessible design systems.
                    </p>
                </div>
            </div>

            {/* 3. SKILLS / DNA */}
            <div className="max-w-7xl mx-auto px-6 md:px-20 py-20">
                <div className="mb-20 border-b border-gray-200 pb-8">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-teal-600 uppercase">My DNA</span>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="group relative bg-[#F5F5F0] p-10 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-500 ring-1 ring-black/5">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-transform duration-500">
                            <Palette className="w-5 h-5 text-teal-700" />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#1A332F] mb-3">Design</h3>
                        <p className="text-neutral-500 leading-relaxed">Thoughtful UI & UX that prioritizes clarity, whitespace, and typographic rhythm.</p>

                        <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <ArrowUpRight className="w-5 h-5 text-teal-500" />
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="group relative bg-[#F5F5F0] p-10 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-500 ring-1 ring-black/5 md:translate-y-12">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-transform duration-500">
                            <Cpu className="w-5 h-5 text-teal-700" />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#1A332F] mb-3">Motion</h3>
                        <p className="text-neutral-500 leading-relaxed">Cinematic interactions with GSAP that guide the eye and tell a story.</p>

                        <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <ArrowUpRight className="w-5 h-5 text-teal-500" />
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group relative bg-[#F5F5F0] p-10 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-500 ring-1 ring-black/5">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-transform duration-500">
                            <Code2 className="w-5 h-5 text-teal-700" />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#1A332F] mb-3">Code</h3>
                        <p className="text-neutral-500 leading-relaxed">High-quality React experiences built for performance, scale, and accessibility.</p>

                        <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <ArrowUpRight className="w-5 h-5 text-teal-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. PINNED SIGNATURE MOMENT */}
            <div ref={sigRef} className="relative h-screen w-full flex items-center justify-center bg-white overflow-hidden">
                {/* Text 1 */}
                <h2 className="step-1 absolute z-20 text-4xl sm:text-6xl md:text-9xl font-black text-[#1A332F] text-center tracking-tighter opacity-0 leading-[0.9]">
                    CODE WITH<br /><span className="text-teal-600">INTENTION.</span>
                </h2>
                {/* Text 2 */}
                <h2 className="step-2 absolute z-20 text-4xl sm:text-6xl md:text-9xl font-black text-[#1A332F] text-center tracking-tighter opacity-0 leading-[0.9]">
                    DESIGN WITH<br /><span className="text-teal-600">EMOTION.</span>
                </h2>

                {/* Bg elements */}
                <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-teal-500/10 rounded-full blur-[100px]" />
            </div>

            {/* 5. CLOSING */}
            <div ref={closingRef} className="py-32 px-6 flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl md:text-5xl font-light text-[#1A332F] mb-10 tracking-tight">
                    Let’s build something <span className="font-serif italic text-teal-700">meaningful.</span>
                </h2>
                <Magnetic>
                    <button className="group relative px-8 py-4 bg-[#1A332F] text-white rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        <span className="relative z-10 flex items-center gap-2 font-medium tracking-wide">
                            Start a Conversation
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </Magnetic>
            </div>

        </section>
    );
};

export default About;
