import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '@/styles/app.scss';
import { R3FProvider } from '@/providers/r3f-provider';

const departure = localFont({
    src: './fonts/DepartureMono-Regular.woff2',
    variable: '--font-departure',
});

const atkinson = localFont({
    src: './fonts/AtkinsonHyperlegibleMono.woff2',
    variable: '--font-atkinson',
});

const pico8 = localFont({
    src: './fonts/Pico8.woff2',
    variable: '--font-pico8',
});

const pixel = localFont({
    src: './fonts/Pixel.woff2',
    variable: '--font-pixel',
});

export const metadata: Metadata = {
    title: {
        template: 'next.gov | %s',
        default: 'next.gov',
    },
    description: 'Pitch Deck',
    // openGraph: {
    //     title: 'Next Dot Gov',
    //     description: 'Pitch Deck',
    //     url: 'https://nextdotgov.com',
    //     siteName: 'Next Dot Gov',
    //     images: [
    //         {
    //             url: 'https://nextdotgov.com/images/og.png',
    //             width: 1200,
    //             height: 630,
    //         },
    //     ],
    //     locale: 'en_US',
    //     type: 'website',
    // },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${departure.variable} ${atkinson.variable} ${pico8.variable} ${pixel.variable}`}
                suppressHydrationWarning
            >
                <R3FProvider>{children}</R3FProvider>
            </body>
        </html>
    );
}
