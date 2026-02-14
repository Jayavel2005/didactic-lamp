import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useParallax = () => {

    const parallaxUp = (element, speed = 1, start = "top bottom", end = "bottom top") => {
        if (!element) return;
        gsap.to(element, {
            y: -50 * speed,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: start,
                end: end,
                scrub: 1.2
            }
        });
    };

    const parallaxDown = (element, speed = 1, start = "top bottom", end = "bottom top") => {
        if (!element) return;
        gsap.to(element, {
            y: 50 * speed,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: start,
                end: end,
                scrub: 1.2
            }
        });
    };

    const parallaxFade = (element, start = "top 85%") => {
        if (!element) return;
        gsap.fromTo(element,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: start,
                }
            }
        );
    };

    const parallaxScale = (element, from = 0.95, to = 1) => {
        if (!element) return;
        gsap.fromTo(element,
            { scale: from },
            {
                scale: to,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            }
        );
    };

    const parallaxStagger = (elements, config = {}) => {
        if (!elements || elements.length === 0) return;
        gsap.fromTo(elements,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: config.stagger || 0.1,
                duration: config.duration || 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elements[0], // Use first element as trigger or parent
                    start: config.start || "top 85%",
                    ...config.triggerConfig
                }
            }
        );
    };

    return {
        parallaxUp,
        parallaxDown,
        parallaxFade,
        parallaxScale,
        parallaxStagger
    };
};
