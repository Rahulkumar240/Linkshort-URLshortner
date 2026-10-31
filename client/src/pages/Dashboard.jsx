
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Link2,
  BarChart3,
  User,
  Settings,
  LifeBuoy,
  Info,
  LogOut,
  Copy,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || API_URL;

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const savedLinks = JSON.parse(
        localStorage.getItem("shortenedLinks") || "[]"
      );
      setLinks(Array.isArray(savedLinks) ? savedLinks : []);
    } catch {
      setLinks([]);
    }
  }, []);

  const saveLinks = (updatedLinks) => {
    setLinks(updatedLinks);
    localStorage.setItem("shortenedLinks", JSON.stringify(updatedLinks));
  };

  const shortenURL = async (e) => {
    e.preventDefault();
    setError("");
    setAnalytics(null);

    let parsedURL;

    try {
      parsedURL = new URL(url.trim());

      if (!["http:", "https:"].includes(parsedURL.protocol)) {
        throw new Error("Only HTTP and HTTPS URLs are supported.");
      }
    } catch (err) {
      setError(err.message || "Please enter a valid URL.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: parsedURL.href }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Could not shorten URL.");
      }

      if (!data.id) {
        throw new Error("The server did not return a short URL ID.");
      }

      const newLink = {
        id: data.id,
        originalURL: parsedURL.href,
        shortURL: `${PUBLIC_URL.replace(/\/$/, "")}/${data.id}`,
        createdAt: new Date().toISOString(),
        clicks: 0,
      };

      saveLinks([newLink, ...links]);
      setUrl("");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const getAnalytics = async (link) => {
    setError("");
    setSelectedLink(link);
    setAnalytics(null);

    try {
      const response = await fetch(
        `${API_URL}/url/analytics/${encodeURIComponent(link.id)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Could not load analytics.");
      }

      setAnalytics(data);

      const updatedLinks = links.map((item) =>
        item.id === link.id
          ? { ...item, clicks: data.totalClicks ?? 0 }
          : item
      );

      saveLinks(updatedLinks);
    } catch (err) {
      setError(err.message || "Could not load analytics.");
    }
  };

  const copyLink = async (shortURL) => {
    try {
      await navigator.clipboard.writeText(shortURL);
      alert("Short link copied!");
    } catch {
      setError("Could not copy the link. Please copy it manually.");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const totalClicks = links.reduce(
    (total, link) => total + (link.clicks || 0),
    0
  );

  const navigation = [
    { label: "Home", path: "/", icon: Home },
    { label: "Dashboard", path: "/app", icon: LayoutDashboard },
    { label: "My Links", path: "/links", icon: Link2 },
    { label: "Analytics", path: "/analytics", icon: BarChart3 },
    { label: "Profile", path: "/profile", icon: User },
    { label: "Settings", path: "/settings", icon: Settings },
    { label: "Support", path: "/support", icon: LifeBuoy },
    { label: "About", path: "/about", icon: Info },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            LinkShort
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            <span className="text-sm text-slate-500">
              Welcome, {user?.name || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 hover:bg-slate-100 md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        <nav className="hidden border-t border-slate-100 md:block">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium ${
                    item.path === "/app"
                      ? "text-indigo-600"
                      : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {menuOpen && (
          <nav className="border-t border-slate-100 bg-white p-4 md:hidden">
            <div className="grid grid-cols-2 gap-3">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg p-3 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Icon size={17} />
                    {item.label}
                  </Link>
                );
              })}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg p-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-slate-500">
            Create short links and track how they perform.
          </p>
        </div>

        <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Create a short link</h2>

          <form
            onSubmit={shortenURL}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long URL here..."
              className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Shorten URL"}
            </button>
          </form>

          {error && (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          )}
        </section>

        <section className="mb-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total links created here</p>
            <p className="mt-2 text-3xl font-bold">{links.length}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Known clicks</p>
            <p className="mt-2 text-3xl font-bold">{totalClicks}</p>
            <p className="mt-1 text-xs text-slate-400">
              Click counts update when you check analytics.
            </p>
          </div>
        </section>

        {analytics && selectedLink && (
          <section className="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Link analytics</h2>
                <p className="mt-1 break-all text-sm text-slate-600">
                  {selectedLink.shortURL}
                </p>
              </div>

              <button
                onClick={() => {
                  setAnalytics(null);
                  setSelectedLink(null);
                }}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <p className="mt-5 text-sm text-slate-500">Total clicks</p>
            <p className="text-4xl font-bold text-indigo-700">
              {analytics.totalClicks ?? 0}
            </p>
          </section>
        )}

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-xl font-semibold">Your recent links</h2>
          </div>

          {links.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="font-medium text-slate-700">No short links yet</p>
              <p className="mt-2 text-sm text-slate-500">
                Create your first short link using the form above.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="flex flex-col justify-between gap-4 px-6 py-5 md:flex-row md:items-center"
                >
                  <div className="min-w-0">
                    <a
                      href={link.shortURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all font-semibold text-indigo-600 hover:underline"
                    >
                      {link.shortURL}
                    </a>

                    <p className="mt-1 break-all text-sm text-slate-500">
                      {link.originalURL}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      Created {new Date(link.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                      onClick={() => copyLink(link.shortURL)}
                      className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
                    >
                      <Copy size={15} />
                      Copy
                    </button>

                    <button
                      onClick={() => getAnalytics(link)}
                      className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
                    >
                      <BarChart3 size={15} />
                      Analytics
                    </button>

                    <a
                      href={link.shortURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
                    >
                      <ExternalLink size={15} />
                      Open
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-12 border-t border-slate-200 py-6 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} LinkShort. Built with React and Node.js.</p>
          <div className="mt-3 flex flex-wrap justify-center gap-5">
            <Link to="/about" className="hover:text-indigo-600">About</Link>
            <Link to="/support" className="hover:text-indigo-600">Support</Link>
            <Link to="/privacy" className="hover:text-indigo-600">Privacy</Link>
            <Link to="/terms" className="hover:text-indigo-600">Terms</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
