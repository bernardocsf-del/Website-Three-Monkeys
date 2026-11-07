'use client';

import { useEffect, useState } from 'react';
import { getRegion, setRegion, REGION_EVENT } from '@/lib/region';
import s from './BuyBox.module.css';

/** Quantidade + "Adicionar ao carrinho" (vai para o carrinho do WooCommerce). */
export default function BuyBox({ productId, cartUrl, name, semSP }: { productId: number; cartUrl: string; name: string; semSP: boolean }) {
  const [qty, setQty] = useState(1);
  const [sp, setSp] = useState(false);

  useEffect(() => {
    const apply = () => setSp(getRegion() === 'SP');
    apply();
    document.addEventListener(REGION_EVENT, apply);
    return () => document.removeEventListener(REGION_EVENT, apply);
  }, []);

  if (semSP && sp) {
    return (
      <div className={s.indisp}>
        <strong>Ainda não levamos {name} para São Paulo.</strong><br />
        Ela está disponível para entrega no Rio de Janeiro. Se você é do Rio,{' '}
        <button type="button" className={s.link} onClick={() => setRegion('RJ')}>mude a região aqui</button>.
      </div>
    );
  }

  const step = (d: number) => setQty((q) => Math.max(1, Math.min(99, q + d)));
  return (
    <form className={s.cart} method="get" action={cartUrl}>
      <input type="hidden" name="add-to-cart" value={productId} />
      <div className={s.qty}>
        <button type="button" onClick={() => step(-1)} aria-label="Diminuir">-</button>
        <input type="number" name="quantity" value={qty} min={1} max={99} inputMode="numeric" aria-label="Quantidade"
          onChange={(e) => setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))} />
        <button type="button" onClick={() => step(1)} aria-label="Aumentar">+</button>
      </div>
      <button className={`btn btn-gold ${s.add}`} type="submit">Adicionar ao carrinho</button>
    </form>
  );
}
