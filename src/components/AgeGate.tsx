'use client';

import { useEffect, useState } from 'react';
import { IMG } from '@/lib/site';
import s from './AgeGate.module.css';

const KEY = 'tmb_age_ok';

export default function AgeGate() {
  const [show, setShow] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    let ok = document.cookie.includes(`${KEY}=1`);
    try { ok = ok || localStorage.getItem(KEY) === '1'; } catch {}
    if (!ok) setShow(true);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = show ? 'hidden' : '';
  }, [show]);

  if (!show) return null;

  const accept = () => {
    try { localStorage.setItem(KEY, '1'); } catch {}
    document.cookie = `${KEY}=1;path=/;max-age=${60 * 60 * 24 * 30}`;
    setShow(false);
  };

  return (
    <div className={s.gate} role="dialog" aria-modal="true" aria-labelledby="age-q">
      <div className={s.box}>
        <img src={IMG.logo} alt="" width={150} height={141} />
        <p id="age-q">Você tem 18 anos ou mais?</p>
        <div className={s.actions}>
          <button type="button" className="btn btn-gold" onClick={accept}>Tenho 18 anos ou mais</button>
          <button type="button" className={`btn ${s.light}`} onClick={() => setDenied(true)}>Tenho menos de 18 anos</button>
        </div>
        {denied && <p className={s.denied}>Desculpe, o conteúdo deste site é destinado apenas a maiores de 18 anos.</p>}
      </div>
    </div>
  );
}
