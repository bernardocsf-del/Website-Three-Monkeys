'use client';

import { useRef, type ReactNode } from 'react';
import Icon from './Icon';
import s from './Rail.module.css';

/** Carrossel horizontal (arrastar/rolar) com setas no desktop. */
export default function Rail({ children, label, variant = 'products', arrows = true }: {
  children: ReactNode; label: string; variant?: 'products' | 'cards' | 'beers' | 'wide'; arrows?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <div className={s.wrap}>
      <div ref={ref} className={`rail ${s[variant]}`} role="list" aria-label={label}>{children}</div>
      {arrows && (
        <>
          <button className={`${s.arrow} ${s.prev}`} type="button" aria-label="Anterior" onClick={() => go(-1)}><Icon name="arrow-left" size={22} /></button>
          <button className={`${s.arrow} ${s.next}`} type="button" aria-label="Próximo" onClick={() => go(1)}><Icon name="arrow-right" size={22} /></button>
        </>
      )}
    </div>
  );
}
