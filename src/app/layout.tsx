import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AgeGate from '@/components/AgeGate';
import { IMG, accountUrl, cartUrl, siteUrl } from '@/lib/site';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'], variable: '--font-montserrat', display: 'swap' });

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(siteUrl()),
    icons: { icon: IMG.favicon, apple: IMG.favicon },
  };
}

export const viewport: Viewport = { themeColor: '#212121', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body>
        {gtm && (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
            </Script>
            <noscript>
              <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtm}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
            </noscript>
          </>
        )}
        <a className="visually-hidden" href="#conteudo">Pular para o conteúdo</a>
        <Header cartUrl={cartUrl()} accountUrl={accountUrl()} />
        <main id="conteudo">{children}</main>
        <Footer />
        <AgeGate />
      </body>
    </html>
  );
}
