'use client';

import { useEffect, useState } from 'react';
import * as motion from 'motion/react-client';
import styles from './backspace.module.scss';

type BackspaceProps = {
    text: string;
    delay?: number;
    onEnd?: () => void;
};

export function Backspace({ text, delay = 0, onEnd }: BackspaceProps) {
    const [isTyping, setIsTyping] = useState(true);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsTyping(true);
        }, delay * 1000);
    }, [delay]);

    return (
        <span className={styles.backspace} style={{ width: `${text.length + 1}ch` }}>
            <span className={styles.text}>
                {text.split('').map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ display: 'inline-block' }}
                        animate={{ display: 'none' }}
                        transition={{
                            duration: 0.05,
                            delay: delay + (text.length - index) * 0.1,
                        }}
                        {...(index === 0
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
            </span>
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
    );
}
