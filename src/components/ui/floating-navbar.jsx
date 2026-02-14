import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

export const FloatingNav = ({
    items,
    className
}) => {
    let mouseX = useMotionValue(Infinity);

    return (
        (<motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "mx-auto flex h-16 gap-4 items-end  rounded-2xl bg-neutral-900/50 backdrop-blur-md px-4 pb-3 border border-neutral-800",
                className
            )}>
            {items.map((item) => (
                <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>)
    );
};

function IconContainer({
    mouseX,
    title,
    icon,
    href
}) {
    let ref = useRef(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    let width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    return (
        (<a href={href}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="aspect-square rounded-full bg-neutral-800 flex items-center justify-center relative border border-neutral-700">
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="px-2 py-0.5 whitespace-pre rounded-md bg-neutral-800 border border-neutral-700 text-neutral-200 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs">
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="flex items-center justify-center">{icon}</div>
            </motion.div>
        </a>)
    );
}
