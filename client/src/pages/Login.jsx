
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Link2,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Brand from "../components/Brand";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/app";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (busy) return;

    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setBusy(true);

    try {
      await login(cleanEmail, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(
        err?.message || "Unable to log in. Please check your credentials."
      );
    } finally {
      setBusy(false);
    }
  };

  const clearError = () => {
    if (error) setError("");
  };

  return (
    <AuthPage>
      <Link to="/" className="back-link">
        <ArrowLeft size={16} />
        Back to home
      </Link>

      <div className="auth-brand">
        <Brand />
      </div>

      <div className="auth-heading">
        <span className="eyebrow">WELCOME BACK</span>

        <h1>
          Good to see you
          <br />
          again.
        </h1>

        <p>
          Log in to your workspace and pick up where you left off.
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">
          Email address

          <input
            id="login-email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError();
            }}
            autoComplete="email"
            required
            disabled={busy}
          />
        </label>

        <label htmlFor="login-password">
          Password

          <div className="password-wrap">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError();
              }}
              autoComplete="current-password"
              required
              disabled={busy}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              disabled={busy}
            >
              {showPassword ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}
            </button>
          </div>
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
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
          {busy ? "Logging in..." : "Log in"}
          <ArrowRight size={17} />
        </button>
      </form>

      <p className="auth-switch">
        New to Linkly?{" "}
        <Link to="/register">Create an account</Link>
      </p>
    </AuthPage>
  );
}

function AuthPage({ children }) {
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
              Every great journey
              <br />
              starts with a link.
            </h2>

            <p>
              One simple workspace to make your links shorter,
              smarter, and more useful.
            </p>

            <div className="quote-stat">
              <b>2.4M+</b>
              <span>links created by teams like yours</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-main">
        <div className="auth-content">{children}</div>
      </div>
    </div>
  );
}
