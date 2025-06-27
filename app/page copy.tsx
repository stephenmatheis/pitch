import { Slide } from '@/components/slide';
import { Center } from '@/components/center';
import { ExtraLarge } from '@/components/extra-large';
import * as motion from 'motion/react-client';
import { Box } from '@/components/box';

export default function Home() {
    return (
        <main>
            <Slide>
                <Center style={{ transform: 'translate(-50%, calc(-50% - 2rem))' }}>
                    <h1>■ next.gov</h1>
                    <ExtraLarge>
                        <Box>
                            {[
                                'Next Gen Digital Government',
                                // 'Democratized Development',
                                // 'Code first',
                                // 'Open Source',
                                // 'Vendor Agnostic',
                            ].map((text, idx) => (
                                <motion.div
                                    key={idx}
                                    // initial={{ opacity: 0, y: 100, scale: 0.75 }}
                                    // animate={{ opacity: 1, y: 0, scale: 1 }}
                                    // transition={{
                                    //     delay: idx * 5,
                                    //     type: 'spring',
                                    //     stiffness: 300,
                                    //     damping: 5,
                                    //     repeat: Infinity,
                                    // }}
                                >
                                    <h2>{text}</h2>
                                </motion.div>
                            ))}
                        </Box>
                    </ExtraLarge>
                </Center>
            </Slide>
        </main>
    );
}
