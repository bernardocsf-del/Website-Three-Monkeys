'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icon from './Icon';
import { NAV, LINKS, IMG } from '@/lib/site';
import s from './Header.module.css';

function Socials({ size = 12 }: { size?: number }) {
  return (
    <div className={s.socials}>
      <a className={s.social} href={LINKS.untappd} target="_blank" rel="noopener" aria-label="Untappd"><Icon name="untappd" size={size} /></a>
      <a className={s.social} href={`mailto:${LINKS.email}`} aria-label="E-mail"><Icon name="mail" size={size} /></a>
      <a className={s.social} href={LINKS.instagram} target="_blank" rel="noopener" aria-label="Instagram"><Icon name="instagram" size={size} /></a>
    </div>
  );
}

export default function Header({ cartUrl, accountUrl }: { cartUrl: string; accountUrl: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => path === href || (href !== '/' && path.startsWith(href));

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={s.header}>
      <div className={`container ${s.bar}`}>
        <Link href="/" className={s.logo} aria-label="Three Monkeys Beer — página inicial">
          <img src={IMG.logo} alt="Three Monkeys Beer" width={248} height={233} />
        </Link>

        <nav className={s.nav} aria-label="Menu principal">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={active(item.href) ? 'page' : undefined}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.tools}>
          <Socials />
          <a className={s.tool} href={accountUrl} aria-label="Minha conta"><Icon name="user" /></a>
          <a className={s.tool} href={cartUrl} aria-label="Carrinho"><Icon name="bag" /></a>
          <button className={`${s.tool} ${s.burger}`} type="button" aria-label="Abrir menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
            <Icon name="menu" size={22} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={s.drawer} hidden={!open}>
        <button className={s.close} type="button" aria-label="Fechar menu" onClick={() => setOpen(false)}><Icon name="close" size={24} /></button>
        <ul>
          {NAV.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}
          <li><a href={accountUrl}>Minha conta</a></li>
          <li><a href={cartUrl}>Carrinho</a></li>
        </ul>
        <Socials size={14} />
      </div>
    </header>
  );
}
