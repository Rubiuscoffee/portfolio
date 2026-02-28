import type { Metadata } from 'next';
import StudioClient from '@/features/stack/ui/StudioClient';

export const metadata: Metadata = {
  title: 'Portfolio | Stack',
  description: 'Technologies I use',
};


export default function Studio() {
  return <StudioClient />;
}
