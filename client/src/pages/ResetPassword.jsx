
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Link2,
  LockKeyhole,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Brand from "../components/Brand";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (busy) return;

    setError("");

    if (!token) {
      setError("Invalid or missing password reset token.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setBusy(true);

    try {
      const response = await fetch(
        `${API_URL}/api/users/reset-password/${encodeURIComponent(token)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Unable to reset password."
        );
      }

      setSuccess(true);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-decoration">
        <div className="auth-decoration-inner">
          <span className="auth-orbit orbit-one" />
          <span className="auth-orbit orbit-two" />

          <div className="auth-quote">
            <span className="mini-icon">
              <Link2 />
            </span>

            <h2>
              A fresh start
              <br />
              begins here.
            </h2>

            <p>
              Secure your account and get back to making every
              link count.
            </p>

            <div className="quote-stat">
              <b>Linkly</b>
              <span>Short links. Smart insights.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-main">
        <div className="auth-content">
          <Link to="/login" className="back-link">
            <ArrowLeft size={16} />
            Back to login
          </Link>

          <div className="auth-brand">
            <Brand />
          </div>

          <div className="auth-heading">
            <span className="eyebrow">ACCOUNT SECURITY</span>

            <h1>
              Set a new
              <br />
              password.
            </h1>

            <p>
              Choose a strong password to keep your Linkly account secure.
            </p>
          </div>

          {success ? (
            <div className="reset-success">
              <CheckCircle2 size={42} />

              <h2>Password updated!</h2>

              <p>
                Your password has been changed successfully.
                You can now log in using your new password.
              </p>

              <button
                type="button"
                onClick={() => navigate("/login", { replace: true })}
                className="btn btn-primary auth-submit"
              >
                Go to login
                <ArrowRight size={17} />
              </button>
            </div>
          ) : !token ? (
            <div className="reset-success">
              <LockKeyhole size={42} />

              <h2>Invalid reset link</h2>

              <p>
                This link is missing its reset token. Please request
                a new password reset link.
              </p>

              <Link
                to="/forgot-password"
                className="btn btn-primary auth-submit"
              >
                Request new link
                <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <label htmlFor="new-password">
                New password

                <div className="password-wrap">
                  <input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    autoComplete="new-password"
                    minLength={8}
                    required
                    disabled={busy}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={busy}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </label>

              <label htmlFor="confirm-new-password">
                Confirm new password

                <div className="password-wrap">
                  <input
                    id="confirm-new-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                    autoComplete="new-password"
                    required
                    disabled={busy}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    disabled={busy}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </label>

              <p className="password-hint">
                Use at least 8 characters for your new password.
              </p>

              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary auth-submit"
                disabled={busy}
              >
                {busy ? "Updating password..." : "Reset password"}
                <ArrowRight size={17} />
              </button>
            </form>
          )}

          {!success && (
            <p className="auth-switch">
              Remember your password? <Link to="/login">Log in</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
