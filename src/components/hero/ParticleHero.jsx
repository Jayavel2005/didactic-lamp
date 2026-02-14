import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate a sphere of points
function generateSpherePoints(count, radius) {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = radius * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
    }
    return points;
}

const ParticleField = (props) => {
    const ref = useRef();

    // Memoize the points so they don't regenerate on every render
    const sphere = useMemo(() => generateSpherePoints(5000, 1.5), []);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Slow rotation
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;

        // Optional: Mouse interaction could be added here by reading state.pointer
        // But for "kinetic" feel, scroll velocity influence is often better passed via props
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#4F46E5" // Electric Indigo
                    size={0.005} // Very fine points
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
};

const ParticleHero = () => {
    return (
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 3] }}
                gl={{ antialias: false, alpha: true }} // Disabling antialias can help perf with lots of points
            >
                {/* Background Color is handled by CSS, but we can fog it to blend */}
                {/* <fog attach="fog" args={['#050505', 1, 5]} /> */}
                <ParticleField />
            </Canvas>
        </div>
    );
}

export default ParticleHero;
