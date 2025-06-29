import * as THREE from 'three';
import React, { useRef } from 'react';
// import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { Canvas, ThreeElements } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import styles from './surface.module.scss';

const size = 0.9;

function Box(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!);

    // useFrame((state, delta) => {
    //     meshRef.current.rotation.x += delta / 10;
    //     meshRef.current.rotation.y += delta / 10;
    //     meshRef.current.rotation.z += delta / 10;
    // });

    return (
        <mesh {...props} ref={meshRef} scale={1}>
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial color="#f1f1f3" />
            <Edges linewidth={2} scale={1} color="#101010" />
        </mesh>
    );
}

export function Surface() {
    return (
        <div className={styles['canvas-absolute']}>
            <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 1] }}>
                <ambientLight intensity={Math.PI / 2} />
                {Array.from({ length: 64 }).map((_, i) => {
                    const x = i % 8;
                    const y = Math.floor(i / 8);

                    console.log(`${i}: [${x}, ${y}]`);

                    return <Box key={i} position={[x - 4, y - 4, 0]} />;
                })}
            </Canvas>
        </div>
    );
}
