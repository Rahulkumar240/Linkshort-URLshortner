
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Copy,
  ExternalLink,
  Trash2,
  Link2,
  Plus,
  BarChart3,
} from "lucide-react";

const PUBLIC_URL =
  import.meta.env.VITE_PUBLIC_URL || "http://localhost:8000";

// Keep this key the same as the one used by your Dashboard page.
const STORAGE_KEY = "shortLinks";

function Links() {
  const [links, setLinks] = useState([]);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const savedLinks = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
    setLinks(savedLinks);
  }, []);

  const filteredLinks = useMemo(() => {
    return links.filter((link) => {
      const original = link.originalUrl || link.redirectURL || "";
      const shortId = link.shortId || link.id || "";

      return (
        original.toLowerCase().includes(search.toLowerCase()) ||
        shortId.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [links, search]);

  const getShortUrl = (link) => {
    const id = link.shortId || link.id;
    return `${PUBLIC_URL}/${id}`;
  };

  const copyLink = async (link) => {
    const shortUrl = getShortUrl(link);

    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(link.shortId || link.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      alert("Unable to copy the link.");
    }
  };

  const deleteLink = (id) => {
    const updatedLinks = links.filter(
      (link) => (link.shortId || link.id) !== id
    );

    setLinks(updatedLinks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLinks));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Link2 className="text-blue-600" />
            <span className="text-slate-900">Linkly</span>
          </Link>

          <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
            <Link to="/app" className="hover:text-blue-600">Dashboard</Link>
            <Link to="/analytics" className="hover:text-blue-600">Analytics</Link>
            <Link to="/settings" className="hover:text-blue-600">Settings</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              My Links
            </h1>
            <p className="mt-2 text-slate-500">
              Manage and organize your shortened URLs.
            </p>
          </div>

          <Link
            to="/app"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Create New Link
          </Link>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={19}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by original URL or short ID..."
              className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-6">
            {filteredLinks.length === 0 ? (
              <div className="py-16 text-center">
                <Link2 className="mx-auto text-slate-300" size={42} />
                <h2 className="mt-4 text-lg font-semibold text-slate-800">
                  {search ? "No matching links found" : "No links yet"}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Create your first short link to see it here.
                </p>
                <Link
                  to="/app"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                  <Plus size={17} />
                  Create Link
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLinks.map((link) => {
                  const id = link.shortId || link.id;
                  const original =
                    link.originalUrl || link.redirectURL || "";

                  return (
                    <div
                      key={id}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div className="min-w-0 flex-1">
                          <a
                            href={getShortUrl(link)}
                            target="_blank"
                            rel="noreferrer"
                            className="break-all font-semibold text-blue-600 hover:underline"
                          >
                            {getShortUrl(link)}
                          </a>

                          <p className="mt-2 break-all text-sm text-slate-500">
                            {original}
                          </p>

                          <p className="mt-2 text-xs text-slate-400">
                            Short ID: {id}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => copyLink(link)}
                            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
                          >
                            <Copy size={16} />
                            {copiedId === id ? "Copied!" : "Copy"}
                          </button>

                          <Link
                            to={`/analytics?shortId=${encodeURIComponent(id)}`}
                            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
                          >
                            <BarChart3 size={16} />
                            Analytics
                          </Link>

                          <a
                            href={getShortUrl(link)}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border p-2 hover:bg-slate-50"
                            title="Open short link"
                          >
                            <ExternalLink size={17} />
                          </a>

                          <button
                            onClick={() => deleteLink(id)}
                            className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
                            title="Remove from saved list"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Links;
