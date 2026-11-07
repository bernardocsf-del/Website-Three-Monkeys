// Região de entrega escolhida pelo cliente (mesmo cookie do site antigo: tmb_regiao).
export const getRegion = () => (typeof document === 'undefined' ? '' : document.cookie.match(/(?:^|; )tmb_regiao=([^;]+)/)?.[1] ?? '');

export const REGION_EVENT = 'tmb:region';

export const setRegion = (v: string) => {
  document.cookie = `tmb_regiao=${v};path=/;max-age=${60 * 60 * 24 * 180}`;
  document.dispatchEvent(new CustomEvent(REGION_EVENT, { detail: v }));
};
