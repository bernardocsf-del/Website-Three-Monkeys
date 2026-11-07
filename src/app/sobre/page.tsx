import Icon from '@/components/Icon';
import { ClubCta, InstagramFeed } from '@/components/Blocks';
import { U } from '@/lib/site';
import { seoMetadata } from '@/lib/seo';
import s from '../institucional.module.css';

export const revalidate = 3600;
export const generateMetadata = () => seoMetadata('/sobre/');

const premios = [
  ['2026 - Peter, The Bitter', 'Medalha de Prata no Concurso Brasileiro de Cervejas'],
  ['2025 - Peter, The Bitter', 'Medalha de Ouro no Brazilian International Beer Awards'],
  ['2025 - Peter, The Bitter', 'Medalha de Prata na Brasil Beer Cup'],
  ['2025 - I’m Sour', 'Medalha de Bronze no Brazilian International Beer Awards'],
  ['2025 - I’m Sour', 'Melhor Cerveja do Brasil pela revista Prazeres da Mesa'],
  ['2025 - Paranoid About Popcorn', 'Medalha de Ouro no Mondial de La Bière'],
  ['2023 - I’m Sour', 'Medalha de Ouro no Mondial de La Bière'],
  ['2022 - Cervejeiro do Ano', 'Veja Rio Comer & Beber'],
  ['2021 - I’m Sour', 'Medalha de Platina no Mondial de La Bière'],
  ['2019 - I’m Sour', 'Cerveja do Ano pela revista Prazeres da Mesa'],
  ['2019 - Cervejaria do Ano', 'Revista Prazeres da Mesa'],
  ['2019 - Classic IPA', 'Medalha de Bronze na Copa de Cervezas de América'],
  ['2019 - Paranoid About Popcorn', 'Terceiro Lugar no Mondial de La Bière - Votação do Público'],
  ['2019 - I’m Sour Baby', 'Medalha de Ouro no Mondial de La Bière'],
  ['2018 - Melhor Cervejaria pelo Público', 'Festival de Micro Cervejarias do Pão de Açúcar'],
  ['2018 - I’m F#cking Sour', 'Medalha de Bronze na Copa de Cervezas de América'],
  ['2018 - I’m Sour', 'Medalha de Prata na Copa de Cervezas de América'],
  ['2018 - I’m Sour', 'Best of Show no Festival de POA'],
  ['2018 - I’m Sour', 'Medalha de Ouro no Festival de POA'],
  ['2017 - I’m Sour', 'Medalha de Ouro no Festival de POA'],
  ['2017 - Galaxy Detox', 'Medalha de Prata no IPA Day'],
  ['2017 - Golden Ale', 'Medalha de Bronze na South Beer Cup'],
  ['2017 - Milky Way IPA', 'Medalha de Prata no IPA Day'],
  ['2017 - Milky Way IPA', 'Terceiro Lugar no Mondial de La Bière - Votação do Público'],
  ['2016 - India White Ale', 'Medalha de Ouro no Mondial de La Bière'],
];
const fotos = ['bg-threemonkeys-sobre-premios01.jpg.webp', 'bg-threemonkeys-sobre-premios05.png.webp', 'bg-threemonkeys-sobre-premios07.png.webp'];

export default function Sobre() {
  const half = Math.ceil(premios.length / 2);
  return (
    <>
      <section className={`${s.hero} ${s.heroSobre}`} style={{ backgroundImage: `url(${U}/2025/10/bg-threemonkeys-sobre9.jpg)` }} aria-label="Bernardo Costa e Silva, mestre-cervejeiro da Three Monkeys" />

      <section className="section">
        <div className={`container ${s.two}`}>
          <div className={s.txt}>
            <h1 className={s.lead}>Uma cervejaria artesanal com DNA carioca e espírito global, criada com o propósito de quebrar barreiras!</h1>
            <p>A <strong>Three Monkeys</strong> nasceu em 2013 do sonho de três amigos em sacudir o mercado cervejeiro brasileiro que era dominado pelas grandes marcas e nenhuma variedade.</p>
            <p>Começou como hobby: panela no fogão, inspiração nas cervejas belgas e muito apoio da galera próxima. A qualidade surpreendeu tanto que o sonho cresceu e se tornou uma cervejaria de verdade que, até hoje, mantém o propósito de <strong>quebrar barreiras</strong>.</p>
            <p>A tradição monástica das cervejas belgas inspirou o nome inicial mas foi a natureza vibrante da Mata Atlântica, onde as primeiras brassagens aconteciam, que definiu a identidade da marca: <strong>Three Monkeys</strong>. Uma homenagem à irreverência, à liberdade criativa e à conexão com o Rio de Janeiro, sempre com um olhar voltado para o mundo.</p>
          </div>
          <img src={`${U}/2025/09/bg-threemonkeys-sobre-img.png.webp`} alt="Latas da Three Monkeys Beer no gelo" loading="lazy" />
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.two}`}>
          <h2 className={s.statement}>Somos uma cervejaria independente com DNA carioca, espírito global e um compromisso: quebrar barreiras sempre.</h2>
          <p className={s.txt}>E foi nesse caminho que o mestre-cervejeiro Bernardo Costa e Silva sempre seguiu firme. Assim ele criou mais de 100 rótulos altamente criativos e colocou a <strong>Three Monkeys</strong> em mais de mil pontos de venda pelo Brasil com enorme sucesso. Essa trajetória rendeu a ele o título de mestre-cervejeiro do ano pela Veja Rio.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className={s.premiosTitle}>Prêmios</h2>
          <div className={s.lists}>
            {[premios.slice(0, half), premios.slice(half)].map((col, c) => (
              <ul key={c}>
                {col.map(([t, d], n) => (
                  <li key={n}><Icon name="trophy" size={14} /><span>{t}<br />{d}</span></li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className={s.fotos}>
          {fotos.map((f) => <img key={f} src={`${U}/2025/09/${f}`} alt="Equipe da Three Monkeys Beer em premiações" loading="lazy" />)}
        </div>
      </section>

      <ClubCta />
      <InstagramFeed />
    </>
  );
}
