import type { Metadata } from 'next';
import '../styles/globals.css';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: '꿈틀',
    description: 'Ai 동화 생성 꿈틀 프로젝트',
    icons: {
        icon: '/favicon.ico'
    }
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div id="wrapper">
                    <div id="main">
                        <Nav />
                        {children}
                    </div>
                    <Footer />
                </div>
                <div id="modal-root" />
            </body>
        </html>
    );
}
