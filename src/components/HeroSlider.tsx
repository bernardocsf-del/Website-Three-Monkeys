'use client';

import { useEffect, useState } from 'react';
import s from './HeroSlider.module.css';

type Slide = { src: string; alt: string; w: number; h: number };

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);
  return (
    <section className={s.hero} aria-label="Destaques">
      <div className={s.slides}>
        {slides.map((sl, n) => (
          <img key={sl.src} src={sl.src} alt={sl.alt} width={sl.w} height={sl.h} className={n === i ? s.active : ''}
            fetchPriority={n === 0 ? 'high' : 'low'} loading={n === 0 ? 'eager' : 'lazy'} />
        ))}
      </div>
      <div className={s.dots}>
        {slides.map((sl, n) => (
          <button key={sl.src} type="button" aria-label={`Slide ${n + 1}`} className={n === i ? s.active : ''} onClick={() => setI(n)} />
        ))}
      </div>
    </section>
  );
}
