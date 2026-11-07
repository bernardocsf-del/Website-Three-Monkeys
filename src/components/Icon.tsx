// Ícones SVG inline (o traço herda a cor do texto).
export type IconName =
  | 'user' | 'bag' | 'cart' | 'menu' | 'close' | 'mail' | 'instagram' | 'untappd' | 'whatsapp'
  | 'trophy' | 'check' | 'pin' | 'clock' | 'star' | 'arrow-left' | 'arrow-right';

export default function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === 'user' && (<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>)}
      {name === 'bag' && (<><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>)}
      {name === 'cart' && (<><path d="M3 4h2l2.4 11h11L21 7H6.2" /><circle cx="9" cy="19.5" r="1.4" /><circle cx="17" cy="19.5" r="1.4" /></>)}
      {name === 'menu' && <path d="M4 7h16M4 12h16M4 17h16" />}
      {name === 'close' && <path d="M6 6l12 12M18 6 6 18" />}
      {name === 'mail' && (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>)}
      {name === 'instagram' && (<><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".8" fill="currentColor" /></>)}
      {name === 'untappd' && <path fill="currentColor" stroke="none" d="M12 3.2 3.6 18.6c-.3.6.1 1.2.8 1.2h2.3c.4 0 .7-.2.9-.5L12 10.6l4.4 8.7c.2.3.5.5.9.5h2.3c.7 0 1.1-.6.8-1.2L12 3.2Z" />}
      {name === 'whatsapp' && (<><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Z" /><path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1.2-1.2 1.8.9c-.3 1.2-1.3 1.8-2.4 1.6-3-.6-5.4-3-6-6-.2-1.1.4-2.1 1.6-2.4l.9 1.8L9 9.5Z" /></>)}
      {name === 'trophy' && (<><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 20h6" /></>)}
      {name === 'check' && (<><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="m8 12 3 3 5-6" /></>)}
      {name === 'pin' && (<><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>)}
      {name === 'clock' && (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>)}
      {name === 'star' && <path fill="currentColor" stroke="none" d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />}
      {name === 'arrow-left' && <path d="M15 5l-7 7 7 7" />}
      {name === 'arrow-right' && <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}
