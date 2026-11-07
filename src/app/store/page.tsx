import Rail from '@/components/Rail';
import ProductCard from '@/components/ProductCard';
import RegionBar from '@/components/RegionBar';
import { ClubCta, PromoTiles, InstagramFeed } from '@/components/Blocks';
import { getProducts, getSemSP } from '@/lib/wp';
import { ORDER, ordered } from '@/lib/site';
import { seoMetadata } from '@/lib/seo';
import s from './store.module.css';

export const revalidate = 300;
export const generateMetadata = () => seoMetadata('/store/');

export default async function Store() {
  const [products, semSP] = await Promise.all([getProducts(), getSemSP()]);
  const top = ordered(products, ORDER.storeTop);
  const grid = ordered(products, ORDER.storeGrid);
  return (
    <div className="page-pad">
      <section className={s.top}>
        <RegionBar />
        <Rail label="Cervejas à venda">
          {top.map((p) => <div key={p.id} role="listitem"><ProductCard product={p} semSP={semSP.includes(p.id)} /></div>)}
        </Rail>
      </section>

      <section className="section">
        <div className="container"><h2 className={`title-box ${s.title}`}>Peça a sua já</h2></div>
        <div className={`container ${s.narrow}`}>
          <div className={s.grid} role="list">
            {grid.map((p) => <div key={p.id} role="listitem"><ProductCard product={p} large semSP={semSP.includes(p.id)} /></div>)}
          </div>
        </div>
      </section>

      <ClubCta />
      <PromoTiles />
      <InstagramFeed />
    </div>
  );
}
