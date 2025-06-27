'use client';

import { useState } from 'react';
import { Slide } from '@/components/slide';
import { Center } from '@/components/center';
import { ExtraLarge } from '@/components/extra-large';
import { Type } from '@/components/type';
import { Backspace } from '@/components/backspace';

const prefix = 'Next Generation';
const subtitles = ['Digital Government', 'Developer Experience', 'Accessible Websites', 'Intelligence'];

export default function Home() {
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [selectedSubtitle, setSelectedSubtitle] = useState(0);
    const [type, setType] = useState(true);
    const [firstPass, setFirstPass] = useState(true);

    return (
        <main>
            {/* Title */}
            <Slide>
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

            {/* Intro */}
        </main>
    );
}
