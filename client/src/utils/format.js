export const publicShortUrl = (code) => {
  const base = import.meta.env.VITE_PUBLIC_URL || window.location.origin;
  return `${base.replace(/\/$/, "")}/${code}`;
};

export const compactNumber = (number) => new Intl.NumberFormat("en", { notation: "compact" }).format(number || 0);

export const truncate = (value, max = 48) => value.length > max ? `${value.slice(0, max)}…` : value;
