import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, PerspectiveCamera, Torus, Sparkles, Cloud, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";

// Anime Energy Core Component
const EnergyCore = ({ mouse }) => {
    const coreRef = useRef(null);
    const shellRef = useRef(null);
    const ring1Ref = useRef(null);
    const ring2Ref = useRef(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // 1. Organic Core Pulse (Heartbeat)
        const pulse = Math.sin(time * 1.5) * 0.05 + 1; // Subtle breath
        if (coreRef.current) coreRef.current.scale.setScalar(pulse);

        // 2. Shell Rotation
        if (shellRef.current) {
            shellRef.current.rotation.y = time * 0.15;
            shellRef.current.rotation.z = Math.cos(time * 0.2) * 0.1;
        }

        // 3. Orbital Rings
        if (ring1Ref.current) {
            ring1Ref.current.rotation.x = time * 0.3;
            ring1Ref.current.rotation.y = time * 0.1;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = -time * 0.2 + 1;
            ring2Ref.current.rotation.z = time * 0.2;
        }

        // 4. Mouse Tilt
        if (shellRef.current) {
            const targetRotX = mouse.current[1] * 0.3;
            const targetRotY = mouse.current[0] * 0.3;
            shellRef.current.rotation.x = THREE.MathUtils.lerp(shellRef.current.rotation.x, targetRotX, 0.05);
            shellRef.current.rotation.y = THREE.MathUtils.lerp(shellRef.current.rotation.y, shellRef.current.rotation.y + targetRotY * 0.05, 0.05);
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
                {/* Inner Liquid Soul */}
                <mesh ref={coreRef} scale={[0.8, 0.8, 0.8]}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <MeshDistortMaterial
                        color="#00ffff"
                        emissive="#00ffff"
                        emissiveIntensity={2}
                        distort={0.4}
                        speed={2}
                        roughness={0}
                    />
                </mesh>

                {/* Crystalline Shell */}
                <mesh ref={shellRef}>
                    <icosahedronGeometry args={[1.4, 0]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        roughness={0}
                        metalness={0.1}
                        transmission={0.95}
                        thickness={2.5}
                        ior={1.6}
                        clearcoat={1}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Neon Orbital Rings */}
                <group>
                    <Torus ref={ring1Ref} args={[1.8, 0.02, 16, 100]}>
                        <meshBasicMaterial color="#ff00ff" toneMapped={false} />
                    </Torus>
                    <Torus ref={ring2Ref} args={[2.2, 0.03, 16, 100]}>
                        <meshBasicMaterial color="#00ffff" toneMapped={false} />
                    </Torus>
                </group>
            </Float>
        </group>
    );
};

// Background Nebula Clouds
const Nebula = () => {
    return (
        <group>
            <Cloud opacity={0.3} speed={0.4} width={10} depth={1.5} segments={20} position={[-5, 0, -10]} color="#4c1d95" />
            <Cloud opacity={0.3} speed={0.4} width={10} depth={1.5} segments={20} position={[5, 2, -15]} color="#0c4a6e" />
        </group>
    );
};

const HeroScene = () => {
    const mouse = useRef([0, 0]);

    const handleMouseMove = (e) => {
        mouse.current = [
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1
        ];
    };

    React.useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 z-0 h-full w-full bg-[#02000f]">
            <Canvas
                gl={{ antialias: false, alpha: false }}
                dpr={[1, 1.5]}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />

                {/* Deep Space Atmosphere */}
                <color attach="background" args={['#02000f']} />
                <fog attach="fog" args={['#02000f', 5, 25]} />

                {/* Stars & Particles */}
                <Stars radius={50} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
                <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.5} color="#00ffff" />
                <Nebula />

                {/* Lights */}
                <ambientLight intensity={0.4} color="#2e1065" />
                <pointLight position={[5, 5, 5]} intensity={2} color="#00ffff" />
                <pointLight position={[-5, -5, 5]} intensity={4} color="#d946ef" />

                {/* The Core */}
                <EnergyCore mouse={mouse} />

                {/* Cinematic Post Processing */}
                <EffectComposer disableNormalPass>
                    <Bloom
                        luminanceThreshold={0.2} // Bloom kicks in earlier
                        mipmapBlur
                        intensity={1.2}
                        radius={0.5}
                    />
                    <Noise opacity={0.05} />
                    <Vignette eskil={false} offset={0.1} darkness={1.0} />
                </EffectComposer>

                {/* Camera Parallax */}
                <Rig mouse={mouse} />
            </Canvas>
        </div>
    );
};

function Rig({ mouse }) {
    useFrame((state) => {
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.current[0] * 1.0, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouse.current[1] * 1.0, 0.05);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

export default HeroScene;
