import * as THREE from 'three';
import React, { useRef } from 'react';
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import { GizmoHelper, GizmoViewcube, Outlines, OrbitControls, Edges, Text } from '@react-three/drei';
import { useR3F } from '@/providers/r3f-provider';
import styles from './surface.module.scss';

const size = 1;
const gap = 1;
const columns = 15;
const isometricRotation = new THREE.Euler(Math.atan(1 / Math.sqrt(2)), -Math.PI / 4, 0);

function Box(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.005;
            // meshRef.current.rotation.z += 0.005
        }
    });

    return (
        <mesh {...props} ref={meshRef} scale={1} rotation={isometricRotation}>
            <boxGeometry args={[size, size, size]} />
            <meshToonMaterial color="#ffffff" />
            <Edges linewidth={2} scale={1} color="#000000" />
            <Outlines thickness={0.05} color="hotpink" />
        </mesh>
    );
}

export function Surface() {
    const { showAxesHelper, showGridHelper, showControls } = useR3F();

    return (
        <div className={styles['canvas-absolute']}>
            <Canvas orthographic camera={{ zoom: 29.75, position: [0, 0, 50] }}>
                {/* Lights */}
                <ambientLight intensity={1} />
                <directionalLight castShadow intensity={2.5} color="white" position={[-1, -1, 0]} />
                {/* <pointLight color="white" intensity={100} position={[16, 0, 1]} /> */}

                {/* Cubes */}
                {Array.from({ length: 240 }).map((_, i) => {
                    const x = i % columns;
                    const y = Math.floor(i / columns);
                    const posX = x + x * gap + 1;
                    const posY = y + y * gap - columns;

                    return (
                        <group key={i}>
                            <Box position={[posX, posY, 0.5]} />{' '}
                            <Text
                                color="black"
                                position={[posX - 0.375, posY - 0.25, 1]}
                                fontSize={0.5}
                                rotation={isometricRotation}
                            >
                                {i + 1}
                            </Text>
                        </group>
                    );
                })}
                {/* {Array.from({ length: 4 }).map((_, i) => {
                    const x = i % columns;
                    const y = Math.floor(i / columns);
                    const posX = x + x * gap + 1;
                    const posY = y + y * gap - columns;

                    return (
                        <group key={i}>
                            <Box position={[posX, posY, 0.5]} />{' '}
                            <Text
                                color="black"
                                position={[posX - 0.375, posY - 0.25, 1]}
                                fontSize={0.5}
                                rotation={isometricRotation}
                            >
                                {i + 1}
                            </Text>
                        </group>
                    );
                })} */}

                {/* Helpers */}
                {showGridHelper && (
                    <gridHelper
                        args={[128, 64, '#FF0000', '#ffffff']}
                        position={[0, 0, 0]}
                        rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
                    />
                )}

                {showAxesHelper && <axesHelper args={[20]} />}

                {showControls && (
                    <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                        <GizmoViewcube />
                    </GizmoHelper>
                )}

                {/* Controls */}
                <OrbitControls makeDefault />
            </Canvas>
        </div>
    );
}
