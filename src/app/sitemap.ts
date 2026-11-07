import type { MetadataRoute } from 'next';
import paginas from '@/data/paginas.json';
import { beers } from '@/lib/cervejas';
import { getPosts, getProducts } from '@/lib/wp';
import { siteUrl } from '@/lib/site';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const [products, posts] = await Promise.all([getProducts().catch(() => []), getPosts()]);
  const fixed = ['/', '/cervejas/', '/store/', '/sobre/', '/assinatura/', '/chope-em-casa/'];
  return [
    ...fixed.map((p) => ({ url: `${base}${p}` })),
    ...Object.keys(beers).map((s) => ({ url: `${base}/cervejas/${s}/` })),
    ...products.map((p) => ({ url: `${base}/produto/${p.slug}/` })),
    ...posts.map((p) => ({ url: `${base}/${p.slug}/`, lastModified: p.modified })),
    ...Object.keys(paginas).map((s) => ({ url: `${base}/${s}/` })),
  ];
}
