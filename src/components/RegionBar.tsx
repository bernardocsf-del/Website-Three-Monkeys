'use client';

import { useEffect, useState } from 'react';
import { getRegion, setRegion, REGION_EVENT } from '@/lib/region';
import s from './RegionBar.module.css';

/**
 * "Onde você quer receber?" — mesma regra do site antigo: com a região SP, somem da vitrine
 * os produtos marcados com data-sem-sp (sem entrega em São Paulo).
 */
export default function RegionBar() {
  const [reg, setReg] = useState('');

  useEffect(() => {
    const apply = () => {
      const r = getRegion();
      setReg(r);
      document.querySelectorAll<HTMLElement>('[data-sem-sp]').forEach((el) => {
        const item = el.closest<HTMLElement>('[role="listitem"]') ?? el;
        item.hidden = r === 'SP';
      });
    };
    apply();
    document.addEventListener(REGION_EVENT, apply);
    return () => document.removeEventListener(REGION_EVENT, apply);
  }, []);

  const nota =
    reg === 'SP' ? 'Mostrando o que entregamos em São Paulo.'
    : reg === 'RJ' ? 'Mostrando tudo que entregamos no Rio de Janeiro.'
    : 'Escolha a região para ver o que entregamos aí.';

  return (
    <div className={s.region}>
      <span className={s.lbl}>Onde você quer receber?</span>
      {(['RJ', 'SP'] as const).map((r) => (
        <button key={r} type="button" className={`${s.opt} ${reg === r ? s.on : ''}`} aria-pressed={reg === r} onClick={() => setRegion(r)}>
          {r === 'RJ' ? 'Rio de Janeiro' : 'São Paulo'}
        </button>
      ))}
      <span className={s.nota} aria-live="polite">{nota}</span>
    </div>
  );
}
