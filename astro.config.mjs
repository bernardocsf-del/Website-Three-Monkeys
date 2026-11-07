import { defineConfig } from 'astro/config';

const WP = (process.env.WP_URL || 'https://threemonkeysbeer.com').replace(/\/$/, '');

// SITE_URL: endereço público do site novo (ex.: https://novo.threemonkeysbeer.com).
export default defineConfig({
  site: process.env.SITE_URL || 'https://threemonkeysbeer.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  image: { domains: ['threemonkeysbeer.com'] },
  // URLs antigas e páginas que continuam no WordPress (carrinho, checkout, conta).
  redirects: {
    '/loja/': '/store/',
    '/sobre-three-monkeys-beer/': '/sobre/',
    '/tmb-no-seu-evento/': '/chope-em-casa/',
    '/three-monkeys-beer/': '/',
    '/carrinho/': `${WP}/carrinho/`,
    '/finalizar-compra/': `${WP}/finalizar-compra/`,
    '/minha-conta/': `${WP}/minha-conta/`,
    '/obrigado/': `${WP}/obrigado/`,
  },
});
