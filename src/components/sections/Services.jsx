import React, { useRef, useLayoutEffect } from 'react';
import { Layout, Smartphone, Code, Cpu, Globe, Zap, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        id: "01",
        title: "Web Development",
        description: "Scalable, high-performance web applications built with modern technologies like React, Next.js, and Node.js.",
        icon: <Globe className="w-8 h-8" />
    },
    {
        id: "02",
        title: "Product Design",
        description: "User-centric UI/UX design that focuses on usability, aesthetics, and creating intuitive digital experiences.",
        icon: <Layout className="w-8 h-8" />
    },
    {
        id: "03",
        title: "Mobile Solutions",
        description: "Native and cross-platform mobile apps designed to provide seamless experiences on iOS and Android devices.",
        icon: <Smartphone className="w-8 h-8" />
    },
    {
        id: "04",
        title: "Creative Strategy",
        description: "Data-driven insights to help brands define their voice, positioning, and long-term digital roadmap.",
        icon: <Zap className="w-8 h-8" />
    }
];

const ServiceCard = ({ service, index }) => {
    const cardRef = useRef(null);
    const glowRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 1000
        });

        // Glow effect following mouse
        gsap.to(glowRef.current, {
            x: x,
            y: y,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        });

        gsap.to(glowRef.current, {
            opacity: 0,
            duration: 0.5
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative p-6 md:p-12 bg-[#F5F5F0] rounded-[2rem] overflow-hidden border border-black/5 cursor-default transition-shadow hover:shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Dynamic Glow Spotlight */}
            <div
                ref={glowRef}
                className="absolute w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-multiply"
            />

            <div className="relative z-10 flex flex-col h-full justify-between gap-8 pointer-events-none">
                <div className="flex justify-between items-start">
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-teal-700 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 will-change-transform">
                        {service.icon}
                    </div>
                    <span className="text-4xl font-black text-[#1A332F]/10 font-mono tracking-widest group-hover:text-[#1A332F]/20 transition-colors duration-500">{service.id}</span>
                </div>

                <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#1A332F] mb-4 group-hover:translate-x-2 transition-transform duration-300">
                        {service.title}
                    </h3>
                    <p className="text-neutral-500 leading-relaxed font-light group-hover:text-neutral-600 transition-colors">
                        {service.description}
                    </p>
                </div>

                {/* Discover More Link */}
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-teal-600 mt-auto pt-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 duration-300 ease-out">
                    <span>Discover</span>
                    <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
};

const Services = () => {
    const containerRef = useRef(null);
    const headerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Header Reveal
            gsap.fromTo(headerRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 80%",
                        viewport: { once: true }
                    }
                }
            );

            // Cards Reveal (Staggered)
            const cards = containerRef.current.querySelectorAll('.service-grid > div');
            gsap.fromTo(cards,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        viewport: { once: true }
                    }
                }
            );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full bg-[#FAFAF9] py-20 md:py-32 rounded-[3.5rem] my-4 shadow-sm relative z-20 overflow-hidden">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <div ref={headerRef} className="mb-12 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="block text-teal-600 font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-4">What We Do</span>
                        <h2 className="text-4xl md:text-7xl font-black text-[#1A332F] tracking-tighter leading-tight">
                            Digital <br className="hidden md:block" /> capabilities.
                        </h2>
                    </div>
                    <p className="text-neutral-500 max-w-xl text-lg md:text-xl font-light leading-relaxed">
                        We combine strategy, design, and technology to build brands that matter in culture. Driving growth through digital transformation.
                    </p>
                </div>

                {/* Grid */}
                <div className="service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
                    {services.map((s, i) => (
                        <ServiceCard key={i} service={s} index={i} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Services;
