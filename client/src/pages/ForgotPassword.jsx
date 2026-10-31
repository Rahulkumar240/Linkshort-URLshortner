
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Link2,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

import Brand from "../components/Brand";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (busy) return;

    setError("");
    setSuccess(false);
    setBusy(true);

    try {
      const response = await fetch(`${API_URL}/api/users/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Request failed.");
      }

      setSuccess(true);
    } catch (err) {
      setError(
        err.message || "Unable to process your request. Please try again."
      );
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
              Your links are
              <br />
              waiting for you.
            </h2>

            <p>
              Get back to managing your links, tracking clicks,
              and growing your online presence.
            </p>

            <div className="quote-stat">
              <b>Linkly</b>
              <span>Your links. Your control.</span>
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
            <span className="eyebrow">ACCOUNT RECOVERY</span>

            <h1>
              Forgot your
              <br />
              password?
            </h1>

            <p>
              No worries. Enter your email address and we'll help
              you reset your password.
            </p>
          </div>

          {success ? (
            <div className="reset-success">
              <CheckCircle2 size={42} />

              <h2>Check your inbox</h2>

              <p>
                If an account exists for <strong>{email}</strong>,
                you'll receive instructions to reset your password.
              </p>

              <Link to="/login" className="btn btn-primary auth-submit">
                Back to login
                <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <label htmlFor="reset-email">
                Email address

                <div className="password-wrap">
                  <input
                    id="reset-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    autoComplete="email"
                    required
                    disabled={busy}
                  />

                  <span className="input-icon">
                    <Mail size={17} />
                  </span>
                </div>
              </label>

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
                {busy ? "Sending..." : "Send reset link"}
                <ArrowRight size={17} />
              </button>
            </form>
          )}

          <p className="auth-switch">
            Remember your password?{" "}
            <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
