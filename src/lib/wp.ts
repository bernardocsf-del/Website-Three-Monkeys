// Leitura ao vivo do WordPress/WooCommerce (só no servidor; só leitura).
//
// Cada resposta fica em cache por REVALIDATE segundos. Quando um produto muda no WooCommerce,
// o webhook /api/revalidate/ invalida a etiqueta "wp" e a próxima visita já vê o dado novo.
import { wpUrl } from './site';

export const REVALIDATE = 300; // 5 minutos
export const TAG = 'wp';

async function wpFetch(path: string, type: 'json' | 'text' = 'json') {
  const url = path.startsWith('http') ? path : `${wpUrl()}${path}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'three-monkeys-site', Accept: type === 'json' ? 'application/json' : 'text/html' },
    next: { revalidate: REVALIDATE, tags: [TAG] },
  });
  if (!res.ok) throw new Error(`WordPress respondeu ${res.status} em ${url}`);
  return type === 'json' ? res.json() : res.text();
}

// ---------- utilidades ----------
const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', ndash: '–', mdash: '—' };
export function decode(s = '') {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
    .trim();
}
const stripTags = (s = '') => decode(s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
export const relLink = (u = '') => u.replace(/^https?:\/\/(www\.)?threemonkeysbeer\.com/i, '').replace(wpUrl(), '') || '/';

/** Limpa HTML vindo do WordPress: tira scripts/estilos inline e deixa links internos relativos. */
export function cleanHtml(html = '') {
  return html
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, '')
    .replace(/<link[^>]*>/gi, '')
    .replace(/\sstyle="([^"]*)"/gi, (_, st: string) => {
      const keep = st.match(/text-align:\s*[a-z]+/i);
      return keep ? ` style="${keep[0]}"` : '';
    })
    .replace(/href="https?:\/\/(www\.)?threemonkeysbeer\.com/gi, 'href="')
    .replace(/<p>\s*(&nbsp;)?\s*<\/p>/gi, '')
    .trim();
}

// ---------- Loja ----------
export type Product = {
  id: number;
  slug: string;
  name: string;
  sku: string;
  type: string;
  categories: string[];
  tags: { slug: string; name: string }[];
  shortDescription: string;
  description: string;
  price: number;
  regularPrice: number;
  onSale: boolean;
  unitPrice: string | null;
  images: { src: string; srcset: string; alt: string }[];
  inStock: boolean;
  purchasable: boolean;
  stockText: string;
  rating: number;
  reviews: number;
};

type StoreProduct = {
  id: number; slug: string; name: string; sku: string; type: string; on_sale: boolean;
  short_description: string; description: string; price_html: string;
  prices: { price: string; regular_price: string; currency_minor_unit: number };
  images: { src: string; srcset: string; alt: string }[];
  categories: { slug: string }[]; tags: { slug: string; name: string }[];
  is_in_stock: boolean; is_purchasable: boolean; stock_availability?: { text: string };
  average_rating: string; review_count: number;
};

function mapProduct(p: StoreProduct): Product {
  const minor = 10 ** (p.prices.currency_minor_unit ?? 2);
  const unit = p.price_html.match(/class="tmb-preco-unidade"[^>]*>([^<]+)</);
  return {
    id: p.id,
    slug: p.slug,
    name: decode(p.name),
    sku: p.sku,
    type: p.type,
    categories: p.categories.map((c) => c.slug),
    tags: p.tags.map((t) => ({ slug: t.slug, name: decode(t.name) })),
    shortDescription: cleanHtml(p.short_description),
    description: cleanHtml(p.description),
    price: Number(p.prices.price) / minor,
    regularPrice: Number(p.prices.regular_price) / minor,
    onSale: p.on_sale,
    unitPrice: unit ? decode(unit[1]) : null,
    images: p.images.map((i) => ({ src: i.src, srcset: i.srcset, alt: i.alt || decode(p.name) })),
    inStock: p.is_in_stock,
    purchasable: p.is_purchasable,
    stockText: p.stock_availability?.text ? stripTags(p.stock_availability.text) : '',
    rating: Number(p.average_rating),
    reviews: p.review_count,
  };
}

export async function getProducts(): Promise<Product[]> {
  const list: StoreProduct[] = await wpFetch('/wp-json/wc/store/v1/products?per_page=100');
  return list.map(mapProduct);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const list: StoreProduct[] = await wpFetch(`/wp-json/wc/store/v1/products?slug=${encodeURIComponent(slug)}`);
  return list[0] ? mapProduct(list[0]) : null;
}

/** Campos personalizados que só aparecem na página pública do produto no WordPress. */
export async function getProductExtras(slug: string) {
  try {
    const html: string = await wpFetch(`/produto/${slug}/`, 'text');
    const pick = (cls: string) => html.match(new RegExp(`class="${cls}"[^>]*>([\\s\\S]*?)</(?:span|p|div)>`))?.[1] ?? '';
    return {
      format: stripTags(pick('tmb-titulo-formato')),
      validity: stripTags(pick('tmb-validade')),
      deliveryNote: cleanHtml(pick('tmb-frete-aviso')),
    };
  } catch {
    return { format: '', validity: '', deliveryNote: '' };
  }
}

/**
 * Produtos sem entrega em São Paulo. Hoje a lista fica num snippet da página /store/ do
 * WordPress (var IDS = [...]); lemos de lá para seguir sempre a mesma regra.
 */
export async function getSemSP(): Promise<number[]> {
  try {
    const html: string = await wpFetch('/store/', 'text');
    const m = html.match(/var IDS = \[([\d,\s]*)\]/);
    return m ? m[1].split(',').map((n) => Number(n.trim())).filter(Boolean) : [];
  } catch {
    return [];
  }
}

// ---------- SEO (Yoast) ----------
export type Seo = { title: string; description: string; image: string; noindex: boolean };

export async function getSeo(path: string): Promise<Seo | null> {
  try {
    const data = await wpFetch(`/wp-json/yoast/v1/get_head?url=${encodeURIComponent(`${wpUrl()}${path}`)}`);
    if (data.status !== 200 || !data.json) return null;
    const y = data.json;
    return {
      title: decode(y.title || ''),
      description: decode(y.description || y.og_description || ''),
      image: y.og_image?.[0]?.url || '',
      noindex: y.robots?.index === 'noindex',
    };
  } catch {
    return null;
  }
}

// ---------- Blog ----------
export type Post = { slug: string; date: string; modified: string; title: string; excerpt: string; image: string; html: string };

type WpPost = {
  slug: string; date: string; modified: string; title: { rendered: string }; excerpt: { rendered: string };
  content: { rendered: string }; _embedded?: { 'wp:featuredmedia'?: { source_url: string }[] };
};
const mapPost = (p: WpPost): Post => ({
  slug: p.slug,
  date: p.date,
  modified: p.modified,
  title: decode(p.title.rendered),
  excerpt: stripTags(p.excerpt.rendered),
  image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
  html: cleanHtml(p.content.rendered),
});

export async function getPosts(): Promise<Post[]> {
  try {
    const list: WpPost[] = await wpFetch('/wp-json/wp/v2/posts?per_page=100&_embed=wp:featuredmedia');
    return list.map(mapPost);
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  const list: WpPost[] = await wpFetch(`/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia`);
  return list[0] ? mapPost(list[0]) : null;
}
