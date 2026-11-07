// Páginas de primeiro nível com as mesmas URLs do WordPress:
// - páginas de texto (entrega, devoluções, termos, privacidade) — conteúdo neste repositório
// - posts do blog (/<slug-do-post>/) — lidos ao vivo do WordPress
import Link from 'next/link';
import { notFound } from 'next/navigation';
import paginas from '@/data/paginas.json';
import { getPost, getPosts } from '@/lib/wp';
import { siteUrl } from '@/lib/site';
import { seoMetadata } from '@/lib/seo';
import s from './doc.module.css';

export const revalidate = 300;

type Pagina = { title: string; html: string };
const PAGINAS = paginas as Record<string, Pagina>;
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return [...Object.keys(PAGINAS), ...posts.map((p) => p.slug)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pagina = PAGINAS[slug];
  if (pagina) return seoMetadata(`/${slug}/`, { title: `${pagina.title} | Three Monkeys Beer` });
  const post = await getPost(slug).catch(() => null);
  return seoMetadata(`/${slug}/`, { title: post?.title, description: post?.excerpt, image: post?.image || undefined });
}

export default async function Pagina({ params }: Props) {
  const { slug } = await params;
  const pagina = PAGINAS[slug];
  if (pagina) {
    return (
      <article className={`container page-pad ${s.doc}`}>
        <h1>{pagina.title}</h1>
        <div className="prose" dangerouslySetInnerHTML={{ __html: pagina.html }} />
      </article>
    );
  }

  const post = await getPost(slug).catch(() => null);
  if (!post) notFound();
  const date = new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo' });
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.modified,
    image: post.image || undefined,
    url: `${siteUrl()}/${post.slug}/`,
    author: { '@type': 'Organization', name: 'Three Monkeys Beer' },
  };
  return (
    <article className={`container page-pad ${s.doc}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="kicker">Blog · {date}</p>
      <h1>{post.title}</h1>
      {post.image && <img className={s.cover} src={post.image} alt="" />}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      <Link className={`btn btn-outline ${s.more}`} href="/cervejas/">Conheça nossas cervejas</Link>
    </article>
  );
}
