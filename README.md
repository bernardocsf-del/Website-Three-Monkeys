# Site Three Monkeys Beer

Front novo do **threemonkeysbeer.com**, em **React (Next.js 15)**, hospedado na **Cloudflare** (Workers, via OpenNext).
O **WordPress/WooCommerce continua por trás**: produtos, preços, estoque, carrinho, checkout, assinaturas
(MemberChimp Club), pedidos, SEO (Yoast) e integrações (Olist, Asaas, PIX) seguem exatamente como hoje.
Este repositório cuida só da vitrine.

## Como os dados chegam

| O quê | Fonte | Atualização |
|---|---|---|
| Produtos, preços, estoque, promoções | WooCommerce (Store API), lido **ao vivo** pelo servidor | Cache de 5 min + webhook do Woo atualiza na hora |
| Lista de produtos sem entrega em SP | Snippet da página `/store/` do WordPress | Idem |
| Títulos e descrições de SEO | Yoast, por URL | Idem |
| Posts do blog | WordPress | Idem |
| Layout e textos institucionais (home, sobre, assinatura, chope em casa) | Código deste repo (`src/app`, `src/components`) | Editando aqui |
| Páginas das cervejas e páginas legais | `src/data/cervejas.json` e `src/data/paginas.json` (importados do WordPress) | Editando aqui, ou `npm run import` (sobrescreve) |
| Carrinho, checkout, minha conta, assinatura | WordPress | Os botões levam direto para lá |

"Adicionar ao carrinho" envia o cliente para `WP_URL/carrinho/?add-to-cart=ID&quantity=N`.
O Google recebe o HTML completo (renderizado no servidor), com títulos do Yoast, dados estruturados de produto e as mesmas URLs do site antigo.

## Comandos

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:3000
npm run build      # build do Next.js
npm run preview    # build + prévia local no runtime da Cloudflare
npm run deploy     # build + publicação na Cloudflare (precisa de login/credencial da Cloudflare)
npm run import     # reimporta cervejas e páginas legais do WordPress (SOBRESCREVE os JSON)
npm run lint       # checagem de tipos
```

## Variáveis (Cloudflare → Worker → Settings → Variables)

| Nome | Exemplo | Observação |
|---|---|---|
| `WP_URL` | `https://threemonkeysbeer.com` | Na virada vira o subdomínio do WordPress (ex. `https://loja.threemonkeysbeer.com`) |
| `SITE_URL` | `https://threemonkeysbeer.com` | Endereço público deste site |
| `PUBLIC_NOINDEX` | `true` | `true` no teste (Google não indexa); remover na produção |
| `NEXT_PUBLIC_GTM_ID` | `GTM-577TBXBB` | Só em produção (variável de **build**) |
| `REVALIDATE_SECRET` | — | **Segredo** (Secret), nunca no repositório. Usado pelo webhook |

## Recursos na Cloudflare (uma vez)

```bash
npx wrangler r2 bucket create three-monkeys-site-cache
npx wrangler d1 create three-monkeys-site-tags   # copiar o database_id para wrangler.jsonc
```

## Webhook do WooCommerce (atualização na hora)

WooCommerce → Configurações → Avançado → Webhooks → Adicionar, um para cada tópico
"Produto criado", "Produto atualizado" e "Produto excluído":
URL de entrega `https://<site>/api/revalidate/?secret=<REVALIDATE_SECRET>`.

## Fases

1. **Teste:** site novo num endereço de teste; o site atual segue intacto em threemonkeysbeer.com.
2. **Virada:** WordPress vai para um subdomínio, `WP_URL` é atualizado e o domínio principal aponta para este site.
   Se der problema, basta voltar o apontamento do domínio.
