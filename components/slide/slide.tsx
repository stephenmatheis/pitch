'use client';

// import { useEffect, useState } from 'react';
// import { Dither } from '@/components/dither';
import styles from './slide.module.scss';

type SlideProps = {
    children?: React.ReactNode;
};

export function Slide({ children }: SlideProps) {
    // const [mounted, setMounted] = useState(false);

    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    return (
        <div className={styles['slide']}>
            {/* {mounted && (
                <>
                    <Dither
                        waveColor={[0.5, 0.5, 0.5]}
                        disableAnimation={false}
                        enableMouseInteraction={true}
                        mouseRadius={0.3}
                        colorNum={4}
                        waveAmplitude={0.3}
                        waveFrequency={3}
                        waveSpeed={0.05}
                    />
                    {children}
                </>
            )} */}
            {children}
        </div>
    );
}
