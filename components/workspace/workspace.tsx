'use client';

import { useState } from 'react';
import { TitleSlide } from '@/components/title-slide';
import styles from './workspace.module.scss';
import { IntroSlide } from '../intro-slide';

const slides = [<TitleSlide key="title" />, <IntroSlide key="info" />];

export function Workspace() {
    const [slide, setSlide] = useState(0);

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
            <div className={styles.bottom}></div>
        </div>
    );
}
