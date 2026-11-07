import type { NextConfig } from 'next';

const WP = (process.env.WP_URL || 'https://threemonkeysbeer.com').replace(/\/$/, '');

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  // As imagens vêm do WordPress e já são servidas otimizadas (WebP) por ele.
  images: { unoptimized: true },
  async redirects() {
    return [
      // URLs antigas do WordPress
      { source: '/loja/', destination: '/store/', permanent: true },
      { source: '/sobre-three-monkeys-beer/', destination: '/sobre/', permanent: true },
      { source: '/tmb-no-seu-evento/', destination: '/chope-em-casa/', permanent: true },
      { source: '/three-monkeys-beer/', destination: '/', permanent: true },
      // Páginas que continuam no WordPress
      { source: '/carrinho/:path*', destination: `${WP}/carrinho/:path*`, permanent: false },
      { source: '/finalizar-compra/:path*', destination: `${WP}/finalizar-compra/:path*`, permanent: false },
      { source: '/minha-conta/:path*', destination: `${WP}/minha-conta/:path*`, permanent: false },
      { source: '/obrigado/', destination: `${WP}/obrigado/`, permanent: false },
    ];
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
