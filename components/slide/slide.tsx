'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './slide.module.scss';

type SlideProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

export function Slide({ children, className, ...props }: SlideProps) {
    const [min, setMin] = useState(1);
    const slideRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!slideRef.current) return;

        function resize() {
            const parent = slideRef.current?.parentElement;

            if (!parent) return;

            const { width, height } = parent.getBoundingClientRect();
            const scaleX = width / 1920;
            const scaleY = height / 1080;
            const min = Math.min(scaleX, scaleY);

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
            <div
                {...props}
                ref={slideRef}
                style={{ '--scale': `scale(${min})` } as CSSProperties}
                className={`${styles['slide']} ${className}`}
            >
                {children}
            </div>
        </>
    );
}
