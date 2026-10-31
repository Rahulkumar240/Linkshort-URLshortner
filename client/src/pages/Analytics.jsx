
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Copy,
  ExternalLink,
  MousePointerClick,
  Search,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import Brand from "../components/Brand";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || API_URL;

export default function Analytics() {
  const [shortId, setShortId] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [searchedId, setSearchedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchAnalytics = async (e) => {
    e.preventDefault();

    const id = shortId.trim();

    if (!id) {
      setError("Please enter a short link ID.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalytics(null);

    try {
      const response = await fetch(
        `${API_URL}/url/analytics/${encodeURIComponent(id)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Unable to load analytics.");
      }

      setAnalytics(data);
      setSearchedId(id);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyShortLink = async () => {
    const link = `${PUBLIC_URL.replace(/\/$/, "")}/${searchedId}`;

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Unable to copy the short link.");
    }
  };

  const history = analytics?.analytics || [];
  const totalClicks = analytics?.totalClicks ?? 0;

  const recentClicks = history.slice(-7).reverse();

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown date";

    return new Date(Number(timestamp)).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Brand />

          <Link
            to="/app"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8">
          <span className="text-xs font-bold tracking-widest text-indigo-600">
            PERFORMANCE
          </span>

          <h1 className="mt-2 text-3xl font-bold">Link Analytics</h1>

          <p className="mt-2 text-slate-500">
            Understand how your short links are performing.
          </p>
        </div>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-semibold">Find link analytics</h2>

          <form
            onSubmit={fetchAnalytics}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={shortId}
                onChange={(e) => setShortId(e.target.value)}
                placeholder="Enter your short link ID..."
                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              <BarChart3 size={18} />
              {loading ? "Loading..." : "View analytics"}
            </button>
          </form>

          {error && (
            <p className="mt-3 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </section>

        {analytics && (
          <>
            <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard
                icon={<MousePointerClick size={21} />}
                label="Total clicks"
                value={totalClicks.toLocaleString()}
              />

              <StatCard
                icon={<TrendingUp size={21} />}
                label="Recent activity"
                value={recentClicks.length}
              />

              <StatCard
                icon={<CalendarDays size={21} />}
                label="Recorded visits"
                value={history.length}
              />
            </section>

            <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-semibold">Your short link</h2>

                  <a
                    href={`${PUBLIC_URL.replace(/\/$/, "")}/${searchedId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-2 break-all text-sm font-medium text-indigo-600 hover:underline"
                  >
                    {`${PUBLIC_URL.replace(/\/$/, "")}/${searchedId}`}
                    <ExternalLink size={15} />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={copyShortLink}
                  className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                >
                  <Copy size={16} />
                  {copied ? "Copied!" : "Copy link"}
                </button>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-5">
                <h2 className="font-semibold">Click history</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Recorded visits for this short link.
                </p>
              </div>

              {history.length === 0 ? (
                <div className="px-6 py-14 text-center">
                  <MousePointerClick
                    size={32}
                    className="mx-auto mb-3 text-slate-300"
                  />
                  <p className="font-medium">No clicks yet</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Your click history will appear here when someone visits
                    your short link.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {[...history].reverse().map((visit, index) => (
                    <div
                      key={`${visit.timestamp}-${index}`}
                      className="flex items-center justify-between gap-4 px-6 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                          <MousePointerClick size={18} />
                        </div>

                        <div>
                          <p className="text-sm font-medium">
                            Link visited
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {formatDate(visit.timestamp)}
                          </p>
                        </div>
                      </div>

                      <span className="text-sm font-semibold text-slate-600">
                        #{history.length - index}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {!analytics && !loading && !error && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <BarChart3 size={26} />
            </div>

            <h2 className="text-lg font-semibold">
              Your analytics start here
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Enter a short link ID above to view its click statistics
              and visit history.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600">
        {icon}
      </div>

      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
