'use client';

import { useEffect, useState } from 'react';
// import { Dither } from '@/components/dither';
import styles from './slide.module.scss';

type SlideProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

const buffer = 40;

export function Slide({ children, className, ...props }: SlideProps) {
    const [min, setMin] = useState(1);

    useEffect(() => {
        function resize() {
            const { innerWidth, innerHeight } = window;
            const scaleX = (innerWidth - buffer) / 1920;
            const scaleY = (innerHeight - buffer) / 1080;
            const min = Math.min(scaleX, scaleY);

            console.log(innerWidth, innerHeight);
            console.log(scaleX, scaleY);
            console.log(min);

            setMin(min);
        }

        resize();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <>
            {/* <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: 20, backgroundColor: 'red' }} /> */}
            <div {...props} style={{ transform: `scale(${min})` }} className={`${styles['slide']} ${className}`}>
                {/* <Dither
                        waveColor={[0.5, 0.5, 0.5]}
                        disableAnimation={false}
                        enableMouseInteraction={true}
                        mouseRadius={0.3}
                        colorNum={4}
                        waveAmplitude={0.3}
                        waveFrequency={3}
                        waveSpeed={0.05}
                    /> */}
                {children}
            </div>
        </>
    );
}
