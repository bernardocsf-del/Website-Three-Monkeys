# Site Three Monkeys Beer

Front novo do site **threemonkeysbeer.com**, feito em [Astro](https://astro.build) (site estático).
O **WordPress/WooCommerce continua por trás** cuidando de produtos, preços, estoque, carrinho, checkout,
assinaturas (MemberChimp Club), pedidos e integração com Olist/Asaas/PIX. Este repositório só cuida da vitrine.

## Como funciona

| O quê | Onde mora | Como atualiza |
|---|---|---|
| Layout, textos institucionais (home, sobre, assinatura, chope em casa) | Aqui no repo (`src/pages`, `src/components`) | Editando o código |
| Páginas das cervejas (`/cervejas/...`) e páginas legais | `src/data/cervejas.json`, `src/data/paginas.json` (importados uma vez do WordPress) | Editando o JSON aqui, ou reimportando com `npm run sync -- --import` |
| Produtos, preços, estoque, região SP | WooCommerce → `src/data/products.json` | `npm run sync` + novo build |
| SEO (títulos/descrições do Yoast) e posts do blog | WordPress → `src/data/seo.json`, `src/data/posts.json` | `npm run sync` + novo build |
| Carrinho, checkout, minha conta, assinatura | WordPress | Os botões levam direto para lá |

"Adicionar ao carrinho" manda o cliente para `WP_URL/carrinho/?add-to-cart=ID`, ou seja, a compra
continua 100% no WooCommerce de hoje.

> ⚠️ `npm run sync -- --import` **sobrescreve** `cervejas.json` e `paginas.json`. Use só se quiser
> trazer de novo o conteúdo que está no WordPress.

## Comandos

```bash
npm install          # instala dependências
npm run sync         # atualiza produtos/preços/estoque, SEO e blog a partir do WordPress (só leitura)
npm run dev          # roda local em http://localhost:4321
npm run build        # gera o site em dist/
npm run preview      # serve o dist/ localmente
```

## Variáveis de ambiente

Veja `.env.example`:

- `WP_URL` — endereço do WordPress (hoje `https://threemonkeysbeer.com`; na virada vira um subdomínio, ex. `https://loja.threemonkeysbeer.com`).
- `SITE_URL` — endereço público deste site.
- `PUBLIC_GTM_ID` — Google Tag Manager (`GTM-577TBXBB`). Deixar vazio no ambiente de teste.
- `PUBLIC_NOINDEX` — `true` no ambiente de teste para o Google não indexar a prévia.

## Fases

1. **Agora (teste):** site novo num endereço de teste; o site atual segue intacto em threemonkeysbeer.com.
2. **Virada:** WordPress vai para um subdomínio, `WP_URL` é atualizado, o domínio principal aponta para este site.
   Se der problema, basta voltar o apontamento do domínio.
