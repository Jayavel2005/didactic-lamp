import React, { useEffect, useRef, useState } from 'react';
import { Star, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MonotreeHero = () => {
    const heroRef = useRef(null);
    const phoneRef = useRef(null);
    const widgetsRef = useRef([]);
    const ctaRef = useRef(null);
    const headlineRef = useRef(null);
    const subtextRef = useRef(null);
    const statsRef = useRef(null);

    // Toggle State for Animation
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        // Auto-toggle animation interval
        const interval = setInterval(() => {
            setIsToggled(prev => !prev);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // === PAGE LOAD ANIMATIONS ===

            // 1. Headline Fade In (from bottom)
            tl.fromTo(headlineRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.0, ease: "power4.out" }
            )
                // 2. Subtext Stagger
                .fromTo(subtextRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.0 },
                    "-=0.8"
                )
                // 3. CTA Slide In (Bounce effect)
                .fromTo(ctaRef.current,
                    { x: -50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" },
                    "-=0.8"
                )
                // 4. Stats Stagger
                .fromTo(statsRef.current.children,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
                    "-=0.8"
                );

            // 5. Right Side Visual Scale In
            gsap.fromTo(phoneRef.current,
                { scale: 0.8, opacity: 0, rotateY: -15 },
                { scale: 1, opacity: 1, rotateY: -15, duration: 1.5, ease: "power4.out", delay: 0.2 }
            );

            // === LOOPING ANIMATIONS ===
            // Floating UI Cards
            widgetsRef.current.forEach((widget, i) => {
                gsap.to(widget, {
                    y: i % 2 === 0 ? -15 : 15, // Alternating direction
                    duration: 2 + i,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            });

            // === SCROLL PARALLAX ===
            gsap.to(phoneRef.current, {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // Gentle Background Gradient Motion
            gsap.to(".bg-gradient-blob", {
                y: 100,
                x: 50,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 2
                }
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative w-full min-h-screen bg-white pt-24 pb-20 px-6 md:px-12 overflow-hidden flex items-center">

            <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">

                {/* Left Content */}
                <div className="flex flex-col gap-8 max-w-xl">
                    <div className="overflow-hidden">
                        <h1 ref={headlineRef} className="text-6xl md:text-8xl font-bold text-neutral-900 tracking-tighter leading-[0.95] opacity-0">
                            Put <span className="relative inline-block z-10">
                                people
                                {/* Underline visual */}
                                <svg className="absolute -bottom-1 left-0 w-full h-4 text-neutral-900 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" />
                                </svg>
                            </span> first.
                        </h1>
                    </div>

                    <p ref={subtextRef} className="text-xl md:text-2xl text-neutral-500 leading-relaxed max-w-md opacity-0 font-medium">
                        Fast, user-friendly and engaging — turn HR into people and culture and streamline your daily operations with your own branded app.
                    </p>

                    <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 w-full max-w-lg opacity-0">
                        <div className="relative flex-1">
                            <input
                                type="email"
                                placeholder="Enter work email"
                                className="w-full h-14 bg-neutral-50 border border-neutral-200 rounded-xl px-6 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-neutral-400 text-lg transition-all"
                            />
                        </div>
                        <button className="h-14 bg-[#86EFAC] text-neutral-900 hover:bg-[#4ADE80] px-10 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-green-300/50 hover:-translate-y-1 active:scale-95 flex items-center justify-center whitespace-nowrap">
                            Book a demo
                        </button>
                    </div>

                    <div ref={statsRef} className="pt-8 border-t border-neutral-100 flex flex-wrap items-center gap-x-12 gap-y-6">
                        <div className="flex flex-col">
                            <h3 className="text-3xl font-bold text-neutral-900 tracking-tight">75.2%</h3>
                            <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">Daily Activity</p>
                        </div>
                        <div className="hidden md:block h-10 w-[2px] bg-neutral-100" />
                        <div className="flex flex-col">
                            <h3 className="text-3xl font-bold text-neutral-900 tracking-tight">~20k</h3>
                            <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">Daily Users</p>
                        </div>
                        <div className="hidden md:block h-10 w-[2px] bg-neutral-100" />
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1 text-black">
                                {[1, 2, 3, 4].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                                <div className="relative w-5 h-5">
                                    <Star className="w-5 h-5 text-neutral-200 fill-neutral-200" />
                                    <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                                        <Star className="w-5 h-5 text-black fill-black" />
                                    </div>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-neutral-900">4.5 Rating</span>
                        </div>
                    </div>
                </div>

                {/* Right Content - 3D Illustration Mockup */}
                <div className="relative h-[700px] w-full flex items-center justify-center perspective-[2000px] pointer-events-none md:pointer-events-auto">

                    {/* Background Blob */}
                    <div className="bg-gradient-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-green-100/50 to-blue-50/50 rounded-full blur-[80px] -z-10" />

                    {/* Main Phone Container */}
                    <div ref={phoneRef} className="relative w-[340px] h-[680px] bg-white rounded-[48px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15),0_0_0_12px_#F5F5F5] transform-style-3d rotate-y-[-15deg] rotate-x-[10deg] transition-transform duration-700 ease-out hover:rotate-y-[-5deg] hover:rotate-x-[5deg]">

                        {/* Screen Content */}
                        <div className="absolute inset-0 bg-neutral-50 rounded-[36px] overflow-hidden flex flex-col p-5 gap-5 border-[4px] border-neutral-100">

                            {/* App Header */}
                            <div className="flex justify-between items-center">
                                <div className="w-8 h-8 rounded-full bg-neutral-200" />
                                <div className="w-24 h-4 bg-neutral-200 rounded-full" />
                                <div className="w-8 h-8 rounded-full bg-neutral-200" />
                            </div>

                            {/* Hero Card inside App */}
                            <div className="w-full h-40 bg-[#1A1A1A] rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xl group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/20 rounded-full blur-2xl translate-x-10 -translate-y-10" />

                                <div className="flex justify-between items-start z-10">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl backdrop-blur-md flex items-center justify-center">
                                        <Check className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div className={`w-12 h-7 rounded-full p-1 transition-colors duration-500 ${isToggled ? 'bg-green-400' : 'bg-white/20'}`}>
                                        <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-500 ${isToggled ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </div>
                                </div>

                                <div className="space-y-2 z-10">
                                    <div className="w-24 h-2 bg-white/20 rounded-full" />
                                    <div className="w-16 h-2 bg-white/10 rounded-full" />
                                </div>
                            </div>

                            {/* Dashboard Rows */}
                            <div className="space-y-3 flex-1">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-10 h-10 rounded-full bg-neutral-100 flex-shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <div className="w-32 h-2.5 bg-neutral-200 rounded-full" />
                                            <div className="w-20 h-2 bg-neutral-100 rounded-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* === FLOATING WIDGET 1 (Right) === */}
                        <div
                            ref={el => widgetsRef.current[0] = el}
                            className="absolute top-[30%] -right-20 bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white/50 w-48 z-20"
                            style={{ transform: 'translateZ(50px)' }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Activity</span>
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                    <div className="w-[70%] h-full bg-neutral-900 rounded-full" />
                                </div>
                                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                    <div className="w-[45%] h-full bg-green-400 rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* === FLOATING WIDGET 2 (Left) === */}
                        <div
                            ref={el => widgetsRef.current[1] = el}
                            className="absolute bottom-[20%] -left-16 bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white/50 w-40 z-20 flex items-center gap-3"
                            style={{ transform: 'translateZ(80px)' }}
                        >
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                <Star className="w-5 h-5 text-green-600 fill-current" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-neutral-900">Top Rated</div>
                                <div className="text-xs text-neutral-400">#1 HR Tool</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    );
};

export default MonotreeHero;
