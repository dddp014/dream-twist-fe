import './globals.css';
import Navbar from '@/components/navbar';
import { Inter, Inconsolata } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });
const inconsolata = Inconsolata({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
    title: '꿈틀',
    description: 'Ai 동화 생성 꿈틀 프로젝트',
    keywords: 'next.js, typescript, tailwinds'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="kr">
            <body className={inconsolata.className}>
                <Navbar />
                <main className="max-w-full py-10">{children}</main>
            </body>
        </html>
    );
}
