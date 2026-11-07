import Link from 'next/link';

export const metadata = { title: 'Página não encontrada | Three Monkeys Beer', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container page-pad center" style={{ paddingBottom: 100 }}>
      <p className="kicker">Erro 404</p>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>Essa página fugiu pro mato.</h1>
      <p>O endereço que você procurou não existe ou mudou de lugar.</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 30 }}>
        <Link className="btn btn-gold" href="/">Voltar ao início</Link>
        <Link className="btn btn-outline" href="/store/">Ir para a loja</Link>
      </div>
    </section>
  );
}
