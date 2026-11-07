import type { Product } from './wp';

// Lidas em tempo de execução (variáveis do Cloudflare), por isso são funções.
/** WordPress que continua cuidando de carrinho, checkout, conta e assinaturas. */
export const wpUrl = () => (process.env.WP_URL || 'https://threemonkeysbeer.com').replace(/\/$/, '');
/** Endereço público deste site. */
export const siteUrl = () => (process.env.SITE_URL || 'https://threemonkeysbeer.com').replace(/\/$/, '');

export const wp = (path: string) => `${wpUrl()}${path.startsWith('/') ? path : `/${path}`}`;
export const cartUrl = () => wp('/carrinho/');
export const accountUrl = () => wp('/minha-conta/');

export const LINKS = {
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

export const U = 'https://threemonkeysbeer.com/wp-content/uploads';
export const IMG = {
  logo: `${U}/2026/06/logo-header-novo-248x233-1.png.webp`,
  favicon: `${U}/2026/06/logo-favicon-novo-512.png.webp`,
  ogDefault: `${U}/2025/10/slider-cervejas-three-monkeys-beer-home2.jpg`,
};

// ---------- Loja ----------
/** "Adicionar ao carrinho" do WooCommerce: leva direto ao carrinho do WordPress. */
export const addToCartUrl = (id: number, qty = 1) => `${cartUrl()}?add-to-cart=${id}&quantity=${qty}`;

export const money = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/\u00a0/g, ' ');

/** "Classic IPA 350ml – 12 un." -> { name: "Classic IPA", format: "350ml · 12 un." } */
export function splitName(full: string) {
  const m = full.match(/^(.*?)\s+(\d+\s?ml)\s*[–—-]\s*(.+)$/i);
  if (!m) return { name: full, format: '' };
  return { name: m[1].trim(), format: `${m[2]} · ${m[3]}` };
}

/** Selos de baixa caloria exibidos sobre a foto do produto. */
const SEALS: Record<string, string> = {
  'classic-ipa-free': `${U}/2026/07/selo-free-circular-300x300.png.webp`,
  'classic-ipa-summer': `${U}/2026/07/selo-summer-27kcal-300x300.png.webp`,
};
export const sealFor = (slug: string) => Object.entries(SEALS).find(([k]) => slug.startsWith(k))?.[1] ?? null;

export const discount = (p: Product) =>
  p.onSale && p.regularPrice > p.price ? Math.round((1 - p.price / p.regularPrice) * 100) : 0;

/** Ordens das vitrines (iguais ao site antigo). Produtos novos entram no fim automaticamente. */
export const ORDER = {
  home: ['im-fcking-sour', 'im-sour-baby', 'paranoid-about-coconut', 'classic-ipa-summer', 'galaxy-detox', 'golden-ale',
    'paranoid-about-popcorn', 'im-sour-473', 'milky-way', 'classic-ipa-350', 'hoppy-lager', 'classic-ipa-500'],
  storeTop: ['im-sour-baby', 'im-sour-473', 'golden-ale', 'classic-ipa-500', 'hoppy-lager', 'im-fcking-sour',
    'classic-ipa-free', 'classic-ipa-350', 'paranoid-about-coconut', 'galaxy-detox', 'paranoid-about-popcorn',
    'milky-way', 'classic-ipa-summer'],
  storeGrid: ['galaxy-detox', 'milky-way', 'classic-ipa-summer', 'hoppy-lager', 'paranoid-about-popcorn',
    'paranoid-about-coconut', 'classic-ipa-350', 'classic-ipa-500', 'classic-ipa-free', 'im-fcking-sour', 'im-sour-473',
    'im-sour-baby', 'golden-ale'],
};

export function ordered(products: Product[], order: string[]) {
  const beers = products.filter((p) => p.categories.includes('cervejas'));
  const pick = order.map((k) => beers.find((p) => p.slug.startsWith(k))).filter((p): p is Product => !!p);
  return [...pick, ...beers.filter((p) => !pick.includes(p))];
}
