import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, LayoutTemplate, ArrowRight, Star, CheckCircle } from 'lucide-react';
import Magnetic from '../ui/Magnetic'; // Assuming Magnetic is in ../ui/Magnetic

gsap.registerPlugin(ScrollTrigger);

const ParticleCanvas = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const particleCount = window.innerWidth < 768 ? 150 : 350;

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    vx: (Math.random() - 0.5) * 0.2, // Drifting side to side
                    vy: -Math.random() * 0.5 - 0.1, // Always upward (anti-gravity)
                    size: Math.random() * 2 + 0.5,
                    alpha: Math.random() * 0.5 + 0.1,
                    depth: Math.random(), // 0 = far, 1 = near
                    originalVx: 0,
                    originalVy: 0
                });
                // Initialize velocity memory
                particles[i].originalVx = particles[i].vx;
                particles[i].originalVy = particles[i].vy;
            }
        };

        const draw = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, i) => {
                // Interactive Motion: Mouse proximity speeds up / alters direction
                const dx = p.x - mouseRef.current.x;
                const dy = p.y - mouseRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Repulsion logic
                if (dist < 250) {
                    const angle = Math.atan2(dy, dx);
                    const force = (250 - dist) / 250;
                    // Push away
                    p.vx += Math.cos(angle) * force * 0.05;
                    p.vy += Math.sin(angle) * force * 0.05;
                }

                // Apply velocity (with damping to return to normal)
                p.x += p.vx;
                p.y += p.vy;

                // Friction to return to original state
                p.vx += (p.originalVx - p.vx) * 0.02;
                p.vy += (p.originalVy - p.vy) * 0.02;

                // Wrap around
                if (p.y < -10) p.y = height + 10;
                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;

                // Drawing with Depth
                const opacity = p.alpha * (0.5 + 0.5 * p.depth);
                ctx.beginPath();
                ctx.fillStyle = `rgba(160, 174, 192, ${opacity})`;
                ctx.arc(p.x, p.y, p.size * (0.8 + 0.6 * p.depth), 0, Math.PI * 2);
                ctx.fill();

                // Connections
                for (let j = i + 1; j < Math.min(i + 15, particles.length); j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                    if (dist2 < 100 && Math.abs(p.depth - p2.depth) < 0.2) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(160, 174, 192, ${0.1 * (1 - dist2 / 100) * opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const onMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);

        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-multiply opacity-60" />;
};

const AntiGravityHero = () => {
    const containerRef = useRef(null);
    const nameRef = useRef(null);
    const subRef = useRef(null);
    const ctaRef = useRef(null);
    const orbitGroupRef = useRef(null);
    const underlineRef = useRef(null);
    const virtualCursorRef = useRef(null);
    const browserBtnRef = useRef(null);

    // Split headline for wave animation
    const nameText = "Hi, I'm Jayavel.";
    const nameWords = nameText.split(" ");

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Setup for Mobile/Tablet (Static, no animations)
            // We set everything to visible immediately
            mm.add("(max-width: 1023px)", () => {
                gsap.set([".char-word", subRef.current, ctaRef.current, orbitGroupRef.current.children], {
                    opacity: 1, y: 0, x: 0, scale: 1, rotation: 0, rotateX: 0
                });
                gsap.set(underlineRef.current, { scaleX: 1 });
            });

            // Setup for Desktop (Animations enabled)
            mm.add("(min-width: 1024px)", () => {
                const tl = gsap.timeline();

                // === LOAD ANIMATION ===
                tl.fromTo(".char-word",
                    { y: 50, opacity: 0, rotateX: 45 },
                    { y: 0, opacity: 1, rotateX: 0, stagger: 0.1, duration: 1.2, ease: "power4.out" }
                )
                    .fromTo(subRef.current,
                        { y: 40, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
                        "-=0.8"
                    );

                // Green Underline Draw
                tl.fromTo(underlineRef.current,
                    { scaleX: 0, transformOrigin: "left" },
                    { scaleX: 1, duration: 1.2, ease: "expo.out" },
                    "<"
                );

                // CTA Pop-in
                tl.fromTo(ctaRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" },
                    "-=0.8"
                );

                // Floating Elements Scale In
                gsap.from(orbitGroupRef.current.children, {
                    scale: 0.5,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "back.out(1.2)",
                    delay: 0.3
                });

                // === VIRTUAL CURSOR SIMULATION ===
                const cursorTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
                cursorTl
                    .to(virtualCursorRef.current, { x: -25, y: 35, duration: 1.5, ease: "power2.inOut" })
                    .to(virtualCursorRef.current, { scale: 0.9, duration: 0.15, yoyo: true, repeat: 1 }) // Click
                    .to(browserBtnRef.current, { scale: 0.95, backgroundColor: "#cbd5e1", duration: 0.15, yoyo: true, repeat: 1 }, "<")
                    .to(virtualCursorRef.current, { x: 50, y: -50, duration: 2.5, ease: "sine.inOut" });

                // === ORBITING MOTION ===
                // We animate the INNER elements for the floating loop
                // Update: Include new freelance elements
                const floatingElements = [
                    ".float-browser-inner",
                    ".float-code-inner",
                    ".float-review-inner",
                    ".float-badge-inner"
                ];

                floatingElements.forEach((selector, i) => {
                    gsap.to(selector, {
                        y: -20, // Move up
                        rotation: i % 2 === 0 ? 2 : -2,
                        duration: 3 + i,
                        yoyo: true,
                        repeat: -1,
                        ease: "sine.inOut"
                    });
                });

                const onMouseMove = (e) => {
                    const x = (e.clientX / window.innerWidth - 0.5) * 2;
                    const y = (e.clientY / window.innerHeight - 0.5) * 2;

                    // Parallax text
                    gsap.to(nameRef.current, { x: x * 15, y: y * 15, duration: 1, ease: "power2.out" });
                    gsap.to(subRef.current, { x: x * 10, y: y * 10, duration: 1, ease: "power2.out" });

                    // Floating elements 3D tilt (Apply to the WRAPPERS)
                    Array.from(orbitGroupRef.current.children).forEach((el, index) => {
                        // Reverse direction for depth feel
                        const depth = 20 + (index * 10);
                        gsap.to(el, {
                            rotationY: x * 10,
                            rotationX: -y * 10,
                            x: -x * depth,
                            y: -y * depth,
                            duration: 1.5,
                            ease: "power2.out"
                        });
                    });
                };

                window.addEventListener('mousemove', onMouseMove);
                return () => window.removeEventListener('mousemove', onMouseMove);
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Text Wave Animation Handler
    const handleWordHover = (e) => {
        gsap.to(e.target, { y: -5, color: "#1e293b", duration: 0.2, yoyo: true, repeat: 1 });
    };

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-[#FDFBF9] overflow-hidden flex flex-col justify-center items-center perspective-[1000px]">

            {/* Background Layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FDFBF9] to-[#F3F4F6] pointer-events-none" />
            <ParticleCanvas />

            {/* Orbiting Elements Layer */}
            {/* Orbiting Elements Layer - HIDDEN ON MOBILE/TABLET */}
            <div ref={orbitGroupRef} className="hidden lg:block absolute inset-0 pointer-events-none z-10 w-full max-w-[1400px] mx-auto">
                {/* 1. Floating Browser Window Wrapper */}
                <div className="absolute top-[15%] right-[15%] w-72 h-auto perspective-500 pointer-events-auto">
                    <div className="float-browser-inner bg-white/80 backdrop-blur-xl rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/60 p-4 rotate-3 transform-style-3d cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-500">
                        <div className="flex gap-2 mb-4 opacity-50">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex gap-3">
                                <div className="w-16 h-16 bg-slate-100 rounded-lg" />
                                <div className="flex-1 space-y-2 py-1">
                                    <div className="h-2 w-3/4 bg-slate-200 rounded-full" />
                                    <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
                                </div>
                            </div>
                            <div ref={browserBtnRef} className="w-full h-8 bg-emerald-50 rounded-md flex items-center justify-center text-[10px] text-emerald-600 font-bold tracking-wide">
                                Project Delivered
                            </div>
                        </div>
                        <div ref={virtualCursorRef} className="absolute bottom-[-10px] right-[-10px] drop-shadow-lg z-20 pointer-events-none">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19138L11.7841 12.3673H5.65376Z" fill="#1E293B" stroke="white" strokeWidth="1.5" /></svg>
                        </div>
                    </div>
                </div>

                {/* 2. Code Card Wrapper */}
                <div className="absolute bottom-[20%] left-[10%] w-auto h-auto perspective-500 pointer-events-auto">
                    <div className="float-code-inner bg-[#0f172a]/95 backdrop-blur-md text-slate-300 font-mono text-xs px-5 py-4 rounded-xl shadow-2xl border border-white/10 -rotate-2 hover:scale-105 hover:bg-[#1e293b] transition-all duration-500 cursor-pointer">
                        <div className="flex gap-2 mb-2 border-b border-white/10 pb-2">
                            <span className="text-blue-400">const</span> <span className="text-yellow-200">Freelancer</span> = () ={'>'} {'{'}
                        </div>
                        <div className="pl-4 text-green-400">
                            {'<'}Status <br />
                            &nbsp;&nbsp;available={'{'}true{'}'} <br />
                            &nbsp;&nbsp;rate="hourly" <br />
                            {'/>'}
                        </div>
                        <div>{'}'}</div>
                    </div>
                </div>

                {/* 3. Review Card Wrapper (Replaces UI Card) */}
                <div className="absolute top-[50%] left-[18%] w-auto h-auto perspective-500 pointer-events-auto">
                    <div className="float-review-inner p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center gap-3 rotate-[-5deg] hover:scale-105 transition-transform duration-300 cursor-help">
                        <div className="flex flex-col items-center justify-center bg-yellow-50 w-10 h-10 rounded-full text-yellow-500">
                            <Star size={18} fill="currentColor" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-800">5.0 Rating</div>
                            <div className="text-[10px] text-slate-500 font-medium">"Exceptional delivery!"</div>
                        </div>
                    </div>
                </div>

                {/* 4. Job Success Badge (New) */}
                <div className="absolute bottom-[30%] right-[20%] w-auto h-auto perspective-500 pointer-events-auto">
                    <div className="float-badge-inner py-2 px-4 bg-[#1e293b] text-white rounded-full shadow-xl flex items-center gap-2 rotate-[5deg] hover:scale-110 hover:-rotate-0 transition-all duration-300">
                        <CheckCircle size={14} className="text-green-400" />
                        <span className="text-[10px] font-bold tracking-wide uppercase">100% Job Success</span>
                    </div>
                </div>
            </div>

            {/* Main Typography Layer */}
            <div className="relative z-20 flex flex-col items-center w-full max-w-6xl px-6 text-center md:text-left">
                <div className="w-full flex flex-col md:items-center relative">

                    {/* Freelance Availability Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Available for Freelance</span>
                    </div>

                    {/* Magnetic Headline */}
                    <Magnetic>
                        <h1 ref={nameRef} className="text-[12vw] md:text-[8.5vw] font-black text-slate-900 leading-[0.85] tracking-tighter cursor-default md:-ml-[15%]">
                            {nameWords.map((word, i) => (
                                <span key={i} className="char-word inline-block mr-[0.2em] transform origin-bottom hover:text-slate-700 transition-colors" onMouseEnter={handleWordHover}>
                                    {word}
                                </span>
                            ))}
                        </h1>
                    </Magnetic>

                    {/* Subheadline */}
                    <Magnetic>
                        <div ref={subRef} className="mt-6 md:mt-2 md:ml-[25%] cursor-default">
                            <p className="text-[5vw] md:text-[3.5vw] font-medium text-slate-600 tracking-tight leading-tight">
                                I build <span className="relative inline-block text-slate-900 font-bold group">custom digital
                                    <span ref={underlineRef} className="absolute bottom-0 left-0 w-full h-[0.15em] bg-[#4ade80] rounded-full origin-left opacity-80 group-hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.8)] transition-all duration-300" />
                                </span><br className="hidden md:block" /> client solutions.
                            </p>
                        </div>
                    </Magnetic>

                    {/* CTA Button */}
                    <div ref={ctaRef} className="mt-16 flex flex-col items-center gap-4">
                        <Magnetic>
                            <button
                                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group relative px-10 py-4 rounded-full bg-slate-900 text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 hover:rotate-1 hover:shadow-[0_20px_40px_-10px_rgba(74,222,128,0.4)]"
                            >
                                <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-[#4ade80]/50 transition-colors duration-500" />
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full scale-50 group-hover:scale-100 blur-xl" />
                                <span className="relative z-10 flex items-center gap-3">
                                    View My Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </Magnetic>

                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-sm font-semibold text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-1 group mt-2"
                        >
                            Contact Me <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AntiGravityHero;
