import Link from 'next/link';
import { notFound } from 'next/navigation';
import { beers, beerItem } from '@/lib/cervejas';
import { seoMetadata } from '@/lib/seo';
import s from '../cervejas.module.css';

export const revalidate = 3600;
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(beers).map((slug) => ({ slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const beer = beers[slug];
  return seoMetadata(`/cervejas/${slug}/`, { title: beer ? `${beer.name} | Three Monkeys Beer` : undefined, image: beer?.image });
}

export default async function Cerveja({ params }: Props) {
  const { slug } = await params;
  const beer = beers[slug];
  if (!beer) notFound();
  const listed = beerItem(slug);

  return (
    <div className="page-pad">
      <section className={s.hero}>
        <div className="container center">
          {beer.kicker && <p className="kicker">{beer.kicker}</p>}
          <h1>{beer.name}</h1>
          {beer.meta && <p className={s.meta}>{beer.meta}</p>}
        </div>
      </section>

      <section className={s.body}>
        <div className={`container ${s.cols}`}>
          <div className={s.photo}>
            <img src={beer.image || listed?.image} alt={beer.imageAlt || listed?.imageAlt || beer.name} />
          </div>
          <div>
            <div className={s.desc} dangerouslySetInnerHTML={{ __html: beer.description }} />
            {beer.specs && <div className={s.specs} dangerouslySetInnerHTML={{ __html: beer.specs }} />}
            {beer.buttons.length > 0 && (
              <div className={s.buy}>
                {beer.buttons.map((b) => <Link key={b.href} className="btn btn-outline" href={b.href}>{b.label}</Link>)}
              </div>
            )}
            <Link className="btn-link" href="/cervejas/">← Todas as cervejas</Link>
          </div>
        </div>
      </section>

      {beer.extra && (
        <section className={s.extra}>
          <div className="container prose" dangerouslySetInnerHTML={{ __html: beer.extra }} />
        </section>
      )}
    </div>
  );
}
