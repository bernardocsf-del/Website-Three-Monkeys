import productsData from '../data/products.json';
import seoData from '../data/seo.json';

/** WordPress que continua cuidando de carrinho, checkout, conta e assinaturas. */
export const WP_URL = (import.meta.env.WP_URL || 'https://threemonkeysbeer.com').replace(/\/$/, '');

export const wp = (path: string) => `${WP_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const LINKS = {
  cart: wp('/carrinho/'),
  checkout: wp('/finalizar-compra/'),
  account: wp('/minha-conta/'),
  instagram: 'https://www.instagram.com/threemonkeysbeer/',
  untappd: 'https://untappd.com/ThreeMonkeysBeer',
  email: 'loja@threemonkeysbeer.com',
  whatsapp: 'https://api.whatsapp.com/send?phone=5521993074829',
};

export const NAV = [
  { label: 'Cervejas', href: '/cervejas/' },
  { label: 'Sobre nós', href: '/sobre/' },
  { label: 'Loja', href: '/store/' },
  { label: 'Assinatura', href: '/assinatura/' },
  { label: 'Chope em casa', href: '/chope-em-casa/' },
];

export const IMG = {
  logo: 'https://threemonkeysbeer.com/wp-content/uploads/2026/06/logo-header-novo-248x233-1.png.webp',
  favicon: 'https://threemonkeysbeer.com/wp-content/uploads/2026/06/logo-favicon-novo-512.png.webp',
  ogDefault: 'https://threemonkeysbeer.com/wp-content/uploads/2025/10/slider-cervejas-three-monkeys-beer-home2.jpg',
};

// ---------- Loja ----------
export type Product = (typeof productsData.products)[number];
export const products: Product[] = productsData.products;
export const semSP: number[] = productsData.semSP;

/** URL de "adicionar ao carrinho" do WooCommerce: leva direto ao carrinho do WordPress. */
export const addToCartUrl = (id: number, qty = 1) => `${LINKS.cart}?add-to-cart=${id}&quantity=${qty}`;

export const money = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/ /g, ' ');

/** "Classic IPA 350ml – 12 un." -> { name: "Classic IPA", format: "350ml · 12 un." } */
export function splitName(full: string) {
  const m = full.match(/^(.*?)\s+(\d+\s?ml)\s*[–—-]\s*(.+)$/i);
  if (!m) return { name: full, format: '' };
  return { name: m[1].trim(), format: `${m[2]} · ${m[3]}` };
}

/** Selos de baixa caloria exibidos sobre a foto do produto. */
const SEALS: Record<string, string> = {
  'classic-ipa-free': 'https://threemonkeysbeer.com/wp-content/uploads/2026/07/selo-free-circular-300x300.png.webp',
  'classic-ipa-summer': 'https://threemonkeysbeer.com/wp-content/uploads/2026/07/selo-summer-27kcal-300x300.png.webp',
};
export const sealFor = (slug: string) => Object.entries(SEALS).find(([k]) => slug.startsWith(k))?.[1] ?? null;

export const discount = (p: Product) =>
  p.onSale && p.regularPrice > p.price ? Math.round((1 - p.price / p.regularPrice) * 100) : 0;

/** Ordem da vitrine da /store/ (igual ao site antigo). */
export const STORE_ORDER = [
  'im-sour-baby', 'im-sour-473', 'golden-ale', 'classic-ipa-500', 'hoppy-lager', 'im-fcking-sour',
  'classic-ipa-free', 'classic-ipa-350', 'paranoid-about-coconut', 'galaxy-detox', 'paranoid-about-popcorn',
  'milky-way', 'classic-ipa-summer',
];
export const HOME_ORDER = [
  'im-fcking-sour', 'im-sour-baby', 'paranoid-about-coconut', 'classic-ipa-summer', 'galaxy-detox', 'golden-ale',
  'paranoid-about-popcorn', 'im-sour-473', 'milky-way', 'classic-ipa-350', 'hoppy-lager', 'classic-ipa-500',
];
export function ordered(order: string[]) {
  const beers = products.filter((p) => p.categories.includes('cervejas'));
  const pick = order.map((k) => beers.find((p) => p.slug.startsWith(k))).filter(Boolean) as Product[];
  return [...pick, ...beers.filter((p) => !pick.includes(p))];
}

// ---------- SEO ----------
type Seo = { title: string; description: string; image: string; robots: string };
export const seoFor = (path: string): Seo | undefined => (seoData as Record<string, Seo>)[path];
