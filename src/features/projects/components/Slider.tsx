'use client';

import { useRef } from 'react';
import { useSlider } from '@/features/projects/hooks/useSlider';
import '@/features/projects/styles/slider.css';

const Slider = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useSlider(sliderRef);

  return (
    <div className='slider' ref={sliderRef}>
      <div className='slide-track'></div>
    </div>
  );
};

export default Slider;

