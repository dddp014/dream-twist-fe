import type { Metadata } from 'next';
import '../styles/globals.css';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: '꿈틀',
    description: 'Generated by create next app'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Nav />
                {children}
                <Footer />
            </body>
        </html>
    );
}
