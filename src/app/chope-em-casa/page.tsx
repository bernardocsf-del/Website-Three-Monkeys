import Icon from '@/components/Icon';
import { PromoTiles, InstagramFeed } from '@/components/Blocks';
import { LINKS, U } from '@/lib/site';
import { seoMetadata } from '@/lib/seo';
import s from '../institucional.module.css';

export const revalidate = 3600;
export const generateMetadata = () => seoMetadata('/chope-em-casa/');

const chopes = [
  'Easy Pilsen (American Lager / 5% ABV / 8 IBU) – 30 ou 50 litros',
  'Classic IPA Summer (Session IPA / 3,3% ABV / 23 IBU) – 20 ou 50 litros',
  'Golden Ale (Strong Golden Ale / 7,5% ABV / 30 IBU) – 30 ou 50 litros',
];
const itens = ['Barril (20, 30 ou 50L)', 'Chopeira (a gelo ou elétrica)', 'Copos descartáveis', 'Todo o equipamento necessário'];

function Zap({ className = '' }: { className?: string }) {
  return (
    <a className={`btn btn-gold ${className}`} href={LINKS.whatsapp} target="_blank" rel="noopener">
      <Icon name="whatsapp" size={16} /> Entrar em contato pelo WhatsApp
    </a>
  );
}

export default function ChopeEmCasa() {
  return (
    <>
      <section className={`${s.hero} ${s.heroChope}`} style={{ backgroundImage: `url(${U}/2025/09/banner-three-monkey-evento-01.jpg)` }} />

      <section className="section">
        <div className={`container ${s.two} ${s.top}`}>
          <div className={s.txt}>
            <h1 className={s.chopeTitle}>Leve seu evento para outro nível com os chopes da Three Monkeys Beer!</h1>
            <p>O delivery de chope da Three Monkeys sai direto do tanque para o seu evento!</p>
            <p>Chope fresco e gelado no seu churrasco, festa ou evento corporativo.</p>
            <p>Entregamos e instalamos tudo para você só abrir a torneira!</p>
            <Zap className={s.zapBtn} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className={s.head}><img src={`${U}/2025/09/beer-three-monkey-50x60.png`} alt="" width={50} height={60} /> Como funciona?</h2>
          <p className={s.strong}>Comece escolhendo seu chope preferido:</p>
          {chopes.map((c) => <p key={c} className={s.strong}>{c}</p>)}
          <div className={s.barris}>
            {[1, 2, 3].map((n) => <img key={n} src={`${U}/2026/06/Barris-TM-0${n}.png.webp`} alt="Barril de chope Three Monkeys" loading="lazy" />)}
          </div>
          <p className={`center ${s.white}`}>Ficou na dúvida? Entra em contato que podemos te ajudar na melhor escolha para o seu evento!</p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.narrow}`}>
          <h2 className={s.head}><img src={`${U}/2025/09/delivery-three-monkey-70x50.png`} alt="" width={70} height={50} /> Nós levamos e instalamos pra você</h2>
          <ul className={s.checks}>
            {itens.map((i) => <li key={i}><Icon name="check" size={18} /> {i}</li>)}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.two} ${s.top} center`}>
          <div className={s.white}>
            <h2 className={s.head}><Icon name="pin" size={40} /> Áreas atendidas</h2>
            <p>Pedido mínimo: 20 litros.</p>
            <p>Frete grátis para a maioria dos bairros do Rio de Janeiro. Frete sob consulta para bairros de Niterói.</p>
          </div>
          <div className={s.white}>
            <h2 className={s.head}><Icon name="clock" size={40} /> Horário de entrega</h2>
            <p>Posso escolher o horário de entrega? SIM! Recomendamos agendar com 7 dias de antecedência. Para eventos maiores, 15 dias de antecedência.</p>
          </div>
        </div>
      </section>

      <section className="section center">
        <div className={`container ${s.narrow}`}>
          <h2 className={s.head}>E se tiver algum problema?</h2>
          <p className={s.upper}>É só ligar. A Three Monkeys vai até você para fazer do seu evento um sucesso.</p>
          <Zap />
        </div>
      </section>

      <PromoTiles only="sobre" />
      <InstagramFeed />
    </>
  );
}
