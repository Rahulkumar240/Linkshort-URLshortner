
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  KeyRound,
  LogOut,
  Mail,
  Save,
  ShieldCheck,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Brand from "../components/Brand";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  const getHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    setError("");
    setProfileMessage("");

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    setSavingProfile(true);

    try {
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Profile update failed.");
      }

      setProfileMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Unable to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    setError("");
    setPasswordMessage("");

    if (newPassword.length < 8) {
      setError("New password must contain at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setSavingPassword(true);

    try {
      const response = await fetch(`${API_URL}/api/users/change-password`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Password update failed.");
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setPasswordMessage("Password changed successfully.");
    } catch (err) {
      setError(err.message || "Unable to change password.");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login", { replace: true });
    }
  };

  const initials = (name || "User")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Brand />

          <Link
            to="/app"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10">
        <div className="mb-8">
          <span className="text-xs font-bold tracking-widest text-indigo-600">
            ACCOUNT
          </span>
          <h1 className="mt-2 text-3xl font-bold">Settings</h1>
          <p className="mt-2 text-slate-500">
            Manage your profile and account security.
          </p>
        </div>

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">
              {initials}
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                {name || "Your account"}
              </h2>
              <p className="text-sm text-slate-500">{email}</p>
              <p className="mt-1 text-xs text-slate-400">
                Linkly account
              </p>
            </div>
          </div>
        </section>

        {error && (
          <div
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <User size={20} />
            </div>
            <div>
              <h2 className="font-semibold">Profile information</h2>
              <p className="text-sm text-slate-500">
                Update your personal details.
              </p>
            </div>
          </div>

          <form onSubmit={updateProfile} className="space-y-5">
            <label className="block text-sm font-medium">
              Full name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label className="block text-sm font-medium">
              Email address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            {profileMessage && (
              <p className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 size={16} />
                {profileMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={savingProfile}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              <Save size={16} />
              {savingProfile ? "Saving..." : "Save changes"}
            </button>
          </form>
        </section>

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="font-semibold">Security</h2>
              <p className="text-sm text-slate-500">
                Change your account password.
              </p>
            </div>
          </div>

          <form onSubmit={updatePassword} className="space-y-5">
            <label className="block text-sm font-medium">
              Current password
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label className="block text-sm font-medium">
              New password
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label className="block text-sm font-medium">
              Confirm new password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            {passwordMessage && (
              <p className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 size={16} />
                {passwordMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={savingPassword}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              <KeyRound size={16} />
              {savingPassword ? "Updating..." : "Change password"}
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-slate-900">
                Sign out
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Sign out of your Linkly account on this device.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
