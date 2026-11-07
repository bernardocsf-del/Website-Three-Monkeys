import type { Metadata } from 'next';
import { getSeo } from './wp';
import { IMG, siteUrl } from './site';


/**
 * Metadados da página a partir do Yoast (editados no WordPress, como hoje).
 * `fallback` cobre páginas que não existem no WordPress.
 */
export async function seoMetadata(path: string, fallback: { title?: string; description?: string; image?: string } = {}): Promise<Metadata> {
  const y = await getSeo(path);
  const title = y?.title || fallback.title || 'Three Monkeys Beer — Cervejaria Artesanal Carioca';
  const description = y?.description || fallback.description || '';
  const image = fallback.image || y?.image || IMG.ogDefault;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${siteUrl()}${path}` },
    robots: process.env.PUBLIC_NOINDEX === 'true' || y?.noindex ? { index: false, follow: false } : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: 'Three Monkeys Beer',
      title,
      description,
      url: `${siteUrl()}${path}`,
      images: [{ url: image }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
