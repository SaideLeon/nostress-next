import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '@/components/Navbar/Navbar'; // Corrected path

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-900 via-teal-900 to-blue-900 text-white">
      <Navbar />
      <main className="flex-1 pt-20">
        <Component {...pageProps} />
      </main>
    </div>
  );
}