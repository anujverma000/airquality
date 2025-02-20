import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Air Quality Dashboard',
  description: 'Air quality monitoring application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://framerusercontent.com/images/qBqOOSCX2e2KfSFhV5nl0hHMfA.png" rel="icon" media="(prefers-color-scheme: light)" />
        <link href="https://framerusercontent.com/images/qBqOOSCX2e2KfSFhV5nl0hHMfA.png" rel="icon" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}