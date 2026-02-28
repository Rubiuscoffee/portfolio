import type { Metadata } from 'next';
import ContactClient from '@/features/contact/ui/ContactClient';

export const metadata: Metadata = {
  title: 'Portfolio | Contact',
  description: 'Get in touch with me',
};


export default function Contact() {
  return <ContactClient />;
}
