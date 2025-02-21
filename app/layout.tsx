import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Inter } from 'next/font/google';
import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import Header from '@/components/header';
import Footer from '@/components/footer';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Air Quality Dashboard',
  description: 'Air quality monitoring application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://framerusercontent.com/images/qBqOOSCX2e2KfSFhV5nl0hHMfA.png" rel="icon" media="(prefers-color-scheme: light)" />
        <link href="https://framerusercontent.com/images/qBqOOSCX2e2KfSFhV5nl0hHMfA.png" rel="icon" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <Header />
            {children}
            <Footer />
          </QueryProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}