import Link from 'next/link';
import Icon from './Icon';
import type { Product } from '@/lib/wp';
import { splitName, money, sealFor, discount, addToCartUrl } from '@/lib/site';
import s from './ProductCard.module.css';

export default function ProductCard({ product: p, large = false, semSP = false }: { product: Product; large?: boolean; semSP?: boolean }) {
  const { name, format } = splitName(p.name);
  const seal = sealFor(p.slug);
  const off = discount(p);
  const img = p.images[0];
  const href = `/produto/${p.slug}/`;

  return (
    <article className={`${s.card} ${large ? s.large : ''}`} data-sem-sp={semSP ? '' : undefined}>
      <div className={s.thumb}>
        <Link href={href} tabIndex={-1} aria-hidden="true" className={s.photo}>
          {img && (
            <img src={img.src} srcSet={img.srcset || undefined} sizes={large ? '(max-width: 767px) 45vw, 300px' : '(max-width: 767px) 60vw, 260px'}
              alt={img.alt} loading="lazy" width={1600} height={1969} />
          )}
        </Link>
        {seal && <img className={s.seal} src={seal} alt="" aria-hidden="true" loading="lazy" width={80} height={80} />}
        {off > 0 && <span className={`${s.badge} ${seal ? s.below : ''}`}>-{off}%</span>}
        {!p.inStock && <span className={`${s.badge} ${s.out}`}>Volto já!</span>}
        {p.inStock && p.purchasable && (
          <a className={s.quick} href={addToCartUrl(p.id)} rel="nofollow" aria-label={`Adicionar ${p.name} ao carrinho`}><Icon name="cart" size={18} /></a>
        )}
      </div>
      <h3 className={s.title}>
        <Link href={href}><span className={s.name}>{name}</span>{format && <span className={s.format}>{format}</span>}</Link>
      </h3>
      {p.reviews > 0 && p.rating > 0 && (
        <div className={s.stars} aria-label={`Nota ${p.rating} de 5`}>
          {[1, 2, 3, 4, 5].map((i) => <span key={i} className={i <= Math.round(p.rating) ? s.on : ''}><Icon name="star" size={13} /></span>)}
        </div>
      )}
      <div className={s.price}>
        {off > 0 && <del>{money(p.regularPrice)}</del>}
        <strong>{money(p.price)}</strong>
      </div>
      {p.unitPrice && <div className={s.unit}>{p.unitPrice}</div>}
    </article>
  );
}
