import { useState } from 'react';
import * as motion from 'motion/react-client';
import { Slide } from '@/components/slide';
import { Surface } from '@/components/surface';
import { Center } from '@/components/center';
import { ExtraLarge } from '@/components/extra-large';
import { Type } from '@/components/type';
import { Backspace } from '@/components/backspace';
import { TitleTemplate } from '@/components/title-template';
import { useR3F } from '@/providers/r3f-provider';
import styles from './title-slide.module.scss';

const prefix = 'Next Generation';
const subtitles = ['Digital Government', 'Developer Experience', 'Accessible Websites', 'Intelligence'];
const lineEnd = 1200;
const lineYPosition = 540;

export function TitleSlide() {
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [selectedSubtitle, setSelectedSubtitle] = useState(0);
    const [type, setType] = useState(true);
    const [firstPass, setFirstPass] = useState(true);
    const { shouldType, showCanvas } = useR3F();
    const [startArrows, setStartArrows] = useState(false);
    const [animateLine, setAnimateLine] = useState<'start' | 'middle' | 'end'>('start');
    const [animateArrows, setAnimateArrows] = useState<'grow' | 'rotate'>('grow');

    return (
        <Slide className={styles['title-slide']}>
            {showCanvas && <Surface />}

            <svg className={styles.lines} viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
                <motion.line
                    initial={{ x1: 0, y1: lineYPosition, x2: 0, y2: lineYPosition }}
                    animate={animateLine}
                    variants={{
                        start: { x1: 0, y1: lineYPosition, x2: lineEnd, y2: lineYPosition },
                        middle: { x1: 0, y1: lineYPosition, x2: 1400, y2: lineYPosition },
                        end: { x1: lineEnd, y1: lineYPosition, x2: lineEnd, y2: lineYPosition },
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    stroke="white"
                    strokeWidth={10}
                    onAnimationComplete={() => {
                        if (animateLine === 'start') setStartArrows(true);
                    }}
                />
                {startArrows && (
                    <>
                        <motion.line
                            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                            initial={{ x1: lineEnd, y1: lineYPosition, x2: lineEnd, y2: lineYPosition }}
                            animate={animateArrows}
                            variants={{
                                grow: {
                                    x1: lineEnd,
                                    y1: lineYPosition,
                                    x2: lineEnd - 100,
                                    y2: lineYPosition - 100,
                                },
                                rotate: {
                                    rotate: 90,
                                    x1: lineEnd,
                                    y1: lineYPosition,
                                    x2: lineEnd - 100,
                                    y2: lineYPosition - 100,
                                },
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            stroke="white"
                            strokeLinecap="square"
                            strokeWidth={10}
                        />
                        <motion.line
                            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                            initial={{ x1: lineEnd, y1: lineYPosition, x2: lineEnd, y2: lineYPosition }}
                            animate={animateArrows}
                            variants={{
                                grow: {
                                    x1: lineEnd,
                                    y1: lineYPosition,
                                    x2: lineEnd - 100,
                                    y2: lineYPosition + 100,
                                },
                                rotate: {
                                    rotate: -90,
                                    x1: lineEnd,
                                    y1: lineYPosition,
                                    x2: lineEnd - 100,
                                    y2: lineYPosition + 100,
                                },
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            stroke="white"
                            strokeLinecap="square"
                            strokeWidth={10}
                            onAnimationComplete={() => {
                                setAnimateLine('middle');
                                setAnimateArrows('rotate');
                            }}
                        />
                    </>
                )}
            </svg>

            {shouldType ? (
                <Center>
                    <h1 style={{ marginBottom: '1rem' }}>
                        <Type text="next.gov" delay={3} onEnd={() => setShowSubtitle(true)} />
                    </h1>
                    <ExtraLarge style={{ opacity: showSubtitle ? 1 : 0 }}>
                        <h2>
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
                        </h2>
                    </ExtraLarge>
                </Center>
            ) : (
                <TitleTemplate title="next.gov" subtitle={`${prefix} ${subtitles[selectedSubtitle]}`} />
            )}
        </Slide>
    );
}
