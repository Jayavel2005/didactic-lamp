import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * SignatureMoment
 * A pinned full-screen section that reveals "CODE WITH INTENTION."
 * then cross-fades to "DESIGN WITH EMOTION." as the user scrolls.
 * Drop this anywhere in the page — it is fully self-contained.
 */
const SignatureMoment = () => {
    const sectionRef = useRef(null);
    const step1Ref   = useRef(null);
    const step2Ref   = useRef(null);
    const glowRef    = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=2500',
                pin: true,
                scrub: 1,
                anticipatePin: 1,
            }
        });

        // Phase 1 — "CODE WITH INTENTION." blurs into view
        tl.fromTo(step1Ref.current,
            { opacity: 0, filter: 'blur(24px)', scale: 0.82 },
            { opacity: 1, filter: 'blur(0px)',  scale: 1,    duration: 1, ease: 'none' }
        )
        // Hold
        .to({}, { duration: 0.5 })
        // Phase 2 — cross-fade out
        .to(step1Ref.current,
            { opacity: 0, filter: 'blur(24px)', scale: 1.18, duration: 1, ease: 'none' }
        )
        // Phase 3 — "DESIGN WITH EMOTION." blurs in
        .fromTo(step2Ref.current,
            { opacity: 0, filter: 'blur(24px)', scale: 0.82 },
            { opacity: 1, filter: 'blur(0px)',  scale: 1,    duration: 1, ease: 'none' },
            '-=0.2'
        );

        // Glow pulses in sync with the scroll
        gsap.to(glowRef.current, {
            scale:   1.6,
            opacity: 0.12,
            ease:    'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start:   'top top',
                end:     '+=2500',
                scrub:   1,
            }
        });

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full flex items-center justify-center bg-[#FAFAF9] overflow-hidden"
        >
            {/* Ambient glow */}
            <div
                ref={glowRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] bg-[#00c896] opacity-[0.06] rounded-full blur-[120px] pointer-events-none"
            />

            {/* Step 1 */}
            <h2
                ref={step1Ref}
                className="absolute z-20 text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black text-[#111111] text-center tracking-tighter leading-[0.9] will-change-[opacity,filter,transform]"
                style={{ opacity: 0 }}
            >
                CODE WITH
                <br />
                <span className="text-[#00c896]">INTENTION.</span>
            </h2>

            {/* Step 2 */}
            <h2
                ref={step2Ref}
                className="absolute z-20 text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black text-[#111111] text-center tracking-tighter leading-[0.9] will-change-[opacity,filter,transform]"
                style={{ opacity: 0 }}
            >
                DESIGN WITH
                <br />
                <span className="text-[#00c896]">EMOTION.</span>
            </h2>
        </section>
    );
};

export default SignatureMoment;
