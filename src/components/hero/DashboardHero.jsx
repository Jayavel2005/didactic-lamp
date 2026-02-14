import React, { useRef, useLayoutEffect } from 'react';
import { ArrowUpRight, Code } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingNavbar from '../ui/FloatingNavbar';
import SelectedWorks from './SelectedWorks';
import Magnetic from '../ui/Magnetic';
import heroImg from '../../assets/hero_character.png';

gsap.registerPlugin(ScrollTrigger);

const DashboardHero = ({ startAnimations = false }) => {
    const containerRef = useRef(null);
    const heroCardRef = useRef(null);
    const titleRef = useRef(null);
    const charRef = useRef(null);
    const bottomRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Initial State: Hidden if animations are not starting
            if (!startAnimations) {
                gsap.set(heroCardRef.current, { scale: 0.92, opacity: 0, y: 30 });
                gsap.set(charRef.current, { y: 100, opacity: 0, scale: 1.1 });
                gsap.set(titleRef.current.querySelectorAll('.char'), { y: 100, rotate: 10, opacity: 0 });
                gsap.set(bottomRef.current.children, { y: 40, opacity: 0 });
                return;
            }

            // === ENTRANCE TIMELINE (ON LOAD) ===
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

            // 1. Hero Card Expand
            tl.fromTo(heroCardRef.current,
                { scale: 0.92, opacity: 0, y: 30 },
                { scale: 1, opacity: 1, y: 0, duration: 1.4 }
            )
                // 2. Character Slide Up (Overlapping with Card)
                .fromTo(charRef.current,
                    { y: 100, opacity: 0, scale: 1.1 }, // Starts slightly zoomed
                    { y: 0, opacity: 1, scale: 1, duration: 1.5 },
                    "-=1.0"
                )
                // 3. Title Text Reveal (Staggered Chars)
                .fromTo(titleRef.current.querySelectorAll('.char'),
                    { y: 100, rotate: 10, opacity: 0 },
                    {
                        y: 0,
                        rotate: 0,
                        opacity: 1,
                        stagger: 0.03,
                        duration: 1.2,
                        ease: "power4.out"
                    },
                    "-=1.2"
                )
                // 4. Bottom Widgets Slide Up
                .fromTo(bottomRef.current.children,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.1, duration: 1 },
                    "-=0.8"
                );


            // === SCROLL PARALLAX (EXISTING) ===

            // Layer 1: Background Card (Slowest)
            gsap.to(heroCardRef.current, {
                y: -60,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.2
                }
            });

            // Layer 2: Title Text (Medium speed + Fade)
            gsap.to(titleRef.current, {
                y: -100,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "60% top",
                    scrub: 1
                }
            });

            // Layer 3: Character (Fastest + Scale)
            gsap.to(charRef.current, {
                y: -120,
                scale: 1.05,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // --- BOTTOM WIDGETS MICRO-PARALLAX ---
            gsap.to(bottomRef.current.children, {
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: bottomRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, [startAnimations]);

    const SplitText = ({ children, className }) => (
        <span className={`inline-block ${className}`}>
            {children.split('').map((c, i) => (
                <span key={i} className="char inline-block origin-bottom">
                    {c === ' ' ? '\u00A0' : c}
                </span>
            ))}
        </span>
    );

    return (
        <div
            ref={containerRef}
            className="relative w-full font-sans flex flex-col items-center overflow-x-hidden selection:bg-teal-500 selection:text-white"
        >
            {/* ======= FIXED TOP SPACING HERE (FIXED OVERLAP) ======= */}
            {/* Visual Fix: Increased top padding to pt-32 to clear the fixed navbar properly */}
            <div className="relative z-10 w-full max-w-[1440px] px-4 md:px-8 h-screen pt-32 pb-6 flex flex-col justify-end gap-6">

                {/* ======= HERO CARD (FIXED INNER PADDING) ======= */}
                {/* Refinement: Generous balanced padding, subtle inner shadow, no harsh text clipping */}
                <div
                    ref={heroCardRef}
                    className="relative flex-1 bg-[#487C73] rounded-[2rem] md:rounded-[3rem] 
                     px-8 pt-12 pb-12 md:px-24 md:pt-32 md:pb-24 
                     flex items-center justify-center overflow-hidden 
                     shadow-[0_20px_40px_-10px_rgba(26,51,47,0.3),inset_0_1px_20px_rgba(255,255,255,0.1)]"
                >
                    {/* Depth Layers */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff_0%,transparent_40%)] opacity-10 pointer-events-none" />

                    {/* Headline - Centered & Balanced */}
                    <div ref={titleRef} className="relative z-20 flex flex-col items-center md:items-start text-center md:text-left w-full max-w-5xl mx-auto">
                        <h1
                            className="text-[10vw] md:text-[8vw] leading-[0.9] font-black text-white tracking-tighter opacity-95 drop-shadow-2xl"
                        >
                            <div className="overflow-hidden"><SplitText>BUILDING</SplitText></div>
                            <div className="overflow-hidden md:ml-[15%]"><SplitText>DIGITAL</SplitText></div>
                            <div className="overflow-hidden"><SplitText>FUTURES</SplitText></div>
                        </h1>
                    </div>

                    {/* Character - Refined Position - MOVED TO RIGHT */}
                    <div ref={charRef} className="absolute bottom-0 right-[-10%] md:right-[5%] md:left-auto z-30 w-[60%] md:w-[40%] h-[90%] pointer-events-none opacity-90 mix-blend-normal filter drop-shadow-xl">
                        <img
                            src={heroImg}
                            alt="Anime Character"
                            className="w-full h-full object-cover object-top"
                            style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                        />
                    </div>

                    {/* Background Elements */}
                    <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-white/5 rounded-full blur-[100px] pointer-events-none mix-blend-overlay" />
                </div>

                {/* ======= BOTTOM GRID (UNIFIED SYSTEM) ======= */}
                {/* Visual Fix: Two columns treated equally, aligned tops */}
                <div ref={bottomRef} className="h-auto md:h-[260px] grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-stretch">

                    {/* Latest Work - Increased Padding */}
                    <div
                        onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, rotate: -1, duration: 0.4, ease: "back.out(1.5)" })}
                        onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.4, ease: "power2.out" })}
                        className="bg-[#3A6B63] rounded-[2rem] p-8 flex flex-col justify-between items-center text-white relative overflow-hidden shadow-lg cursor-pointer group"
                    >
                        <div className="w-full flex justify-between items-start z-10">
                            <span className="text-xs font-bold uppercase tracking-widest text-white/70">Latest</span>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full box-content border-2 border-[#3A6B63] animate-pulse" />
                        </div>

                        <div className="w-16 h-16 bg-white/20 rounded-full backdrop-blur-md flex items-center justify-center z-10 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500">
                            <ArrowUpRight className="w-8 h-8 text-white" />
                        </div>

                        <Magnetic>
                            <span className="text-sm font-bold bg-[#1A332F]/50 px-6 py-3 rounded-full z-10 backdrop-blur-md border border-white/5 group-hover:bg-[#1A332F] transition-colors">
                                VIEW WORK
                            </span>
                        </Magnetic>
                    </div>

                    {/* CTA Card - Balanced & Spaced */}
                    <div
                        onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, duration: 0.4, ease: "power2.out" })}
                        onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.4, ease: "power2.out" })}
                        className="bg-[#0D0F11] rounded-[2rem] p-10 md:p-14 flex flex-col md:flex-row items-center md:items-end justify-between relative overflow-hidden shadow-xl cursor-pointer group"
                    >
                        <div className="relative z-10 w-full md:w-auto flex flex-col items-center md:items-start text-center md:text-left h-full justify-between">
                            <h2 className="text-4xl md:text-5xl font-black text-white leading-[0.9] tracking-tight mb-6 md:mb-0 group-hover:translate-x-2 transition-transform duration-500">
                                CODE. DESIGN.<br />
                                <span className="text-neutral-600">INNOVATE.</span>
                            </h2>

                            <Magnetic>
                                <button className="bg-white text-black px-10 py-5 rounded-full font-bold flex items-center gap-3 shadow-xl mt-auto group-hover:scale-105 transition-transform duration-300">
                                    START PROJECT <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                                </button>
                            </Magnetic>
                        </div>

                        {/* Visual Interest */}
                        <div className="relative z-10 hidden md:flex items-center justify-center h-full pr-12">
                            <Code className="w-40 h-40 text-[#487C73] opacity-20 rotate-12 group-hover:rotate-[20deg] group-hover:scale-110 transition-all duration-700 ease-out" />
                        </div>

                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1A332F_0%,transparent_70%)] opacity-30 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHero;
