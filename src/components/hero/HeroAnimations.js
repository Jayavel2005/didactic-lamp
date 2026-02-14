import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useHeroAnimations = (refs) => {
    const {
        headlineRef,
        subtitleRef,
        cardRef,
        dockRef, // We might need to select this globally or pass it if it's outside
        sceneRef,
        heroContainerRef
    } = refs;

    useLayoutEffect(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power4.out" }
        });

        // Cinematic Intro Timeline - Scene Only
        // DOM elements are now handled by Framer Motion in Hero.jsx

        // Scene Intro
        tl.to(sceneRef.current, {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power3.out"
        });


        // 3. Mouse Parallax
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5);
            const yPos = (clientY / window.innerHeight - 0.5);

            if (headlineRef.current) {
                gsap.to(headlineRef.current, {
                    x: -xPos * 20,
                    y: -yPos * 20,
                    duration: 1,
                    ease: "power2.out"
                });
            }

            gsap.to(subtitleRef.current, {
                x: -xPos * 10,
                y: -yPos * 10,
                duration: 1,
                ease: "power2.out"
            });

            gsap.to(cardRef.current, {
                x: -xPos * 40, // Stronger movement
                y: -yPos * 40,
                duration: 1,
                ease: "power2.out"
            });

            gsap.to(sceneRef.current, {
                x: xPos * 30, // Lag/Follow opposite or same? "slow follow with lag" usually means follow. Let's make it follow slowly.
                y: yPos * 30,
                duration: 2,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", handleMouseMove);


        // 5. Scroll-Based Continuity
        ScrollTrigger.create({
            trigger: heroContainerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            animation: gsap.to([headlineRef.current, subtitleRef.current, cardRef.current], {
                y: -100,
                opacity: 0,
                scale: 0.9,
                stagger: 0.1
            })
        });

        // Scene separate scroll
        ScrollTrigger.create({
            trigger: heroContainerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            animation: gsap.to(sceneRef.current, {
                y: 100,
                scale: 0.8,
                opacity: 0
            })
        });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };

    }, []);
};
