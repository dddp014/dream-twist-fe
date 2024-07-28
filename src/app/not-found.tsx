import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '404 - 꿈틀'
};

export default function NotFound() {
    return (
        <main className="w-full h-[500px] flex flex-col justify-center items-center">
            <h1 className="text-9xl font-extrabold text-main tracking-widest">
                404
            </h1>
            <div className="bg-amber-200 p-2 text-sm rounded rotate-12 absolute font-bold text-amber-500">
                Page Not Found
            </div>
            <Link href="/" className="cursor-pointer mt-5">
                <div className="relative inline-block text-sm font-medium text-main group active:text-white focus:outline-none focus:ring">
                    <span className="absolute rounded-xl inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-main group-hover:translate-y-0 group-hover:translate-x-0 "></span>
                    <span className="relative block px-8 py-3 bg-main border border-current text-white font-bold rounded-xl hover:bg-green-600">
                        홈으로
                    </span>
                </div>
            </Link>
        </main>
    );
}
