
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Landing() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL including https://");
      return;
    }

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch(`${API_URL}/url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to shorten URL.");
      }

      setShortUrl(`${API_URL}/${data.id}`);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Unable to copy. Please copy the link manually.");
    }
  };

  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description:
        "Generate short links instantly with our fast and reliable URL shortening service.",
    },
    {
      icon: "📊",
      title: "Detailed Analytics",
      description:
        "Track clicks and understand how people interact with your shortened links.",
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      description:
        "Keep your links organized and accessible with a reliable link management experience.",
    },
    {
      icon: "🔗",
      title: "Easy Sharing",
      description:
        "Create clean, memorable links that are easy to share anywhere.",
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description:
        "Manage and share your links from desktop, tablet or mobile devices.",
    },
    {
      icon: "🎯",
      title: "Simple Management",
      description:
        "Keep all your shortened URLs organized in one convenient dashboard.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white shadow-lg shadow-indigo-200">
              S
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              Short<span className="text-indigo-600">ly</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-slate-600 transition hover:text-indigo-600">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 transition hover:text-indigo-600">
              How it works
            </a>
            <a href="/contact" className="text-sm font-medium text-slate-600 transition hover:text-indigo-600">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:block"
            >
              Log in
            </a>
            <a
              href="/register"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              Get Started
            </a>
          </div>

        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white">

        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-20 text-center lg:px-8 lg:pb-32 lg:pt-28">

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Simplify your links, amplify your reach
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
            Shorten Links.
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Expand Possibilities.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            Transform long, complicated URLs into short, powerful links.
            Share smarter, track performance and manage everything in one place.
          </p>

          {/* URL SHORTENER FORM */}
          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl shadow-indigo-100/70 sm:p-4">

            <form onSubmit={handleShorten}>
              <div className="flex flex-col gap-3 sm:flex-row">

                <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50">
                  <span className="text-xl text-slate-400">🔗</span>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setError("");
                    }}
                    placeholder="Paste your long URL here..."
                    className="h-14 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Shortening..." : "Shorten URL"}
                  {!loading && <span>→</span>}
                </button>

              </div>
            </form>

            {error && (
              <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-left text-sm text-red-600">
                {error}
              </p>
            )}

            {shortUrl && (
              <div className="mt-5 flex flex-col items-start justify-between gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 sm:flex-row sm:items-center">
                <div className="min-w-0 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                    Your short link is ready!
                  </p>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block break-all font-semibold text-indigo-700 hover:underline"
                  >
                    {shortUrl}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="shrink-0 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  {copied ? "✓ Copied!" : "Copy Link"}
                </button>
              </div>
            )}

            <p className="mt-4 text-xs text-slate-400">
              Free to use · Fast link generation · Simple analytics
            </p>

          </div>

          {/* TRUST INDICATORS */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-500">
            <span>✓ Easy to use</span>
            <span>✓ Instant results</span>
            <span>✓ Track your links</span>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-white px-5 py-24 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Powerful Features
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to manage links
            </h2>

            <p className="mt-5 leading-7 text-slate-500">
              More than just a URL shortener. Everything you need to create,
              organize and understand your links.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-100 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-100/50"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl transition group-hover:bg-indigo-600 group-hover:scale-110">
                  {feature.icon}
                </div>

                <h3 className="mt-7 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-slate-50 px-5 py-24 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Simple Process
            </span>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Three steps. One powerful link.
            </h2>

            <p className="mt-4 text-slate-500">
              Get your long URLs shortened in seconds.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">

            {[
              {
                number: "01",
                icon: "📋",
                title: "Paste your URL",
                description: "Copy your long website URL and paste it into the input box."
              },
              {
                number: "02",
                icon: "⚡",
                title: "Generate your link",
                description: "Click the shorten button and let Shortly create your unique link."
              },
              {
                number: "03",
                icon: "🚀",
                title: "Share everywhere",
                description: "Copy your new short link and share it with anyone, anywhere."
              }
            ].map((step) => (
              <div key={step.number} className="relative rounded-3xl bg-white p-9 shadow-sm">
                <span className="text-sm font-extrabold tracking-widest text-indigo-600">
                  STEP {step.number}
                </span>

                <div className="mt-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
                  {step.icon}
                </div>

                <h3 className="mt-7 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-16 text-center shadow-2xl shadow-indigo-200 sm:px-14">

          <h2 className="text-3xl font-black text-white sm:text-5xl">
            Ready to simplify your links?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-indigo-100">
            Start creating shorter, smarter and more shareable links today.
          </p>

          <a
            href="/register"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-indigo-700 shadow-lg transition hover:-translate-y-1 hover:bg-indigo-50"
          >
            Get Started for Free
            <span>→</span>
          </a>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 bg-white px-5 py-12 lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">

          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
              S
            </div>
            <span className="text-lg font-extrabold">
              Short<span className="text-indigo-600">ly</span>
            </span>
          </a>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-500">
            <a href="/" className="hover:text-indigo-600">Home</a>
            <a href="#features" className="hover:text-indigo-600">Features</a>
            <a href="/contact" className="hover:text-indigo-600">Contact</a>
            <a href="/login" className="hover:text-indigo-600">Login</a>
          </div>

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Shortly. All rights reserved.
          </p>

        </div>
      </footer>

    </div>
  );
}
