import BeerGrid from '@/components/BeerGrid';
import { groups } from '@/lib/cervejas';
import { seoMetadata } from '@/lib/seo';
import s from './cervejas.module.css';

export const revalidate = 3600;
export const generateMetadata = () => seoMetadata('/cervejas/');

export default function Cervejas() {
  return (
    <div className="page-pad">
      <section className={`container ${s.intro}`}>
        <div className={s.txt}>
          <p>Desde o início, nosso propósito foi fazer diferente: inovar, surpreender e desafiar os padrões. Já criamos mais de <strong>130 cervejas</strong>, dos clássicos aos experimentais, explorando ingredientes como frutas brasileiras, café, chocolate, erva-mate, pipoca doce, marshmallow e até tinta de lula e curry.</p>
          <p>Para nós, a cerveja é como a gastronomia – um universo de possibilidades.</p>
        </div>
        <h1 className={s.dna}>Quebrar barreiras está no nosso DNA</h1>
      </section>

      {groups.map((g) => (
        <section key={g.title} className={s.group}>
          <div className="container">
            <h2 className={s.groupTitle}>{g.title}</h2>
            <BeerGrid items={g.items} scroll={g.scroll} label={g.title} />
          </div>
        </section>
      ))}
    </div>
  );
}
