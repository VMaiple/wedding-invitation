import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AnimationProvider } from '@/context/animation-context';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Свадебное приглашение',
  description: 'Интерактивное приглашение на нашу свадьбу',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <AnimationProvider>
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
        </AnimationProvider>
      </body>
    </html>
  );
}
