import React, { useRef, useLayoutEffect } from 'react';
import { ArrowUpRight, Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '../ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Effect for Content
            // As the footer is revealed (main content scrolls up), the footer content moves slightly to create depth
            gsap.fromTo(contentRef.current,
                { y: -100 },
                {
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom", // When top of footer hits bottom of viewport (start revealing)
                        end: "bottom bottom",
                        scrub: true
                    }
                }
            );

            // Floating Icons Animation
            gsap.to(".float-icon", {
                y: -30,
                rotation: 10,
                duration: 4,
                yoyo: true,
                repeat: -1,
                stagger: {
                    each: 1.5,
                    from: "random"
                },
                ease: "sine.inOut"
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={containerRef}
            className="fixed bottom-0 left-0 w-full min-h-screen z-0 bg-[#0D0F11] text-white flex flex-col justify-between px-6 md:px-20 py-20 overflow-hidden"
        >
            <div ref={contentRef} className="flex-1 flex flex-col justify-between max-w-[1600px] mx-auto w-full relative z-10">

                {/* Header CTA */}
                <div className="flex flex-col gap-8 md:flex-row md:items-end justify-between border-b border-white/10 pb-16">
                    <div className="flex flex-col">
                        <span className="text-emerald-500 font-mono tracking-widest text-sm mb-4">● GOT A PROJECT?</span>
                        <h2 className="text-[12vw] leading-[0.8] font-black tracking-tighter mix-blend-difference">
                            LET'S<br />TALK.
                        </h2>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-6">
                        <p className="text-white/50 max-w-sm text-lg md:text-right">
                            Building digital products, brands, and experiences that connect with the heart.
                        </p>
                        <Magnetic>
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-white text-black px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-transform duration-300"
                            >
                                START A CONVERSATION <ArrowUpRight className="w-5 h-5" />
                            </button>
                        </Magnetic>
                    </div>
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16">
                    {/* Socials */}
                    <div className="flex flex-col gap-6">
                        <span className="text-sm font-bold opacity-50 uppercase tracking-widest">Connect</span>
                        <div className="flex gap-4">
                            <Magnetic><a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors"><Instagram className="w-5 h-5" /></a></Magnetic>
                            <Magnetic><a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors"><Twitter className="w-5 h-5" /></a></Magnetic>
                            <Magnetic><a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors"><Linkedin className="w-5 h-5" /></a></Magnetic>
                            <Magnetic><a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors"><Github className="w-5 h-5" /></a></Magnetic>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-6">
                        <span className="text-sm font-bold opacity-50 uppercase tracking-widest">Menu</span>
                        <div className="flex flex-col gap-2 text-lg text-white/70">
                            <button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors w-fit text-left">Home</button>
                            <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors w-fit text-left">Services</button>
                            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors w-fit text-left">Work</button>
                            <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors w-fit text-left">About</button>
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-col gap-6 md:items-end md:text-right">
                        <span className="text-sm font-bold opacity-50 uppercase tracking-widest">Location</span>
                        <p className="text-xl">Coimbatore, India<br />Remote Available</p>
                        <p className="text-white/30 text-sm mt-auto">
                            © 2026 Designed & Coded<br />by Creative Engineer
                        </p>
                    </div>
                </div>

                {/* Big Background Text (Optional Decoration) */}
                <div className="absolute bottom-[-5%] left-[-5%] text-[20vw] font-black text-white/5 pointer-events-none select-none whitespace-nowrap">
                    JAYAVEL
                </div>
            </div>

            {/* Floating Icons Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Icon 1: Layout */}
                <div className="float-icon absolute top-[20%] left-[10%] opacity-10">
                    <svg width="60" height="60" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[8vw] h-[8vw] text-emerald-500">
                        <path d="M1 1.5C1 0.671573 1.67157 0 2.5 0H12.5C13.3284 0 14 0.671573 14 1.5V13.5C14 14.3284 13.3284 15 12.5 15H2.5C1.67157 15 1 14.3284 1 13.5V1.5ZM2.5 1C2.22386 1 2 1.22386 2 1.5V13.5C2 13.7761 2.22386 14 2.5 14H12.5C12.7761 14 13 13.7761 13 13.5V1.5C13 1.22386 12.7761 1 12.5 1H2.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                </div>
                {/* Icon 2: Code */}
                <div className="float-icon absolute top-[40%] right-[15%] opacity-10">
                    <svg width="60" height="60" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[10vw] h-[10vw] text-blue-500">
                        <path d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L2.20711 5.5H8.5C8.77614 5.5 9 5.72386 9 6C9 6.27614 8.77614 6.5 8.5 6.5H2.20711L4.85355 9.14645C5.04882 9.34171 5.04882 9.65829 4.85355 9.85355C4.65829 10.0488 4.34171 10.0488 4.14645 9.85355L0.646447 6.35355C0.451184 6.15829 0.451184 5.84171 0.646447 5.64645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        <path d="M10.1464 2.14645C9.95118 2.34171 9.95118 2.65829 10.1464 2.85355L12.7929 5.5H6.5C6.22386 5.5 6 5.72386 6 6C6 6.27614 6.22386 6.5 6.5 6.5H12.7929L10.1464 9.14645C9.95118 9.34171 9.95118 9.65829 10.1464 9.85355C10.3417 10.0488 10.6583 10.0488 10.8536 9.85355L14.3536 6.35355C14.5488 6.15829 14.5488 5.84171 14.3536 5.64645L10.8536 2.14645C10.6583 1.95118 10.3417 1.95118 10.1464 2.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                </div>
                {/* Icon 3: Palette */}
                <div className="float-icon absolute bottom-[30%] left-[30%] opacity-05">
                    <svg width="60" height="60" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[6vw] h-[6vw] text-pink-500">
                        <path d="M7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15C11.6421 15 11.6421 15 7.5 15C15 3.35786 11.6421 0 7.5 0ZM2.5 7.5C2.5 7.22386 2.72386 7 3 7H4.5C4.77614 7 5 7.22386 5 7.5C5 7.77614 4.77614 8 4.5 8H3C2.72386 8 2.5 7.77614 2.5 7.5ZM6.5 4C6.22386 4 6 4.22386 6 4.5C6 4.77614 6.22386 5 6.5 5H8.5C8.77614 5 9 4.77614 9 4.5C9 4.22386 8.77614 4 8.5 4H6.5ZM10.5 7C10.2239 7 10 7.22386 10 7.5C10 7.77614 10.2239 8 10.5 8H12C12.2761 8 12.5 7.77614 12.5 7.5C12.5 7.22386 12.2761 7 12 7H10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
