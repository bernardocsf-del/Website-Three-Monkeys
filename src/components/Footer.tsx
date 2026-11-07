import Link from 'next/link';
import Icon from './Icon';
import { LINKS, IMG } from '@/lib/site';
import s from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.grid}`}>
        <div className={s.brand}>
          <img src={IMG.logo} alt="Three Monkeys Beer" width={230} height={216} loading="lazy" />
          <div className={s.socials}>
            <a href={LINKS.untappd} target="_blank" rel="noopener" aria-label="Untappd"><Icon name="untappd" size={13} /></a>
            <a href={`mailto:${LINKS.email}`} aria-label="E-mail"><Icon name="mail" size={13} /></a>
            <a href={LINKS.instagram} target="_blank" rel="noopener" aria-label="Instagram"><Icon name="instagram" size={13} /></a>
          </div>
        </div>
        <div className={s.about}>
          <p>Uma cervejaria artesanal brasileira com DNA carioca e espírito global, criada com o propósito de quebrar barreiras!</p>
          <Link className="btn btn-dark" href="/sobre/">Sobre nós</Link>
        </div>
        <div className={s.contact}>
          <a className={s.mail} href={`mailto:${LINKS.email}`}><Icon name="mail" size={26} /> {LINKS.email}</a>
          <Link href="/politica-de-privacidade/">Política de privacidade</Link>
          <Link href="/termos-de-uso/">Termos de uso</Link>
          <Link href="/entrega/">Entrega e frete</Link>
          <Link href="/devolucoes/">Trocas e devoluções</Link>
        </div>
      </div>
      <div className={s.copy}>© {new Date().getFullYear()} - Todos direitos Three Monkeys Beer - CNPJ: 51.131.410/0001-02</div>
    </footer>
  );
}
