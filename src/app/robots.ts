import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
  // Ambiente de teste: bloqueia tudo para o Google não indexar a prévia.
  if (process.env.PUBLIC_NOINDEX === 'true') return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/', disallow: '/api/' }, sitemap: `${siteUrl()}/sitemap.xml` };
}
