import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code2, Cpu, Palette, Star, Zap, GitBranch, Terminal, Globe, Figma, Layers, Database, Braces, Rocket, Coffee, Sparkles, MousePointer2, Layout, Server, Package } from 'lucide-react';
import Magnetic from '../ui/Magnetic';

// 3D Asset Imports
import codingIcon   from '../../assets/3D_Coding_Icon-removebg-preview.png';
import futuristic3D from '../../assets/Futuristic_3D_Character-removebg-preview.png';
import minimalist3D from '../../assets/Minimalist_3D_Character-removebg-preview.png';

gsap.registerPlugin(ScrollTrigger);

// ── Floating icon bubble ─────────────────────────────────────────────────────
const FloatingIcon = ({ Icon, style, color = 'text-teal-500', bg = 'bg-white', size = 18, className = '' }) => (
    <div
        className={`floating-icon absolute flex items-center justify-center ${bg} rounded-2xl shadow-lg border border-neutral-100/80 backdrop-blur-sm pointer-events-none select-none will-change-transform ${className}`}
        style={{ width: 52, height: 52, ...style }}
    >
        <Icon size={size} className={color} strokeWidth={1.6} />
    </div>
);

const About = () => {
    const containerRef  = useRef(null);
    const titleRef      = useRef(null);
    const storyRef      = useRef(null);
    const gridRef       = useRef(null);
    const closingRef    = useRef(null);
    const char1Ref      = useRef(null);
    const char2Ref      = useRef(null);
    const codeIconRef   = useRef(null);
    const ring1Ref      = useRef(null);
    const ring2Ref      = useRef(null);
    const glowRef       = useRef(null);
    const heroSectionRef  = useRef(null);
    const iconsLayerRef   = useRef(null);
    const storyImageRef   = useRef(null);
    const storyTextRef    = useRef(null);
    const dnaLabelRef     = useRef(null);
    const closingGhostRef = useRef(null);

    useLayoutEffect(() => {
        // Card tilt listeners live outside gsap.context so they are in scope for cleanup
        const cardCleanups = [];

        const ctx = gsap.context(() => {

            // ── 1. CHARACTERS: Cinematic entrance from sides
            gsap.fromTo(char1Ref.current,
                { x: -120, opacity: 0, rotation: -15 },
                {
                    x: 0, opacity: 1, rotation: 0,
                    duration: 1.8, ease: 'expo.out',
                    scrollTrigger: { trigger: heroSectionRef.current, start: 'top 80%' }
                }
            );
            gsap.fromTo(char2Ref.current,
                { x: 120, opacity: 0, rotation: 15 },
                {
                    x: 0, opacity: 1, rotation: 0,
                    duration: 1.8, ease: 'expo.out', delay: 0.1,
                    scrollTrigger: { trigger: heroSectionRef.current, start: 'top 80%' }
                }
            );

            // ── 2. CHARACTERS: Ambient float loops (after entrance)
            gsap.to(char1Ref.current, {
                y: -28, rotation: 4,
                duration: 3.8, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.8
            });
            gsap.to(char2Ref.current, {
                y: -22, rotation: -3,
                duration: 4.4, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2.0
            });

            // ── 3. CHARACTERS: Scroll-based parallax
            gsap.to(char1Ref.current, {
                yPercent: -40, ease: 'none',
                scrollTrigger: { trigger: heroSectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
            });
            gsap.to(char2Ref.current, {
                yPercent: -25, ease: 'none',
                scrollTrigger: { trigger: heroSectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 }
            });

            // ── 4. WORD STAGGER
            const words = titleRef.current.querySelectorAll('.word');
            gsap.fromTo(words,
                { y: 80, opacity: 0, rotateX: -40, scale: 0.85 },
                { y: 0, opacity: 1, rotateX: 0, scale: 1, stagger: 0.07, duration: 1.5, ease: 'expo.out',
                  scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
            );

            // ── 5. CODING ICON
            gsap.fromTo(codeIconRef.current,
                { scale: 0.5, opacity: 0, rotation: -20 },
                { scale: 1, opacity: 1, rotation: 0, duration: 1.6, ease: 'back.out(1.7)',
                  scrollTrigger: { trigger: storyRef.current, start: 'top 75%' } }
            );
            gsap.to(ring1Ref.current, { rotation: 360, duration: 12, repeat: -1, ease: 'none', transformOrigin: 'center center' });
            gsap.to(ring2Ref.current, { rotation: -360, duration: 18, repeat: -1, ease: 'none', transformOrigin: 'center center' });
            gsap.to(glowRef.current, { scale: 1.3, opacity: 0.18, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
            gsap.to(codeIconRef.current, { y: -18, scale: 1.04, duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.6 });

            // ── 6. STORY TEXT
            gsap.fromTo(storyRef.current.querySelector('.image-col'),
                { x: -60, opacity: 0, scale: 0.94 },
                { x: 0, opacity: 1, scale: 1, duration: 1.8, ease: 'expo.out',
                  scrollTrigger: { trigger: storyRef.current, start: 'top 80%' } }
            );
            gsap.fromTo(Array.from(storyRef.current.querySelector('.text-col').children),
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.14, duration: 1.4, ease: 'power3.out',
                  scrollTrigger: { trigger: storyRef.current.querySelector('.text-col'), start: 'top 80%' } }
            );

            // ── 7. SKILL CARDS: staggered 3D flip-in
            gsap.fromTo(gridRef.current.children,
                { y: 70, opacity: 0, rotateY: 15, scale: 0.9 },
                { y: 0, opacity: 1, rotateY: 0, scale: 1, stagger: 0.15, duration: 1.3, ease: 'expo.out',
                  scrollTrigger: { trigger: gridRef.current, start: 'top 85%' } }
            );

            // ── 9. CLOSING
            gsap.fromTo(closingRef.current,
                { scale: 0.92, opacity: 0, y: 40 },
                { scale: 1, opacity: 1, y: 0, duration: 1.6, ease: 'expo.out',
                  scrollTrigger: { trigger: closingRef.current, start: 'top 88%' } }
            );

            // ── 10. FLOATING ICONS stagger pop-in
            gsap.fromTo('.floating-icon',
                { scale: 0, opacity: 0, rotation: -20 },
                { scale: 1, opacity: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.8)',
                  stagger: { each: 0.08, from: 'random' },
                  scrollTrigger: { trigger: heroSectionRef.current, start: 'top 80%' } }
            );
            document.querySelectorAll('.floating-icon').forEach((el, i) => {
                gsap.to(el, {
                    y: (i % 2 === 0 ? -1 : 1) * (10 + (i % 4) * 4),
                    x: (i % 3 === 0 ? -1 : 1) * (4 + (i % 3) * 3),
                    rotation: (i % 2 === 0 ? 1 : -1) * (3 + i % 4),
                    duration: 2.6 + (i % 5) * 0.6,
                    yoyo: true, repeat: -1, ease: 'sine.inOut', delay: (i * 0.3) % 2
                });
            });

            // ── SCROLL PARALLAX
            gsap.to(titleRef.current, {
                yPercent: -18, ease: 'none',
                scrollTrigger: { trigger: heroSectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
            });
            gsap.to(iconsLayerRef.current, {
                yPercent: -30, ease: 'none',
                scrollTrigger: { trigger: heroSectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
            });
            gsap.to(storyImageRef.current, {
                yPercent: -12, ease: 'none',
                scrollTrigger: { trigger: storyRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
            });
            gsap.to(storyTextRef.current, {
                yPercent: -6, ease: 'none',
                scrollTrigger: { trigger: storyRef.current, start: 'top bottom', end: 'bottom top', scrub: 2.5 }
            });
            gsap.to(dnaLabelRef.current, {
                yPercent: -20, ease: 'none',
                scrollTrigger: { trigger: dnaLabelRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
            });
            gsap.to(closingGhostRef.current, {
                yPercent: -35, ease: 'none',
                scrollTrigger: { trigger: closingRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
            });

            // ── 11. MOUSE PARALLAX (desktop only)
            if (window.innerWidth >= 1024) {
                heroSectionRef.current.addEventListener('mousemove', (e) => {
                    const rect = heroSectionRef.current.getBoundingClientRect();
                    const xN = (e.clientX - rect.left) / rect.width  - 0.5;
                    const yN = (e.clientY - rect.top)  / rect.height - 0.5;
                    gsap.to(char1Ref.current, { x: xN * -40, y: yN * -30, duration: 1,   ease: 'power2.out', overwrite: 'auto' });
                    gsap.to(char2Ref.current, { x: xN * 40,  y: yN * -20, duration: 1,   ease: 'power2.out', overwrite: 'auto' });
                    gsap.to(titleRef.current, { x: xN * 12,  y: yN * 8,   duration: 1.2, ease: 'power2.out', overwrite: 'auto' });
                    document.querySelectorAll('.floating-icon').forEach((el, i) => {
                        const depth = 15 + (i % 5) * 8;
                        gsap.to(el, { x: xN * depth * (i % 2 === 0 ? 1 : -1), y: yN * depth * 0.6, duration: 1, ease: 'power2.out', overwrite: 'auto' });
                    });
                });
            }

        }, containerRef);

        // ── 8. SKILL CARD 3D tilt — outside context so cleanup ref is in scope
        Array.from(gridRef.current.children).forEach(card => {
            const onMove = (e) => {
                const rect = card.getBoundingClientRect();
                const xPct = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
                const yPct = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
                gsap.to(card, { rotateY: xPct * 10, rotateX: -yPct * 8, scale: 1.04, duration: 0.35, ease: 'power2.out', transformPerspective: 900, overwrite: 'auto' });
            };
            const onLeave = () => {
                gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6, ease: 'expo.out', transformPerspective: 900, overwrite: 'auto' });
            };
            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);
            cardCleanups.push(() => {
                card.removeEventListener('mousemove', onMove);
                card.removeEventListener('mouseleave', onLeave);
            });
        });

        return () => {
            cardCleanups.forEach(fn => fn());
            ctx.revert();
        };
    }, []);

    const splitWords = (text) =>
        text.split(' ').map((word, i) => (
            <span key={i} className="word inline-block mr-[0.22em] will-change-transform" style={{ perspective: '600px' }}>
                {word}
            </span>
        ));

    return (
        <section ref={containerRef} className="relative w-full bg-[#FAFAF9] overflow-hidden">

            {/* ───── 1. INTRO HERO ───── */}
            <div
                ref={heroSectionRef}
                className="relative min-h-screen flex items-center justify-center px-6 md:px-20 overflow-hidden"
            >
                {/* Soft ambient gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/60 via-transparent to-emerald-50/40 pointer-events-none" />

                {/* LEFT — Minimalist character */}
                <div
                    ref={char1Ref}
                    className="absolute left-[-6%] sm:left-0 md:left-[3%] bottom-[4%] md:bottom-[10%] w-[140px] sm:w-[200px] md:w-[280px] pointer-events-none select-none z-0 will-change-transform"
                    style={{ filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.12))' }}
                >
                    <img src={minimalist3D} alt="" className="w-full h-auto object-contain" draggable={false} />
                </div>

                {/* RIGHT — Futuristic character */}
                <div
                    ref={char2Ref}
                    className="absolute right-[-6%] sm:right-0 md:right-[3%] bottom-[2%] md:bottom-[8%] w-[160px] sm:w-[220px] md:w-[320px] pointer-events-none select-none z-0 will-change-transform"
                    style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.14))' }}
                >
                    <img src={futuristic3D} alt="" className="w-full h-auto object-contain scale-x-[-1]" draggable={false} />
                </div>

                {/* ── FLOATING LUCIDE ICONS ── wrapped in a parallax layer */}
                <div ref={iconsLayerRef} className="absolute inset-0 pointer-events-none">
                    {/* Top-left cluster */}
                    <FloatingIcon Icon={Terminal}      style={{ top: '8%',  left: '6%' }}   color="text-slate-600" />
                    <FloatingIcon Icon={GitBranch}     style={{ top: '18%', left: '14%' }}  color="text-orange-500" bg="bg-orange-50" />
                    <FloatingIcon Icon={Braces}        style={{ top: '32%', left: '8%' }}   color="text-violet-500" bg="bg-violet-50" />
                    <FloatingIcon Icon={Coffee}        style={{ top: '50%', left: '4%' }}   color="text-amber-600"  bg="bg-amber-50" />

                    {/* Top-right cluster */}
                    <FloatingIcon Icon={Globe}         style={{ top: '7%',  right: '8%' }}  color="text-sky-500"    bg="bg-sky-50" />
                    <FloatingIcon Icon={Figma}         style={{ top: '20%', right: '16%' }} color="text-pink-500"   bg="bg-pink-50" />
                    <FloatingIcon Icon={Layers}        style={{ top: '36%', right: '6%' }}  color="text-indigo-500" bg="bg-indigo-50" />
                    <FloatingIcon Icon={Sparkles}      style={{ top: '52%', right: '12%' }} color="text-yellow-500" bg="bg-yellow-50" />

                    {/* Mid scattered */}
                    <FloatingIcon Icon={Database}      style={{ top: '12%', left: '35%' }}  color="text-teal-600"   bg="bg-teal-50" size={16} />
                    <FloatingIcon Icon={Server}        style={{ top: '80%', left: '28%' }}  color="text-slate-500" />
                    <FloatingIcon Icon={MousePointer2} style={{ top: '75%', right: '30%' }} color="text-rose-400"   bg="bg-rose-50" size={16} />
                    <FloatingIcon Icon={Rocket}        style={{ top: '88%', left: '50%' }}  color="text-teal-600"   bg="bg-teal-50" />
                    <FloatingIcon Icon={Package}       style={{ top: '8%',  right: '36%' }} color="text-emerald-500" bg="bg-emerald-50" size={16} />
                    <FloatingIcon Icon={Layout}        style={{ top: '62%', left: '20%' }}  color="text-blue-500"   bg="bg-blue-50" size={16} />
                </div>

                {/* CENTRE — Headline */}
                <div ref={titleRef} className="relative z-10 max-w-4xl text-center" style={{ perspective: '1200px' }}>
                    <div className="inline-flex items-center gap-2 bg-white/70 border border-teal-100 px-4 py-2 rounded-full shadow-sm mb-10 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping opacity-75" />
                        <span className="text-xs font-mono font-bold tracking-[0.2em] text-teal-600 uppercase">02 — About Me</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-[350] tracking-tight text-[#1A332F] leading-[1.1]">
                        {splitWords('Hi, I build digital experiences that feel')}
                        <span className="word inline-block font-[550] italic text-teal-700 will-change-transform">human.</span>
                    </h1>
                </div>
            </div>

            {/* ───── 2. WHO I AM ───── */}
            <div
                ref={storyRef}
                className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center"
            >
                {/* Left: Coding Icon with animated rings */}
                <div ref={storyImageRef} className="image-col relative flex items-center justify-center will-change-transform">
                    <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px] flex items-center justify-center">

                        {/* Background glow */}
                        <div ref={glowRef} className="absolute inset-0 rounded-full bg-teal-400/10 blur-3xl" />

                        {/* Outer spinning dashed ring */}
                        <div
                            ref={ring1Ref}
                            className="absolute inset-0 rounded-full border-2 border-dashed border-teal-300/40"
                            style={{ borderSpacing: '8px' }}
                        />

                        {/* Inner spinning ring with dots */}
                        <div
                            ref={ring2Ref}
                            className="absolute inset-8 rounded-full border border-teal-200/30"
                        >
                            {/* 4 orbiting dots */}
                            {[0, 90, 180, 270].map((deg) => (
                                <div
                                    key={deg}
                                    className="absolute w-2.5 h-2.5 bg-teal-400 rounded-full shadow-md shadow-teal-300"
                                    style={{
                                        top: '50%', left: '50%',
                                        transform: `rotate(${deg}deg) translateX(calc(50% + 2px)) translate(-50%, -50%)`
                                    }}
                                />
                            ))}
                        </div>

                        {/* Static inner halo */}
                        <div className="absolute inset-16 rounded-full border border-teal-100/40" />

                        {/* 3D Coding Icon — main subject */}
                        <div ref={codeIconRef} className="relative z-10 w-[180px] md:w-[260px] will-change-transform">
                            <img
                                src={codingIcon}
                                alt="3D Coding Icon"
                                className="w-full h-auto object-contain"
                                style={{ filter: 'drop-shadow(0 30px 50px rgba(0,200,150,0.25))' }}
                                draggable={false}
                            />
                        </div>

                        {/* Floating pill badges */}
                        <div className="absolute top-4 right-0 md:-right-10 bg-white shadow-xl border border-neutral-100 rounded-2xl px-4 py-2.5 flex items-center gap-2 animate-bounce" style={{ animationDuration: '3s' }}>
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                            <span className="text-xs font-bold text-neutral-700 tracking-wide">Available</span>
                        </div>
                        <div className="absolute top-[30%] left-0 md:-left-12 bg-white shadow-xl border border-neutral-100 rounded-2xl px-4 py-2.5 flex items-center gap-2" style={{ animation: 'bounce 4s ease-in-out infinite 1s' }}>
                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />
                            <span className="text-xs font-bold text-neutral-700">5.0 Rating</span>
                        </div>
                        <div className="absolute bottom-6 left-0 md:-left-10 bg-[#1A332F] text-white rounded-2xl px-4 py-2.5 shadow-2xl" style={{ animation: 'bounce 5s ease-in-out infinite 0.5s' }}>
                            <span className="text-xs font-bold tracking-wide flex items-center gap-1.5">
                                <Zap className="w-3 h-3 text-teal-400" /> React · GSAP · Node
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right: Text */}
                <div ref={storyTextRef} className="text-col will-change-transform">
                    <h2 className="text-xs font-mono font-bold tracking-[0.2em] text-teal-600 uppercase mb-6">Who I Am</h2>
                    <p className="text-2xl md:text-4xl text-[#1A332F] font-light leading-snug mb-8">
                        I'm a creative engineer blending design, motion, and code to craft meaningful digital experiences.
                    </p>
                    <p className="text-lg text-neutral-500 leading-relaxed max-w-md">
                        Beyond the pixels, I believe in software that respects the user's time and attention — micro-interactions, fluid navigation, and accessible design systems.
                    </p>
                    {/* Stats row */}
                    <div className="mt-10 flex items-center gap-8">
                        {[['10+', 'Projects'], ['5.0', 'Rating'], ['100%', 'Success']].map(([val, label]) => (
                            <div key={label} className="flex flex-col">
                                <span className="text-2xl font-black text-[#1A332F] tracking-tight">{val}</span>
                                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mt-0.5">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ───── 3. SKILLS / DNA ───── */}
            <div className="max-w-7xl mx-auto px-6 md:px-20 py-20">
                <div ref={dnaLabelRef} className="mb-16 border-b border-gray-200 pb-8 flex items-center justify-between will-change-transform">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-teal-600 uppercase">My DNA</span>
                    <div className="hidden md:block w-24 h-24">
                        <img src={futuristic3D} alt="" className="w-full h-full object-contain drop-shadow-xl" draggable={false} />
                    </div>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
                    {/* Card 1 — Design */}
                    <div className="group relative bg-[#F5F5F0] p-10 rounded-[2rem] hover:bg-white hover:shadow-2xl transition-all duration-500 ring-1 ring-black/5 overflow-hidden will-change-transform cursor-default">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                            <Palette className="w-5 h-5 text-teal-700" />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#1A332F] mb-3 group-hover:text-teal-700 transition-colors duration-300">Design</h3>
                        <p className="text-neutral-500 leading-relaxed">Thoughtful UI & UX that prioritizes clarity, whitespace, and typographic rhythm.</p>
                        <div className="mt-6 flex items-center gap-2 text-teal-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                            Explore <ArrowUpRight className="w-4 h-4" />
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-28 h-28 opacity-[0.07] group-hover:opacity-[0.15] group-hover:scale-110 transition-all duration-700 pointer-events-none">
                            <img src={minimalist3D} alt="" className="w-full h-full object-contain" />
                        </div>
                        {/* Shine overlay on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)' }} />
                    </div>

                    {/* Card 2 — Motion */}
                    <div className="group relative bg-[#F5F5F0] p-10 rounded-[2rem] hover:bg-white hover:shadow-2xl transition-all duration-500 ring-1 ring-black/5 md:translate-y-10 overflow-hidden will-change-transform cursor-default">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                            <Cpu className="w-5 h-5 text-teal-700" />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#1A332F] mb-3 group-hover:text-teal-700 transition-colors duration-300">Motion</h3>
                        <p className="text-neutral-500 leading-relaxed">Cinematic interactions with GSAP that guide the eye and tell a story.</p>
                        <div className="mt-6 flex items-center gap-2 text-teal-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                            Explore <ArrowUpRight className="w-4 h-4" />
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-[0.07] group-hover:opacity-[0.15] group-hover:scale-110 transition-all duration-700 pointer-events-none">
                            <img src={futuristic3D} alt="" className="w-full h-full object-contain" />
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)' }} />
                    </div>

                    {/* Card 3 — Code */}
                    <div className="group relative bg-[#F5F5F0] p-10 rounded-[2rem] hover:bg-white hover:shadow-2xl transition-all duration-500 ring-1 ring-black/5 overflow-hidden will-change-transform cursor-default">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                            <Code2 className="w-5 h-5 text-teal-700" />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#1A332F] mb-3 group-hover:text-teal-700 transition-colors duration-300">Code</h3>
                        <p className="text-neutral-500 leading-relaxed">High-quality React experiences built for performance, scale, and accessibility.</p>
                        <div className="mt-6 flex items-center gap-2 text-teal-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                            Explore <ArrowUpRight className="w-4 h-4" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-24 h-24 opacity-[0.10] group-hover:opacity-[0.20] group-hover:scale-110 transition-all duration-700 pointer-events-none">
                            <img src={codingIcon} alt="" className="w-full h-full object-contain" />
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)' }} />
                    </div>
                </div>
            </div>

            {/* ───── 4. CLOSING ───── */}
            <div ref={closingRef} className="relative py-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
                {/* Ghost silhouette */}
                <div ref={closingGhostRef} className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[260px] md:w-[360px] opacity-[0.07] pointer-events-none select-none will-change-transform">
                    <img src={minimalist3D} alt="" className="w-full h-auto object-contain" draggable={false} />
                </div>
                {/* Ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-400/5 rounded-full blur-[100px] pointer-events-none" />

                <h2 className="relative z-10 text-4xl md:text-6xl font-light text-[#1A332F] mb-10 tracking-tight">
                    Let's build something{' '}
                    <span className="font-serif italic text-teal-700">meaningful.</span>
                </h2>
                <Magnetic>
                    <button
                        className="group relative z-10 px-10 py-5 bg-[#1A332F] text-white rounded-full overflow-hidden shadow-2xl hover:shadow-[0_30px_60px_-12px_rgba(20,184,166,0.4)] transition-all duration-500 hover:scale-105"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span className="relative z-10 flex items-center gap-3 font-semibold tracking-wide text-lg">
                            Start a Conversation
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    </button>
                </Magnetic>
            </div>

        </section>
    );
};

export default About;
