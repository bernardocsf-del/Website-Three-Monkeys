import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import Rail from '@/components/Rail';
import ProductCard from '@/components/ProductCard';
import BuyBox from '@/components/BuyBox';
import { getProduct, getProductExtras, getProducts, getSemSP } from '@/lib/wp';
import { cartUrl, discount, money, sealFor, siteUrl, splitName, wp } from '@/lib/site';
import { seoMetadata } from '@/lib/seo';
import s from './produto.module.css';

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = await getProduct(slug);
  return seoMetadata(`/produto/${slug}/`, { title: p ? `${p.name} | Three Monkeys Beer` : undefined, image: p?.images[0]?.src });
}

export default async function Produto({ params }: Props) {
  const { slug } = await params;
  const [p, extras, semSP, all] = await Promise.all([getProduct(slug), getProductExtras(slug), getSemSP(), getProducts()]);
  if (!p) notFound();

  const { name } = splitName(p.name);
  const off = discount(p);
  const seal = sealFor(p.slug);
  const isSubscription = p.type.includes('subscription');
  const related = all.filter((x) => x.id !== p.id && x.categories.includes('cervejas')).slice(0, 8);
  const tags = p.tags.map((t) => t.name).join(', ');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    sku: p.sku,
    image: p.images.map((i) => i.src),
    description: p.shortDescription.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
    brand: { '@type': 'Brand', name: 'Three Monkeys Beer' },
    ...(p.reviews > 0 && p.rating > 0 ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviews } } : {}),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: p.price.toFixed(2),
      availability: p.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${siteUrl()}/produto/${p.slug}/`,
    },
  };

  return (
    <div className="page-pad">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className={`container ${s.product}`}>
        <div className={s.gallery}>
          {p.images.map((img, i) => (
            <figure key={img.src}>
              <img src={img.src} srcSet={img.srcset || undefined} sizes="(max-width: 767px) 90vw, 520px" alt={img.alt}
                loading={i === 0 ? 'eager' : 'lazy'} width={1600} height={1969} />
              {i === 0 && seal && <img className={s.seal} src={seal} alt="" aria-hidden="true" />}
              {i === 0 && off > 0 && <span className={s.badge}>-{off}%</span>}
            </figure>
          ))}
        </div>

        <div className={s.summary}>
          <h1><span className={s.nome}>{name}</span>{extras.format && <span className={s.formato}>{extras.format}</span>}</h1>

          <p className={s.price}>
            {off > 0 && <del>{money(p.regularPrice)}</del>}
            <strong>{isSubscription ? `A partir de ${money(p.price)}` : money(p.price)}</strong>
            {p.unitPrice && <span className={s.unit}>{p.unitPrice}</span>}
          </p>
          {extras.validity && <p className={s.validity}>{extras.validity}</p>}

          <div className={s.short} dangerouslySetInnerHTML={{ __html: p.shortDescription }} />

          {isSubscription ? (
            <a className="btn btn-gold btn-lg" href={wp(`/produto/${p.slug}/`)}>Escolher meu plano</a>
          ) : p.inStock && p.purchasable ? (
            <>
              <p className={s.stock}><Icon name="check" size={16} /> {p.stockText || 'Em estoque'}</p>
              <BuyBox productId={p.id} cartUrl={cartUrl()} name={name} semSP={semSP.includes(p.id)} />
            </>
          ) : (
            <p className={s.out}>Volto já! Este produto está esgotado no momento.</p>
          )}

          {extras.deliveryNote && <p className={s.delivery} dangerouslySetInnerHTML={{ __html: extras.deliveryNote }} />}

          <dl className={s.meta}>
            {p.sku && (<><dt>SKU:</dt><dd>{p.sku}</dd></>)}
            <dt>Categoria:</dt><dd>{p.categories.includes('cervejas') ? 'Cervejas' : 'TMB Club'}</dd>
            {tags && (<><dt>Tags:</dt><dd>{tags}</dd></>)}
          </dl>
        </div>
      </section>

      {p.description && (
        <section className="section">
          <div className={`container prose ${s.desc}`} dangerouslySetInnerHTML={{ __html: p.description }} />
        </section>
      )}

      {!isSubscription && related.length > 0 && (
        <section className="section">
          <div className="container"><h2 className={`title-box ${s.relTitle}`}>Você também pode gostar</h2></div>
          <Rail label="Produtos relacionados">
            {related.map((r) => <div key={r.id} role="listitem"><ProductCard product={r} /></div>)}
          </Rail>
        </section>
      )}
    </div>
  );
}
