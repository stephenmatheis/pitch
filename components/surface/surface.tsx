import * as THREE from 'three';
import React, { useRef } from 'react';
// import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { Canvas, ThreeElements } from '@react-three/fiber';
import { Grid, GizmoHelper, GizmoViewcube, OrbitControls, Edges } from '@react-three/drei';
import styles from './surface.module.scss';

const size = 0.75;

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
            <meshToonMaterial color="#f1f1f3" />
            <Edges linewidth={2} scale={1} color="#392e4e" />
        </mesh>
    );
}

export function Surface() {
    const gridSize: [number, number] = [10.5, 10.5];
    const gridConfig = {
        // cellSize: 0.6,
        cellSize: size,
        cellThickness: 1,
        cellColor: '#6f6f6f',
        sectionSize: 3.3,
        sectionThickness: 1.5,
        sectionColor: '#9d4b4b',
        // fadeDistance: 25,
        // fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true,
    };

    return (
        <div className={styles['canvas-absolute']}>
            <Canvas orthographic camera={{ zoom: 50, position: [25, 25, 50] }}>
                {/* <Canvas> */}
                <ambientLight intensity={8} />
                {Array.from({ length: 64 }).map((_, i) => {
                    const x = i % 8;
                    const y = Math.floor(i / 8);

                    console.log(`${i}: [${x}, ${y}]`);

                    return <Box key={i} position={[x - 3.5, y - 4, 0]} />;
                })}

                {/* <Grid position={[0, -4, 0]} args={gridSize} {...gridConfig} /> */}
                <gridHelper position={[4, 0, 0]} rotation={new THREE.Euler(Math.PI / 2, 0, 0)} />
                {/* <planeHelper args={[new THREE.Plane(new THREE.Vector3(1, 1, 1), 1)]} /> */}
                <axesHelper args={[20]} />
                <OrbitControls makeDefault />
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewcube />
                </GizmoHelper>
            </Canvas>
        </div>
    );
}
