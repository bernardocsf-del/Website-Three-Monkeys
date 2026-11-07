// Webhook de atualização: o WooCommerce chama este endereço quando um produto muda
// (preço, estoque, texto) e o site passa a mostrar o dado novo na hora.
//
// Configuração no WooCommerce: Configurações → Avançado → Webhooks → Adicionar
//   Tópico: "Produto atualizado" (repetir para "criado" e "excluído")
//   URL de entrega: https://<site>/api/revalidate/?secret=<REVALIDATE_SECRET>
import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { TAG } from '@/lib/wp';

async function handle(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.nextUrl.searchParams.get('secret') !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidateTag(TAG);
  return NextResponse.json({ ok: true, revalidated: TAG, at: new Date().toISOString() });
}

export const POST = handle;
export const GET = handle;
