'use client';

import { useRevealer } from '@/shared/hooks/useRevealer';
import '@/features/projects/styles/work.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import ReactLenis from 'lenis/react';
import Slider from '@/features/projects/components/Slider';

gsap.registerPlugin(SplitText);

export default function WorkClient() {
  useRevealer();

  useGSAP(() => {
    const h1 = document.querySelector('h1');
    if (!h1) return;

    const splitText = SplitText.create('h1', {
      type: 'words',
      wordsClass: 'word',
      mask: 'words',
    });

    gsap.set(splitText.words, { y: '110%' });

    gsap.to(splitText.words, {
      y: '0%',
      duration: 1.5,
      stagger: 0.25,
      delay: 1.75,
      ease: 'power4.out',
    });
  }, {});

  return (
    <>
      <ReactLenis root>
        <div className='revealer'></div>
        <Slider />
      </ReactLenis>
    </>
  );
}
