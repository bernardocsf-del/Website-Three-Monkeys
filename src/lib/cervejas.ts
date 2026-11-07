// Conteúdo das cervejas: mora neste repositório (src/data/cervejas.json), importado do WordPress.
import data from '@/data/cervejas.json';

export type BeerItem = { slug: string; name: string; format: string; image: string; imageAlt: string; seal: string | null };
export type BeerGroup = { title: string; scroll: boolean; items: BeerItem[] };
export type Beer = {
  slug: string; kicker: string; name: string; meta: string; image: string; imageAlt: string;
  description: string; specs: string; buttons: { label: string; href: string }[]; extra: string;
};

export const groups = data.groups as BeerGroup[];
export const beers = data.beers as Record<string, Beer>;
export const beerItem = (slug: string) => groups.flatMap((g) => g.items).find((i) => i.slug === slug);
