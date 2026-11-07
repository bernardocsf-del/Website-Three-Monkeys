// Região de entrega escolhida pelo cliente (cookie compartilhado com o site antigo: tmb_regiao).
export const getRegion = () => document.cookie.match(/(?:^|; )tmb_regiao=([^;]+)/)?.[1] ?? '';

export const setRegion = (v: string) => {
  document.cookie = `tmb_regiao=${v};path=/;max-age=${60 * 60 * 24 * 180}`;
};

/** Esconde da vitrine os produtos sem entrega em SP quando a região é SP. */
export const applyRegion = () => {
  const sp = getRegion() === 'SP';
  document.querySelectorAll<HTMLElement>('[data-sem-sp]').forEach((el) => {
    const item = el.closest<HTMLElement>('[role="listitem"]') ?? el;
    item.hidden = sp;
  });
  document.dispatchEvent(new CustomEvent('tmb:region', { detail: getRegion() }));
};
