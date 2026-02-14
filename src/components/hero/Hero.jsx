import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import HeroScene from "./HeroScene";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, Menu } from "lucide-react";

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const imgRef = useRef(null);
    const navRef = useRef(null);

    // --- GSAP Timeline ---
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // 0. Navbar Slide Down
            tl.fromTo(navRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );

            // 1. Anime Character Reveal
            tl.fromTo(imgRef.current,
                { scale: 0.8, opacity: 0, filter: "blur(10px)" },
                { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
                "-=0.5"
            );

            // 2. Title Materialization
            const chars = titleRef.current.querySelectorAll(".anime-char");
            tl.fromTo(chars,
                { opacity: 0, y: 50, rotateX: -90, scale: 0.8 },
                {
                    opacity: 1, y: 0, rotateX: 0, scale: 1,
                    stagger: 0.03, duration: 1.2, ease: "power4.out"
                },
                "-=0.8"
            );

            // 3. Subtitle Cards Slide Up
            const cards = contentRef.current.querySelectorAll(".info-card");
            tl.fromTo(cards,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "back.out(1.2)" },
                "-=0.8"
            );

            // Continuous Floating Animation for Image
            gsap.to(imgRef.current, {
                y: -15,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Custom Split Text Component
    const AnimeText = ({ children, className }) => (
        <span className={`block ${className}`}>
            {children.split("").map((char, index) => (
                <span key={index} className="anime-char inline-block origin-bottom will-change-transform">
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );

    return (
        <div ref={heroRef} className="relative w-full h-screen bg-[#0a0e27] overflow-hidden text-white font-sans selection:bg-cyan-500 selection:text-black">

            {/* 1. LAYER: 3D Scene (Right Side / Full Background) */}
            <div className="absolute inset-0 z-0 opacity-0 animate-[fadeIn_3s_ease-out_1s_forwards]">
                <HeroScene />
            </div>

            {/* 2. LAYER: UI Content */}
            <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col">

                {/* NAVIGATION BAR */}
                <nav ref={navRef} className="h-20 flex items-center justify-end gap-6 border-b border-white/10">

                    {/* Search Pill */}
                    <button className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                        <Search className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
                        <span className="text-xs font-bold tracking-widest text-white/70 group-hover:text-white">SEARCH</span>
                    </button>

                    {/* Menu Button */}
                    <button className="w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300">
                        <Menu className="w-5 h-5" />
                    </button>

                    {/* Profile */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 border-2 border-white/20 hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,255,255,0.3)]" />
                </nav>

                {/* HERO CONTENT AREA */}
                <div className="flex-1 flex flex-col justify-center max-w-[900px]">

                    {/* Anime Character Avatar */}
                    <div ref={imgRef} className="mb-8 w-[120px] h-[120px] rounded-[24px] overflow-hidden border-2 border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.3)]">
                        <img
                            src="https://cdna.artstation.com/p/assets/images/images/055/386/746/large/raiko-art-raikoart-001.jpg?1666874987"
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Main Headline */}
                    <div ref={titleRef} className="mb-8 perspective-[1000px]">
                        <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.95] tracking-tight mix-blend-overlay">
                            <AnimeText>BUILDING</AnimeText>
                            <AnimeText>DIGITAL</AnimeText>
                            <AnimeText className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">FUTURES</AnimeText>
                        </h1>
                    </div>

                    {/* Subtitle Cards */}
                    <div ref={contentRef} className="flex flex-col md:flex-row gap-4 w-full">

                        {/* Card 1: Latest Work */}
                        <div className="info-card min-w-[180px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[20px] p-6 flex flex-col justify-between hover:bg-white/10 transition-colors group cursor-pointer">
                            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300">
                                <ArrowUpRight className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">LATEST</span>
                                <span className="block text-sm font-bold">VIEW WORK</span>
                            </div>
                        </div>

                        {/* Card 2: Main CTA */}
                        <div className="info-card flex-1 bg-gradient-to-br from-black/80 to-[#1a1a2e]/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 shadow-2xl relative overflow-hidden group">

                            {/* Subtle Grid Pattern Overlay */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold leading-none mb-6">
                                    <span className="text-white">CODE. DESIGN.</span><br />
                                    <span className="text-white/40">INNOVATE.</span>
                                </h2>
                                <button className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300">
                                    <span>START PROJECT</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Decorative Tech Icon */}
                            <div className="hidden md:block opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="cyan" strokeWidth="0.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                    <path d="M2 12h20" />
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Hero;
