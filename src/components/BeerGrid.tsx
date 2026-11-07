import Link from 'next/link';
import Rail from './Rail';
import type { BeerItem } from '@/lib/cervejas';
import s from './BeerGrid.module.css';

function Item({ b }: { b: BeerItem }) {
  return (
    <Link href={`/cervejas/${b.slug}/`} className={s.item} role="listitem">
      <span className={s.foto}>
        {b.seal && <img className={s.selo} src={b.seal} alt="" aria-hidden="true" loading="lazy" />}
        <img className={s.prod} src={b.image} alt={b.imageAlt} width={1920} height={2362} loading="lazy" />
      </span>
      <h3>{b.name}</h3>
      <span className={s.vol}>{b.format}</span>
    </Link>
  );
}

export default function BeerGrid({ items, scroll = false, label }: { items: BeerItem[]; scroll?: boolean; label: string }) {
  if (scroll) {
    return <Rail label={label} variant="beers">{items.map((b) => <Item key={b.slug} b={b} />)}</Rail>;
  }
  return <div className={s.grade} role="list" aria-label={label}>{items.map((b) => <Item key={b.slug} b={b} />)}</div>;
}
