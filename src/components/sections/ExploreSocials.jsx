import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- CANVAS GRID BACKGROUND ---
const GridBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        const gridSize = 24;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.lineWidth = 1;
            
            ctx.beginPath();
            for (let x = 0; x <= canvas.width; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
            }
            for (let y = 0; y <= canvas.height; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }
            ctx.stroke();

            const cols = Math.ceil(canvas.width / gridSize);
            const rows = Math.ceil(canvas.height / gridSize);

            for (let col = 0; col <= cols; col++) {
                for (let row = 0; row <= rows; row++) {
                    const cx = col * gridSize;
                    const cy = row * gridSize;

                    const dx = cx - mouseRef.current.x;
                    const dy = cy - mouseRef.current.y;
                    const distToMouse = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distToMouse < 120) {
                        const intensity = (120 - distToMouse) / 120;
                        ctx.fillStyle = `rgba(0, 200, 150, ${intensity * 0.8})`;
                        ctx.fillRect(cx - 1, cy - 4, 2, 8);
                        ctx.fillRect(cx - 4, cy - 1, 8, 2);
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };
        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};

// --- MAGNETIC SOCIAL ROW ---
const SocialRow = ({ platform, pillBg, pillText, PillIcon, href, index }) => {
    const rowRef = useRef(null);
    const borderRef = useRef(null);
    const staticTextRef = useRef(null);
    const marqueeContainerRef = useRef(null);
    const cursorBadgeRef = useRef(null);

    useEffect(() => {
        gsap.set(cursorBadgeRef.current, { scale: 0, autoAlpha: 0, xPercent: -50, yPercent: -50 });
        gsap.set(marqueeContainerRef.current, { autoAlpha: 0, y: 30, skewY: 2 });
    }, []);

    const handleMouseEnter = (e) => {
        gsap.killTweensOf([borderRef.current, staticTextRef.current, marqueeContainerRef.current, cursorBadgeRef.current]);

        gsap.to(borderRef.current, { scaleX: 1, duration: 0.5, ease: "expo.out" });
        gsap.to(staticTextRef.current, { y: -30, autoAlpha: 0, skewY: -2, duration: 0.4, ease: "power3.inOut" });
        gsap.to(marqueeContainerRef.current, { y: 0, autoAlpha: 1, skewY: 0, duration: 0.6, ease: "back.out(1.2)", delay: 0.1 });
        gsap.to(cursorBadgeRef.current, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(2)" });
        
        const rect = rowRef.current.getBoundingClientRect();
        gsap.to(cursorBadgeRef.current, { 
            x: e.clientX - rect.left, 
            y: e.clientY - rect.top, 
            duration: 0 
        });
    };

    const handleMouseMove = (e) => {
        const rect = rowRef.current.getBoundingClientRect();
        gsap.to(cursorBadgeRef.current, {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto"
        });
    };

    const handleMouseLeave = () => {
        gsap.killTweensOf([borderRef.current, staticTextRef.current, marqueeContainerRef.current, cursorBadgeRef.current]);

        gsap.to(borderRef.current, { scaleX: 0, duration: 0.5, ease: "expo.out" });
        gsap.to(marqueeContainerRef.current, { y: 30, autoAlpha: 0, duration: 0.3, ease: "power3.in" });
        gsap.to(staticTextRef.current, { y: 0, autoAlpha: 1, skewY: 0, duration: 0.5, ease: "back.out(1.2)", delay: 0.1 });
        gsap.to(cursorBadgeRef.current, { scale: 0, autoAlpha: 0, duration: 0.3, ease: "power3.in" });
    };

    return (
        <div 
            ref={rowRef}
            className="social-row relative w-full border-b border-neutral-200 group py-8 md:py-12 cursor-pointer z-10"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => window.open(href, '_blank')}
            style={{ opacity: 0 }}
        >
            <div
                ref={borderRef}
                className="absolute bottom-[-1px] left-0 h-[2px] bg-[#00c896] z-20 origin-left scale-x-0"
            />

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center relative z-10 overflow-hidden h-16 md:h-24">
                <div className="absolute inset-0 flex items-center relative w-full h-full">
                    <h3
                        ref={staticTextRef}
                        className="text-4xl md:text-7xl font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-neutral-300 whitespace-nowrap absolute left-0"
                    >
                        {platform}
                    </h3>
                    
                    <div
                        ref={marqueeContainerRef}
                        className="flex whitespace-nowrap animate-fast-marquee w-max absolute left-0"
                    >
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="flex items-center">
                                <h3 className="text-4xl md:text-7xl font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-[#111111] mr-8 md:mr-16">
                                    {platform}
                                </h3>
                                <span className="text-4xl md:text-7xl font-black tracking-widest text-[#00c896] mr-8 md:mr-16 opacity-60">
                                    {`</>`}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                ref={cursorBadgeRef}
                className={`absolute left-0 top-0 flex items-center gap-2 md:gap-3 px-5 py-3 rounded-full text-white font-bold text-xs md:text-sm whitespace-nowrap shadow-2xl z-50 pointer-events-none ${pillBg}`}
            >
                <span>{pillText}</span>
                <PillIcon className="w-4 h-4" />
            </div>
        </div>
    );
};

// --- PIXEL CROSS ---
const PixelCross = () => (
    <div className="grid grid-cols-3 grid-rows-3 w-8 h-8 gap-[2px]">
        <div className="col-start-2 row-start-1 bg-[#00c896]"></div>
        <div className="col-start-1 row-start-2 bg-[#00c896]"></div>
        <div className="col-start-3 row-start-2 bg-[#00c896]"></div>
        <div className="col-start-2 row-start-3 bg-[#00c896]"></div>
    </div>
);

// --- BOTTOM TICKER ---
const BottomMarquee = () => {
    return (
        <div className="relative w-full overflow-hidden border-t border-neutral-200 bg-[#FAFAF9] py-6 z-10 group cursor-default">
            <div className="flex whitespace-nowrap animate-marquee w-max">
                {[...Array(8)].map((_, i) => (
                    <React.Fragment key={i}>
                        <span className="text-xl md:text-2xl font-black tracking-[0.2em] text-neutral-300 group-hover:text-[#111111] transition-colors duration-500 ml-8 md:ml-12">HELLO!</span>
                        <span className="text-[#00c896] ml-8 md:ml-12 text-xl opacity-50 group-hover:opacity-100 transition-opacity">◆</span>
                        <span className="text-xl md:text-2xl font-black tracking-[0.2em] text-neutral-300 group-hover:text-[#111111] transition-colors duration-500 ml-8 md:ml-12">SAY HELLO</span>
                        <span className="text-[#00c896] ml-8 md:ml-12 text-xl opacity-50 group-hover:opacity-100 transition-opacity">◆</span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

// --- MAIN SECTION ---
const ExploreSocials = () => {
    const sectionRef = useRef(null);
    const flashlightRef = useRef(null);

    useEffect(() => {
        gsap.set(flashlightRef.current, { xPercent: -50, yPercent: -50 });

        const ctx = gsap.context(() => {
            gsap.fromTo(".reveal-word", 
                { y: 100, opacity: 0, rotateX: -45 },
                { 
                    y: 0, opacity: 1, rotateX: 0, 
                    duration: 1.2, 
                    stagger: 0.1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );

            gsap.fromTo(".pixel-cross",
                { scale: 0, rotation: -90 },
                {
                    scale: 1, rotation: 0, duration: 1, ease: "back.out(2)",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
                }
            );

            gsap.fromTo(".social-row",
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
                    scrollTrigger: { trigger: ".social-row", start: "top 85%" }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleGlobalMouseMove = (e) => {
        if (!flashlightRef.current || !sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        gsap.to(flashlightRef.current, {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto"
        });
    };

    const socials = [
        { platform: "Github", pillBg: "bg-[#111111] border border-[#333333]", pillText: "VIEW REPOS", PillIcon: Github, href: "https://github.com" },
        { platform: "Linkedin", pillBg: "bg-[#0077B5]", pillText: "CONNECT", PillIcon: Linkedin, href: "https://linkedin.com" },
        { platform: "Twitter", pillBg: "bg-[#1da1f2]", pillText: "FOLLOW", PillIcon: Twitter, href: "https://twitter.com" },
        { platform: "Instagram", pillBg: "bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]", pillText: "VIEW PICS", PillIcon: Instagram, href: "https://instagram.com" }
    ];

    return (
        <section 
            ref={sectionRef} 
            onMouseMove={handleGlobalMouseMove}
            className="relative min-h-screen bg-[#FAFAF9] flex flex-col justify-between overflow-hidden font-sans"
        >
            <style>
                {`
                    @keyframes scrollMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                    @keyframes fastMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                    .animate-marquee { animation: scrollMarquee 45s linear infinite; }
                    .animate-fast-marquee { animation: fastMarquee 45s linear infinite; }
                    .group:hover .animate-marquee { animation-play-state: paused; }
                `}
            </style>

            <div 
                ref={flashlightRef}
                className="absolute w-[800px] h-[800px] bg-[#00c896] rounded-full blur-[150px] pointer-events-none opacity-[0.08] z-0"
                style={{ left: 0, top: 0 }}
            />

            <GridBackground />

            <div className="relative z-10 flex-1 flex flex-col justify-center pt-32 pb-20">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full mb-20 md:mb-32 perspective-[1000px]">
                    <div className="flex flex-col md:flex-row items-center justify-between md:justify-center gap-6 md:gap-16 w-full">
                        <div className="hidden md:block pixel-cross"><PixelCross /></div>
                        <h2 className="text-[12vw] md:text-[8rem] lg:text-[9rem] font-black tracking-tighter text-[#111111] uppercase text-center leading-[0.85] flex flex-col items-center">
                            <div className="overflow-hidden inline-block"><span className="reveal-word inline-block">EXPLORE</span></div>
                            <div className="flex gap-4 md:gap-8">
                                <div className="overflow-hidden inline-block"><span className="reveal-word inline-block text-neutral-300">MY</span></div>
                                <div className="overflow-hidden inline-block"><span className="reveal-word inline-block">SOCIALS</span></div>
                            </div>
                        </h2>
                        <div className="hidden md:block pixel-cross"><PixelCross /></div>
                    </div>
                </div>

                <div className="w-full flex flex-col border-t border-neutral-200">
                    {socials.map((social, idx) => (
                        <SocialRow key={idx} index={idx} {...social} />
                    ))}
                </div>
            </div>

            <BottomMarquee />
        </section>
    );
};

export default ExploreSocials;
