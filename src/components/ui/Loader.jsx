import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const counterRef = useRef(null);
    const stripsRef = useRef([]);

    const [counter, setCounter] = useState(0);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onCompleteRef.current) onCompleteRef.current();
                }
            });

            // 1. Counter Animation (State driven logic for visual only, GSAP for timing)
            // We use a proxy object to tween the number
            const proxy = { val: 0 };
            tl.to(proxy, {
                val: 100,
                duration: 2.5,
                ease: "power3.inOut",
                onUpdate: () => setCounter(Math.floor(proxy.val))
            });

            // 2. Text Scramble / Flicker
            tl.to(textRef.current, {
                opacity: 1,
                duration: 0.5,
                repeat: 3,
                yoyo: true,
                ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false })"
            }, 0);

            // 3. Pre-Reveal Cleanup
            tl.to([counterRef.current, textRef.current], {
                opacity: 0,
                y: -20,
                duration: 0.5,
                ease: "power2.in"
            });

            // 4. Creative Shutter Reveal
            // Animate strips: Staggered slide up
            tl.to(stripsRef.current, {
                height: 0,
                stagger: {
                    amount: 0.5,
                    from: "center" // Reveal from center out
                },
                duration: 1.5,
                ease: "expo.inOut"
            });

            // 5. Hide container
            tl.set(containerRef.current, { display: 'none' });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
        >
            {/* Background Strips (The Shutters) */}
            <div className="absolute inset-0 flex w-full h-full pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        ref={el => stripsRef.current[i] = el}
                        className="flex-1 h-full bg-[#1A1A1A] border-r border-white/5 last:border-r-0 relative"
                    >
                        {/* Subtle Grain or Line pattern inside strips? Optional */}
                    </div>
                ))}
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col items-center justify-center mix-blend-difference text-white">

                {/* Visual Counter */}
                <h1
                    ref={counterRef}
                    className="text-[15vw] font-black leading-none tracking-tighter tabular-nums"
                >
                    {counter}
                </h1>

                {/* Scramble Text Label */}
                <div ref={textRef} className="mt-4 flex items-center gap-3 opacity-70">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="font-mono text-sm tracking-[0.2em] uppercase">
                        LOADING CREATIVE EXPERIENCE...
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Loader;
