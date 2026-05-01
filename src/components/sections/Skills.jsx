import React, { useRef, useState, useLayoutEffect, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue } from 'framer-motion';
import { Code2, Layers, Server, Database, GitBranch, Globe, Smartphone, Palette, Cpu, Zap, Box, Terminal, Sparkles } from 'lucide-react';
import { PhysicsEngine } from '../../lib/physics';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
    { name: 'React',        cat: 'Frontend', Icon: Code2,      color: '#61DAFB' },
    { name: 'TypeScript',   cat: 'Frontend', Icon: Layers,     color: '#3178C6' },
    { name: 'Next.js',      cat: 'Frontend', Icon: Globe,      color: '#111111' },
    { name: 'Tailwind',     cat: 'Frontend', Icon: Palette,    color: '#38BDF8' },
    { name: 'GSAP',         cat: 'Frontend', Icon: Zap,        color: '#88CE02' },
    { name: 'React Native', cat: 'Frontend', Icon: Smartphone, color: '#61DAFB' },
    { name: 'Node.js',      cat: 'Backend',  Icon: Server,     color: '#339933' },
    { name: 'Express',      cat: 'Backend',  Icon: Terminal,   color: '#555555' },
    { name: 'MongoDB',      cat: 'Backend',  Icon: Database,   color: '#47A248' },
    { name: 'PostgreSQL',   cat: 'Backend',  Icon: Database,   color: '#336791' },
    { name: 'REST APIs',    cat: 'Backend',  Icon: Cpu,        color: '#FF6B35' },
    { name: 'Figma',        cat: 'Design',   Icon: Palette,    color: '#F24E1E' },
    { name: 'Motion',       cat: 'Design',   Icon: Sparkles,   color: '#A855F7' },
    { name: 'Git',          cat: 'Tools',    Icon: GitBranch,  color: '#F05032' },
    { name: 'Docker',       cat: 'Tools',    Icon: Box,        color: '#2496ED' },
    { name: 'Vite',         cat: 'Tools',    Icon: Zap,        color: '#646CFF' },
];

const CATS = ['All', 'Frontend', 'Backend', 'Design', 'Tools'];

// ── PHYSICS-DRIVEN SKILL PILL ──────────────────────────────────────────────────
const SkillPill = ({ skill, index, engine }) => {
    const pillRef = useRef(null);
    const glowRef = useRef(null);
    
    // Framer Motion values managed entirely by the Physics Engine
    const floatDuration = 3 + (index % 3) * 0.5;
    const floatDelay = (index % 4) * 0.4;
    const mt = (index % 3) * 12; // Tighter staggering to prevent overlaps but keep close
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        if (!pillRef.current) return;
        
        // Wait one frame to ensure DOM layout has settled so we can grab true origin
        const timer = requestAnimationFrame(() => {
            if (!pillRef.current) return;
            const originX = pillRef.current.offsetLeft;
            const originY = pillRef.current.offsetTop;
            
            engine.addEntity(skill.name, {
                x: originX,
                y: originY,
                mass: 1 + Math.random() * 0.8, // Variable mass for emergent physics
                radius: 80, // Collision radius
                onUpdate: (currX, currY) => {
                    // Update framer-motion values with offset from origin
                    x.set(currX - originX);
                    y.set(currY - originY);
                }
            });
        });
        
        return () => {
            cancelAnimationFrame(timer);
            engine.removeEntity(skill.name);
        };
    }, [engine, skill.name, x, y]);

    // Subtle 3D tilt purely for aesthetics (no impact on physics)
    const handleMouseMove = (e) => {
        if (!pillRef.current) return;
        const rect = pillRef.current.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        
        const xPct = (mx / rect.width) - 0.5;
        const yPct = (my / rect.height) - 0.5;

        gsap.to(pillRef.current, {
            rotateX: -yPct * 25,
            rotateY: xPct * 25,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 800,
            overwrite: 'auto'
        });

        gsap.to(glowRef.current, {
            x: mx, y: my, opacity: 1, duration: 0.2, overwrite: 'auto'
        });
    };

    const handleMouseEnter = () => {
        engine.setHoveredEntity(skill.name);
    };

    const handleMouseLeave = () => {
        engine.setHoveredEntity(null);
        if (!pillRef.current) return;
        gsap.to(pillRef.current, {
            rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)', overwrite: 'auto'
        });
        gsap.to(glowRef.current, { opacity: 0, duration: 0.4, overwrite: 'auto' });
    };

    return (
        <div className="sk-card-wrapper z-10 hover:z-20" style={{ marginTop: mt }}>
            <motion.div
                ref={pillRef}
                style={{ x, y }} // Driven by physics via Framer Motion
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="sk-card group relative flex items-center gap-4 bg-white border border-neutral-100 rounded-3xl px-6 py-4 cursor-pointer will-change-transform overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
                {/* Dynamic Mouse Glow */}
                <div
                    ref={glowRef}
                    className="absolute w-24 h-24 rounded-full pointer-events-none opacity-0 z-0"
                    style={{
                        background: `radial-gradient(circle, ${skill.color}35 0%, transparent 70%)`,
                        transform: 'translate(-50%, -50%)',
                        filter: 'blur(8px)',
                        left: 0, top: 0
                    }}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ background: skill.color }} />
                
                {/* Icon */}
                <div className="relative z-10 w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-400" style={{ background: `${skill.color}18` }}>
                    <skill.Icon size={18} style={{ color: skill.color }} strokeWidth={1.8} />
                </div>
                
                {/* Name */}
                <span className="relative z-10 text-base font-bold text-[#1A332F] group-hover:text-black transition-colors duration-300 whitespace-nowrap">
                    {skill.name}
                </span>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left z-10" style={{ background: skill.color }} />
            </motion.div>
        </div>
    );
};


const Skills = () => {
    const [active, setActive] = useState('All');
    const sectionRef = useRef(null);
    const headRef    = useRef(null);
    const gridRef    = useRef(null);

    // Initialize Physics Engine once
    const engine = useMemo(() => new PhysicsEngine({
        friction: 0.85,             // Slightly lower friction for more fluid sliding
        attractionStrength: 6.0,    // Pull back to grid
        repulsionStrength: 60000,   // Lowered to allow tighter grouping
        mouseRadius: 250,           // Area of effect for mouse cursor
        mouseRepulsion: 180000      // Strength of mouse repel/attract
    }), []);

    useEffect(() => {
        engine.start();
        
        // Inject global inertia based on scroll velocity
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const dy = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;
            // Push entities in the opposite direction of scroll for inertia effect
            engine.applyGlobalForce(0, dy * -2.5);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            engine.stop();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [engine]);

    const filtered = active === 'All' ? SKILLS : SKILLS.filter(s => s.cat === active);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Heading reveal
            gsap.fromTo(headRef.current.querySelectorAll('.hw'),
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.08, duration: 1, ease: 'expo.out',
                  scrollTrigger: { trigger: headRef.current, start: 'top 88%' } }
            );

            // Grid cards entrance
            gsap.fromTo(gridRef.current.querySelectorAll('.sk-card'),
                { y: 40, opacity: 0, scale: 0.92 },
                { y: 0, opacity: 1, scale: 1, stagger: 0.04, duration: 0.7, ease: 'expo.out',
                  scrollTrigger: { trigger: gridRef.current, start: 'top 85%' } }
            );

            // Parallax on heading block
            gsap.to(headRef.current, {
                yPercent: -12, ease: 'none',
                scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'center top', scrub: 1.5 }
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Re-animate list on tab change with Physics Explosion
    const handleTab = (tab) => {
        // 1. Blast current items away from center
        engine.blastFromCenter(6000); 
        
        // 2. Wait a split second for the explosion to play out, then switch data
        setTimeout(() => {
            setActive(tab);
            requestAnimationFrame(() => {
                if (!gridRef.current) return;
                // Fade in new items (do not translate Y, let physics handle position)
                gsap.fromTo(gridRef.current.querySelectorAll('.sk-card'),
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, stagger: 0.04, duration: 0.6, ease: 'back.out(1.5)' }
                );
            });
        }, 150);
    };

    // Global Mouse Handlers for Physics Environment
    const handleGridMouseMove = (e) => {
        if (!gridRef.current) return;
        const rect = gridRef.current.getBoundingClientRect();
        engine.updateMouse(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleGridMouseLeave = () => {
        engine.updateMouse(-9999, -9999);
        engine.setMouseDown(false);
    };

    return (
        <section ref={sectionRef} className="relative w-full bg-[#FAFAF9] overflow-hidden py-20 md:py-28">

            {/* ── HEADER ROW ── */}
            <div ref={headRef} className="max-w-7xl mx-auto px-6 md:px-20 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 will-change-transform">
                <div>
                    <span className="hw block text-xs font-mono font-bold tracking-[0.3em] text-teal-500 uppercase mb-4">
                        03 — Tech Stack
                    </span>
                    <h2 className="hw text-5xl md:text-7xl font-black text-[#1A332F] tracking-tight leading-[0.9]">
                        Skills <em className="not-italic text-teal-500">&</em> Tools
                    </h2>
                </div>
                {/* Tabs inline on desktop */}
                <div className="hw flex flex-wrap gap-2">
                    {CATS.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleTab(cat)}
                            className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                                active === cat
                                    ? 'bg-[#1A332F] text-white shadow-lg'
                                    : 'bg-white border border-neutral-200 text-neutral-500 hover:border-teal-300 hover:text-teal-600 hover:-translate-y-0.5'
                            }`}
                        >
                            {cat}
                            {active === cat && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-teal-400 rounded-full animate-ping" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── PHYSICS GRID ENVIRONMENT ── */}
            <div 
                ref={gridRef} 
                className="max-w-7xl mx-auto px-6 md:px-20 mb-14 relative" 
                style={{ perspective: '1200px' }}
                onMouseMove={handleGridMouseMove}
                onMouseLeave={handleGridMouseLeave}
                onMouseDown={() => engine.setMouseDown(true)}
                onMouseUp={() => engine.setMouseDown(false)}
            >
                <div className="flex flex-wrap items-start gap-2 md:gap-3 py-6 pointer-events-none">
                    {/* Inner wrapper pointer-events-none, but children pointer-events-auto */}
                    {filtered.map((skill, index) => (
                        <div key={skill.name} className="pointer-events-auto">
                            <SkillPill skill={skill} index={index} engine={engine} />
                        </div>
                    ))}
                </div>
            </div>

            {/* ── STATS (single compact row) ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-20 mb-20 relative z-30">
                <div className="flex flex-wrap gap-8 md:gap-16 items-center border-t border-b border-neutral-100 py-6">
                    {[
                        { val: '4+',   label: 'Years Exp.',   color: '#14B8A6' },
                        { val: '16+',  label: 'Technologies', color: '#A855F7' },
                        { val: '10+',  label: 'Projects',     color: '#F97316' },
                        { val: '100%', label: 'Satisfaction', color: '#22C55E' },
                    ].map(({ val, label, color }) => (
                        <div key={label} className="flex items-baseline gap-2">
                            <span className="text-3xl font-black" style={{ color }}>{val}</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default Skills;
