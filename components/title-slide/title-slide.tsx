'use client';

import { useEffect, useState } from 'react';
import * as motion from 'motion/react-client';
import { Slide } from '@/components/slide';
import { Surface } from '@/components/surface';
import { Type } from '@/components/type';
import { Backspace } from '@/components/backspace';
import { TitleTemplate } from '@/components/title-template';
import { useR3F } from '@/providers/r3f-provider';
import styles from './title-slide.module.scss';

const prefix = 'Next Generation';
const subtitles = ['Digital Government', 'Developer Experience', 'Accessible Websites', 'Intelligence'];
const x = 1728;
const y = 540;
const r = 64;
const cd = `M ${x},${y} A ${r},${r} 0 1 1 ${x},${y + 1}`;
const shape: React.CSSProperties = {
    stroke: 'white',
    strokeLinecap: 'square',
    strokeWidth: 10,
};
const duration = 0.5;
const transitions = {
    linear: {
        ease: 'linear' as const,
        duration,
    },
    easeIn: {
        ease: 'easeIn' as const,
        duration,
    },
    easeOut: {
        ease: 'easeOut' as const,
        duration,
    },
    easeInOut: {
        ease: 'easeInOut' as const,
        duration,
    },
    spring: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
    },
    springWithDuration: {
        type: 'spring' as const,
        duration,
    },
};

export function TitleSlide() {
    const [selectedSubtitle, setSelectedSubtitle] = useState(0);
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [firstPass, setFirstPass] = useState(true);
    const [type, setType] = useState(true);
    const [phase, setPhase] = useState<number>(0);
    const [auto, setAuto] = useState(false);
    const [selectedTransition, setSelectedTransition] = useState<string>('linear');
    const { shouldType, showCanvas } = useR3F();

    useEffect(() => {
        if (!auto) return;

        if (phase === 0) {
            setPhase(1);
        }
    }, [auto, phase]);

    return (
        <Slide className={styles['title-slide']}>
            {showCanvas && <Surface />}

            {/* NOTE: Title Card */}
            <motion.div
                className={styles.card}
                data-card="title"
                initial="initial"
                variants={{
                    initial: { y: 0 },
                    next: { y: '-100%' },
                }}
                animate={phase >= 4 ? 'next' : 'initial'}
                transition={transitions[selectedTransition]}
            >
                <div style={{ position: 'absolute', top: '1in', left: '1in', fontSize: 33 }}>Slide 1</div>

                <svg className={styles.lines} viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
                    {phase >= 1 && (
                        <motion.path
                            initial={{ d: `M 0,${y} L 0,${y}`, pathLength: 0 }}
                            animate={{ d: `M 0,${y} L ${x},${y}`, pathLength: 1 }}
                            onAnimationComplete={() => {
                                if (auto) {
                                    setPhase(2);
                                }
                            }}
                            transition={transitions[selectedTransition]}
                            style={shape}
                        />
                    )}

                    {phase >= 2 && (
                        <>
                            <motion.path
                                initial={{
                                    d: cd,
                                    pathLength: 0,
                                }}
                                animate={{
                                    d: cd,
                                    pathLength: 1,
                                }}
                                transition={transitions[selectedTransition]}
                                style={shape}
                                onAnimationStart={() => {
                                    if (auto) {
                                        setTimeout(() => {
                                            setPhase(3);
                                        }, duration * 1000);
                                    }
                                }}
                            />
                        </>
                    )}

                    {phase >= 3 && (
                        <motion.path
                            initial={{
                                d: `M ${x + r},${y + r} L ${x + r},${y + r}`,
                                pathLength: 0,
                            }}
                            animate={{
                                d: `M ${x + r},${y + r} L ${x + r},1080`,
                                pathLength: 1,
                            }}
                            transition={transitions[selectedTransition]}
                            style={shape}
                            onAnimationStart={() => {
                                if (auto) {
                                    setTimeout(() => {
                                        setPhase(4);
                                    }, duration * 1000);
                                }
                            }}
                        />
                    )}
                </svg>
                {shouldType ? (
                    <TitleTemplate
                        title={<Type text="next.gov" delay={3} onEnd={() => setShowSubtitle(true)} />}
                        subtitle={
                            <div style={{ opacity: showSubtitle ? 1 : 0 }}>
                                {!showSubtitle ? (
                                    subtitles[selectedSubtitle]
                                ) : (
                                    <>
                                        {!firstPass && <>{prefix} </>}
                                        {type ? (
                                            <Type
                                                text={
                                                    firstPass
                                                        ? `${prefix} ${subtitles[selectedSubtitle]}`
                                                        : subtitles[selectedSubtitle]
                                                }
                                                onEnd={() => {
                                                    if (firstPass) setFirstPass(false);

                                                    setTimeout(() => {
                                                        setType(false);
                                                    }, 3000);
                                                }}
                                            />
                                        ) : (
                                            <Backspace
                                                text={subtitles[selectedSubtitle]}
                                                onEnd={() => {
                                                    setSelectedSubtitle((prev) =>
                                                        prev === subtitles.length - 1 ? 0 : prev + 1
                                                    );

                                                    setType(true);
                                                }}
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        }
                    />
                ) : (
                    <TitleTemplate title="next.gov" subtitle={`${prefix} ${subtitles[selectedSubtitle]}`} />
                )}
            </motion.div>

            {/* Intro Card */}
            {phase >= 4 && (
                <motion.div
                    className={styles.card}
                    data-card="intro"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={transitions[selectedTransition]}
                    onAnimationStart={() => {
                        if (auto) {
                            setTimeout(() => {
                                setPhase(5);
                            }, duration * 1000);
                        }
                    }}
                >
                    <div style={{ position: 'absolute', top: '1in', left: '1in', fontSize: 33 }}>Slide 2</div>

                    {phase >= 5 && (
                        <svg className={styles.lines} viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                initial={{
                                    d: `M ${x + r},0 L ${x + r},0`,
                                    pathLength: 0,
                                }}
                                animate={{
                                    d: `M ${x + r},0 L ${x + r},540`,
                                    pathLength: 1,
                                }}
                                transition={transitions[selectedTransition]}
                                style={shape}
                                onAnimationEnd={() => {
                                    if (auto) {
                                        setPhase(6);
                                    }
                                }}
                            />
                        </svg>
                    )}
                </motion.div>
            )}

            {/* TOOLS: Slide Controls */}
            <div
                className={styles.controls}
                style={{
                    position: 'absolute',
                    top: '1in',
                    right: '1in',
                    zIndex: 1000,
                    fontSize: 44,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '2rem',
                }}
            >
                <div className={styles.transition}>
                    {Object.keys(transitions).map((key) => {
                        return (
                            <button
                                key={key}
                                className={selectedTransition === key ? styles.selected : ''}
                                onClick={() => setSelectedTransition(key)}
                            >
                                {key}
                            </button>
                        );
                    })}
                </div>
                <div
                    className={styles.buttons}
                    style={{
                        zIndex: 1000,
                        fontSize: 44,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '2ch',
                    }}
                >
                    <button
                        style={{
                            color: 'mediumseagreen',
                        }}
                        onClick={() => setPhase((prev) => prev + 1)}
                    >
                        Next
                    </button>

                    <button
                        style={{
                            color: 'crimson',
                            width: 'max-content',
                        }}
                        onClick={() => {
                            setPhase(0);
                            setAuto(false);
                        }}
                    >
                        Reset
                    </button>
                    <button
                        style={{
                            color: 'slateblue',
                        }}
                        onClick={() => setAuto((prev) => !prev)}
                    >
                        {auto ? 'Auto' : <s>Auto</s>}
                    </button>
                </div>
                <div>Phase: {phase}</div>
            </div>
        </Slide>
    );
}
