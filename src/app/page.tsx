import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import Rail from '@/components/Rail';
import ProductCard from '@/components/ProductCard';
import { ClubCta, PromoTiles, InstagramFeed } from '@/components/Blocks';
import { getProducts } from '@/lib/wp';
import { ORDER, U, ordered } from '@/lib/site';
import { seoMetadata } from '@/lib/seo';
import s from './home.module.css';

export const revalidate = 300;
export const generateMetadata = () => seoMetadata('/');

const slides = [
  { src: `${U}/2026/07/slider-home-azulejo-v6-pano.jpg.webp`, alt: 'Three Monkeys Beer — azulejos pretos, logotipo Motor Oil', w: 2560, h: 1250 },
  { src: `${U}/2026/07/slider-home-praia-pano.jpg.webp`, alt: "Latas I'm Sour na praia — Three Monkeys Beer", w: 2292, h: 1119 },
];
const cards = [
  { slug: 'im-sour', img: 'card-home-im-sour-v8-dark', alt: "I'm Sour — cerveja Sour 6,3% ABV da Three Monkeys Beer" },
  { slug: 'classic-ipa', img: 'card-home-classic-ipa-v7-dark', alt: 'Classic IPA — American IPA 6% ABV da Three Monkeys Beer' },
  { slug: 'golden-ale', img: 'card-home-golden-ale-v7-dark', alt: 'Golden Ale 7,5% ABV da Three Monkeys Beer' },
  { slug: 'hoppy-lager', img: 'card-home-hoppy-lager-v7-dark', alt: 'Hoppy Lager — American Lager 5% ABV da Three Monkeys Beer' },
  { slug: 'classic-ipa-free', img: 'card-home-classic-ipa-free-v7-dark', alt: 'Classic IPA Free — IPA sem álcool, até 0,5% ABV, da Three Monkeys Beer' },
  { slug: 'classic-ipa-summer', img: 'card-home-classic-ipa-summer-v7-dark', alt: 'Classic IPA Summer — Session IPA 3,3% ABV da Three Monkeys Beer' },
];

export default async function Home() {
  const products = ordered(await getProducts(), ORDER.home);
  return (
    <>
      <HeroSlider slides={slides} />

      <section className={s.teaser}>
        <div className={s.teaserInner}>
          <video autoPlay loop muted playsInline preload="metadata" poster={`${U}/2026/07/Poster_teaser_Galaxy_Milky_Way_v2.jpg`}>
            <source src={`${U}/2026/07/Teaser_Galaxy_Detox_e_Milky_Way_v2_1_Cristo_selo_TM.mp4`} type="video/mp4" />
          </video>
          <div className={s.overlay}>
            <span className={s.t1}>Chegaram na atmosfera terrestre</span>
            <span className={s.t2}>Galaxy Detox &amp; Milky Way IPA</span>
            <Link className={s.cta} href="/store/">Compre agora!</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container"><Link className="title-box" href="/cervejas/">Nossas cervejas</Link></div>
        <div className={`container ${s.cards}`}>
          <Rail label="Nossas cervejas" variant="cards" arrows={false}>
            {cards.map((c) => (
              <Link key={c.slug} role="listitem" href={`/cervejas/${c.slug}/`} className={s.card}>
                <img src={`${U}/2026/08/${c.img}.png.webp`} alt={c.alt} width={702} height={1202} loading="lazy" />
              </Link>
            ))}
          </Rail>
        </div>
      </section>

      <section className={`section ${s.shop}`}>
        <div className="container"><Link className="title-box" href="/store/">Loja</Link></div>
        <div className={s.shopRail}>
          <Rail label="Produtos da loja">
            {products.map((p) => <div key={p.id} role="listitem"><ProductCard product={p} /></div>)}
          </Rail>
        </div>
      </section>

      <ClubCta />
      <PromoTiles />
      <InstagramFeed />
    </>
  );
}
