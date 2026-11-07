import Rail from '@/components/Rail';
import { InstagramFeed } from '@/components/Blocks';
import { U, wp } from '@/lib/site';
import { seoMetadata } from '@/lib/seo';
import s from '../institucional.module.css';

export const revalidate = 3600;
export const generateMetadata = () => seoMetadata('/assinatura/');

const qtds = [
  { img: '12_unidades_assinatura.png.webp', alt: '12 unidades — ideal pra descobrir suas favoritas' },
  { img: '18_unidades_assinatura.png.webp', alt: '18 unidades — pra nunca faltar na geladeira' },
  { img: '24_unidades_assinatura.png.webp', alt: '24 unidades — pra quem gosta de receber os amigos' },
];
const selecao = [
  ['lf-classic-ipa-dark-v2.png.webp', 'Classic IPA garrafa 500ml'],
  ['lf-free-dark-v2.png.webp', 'Classic IPA Free lata 350ml'],
  ['lf-summer-dark-v2.png.webp', 'Classic IPA Summer lata 350ml'],
  ['lf-golden-ale-dark-v2.png.webp', 'Golden Ale garrafa 500ml'],
  ['lf-hoppy-lager-dark-v2.png.webp', 'Hoppy Lager garrafa 500ml'],
  ['lf-im-sour-dark-v2.png.webp', "I'm Sour lata 473ml"],
];
const beneficios: [string, string, string][] = [
  ['Praticidade', '', 'Receba em casa, com regularidade e qualidade.'],
  ['Explore', 'sabores únicos', 'Cervejas que desafiam o convencional.'],
  ['Presenteie', 'ou mime-se', 'Um mimo perfeito para quem adora cerveja artesanal.'],
  ['Exclusividade', '', 'Cupons exclusivos e preço especial para lançamentos e sazonais.'],
];

export default function Assinatura() {
  // A assinatura (planos, pagamento recorrente) continua no WooCommerce Subscriptions.
  const assinar = wp('/produto/memberchimp-club/');
  return (
    <>
      <section className={`${s.hero} ${s.heroClub}`} style={{ backgroundImage: `url(${U}/2025/10/banner-clube-tmb-05.jpg)` }}>
        <div className="container center">
          <img className={s.clubBadge} src={`${U}/2025/10/1-TM_MemberChimp.png.webp`} alt="Three Monkeys Beer MemberChimp" />
          <h1>Cervejas Artesanais da Three Monkeys Beer Direto na Sua Casa!</h1>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.two}`}>
          <div className={s.txt}>
            <h2 className={s.clubName}>MemberChimp Club</h2>
            <p className={s.sub}>Cervejas Artesanais da Three Monkeys Beer Direto na Sua Casa!</p>
            <p>Para quem ama cerveja com personalidade, apresentamos o <strong>MemberChimp Club</strong> – um clube de assinatura criado para levar até você as cervejas mais saborosas da <strong>Three Monkeys</strong>, uma das cervejarias artesanais mais inovadoras do Brasil.</p>
            <p>Escolha sua assinatura e receba em casa uma seleção das nossas <strong>cervejas premium</strong>, e fique tranquilo, com a geladeira abastecida – sempre com aquele toque irreverente e experimental que só a Three Monkeys tem.</p>
          </div>
          <div className="center">
            <p className={s.pitch}>Three Monkeys Beer MemberChimp Club – Cervejas Artesanais com Atitude Direto na Sua Casa!</p>
            <a className={`btn btn-gold ${s.big}`} href={assinar}>Assine já o clube!</a>
          </div>
        </div>
      </section>

      <section className="section center">
        <div className="container">
          <h2 className={s.how}>Como funciona?</h2>
          <p className={s.step}>Escolha a quantidade</p>
          <p className={s.stepSub}>Você escolhe a quantidade e a frequência que melhor se adapta ao seu ritmo</p>
          <div className={s.qtds}>
            {qtds.map((q) => <img key={q.img} src={`${U}/2026/07/${q.img}`} alt={q.alt} loading="lazy" />)}
          </div>
          <p className={s.stepSub}>Você também pode escolher a frequência</p>
          <div className={s.freq}><span>Mensal</span><span>Bimestral</span></div>
          <p className={s.step}>Receba em casa</p>
          <p className={s.stepSub}>Receba nossa seleção de cervejas</p>
        </div>
        <div className={s.selecao}>
          <Rail label="Seleção de cervejas do clube" variant="wide" arrows={false}>
            {selecao.map(([img, alt]) => <img key={img} role="listitem" src={`${U}/2026/08/${img}`} alt={alt} loading="lazy" />)}
          </Rail>
        </div>
      </section>

      <section className={s.beneficios}>
        <div className={`container ${s.grid4}`}>
          {beneficios.map(([t1, t2, d]) => (
            <div key={t1}><h3>{t1}{t2 && <><br />{t2}</>}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.two}`}>
          <p className={s.closing}>Não perca tempo – Garanta sua assinatura e descubra por que a Three Monkeys é pura irreverência em forma de cerveja!</p>
          <div className="center">
            <p className={s.pitchSmall}>Para finalizar, escolha a forma de pagamento e preencha todos os dados</p>
            <a className={`btn btn-gold ${s.big}`} href={assinar}>Assine já o clube!</a>
          </div>
        </div>
      </section>

      <InstagramFeed />
    </>
  );
}
