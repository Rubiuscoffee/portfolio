import type { Metadata } from 'next';
import HomeClient from '@/features/home/ui/HomeClient';

export const metadata: Metadata = {
  title: 'Portfolio | Home',
  description: 'Welcome to my portfolio',
};


export default function Home() {
  return <HomeClient />;
}
