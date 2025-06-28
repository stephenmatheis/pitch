// import { useState } from 'react';
import { Slide } from '@/components/slide';
// import { Center } from '@/components/center';
// import { ExtraLarge } from '@/components/extra-large';
// import { Type } from '@/components/type';
// import { Backspace } from '@/components/backspace';
import styles from './title-slide.module.scss';

// const prefix = 'Next Generation';
// const subtitles = ['Digital Government', 'Developer Experience', 'Accessible Websites', 'Intelligence'];

export function TitleSlide() {
    // const [showSubtitle, setShowSubtitle] = useState(false);
    // const [selectedSubtitle, setSelectedSubtitle] = useState(0);
    // const [type, setType] = useState(true);
    // const [firstPass, setFirstPass] = useState(true);

    return (
        <Slide className={styles['title-slide']}>
            <h1>Hello World</h1>
            {/* <Center>
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
            </Center> */}
        </Slide>
    );
}
