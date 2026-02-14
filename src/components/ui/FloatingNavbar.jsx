import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Menu, Instagram, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Magnetic Component (GSAP-based) ---
const Magnetic = ({ children, strength = 0.3 }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (clientX - (left + width / 2)) * strength;
            const y = (clientY - (top + height / 2)) * strength;
            xTo(x);
            yTo(y);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return React.cloneElement(children, { ref });
};

// --- Main Navbar (Full Width) ---
const FloatingNavbar = () => {
    const navRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 1. Scroll & Visual Physics
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const nav = navRef.current;

            // Initial state: Fully Visible at top
            gsap.set(nav, { yPercent: 0, autoAlpha: 1 });

            ScrollTrigger.create({
                start: 'top top',
                end: 99999,
                onUpdate: (self) => {
                    const currentScrollY = self.scroll();
                    const direction = self.direction; // 1 = down, -1 = up

                    // 1. At the very top (within 10px), ALWAYS show
                    if (currentScrollY < 10) {
                        gsap.to(nav, { yPercent: 0, autoAlpha: 1, duration: 0.3, ease: "power3.out", overwrite: true });
                    }
                    // 2. Scrolling DOWN -> Hide
                    else if (direction === 1) {
                        gsap.to(nav, { yPercent: -100, autoAlpha: 0, duration: 0.3, ease: "power3.out", overwrite: true });
                    }
                    // 3. Scrolling UP -> Show
                    else if (direction === -1) {
                        gsap.to(nav, { yPercent: 0, autoAlpha: 1, duration: 0.3, ease: "power3.out", overwrite: true });
                    }
                }
            });

        }, navRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 left-0 w-full z-[60] flex justify-between md:grid md:grid-cols-[1fr_auto_1fr] items-center px-6 py-6 md:px-12 md:py-6 transition-colors duration-500 will-change-[background-color]"
            >
                {/* Left Side: Brand / System Status */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="flex gap-1.5 opacity-50">
                        {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#1A332F]" />)}
                    </div>
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#1A332F] uppercase opacity-60">System.Active</span>
                </div>

                {/* Center: Brand Name */}
                <div className="flex justify-center">
                    <div className="relative group cursor-pointer">
                        {/* Glass Background */}
                        <div className="absolute inset-x-[-20px] inset-y-[-10px] bg-[#E8EAE9]/80 backdrop-blur-[16px] rounded-full shadow-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <h1 className="text-2xl md:text-3xl font-serif italic font-bold tracking-tight text-[#1A332F] relative z-10 transition-transform duration-300 group-hover:scale-105">
                            Jayavel<span className="text-teal-600 not-italic">.</span>
                        </h1>
                    </div>
                </div>

                {/* Right Side: Controls (Menu + Profile) */}
                <div className="flex justify-end relative">
                    {/* Glass Background for Controls */}
                    <div className="absolute inset-0 bg-[#E8EAE9]/80 backdrop-blur-[16px] rounded-full shadow-sm -z-10 w-fit ml-auto" />

                    <div className="flex items-center gap-3 p-1.5 rounded-full border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-[#E8EAE9]/80 backdrop-blur-[16px]">
                        <MenuButton
                            isOpen={isMenuOpen}
                            toggle={() => setIsMenuOpen(!isMenuOpen)}
                        />
                        <ProfileButton />
                    </div>
                </div>
            </nav>

            {/* Side Drawer Portal */}
            <SideDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

// --- Components ---



const MenuButton = ({ isOpen, toggle }) => {
    const topRef = useRef(null);
    const midRef = useRef(null);
    const botRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { duration: 0.3, ease: "power2.inOut" } });
        if (isOpen) {
            gsap.to(buttonRef.current, { rotate: 90, duration: 0.4 });
            tl.to(topRef.current, { y: 6, rotate: 45 }, 0)
                .to(midRef.current, { opacity: 0 }, 0)
                .to(botRef.current, { y: -6, rotate: -45 }, 0);
        } else {
            gsap.to(buttonRef.current, { rotate: 0, duration: 0.4 });
            tl.to(topRef.current, { y: 0, rotate: 0 }, 0)
                .to(midRef.current, { opacity: 1 }, 0)
                .to(botRef.current, { y: 0, rotate: 0 }, 0);
        }
    }, [isOpen]);

    return (
        <Magnetic strength={0.4}>
            <button
                ref={buttonRef}
                onClick={toggle}
                className="relative w-12 h-12 bg-[#1A332F] rounded-full flex flex-col items-center justify-center gap-[4px] group"
            >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
                <span ref={topRef} className="w-5 h-[2px] bg-white rounded-full origin-center" />
                <span ref={midRef} className="w-5 h-[2px] bg-white rounded-full origin-center" />
                <span ref={botRef} className="w-5 h-[2px] bg-white rounded-full origin-center" />
            </button>
        </Magnetic>
    );
};

const ProfileButton = () => {
    const sparkRef = useRef(null);
    const containerRef = useRef(null);

    const handleEnter = () => {
        const tl = gsap.timeline();
        tl.to(sparkRef.current, { scale: 1, rotate: 90, opacity: 1, duration: 0.4, ease: "back.out(1.7)" })
            .to(sparkRef.current, { scale: 0, opacity: 0, duration: 0.2 }, "+=0.1");
    };

    return (
        <Magnetic strength={0.4}>
            <div
                ref={containerRef}
                onMouseEnter={handleEnter}
                className="relative w-12 h-12 bg-white rounded-full border border-neutral-200 flex items-center justify-center cursor-pointer overflow-hidden group shadow-sm"
            >
                {/* Gradient Fill */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#487C73] to-[#2F5E52] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Instagram className="w-5 h-5 text-[#1A332F] group-hover:text-white transition-colors duration-300 relative z-10" />

                {/* Sparkle */}
                <svg
                    ref={sparkRef}
                    className="absolute top-2 right-2 w-3 h-3 text-white opacity-0 pointer-events-none z-20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
            </div>
        </Magnetic>
    );
};

// --- Side Drawer (Redesigned & Fixed) ---
const SideDrawer = ({ isOpen, onClose }) => {
    const drawerRef = useRef(null);
    const bgRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Background Fade In
            gsap.set(drawerRef.current, { display: "flex" }); // Ensure display is flex when opening
            gsap.to(bgRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.5, ease: "power2.out" });

            // Drawer Slide In
            gsap.fromTo(drawerRef.current,
                { x: "100%" },
                { x: "0%", duration: 0.8, ease: "power4.out" }
            );

            // Staggered List Items
            gsap.fromTo(listRef.current.children,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.3, ease: "power2.out" }
            );

        } else {
            // Fade Out & Slide Out
            gsap.to(bgRef.current, { opacity: 0, pointerEvents: "none", duration: 0.4, delay: 0.1 });
            gsap.to(drawerRef.current, {
                x: "100%",
                duration: 0.6,
                ease: "power3.in",
                onComplete: () => gsap.set(drawerRef.current, { display: "none" }) // Hide completely
            });
        }
    }, [isOpen]);

    const [activeSection, setActiveSection] = useState("");

    const menuItems = [
        { label: "Home", id: "home" },
        { label: "About", id: "about" },
        { label: "Services", id: "services" },
        { label: "Projects", id: "projects" },
        { label: "Contact", id: "contact" }
    ];

    const handleNavigation = (id) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                ref={bgRef}
                onClick={onClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] opacity-0 pointer-events-none"
            />

            {/* Glass Drawer Panel */}
            <div
                ref={drawerRef}
                className="hidden fixed top-0 right-0 h-screen w-[400px] max-w-[90vw] z-[100] flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.5)] translate-x-full overflow-hidden rounded-l-[3rem]"
                style={{
                    background: "linear-gradient(135deg, #1A332F 0%, #0D0F11 100%)"
                }}
            >
                {/* Close Button (New) */}
                <button
                    onClick={onClose}
                    className="absolute top-10 right-10 z-20 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Noise & Glow */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-50" />
                <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-10 flex-1 flex flex-col p-12 md:p-16">

                    {/* Header / Decor */}
                    <div className="mb-12">
                        <div className="w-12 h-1 bg-teal-500/30 rounded-full mb-6" />
                        <span className="text-xs font-mono text-white/40 tracking-[0.2em] uppercase">Navigation</span>
                    </div>

                    {/* Menu List */}
                    <div ref={listRef} className="flex-1 flex flex-col justify-center gap-2">
                        {menuItems.map((item, index) => (
                            <div
                                key={item.label}
                                onClick={() => handleNavigation(item.id)}
                                className="group relative cursor-pointer py-2"
                            >
                                <h3
                                    className={`
                                        text-5xl md:text-6xl font-black tracking-tight transition-all duration-500 ease-out
                                        ${activeSection === item.id ? 'text-white translate-x-4' : 'text-white/20 hover:text-white'}
                                        group-hover:translate-x-4
                                    `}
                                >
                                    {item.label}
                                </h3>

                                {/* Active/Hover Indicator */}
                                <div
                                    className={`
                                        absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-teal-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.8)]
                                        mr-4 transition-all duration-300 opacity-0 group-hover:opacity-100
                                        ${activeSection === item.id ? 'opacity-100' : ''}
                                    `}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-10 border-t border-white/5">
                        <div className="flex justify-between items-end text-white/30 text-[10px] font-mono tracking-widest uppercase">
                            <div className="flex flex-col gap-1">
                                <span>© 2026 Build. Digital</span>
                                <span className="text-teal-500/50">System Active</span>
                            </div>
                            <div className="text-right">
                                <span>V 2.0.4</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default FloatingNavbar;
