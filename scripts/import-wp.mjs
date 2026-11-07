// Importa do WordPress o conteúdo que passa a morar neste repositório:
//   - src/data/cervejas.json  (lista e páginas dos rótulos em /cervejas/)
//   - src/data/paginas.json   (entrega, devoluções, termos, privacidade)
//
// Uso: npm run import   (SOBRESCREVE esses dois arquivos — edições feitas aqui se perdem)
//
// Produtos, preços, estoque, SEO e blog NÃO passam por aqui: o site lê ao vivo do WordPress.
// Só faz leituras públicas. Nunca grava no WordPress.

import { load } from 'cheerio';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const WP = (process.env.WP_URL || 'https://threemonkeysbeer.com').replace(/\/$/, '');
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'src', 'data');

async function get(url, type = 'json') {
  for (let i = 0; i < 4; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'three-monkeys-site-sync' } });
      if (!r.ok) throw new Error(`${r.status} ${url}`);
      return type === 'json' ? r.json() : r.text();
    } catch (e) {
      if (i === 3) throw e;
      await new Promise((ok) => setTimeout(ok, 1000 * 2 ** i));
    }
  }
}

async function save(name, data) {
  const file = join(DATA, name);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(data, null, 2) + '\n');
  console.log('✓', name);
}

const decode = (s = '') => load(`<i>${s}</i>`)('i').text().trim();
const rel = (u = '') => u.replace(/^https?:\/\/threemonkeysbeer\.com/, '').replace(WP, '') || '/';

// Remove sobras do WordPress (estilos inline de cor, spans vazios, links absolutos).
function cleanHtml(html) {
  const $ = load(html, null, false);
  $('script, style, link, noscript').remove();
  $('[style]').each((_, el) => {
    const s = $(el).attr('style') || '';
    const keep = s.match(/text-align:\s*[a-z]+/);
    keep ? $(el).attr('style', keep[0]) : $(el).removeAttr('style');
  });
  $('span').each((_, el) => {
    if (!el.attribs || Object.keys(el.attribs).length === 0) $(el).replaceWith($(el).contents());
  });
  $('a[href]').each((_, el) => $(el).attr('href', rel($(el).attr('href'))));
  $('p').each((_, el) => {
    if (!$(el).text().trim() && !$(el).find('img').length) $(el).remove();
  });
  return $.html().replace(/\n{2,}/g, '\n').trim();
}

// ---------- Importação única: cervejas ----------
async function importCervejas() {
  const html = await get(`${WP}/cervejas/`, 'text');
  const $ = load(html);
  const area = $('.wd-content-area article');

  const groups = [];
  let current = null;
  area.find('.vc_row').each((_, row) => {
    const r = $(row);
    if (r.parents('.vc_row').length) return;
    const btn = r.find('.wd-button-wrapper a.btn').first();
    if (btn.length && !r.find('.tmb-grade').length) {
      current = { title: btn.text().trim(), scroll: false, items: [] };
      groups.push(current);
    }
    if (current && r.find('.tmb-grade-saz').length) current.scroll = true;
    r.find('.tmb-grade > a').each((_, a) => {
      const el = $(a);
      current?.items.push({
        slug: el.attr('href').split('/').filter(Boolean).pop(),
        name: el.find('h3').text().trim(),
        format: el.find('.tmb-vol').text().trim(),
        image: el.find('img.tmb-prod').attr('src'),
        imageAlt: el.find('img.tmb-prod').attr('alt') || '',
        seal: el.find('img.tmb-selo').attr('src') || null,
      });
    });
  });

  const filled = groups.filter((g) => g.items.length);
  groups.length = 0;
  groups.push(...filled);

  const slugs = groups.flatMap((g) => g.items.map((i) => i.slug));
  const beers = {};
  for (const slug of slugs) {
    const page = await get(`${WP}/cervejas/${slug}/`, 'text');
    beers[slug] = parseBeer(load(page), slug);
    process.stdout.write('.');
  }
  process.stdout.write('\n');

  await save('cervejas.json', { groups, beers });
}

function parseBeer($, slug) {
  const a = $('.wd-content-area article');
  const hero = a.find('.tmb-beer-hero');
  const heads = hero.find('.vc_custom_heading');
  const img = a.find('.tmb-beer-body img').first();
  const buttons = [];
  a.find('.tmb-beer-body .wd-button-wrapper a.btn').each((_, b) => {
    const t = $(b).text().trim();
    if (!/todas as cervejas/i.test(t)) buttons.push({ label: t, href: rel($(b).attr('href')) });
  });
  const inner = (sel) => {
    const el = a.find(sel).first().find('.wpb_wrapper').first();
    return el.length ? cleanHtml(el.html()) : '';
  };
  return {
    slug,
    kicker: heads.eq(0).text().trim(),
    name: heads.eq(1).text().trim(),
    meta: heads.eq(2).text().trim(),
    image: img.attr('src') || '',
    imageAlt: img.attr('alt') || '',
    description: inner('.tmb-beer-desc'),
    specs: inner('.tmb-beer-ficha'),
    buttons,
    extra: inner('.tmb-beer-extra .wpb_text_column'),
  };
}

// ---------- Importação única: páginas de texto ----------
async function importPaginas() {
  const slugs = ['entrega', 'devolucoes', 'termos-de-uso', 'politica-de-privacidade'];
  const out = {};
  for (const slug of slugs) {
    const [meta] = await get(`${WP}/wp-json/wp/v2/pages?slug=${slug}&_fields=title`);
    const $ = load(await get(`${WP}/${slug}/`, 'text'));
    const blocks = $('.wd-content-area article .wpb_text_column .wpb_wrapper, .wd-content-area article .wd-text-block')
      .map((_, el) => $(el).html())
      .get();
    let html = cleanHtml(blocks.join('\n'));
    // O título já vai no <h1> da página; remove a repetição no topo do texto.
    const $h = load(html, null, false);
    const first = $h('h1, h2, h3').first();
    if (first.length && first.text().trim() === decode(meta.title.rendered)) first.remove();
    html = $h.html().trim();
    out[slug] = { title: decode(meta.title.rendered), html };
  }
  await save('paginas.json', out);
}

console.log(`Importando conteúdo de ${WP}`);
await importCervejas();
await importPaginas();
console.log('Pronto.');
