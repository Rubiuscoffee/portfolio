import './globals.css';
import * as React from 'react';
import { GeistSans } from 'geist/font/sans';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next'

import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: 'Brian',
  description: 'portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const VT = (React as unknown as {
    unstable_ViewTransition?: React.ComponentType<{ children: React.ReactNode }>
  }).unstable_ViewTransition
  const Wrapper: React.ComponentType<{ children: React.ReactNode }> = VT ?? React.Fragment;
  return (
    <Wrapper>
      <html lang='en' className={GeistSans.variable}>
        <body className={GeistSans.className}>
          <Nav />
          {children}
          <Analytics />
        </body>
      </html>
    </Wrapper>
  );
}
