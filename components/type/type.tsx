'use client';

import { useEffect, useState } from 'react';
import * as motion from 'motion/react-client';
import styles from './type.module.scss';

type TypeProps = {
    text: string;
    delay?: number;
    onEnd?: () => void;
};

export function Type({ text, delay = 0, onEnd }: TypeProps) {
    const [isTyping, setIsTyping] = useState(false);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsTyping(true);
        }, delay * 1000);
    }, [delay]);

    return (
        <span className={styles.type} style={{ width: `${text.length + 1}ch` }}>
            <span className={styles.hidden}>{text}</span>
            <span className={styles.visible}>
                {text.split('').map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ display: 'none' }}
                        animate={{ display: 'inline-block' }}
                        transition={{
                            duration: 0.05,
                            delay: delay + index * 0.1,
                        }}
                        {...(index === text.length - 1
                            ? {
                                  onAnimationComplete: () => {
                                      setIsTyping(false);
                                      setIsDone(true);
                                      setTimeout(() => {
                                          onEnd?.();
                                      }, 200);
                                  },
                              }
                            : {})}
                    >
                        {char}
                    </motion.span>
                ))}
                {!isDone && (
                    <>
                        {isTyping ? (
                            <span>🮊</span>
                        ) : (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0, 1, 1] }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    times: [0, 0.5, 0.5, 1],
                                }}
                            >
                                🮊
                            </motion.span>
                        )}
                    </>
                )}
            </span>
        </span>
    );
}
