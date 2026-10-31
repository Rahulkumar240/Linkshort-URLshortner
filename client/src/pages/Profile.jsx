
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  ShieldCheck,
  Save,
  Link2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

export default function Profile() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in again.");
      return;
    }

    setBusy(true);

    try {
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update profile.");
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const initials = (user?.name || "User")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Link2 className="text-blue-600" />
            <span>Linkly</span>
          </Link>

          <Link
            to="/app"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            My Profile
          </h1>
          <p className="mt-2 text-slate-500">
            Manage your personal account information.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-700">
              {initials}
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              {user?.name || "Your Name"}
            </h2>

            <p className="mt-1 break-all text-sm text-slate-500">
              {user?.email || "No email available"}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
              <ShieldCheck size={15} />
              Account active
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your account details below.
            </p>

            <form onSubmit={handleSave} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-3.5 text-slate-400"
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-3.5 text-slate-400"
                  />
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-500 outline-none"
                  />
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Email address cannot be changed here.
                </p>
              </div>

              {message && (
                <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                  {message}
                </p>
              )}

              {error && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                <Save size={17} />
                {busy ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-3">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <Calendar size={22} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Account Information
                </h2>
                <p className="text-sm text-slate-500">
                  Your Linkly account details.
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-5">
              <p className="text-sm text-slate-500">Account created</p>
              <p className="mt-1 font-medium text-slate-900">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "Not available"}
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
