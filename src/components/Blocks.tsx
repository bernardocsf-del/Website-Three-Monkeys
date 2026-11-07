// Blocos reaproveitados em várias páginas: chamada do clube, banners e feed do Instagram.
import Link from 'next/link';
import Script from 'next/script';
import { LINKS, U } from '@/lib/site';
import s from './Blocks.module.css';

export function ClubCta() {
  return (
    <section className={s.club}>
      <div className="container center">
        <p className="kicker">MemberChimp Club</p>
        <h2>Cervejas artesanais com atitude direto na sua casa!</h2>
        <Link className="btn btn-outline btn-lg" href="/assinatura/">Conheça o clube de assinatura</Link>
      </div>
    </section>
  );
}

const TILES = {
  sobre: { img: `${U}/2025/09/sobre-three-monkeys-website.png.webp`, title: ['Cervejaria artesanal', 'com DNA carioca'], cta: 'Sobre nós', href: '/sobre/' },
  evento: { img: `${U}/2025/09/seu-evento-three-monkeys-website.png.webp`, title: ['Leve a TMB', 'para seu evento'], cta: 'Saiba mais', href: '/chope-em-casa/' },
};

export function PromoTiles({ only }: { only?: keyof typeof TILES }) {
  const list = only ? [TILES[only]] : [TILES.sobre, TILES.evento];
  return (
    <section className={`section ${s.promo}`}>
      <div className={`container ${s.tiles} ${list.length === 1 ? s.single : ''}`}>
        {list.map((t) => (
          <Link key={t.href} className={s.tile} href={t.href}>
            <img src={t.img} alt="" loading="lazy" width={1200} height={1000} />
            <div className={s.body}>
              <h4>{t.title[0]}<br />{t.title[1]}</h4>
              <span className="btn btn-dark">{t.cta}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Feed do Instagram via Behold (mesmo widget do site atual). */
export function InstagramFeed() {
  return (
    <section className={`section ${s.ig}`}>
      <div className="container"><a className="title-box" href={LINKS.instagram} target="_blank" rel="noopener">@threemonkeysbeer</a></div>
      <div className={`container-wide ${s.feed}`}>
        {/* @ts-expect-error elemento customizado do Behold */}
        <behold-widget feed-id="nbjxpAMuO13U7oAGIWpL" />
      </div>
      <Script src="https://w.behold.so/widget.js" type="module" strategy="lazyOnload" />
    </section>
  );
}
