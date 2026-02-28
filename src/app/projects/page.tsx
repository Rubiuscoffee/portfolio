import type { Metadata } from 'next';
import WorkClient from '@/features/projects/ui/WorkClient';

export const metadata: Metadata = {
  title: 'Portfolio | Projects',
  description: 'My recent work and projects',
};


export default function Work() {
  return <WorkClient />;
}
