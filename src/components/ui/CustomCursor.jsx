import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const isHovering = useRef(false);
    const isClicking = useRef(false);

    // Check if device is touch-enabled
    const isTouch = () => {
        return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    useEffect(() => {
        if (isTouch()) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        // 1. Strict Center Anchor
        // We set xPercent/yPercent once. quickTo will control x/y translation.
        gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

        // 2. Dual-Layer Motion System
        // Inner Dot: Instant tracking (0ms delay) - Hardware tied
        const xToCursor = gsap.quickTo(cursor, "x", { duration: 0 });
        const yToCursor = gsap.quickTo(cursor, "y", { duration: 0 });

        // Outer Ring: Micro-lag (0.12s) - Cinematic fluid feel
        const xToFollower = gsap.quickTo(follower, "x", { duration: 0.12, ease: "power3.out" });
        const yToFollower = gsap.quickTo(follower, "y", { duration: 0.12, ease: "power3.out" });

        // Single Global MouseMove Listener
        const onMouseMove = (e) => {
            xToCursor(e.clientX);
            yToCursor(e.clientY);
            xToFollower(e.clientX);
            yToFollower(e.clientY);
        };

        const updateState = () => {
            if (isClicking.current) {
                // Click State: Tighten up
                gsap.to(follower, { scale: 0.85, opacity: 1, duration: 0.2, ease: "power2.out" });
                gsap.to(cursor, { scale: 1.15, opacity: 1, duration: 0.2, ease: "power2.out" });
            } else if (isHovering.current) {
                // Hover State: Hide Custom Cursor (let native pointer show)
                gsap.to([follower, cursor], {
                    scale: 0.5,
                    opacity: 0,
                    duration: 0.2,
                    ease: "power2.out"
                });
            } else {
                // Default State: Visible
                gsap.to(follower, {
                    scale: 1,
                    backgroundColor: "transparent",
                    opacity: 1,
                    mixBlendMode: "difference",
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(cursor, {
                    scale: 1,
                    opacity: 1,
                    mixBlendMode: "difference",
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        };

        const onMouseDown = () => {
            isClicking.current = true;
            updateState();
        };

        const onMouseUp = () => {
            isClicking.current = false;
            updateState();
        };

        const onMouseOver = (e) => {
            const target = e.target;
            const isInteractive =
                target.matches('a, button, input, textarea, select') ||
                target.closest('a, button') ||
                target.closest('.cursor-pointer') || // updated class name
                target.getAttribute('role') === 'button';

            const isPointer = window.getComputedStyle(target).cursor === 'pointer';

            if (isInteractive || isPointer) {
                isHovering.current = true;
                updateState();
            }
        };

        const onMouseOut = () => {
            isHovering.current = false;
            updateState();
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
        };
    }, []);

    if (typeof window !== 'undefined' && isTouch()) return null;

    return (
        <>
            <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden mix-blend-difference">
                {/* Inner Dot */}
                <div
                    ref={cursorRef}
                    className="absolute top-0 left-0 w-2.5 h-2.5 bg-white rounded-full will-change-transform"
                />
                {/* Outer Ring */}
                <div
                    ref={followerRef}
                    className="absolute top-0 left-0 w-12 h-12 border border-white rounded-full will-change-transform box-border"
                />
            </div>
        </>
    );
};

export default CustomCursor;
