import { useState } from 'react';
import { Slide } from '@/components/slide';
import { Center } from '@/components/center';
import { ExtraLarge } from '@/components/extra-large';
import { Type } from '@/components/type';
import { Backspace } from '@/components/backspace';
import styles from './intro-slide.module.scss';

const prefix = 'Category:';
const subtitles = ['Name', 'Vision', 'Mission', 'Why'];

export function IntroSlide() {
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [selectedSubtitle, setSelectedSubtitle] = useState(0);
    const [type, setType] = useState(true);
    const [firstPass, setFirstPass] = useState(true);

    return (
        <Slide className={styles['intro-slide']}>
            <Center>
                <h1 style={{ marginBottom: '1rem' }}>
                    <Type text="Introduction" delay={3} onEnd={() => setShowSubtitle(true)} />
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

                                            setType(false);
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
        </Slide>
    );
}
