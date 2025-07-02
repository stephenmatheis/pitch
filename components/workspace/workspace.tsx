'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TitleSlide } from '@/components/title-slide';
import { IntroSlide } from '@/components/intro-slide';
import { useR3F } from '@/providers/r3f-provider';
import jewel from '@/public/images/jewel.png';
import jewelBlue from '@/public/images/jewel-blue.png';
import styles from './workspace.module.scss';

const slides = [<TitleSlide key="title" />, <IntroSlide key="info" />];

export function Workspace() {
    const [slide, setSlide] = useState(0);
    const {
        showAxesHelper,
        setShowAxesHelper,
        showGridHelper,
        setShowGridHelper,
        showControls,
        setShowControls,
        shouldType,
        setShouldType,
        showCanvas,
        setShowCanvas,
    } = useR3F();

    return (
        <div className={styles.workspace}>
            <div className={styles.top}></div>
            <div className={styles.left}></div>
            <div
                className={styles.content}
                onKeyDown={(event) => {
                    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                        setSlide((prev) => (prev > slides.length - 1 ? 0 : prev + 1));

                        return;
                    }

                    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                        setSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

                        return;
                    }
                }}
            >
                {slides[slide]}
            </div>
            <div className={styles.right}></div>
            <div className={styles.bottom}>
                <div className={styles.controls}>
                    <button onClick={() => setShowAxesHelper((prev) => !prev)}>
                        {showAxesHelper ? (
                            <Image src={jewel} alt="selected icon" />
                        ) : (
                            <Image src={jewelBlue} alt="unselected icon" />
                        )}
                        <span>Axes</span>
                    </button>
                    <button onClick={() => setShowGridHelper((prev) => !prev)}>
                        {showGridHelper ? (
                            <Image src={jewel} alt="selected icon" />
                        ) : (
                            <Image src={jewelBlue} alt="unselected icon" />
                        )}
                        <span>Grid</span>
                    </button>
                    <button onClick={() => setShowControls((prev) => !prev)}>
                        {showControls ? (
                            <Image src={jewel} alt="selected icon" />
                        ) : (
                            <Image src={jewelBlue} alt="unselected icon" />
                        )}
                        <span>Orbit Controls</span>
                    </button>
                    <button onClick={() => setShouldType((prev) => !prev)}>
                        {shouldType ? (
                            <Image src={jewel} alt="selected icon" />
                        ) : (
                            <Image src={jewelBlue} alt="unselected icon" />
                        )}
                        <span>Type</span>
                    </button>
                    <button onClick={() => setShowCanvas((prev) => !prev)}>
                        {showCanvas ? (
                            <Image src={jewel} alt="selected icon" />
                        ) : (
                            <Image src={jewelBlue} alt="unselected icon" />
                        )}
                        <span>Canvas</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
