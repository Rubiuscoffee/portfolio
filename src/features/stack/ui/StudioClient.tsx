'use client';

import { useRevealer } from '@/shared/hooks/useRevealer';
import '@/features/stack/styles/studio.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import Grid from '@/features/stack/components/Grid';

gsap.registerPlugin(SplitText);

export default function StudioClient() {
  useRevealer();

  useGSAP(() => {
    const splitText = SplitText.create('h1', {
      type: 'chars',
      charsClass: 'letter',
      mask: 'chars',
    });

    gsap.set(splitText.chars, { y: '110%' });

    gsap.to(splitText.chars, {
      y: '0%',
      duration: 1.5,
      stagger: 0.1,
      delay: 1.25,
      ease: 'power4.out',
    });
  }, {});

  return (
    <>
      <div className='revealer'></div>
      <div className='studio'>
        <h1>stack</h1>
        <div className='studio-img'>
          <Grid />
        </div>
      </div>
    </>
  );
}
