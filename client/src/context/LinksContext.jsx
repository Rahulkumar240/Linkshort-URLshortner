import { createContext, useContext, useMemo, useState } from "react";

const LinksContext = createContext(null);
const initialLinks = [
  { id: "1", code: "launch24", originalUrl: "https://www.figma.com/community", clicks: 1284, createdAt: "2026-10-26", status: "Active", source: "Website" },
  { id: "2", code: "design-kit", originalUrl: "https://www.behance.net/search/projects", clicks: 864, createdAt: "2026-10-24", status: "Active", source: "Social" },
  { id: "3", code: "read-more", originalUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", clicks: 532, createdAt: "2026-10-21", status: "Active", source: "Newsletter" },
  { id: "4", code: "summer-sale", originalUrl: "https://example.com/summer-collection", clicks: 319, createdAt: "2026-10-18", status: "Paused", source: "Campaign" },
  { id: "5", code: "portfolio", originalUrl: "https://github.com", clicks: 207, createdAt: "2026-10-15", status: "Active", source: "Profile" }
];

function makeCode() {
  return Math.random().toString(36).slice(2, 9);
}

export function LinksProvider({ children }) {
  const [links, setLinks] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("linkly_links"));
      return Array.isArray(saved) ? saved : initialLinks;
    } catch { return initialLinks; }
  });

  const persist = (next) => {
    setLinks(next);
    localStorage.setItem("linkly_links", JSON.stringify(next));
  };

  const createLink = async (originalUrl, customAlias = "") => {
    let parsed;
    try { parsed = new URL(originalUrl); } catch { throw new Error("Please enter a valid URL, including https://"); }
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Only http and https URLs are supported.");
    const code = customAlias.trim() || makeCode();
    if (!/^[a-zA-Z0-9_-]{3,30}$/.test(code)) throw new Error("Alias must be 3–30 characters (letters, numbers, - or _).");
    if (links.some((item) => item.code === code)) throw new Error("That custom alias is already in use.");
    const nextLink = {
      id: crypto.randomUUID?.() || String(Date.now()),
      code,
      originalUrl: parsed.href,
      clicks: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      status: "Active",
      source: "Direct"
    };
    persist([nextLink, ...links]);
    return nextLink;
  };

  const deleteLink = (id) => persist(links.filter((link) => link.id !== id));
  const toggleStatus = (id) => persist(links.map((link) => link.id === id ? { ...link, status: link.status === "Active" ? "Paused" : "Active" } : link));
  const value = useMemo(() => ({ links, createLink, deleteLink, toggleStatus }), [links]);
  return <LinksContext.Provider value={value}>{children}</LinksContext.Provider>;
}

export function useLinks() {
  const value = useContext(LinksContext);
  if (!value) throw new Error("useLinks must be used within LinksProvider");
  return value;
}
