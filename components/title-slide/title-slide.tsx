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
const transition = { type: 'spring' as const, duration: 1, bounce: 0.3 };
const shape: React.CSSProperties = {
    stroke: 'white',
    strokeLinecap: 'square',
    strokeWidth: 10,
};

export function TitleSlide() {
    const [selectedSubtitle, setSelectedSubtitle] = useState(0);
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [firstPass, setFirstPass] = useState(true);
    const [type, setType] = useState(true);
    const [phase, setPhase] = useState<number>(0);
    const { shouldType, showCanvas } = useR3F();

    useEffect(() => {
        if (phase === 0) {
            setPhase(1);
        }
    }, [phase]);

    return (
        <Slide className={styles['title-slide']}>
            {showCanvas && <Surface />}

            <svg className={styles.lines} viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
                {phase >= 1 && (
                    <motion.path
                        initial={{ d: `M 0,${y} L 0,${y}`, pathLength: 0 }}
                        animate={{ d: `M 0,${y} L ${x},${y}`, pathLength: 1 }}
                        onAnimationComplete={() => setPhase(2)}
                        transition={transition}
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
                            transition={transition}
                            style={shape}
                            onAnimationStart={() => {
                                setTimeout(() => {
                                    setPhase(3);
                                }, 500);
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
                            d: `M ${x + r},${y + r} L ${x + r},${y + r + 440}`,
                            pathLength: 1,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        style={shape}
                        onAnimationComplete={() => setPhase(4)}
                    />
                )}
            </svg>

            <button
                style={{ position: 'absolute', top: '1in', right: '1in', zIndex: 1000, fontSize: 44 }}
                onClick={() => setPhase((prev) => (prev === 4 ? 0 : prev + 1))}
            >
                Redo Animation
            </button>

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
        </Slide>
    );
}
