
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Link2,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Brand from "../components/Brand";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const clearError = () => {
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (busy) return;

    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      setError("Please fill in all required fields.");
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

    if (!acceptedTerms) {
      setError("Please accept the terms and conditions.");
      return;
    }

    setBusy(true);

    try {
      await register(cleanName, cleanEmail, password);
      navigate("/app", { replace: true });
    } catch (err) {
      setError(err?.message || "Unable to create your account.");
    } finally {
      setBusy(false);
    }
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
        <span className="eyebrow">GET STARTED</span>

        <h1>
          Create your
          <br />
          free account.
        </h1>

        <p>
          Join Linkly and start creating shorter, smarter links.
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="register-name">
          Full name

          <div className="password-wrap">
            <input
              id="register-name"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearError();
              }}
              autoComplete="name"
              required
              disabled={busy}
            />
            <span className="input-icon">
              <User size={17} />
            </span>
          </div>
        </label>

        <label htmlFor="register-email">
          Email address

          <input
            id="register-email"
            type="email"
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

        <label htmlFor="register-password">
          Password

          <div className="password-wrap">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError();
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

        <label htmlFor="confirm-password">
          Confirm password

          <div className="password-wrap">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearError();
              }}
              autoComplete="new-password"
              required
              disabled={busy}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
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

        <label className="terms-check">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => {
              setAcceptedTerms(e.target.checked);
              clearError();
            }}
            disabled={busy}
          />

          <span>
            I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
            <Link to="/privacy">Privacy Policy</Link>.
          </span>
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
          {busy ? "Creating account..." : "Create account"}
          <ArrowRight size={17} />
        </button>
      </form>

      <p className="auth-switch">
        Already have an account?{" "}
        <Link to="/login">Log in</Link>
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
              Make every link
              <br />
              count.
            </h2>

            <p>
              Create, manage, and track all your short links
              from one simple workspace.
            </p>

            <div className="quote-stat">
              <b>One link.</b>
              <span>Endless possibilities.</span>
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
