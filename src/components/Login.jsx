import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Sign Up
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setShowPassword(false);
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    resetForm();
  };

  const validate = () => {
    if (!username.trim()) {
      setError("Username is required");
      return false;
    }
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters");
      return false;
    }
    if (!isLogin) {
      if (!email.trim()) {
        setError("Email is required");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email");
        return false;
      }
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setLoading(true);

    // Simulate network delay (replace with real API later)
    await new Promise((resolve) => setTimeout(resolve, 900));

    try {
      // Mock auth — store user in localStorage
      // Later this will call your backend endpoint
      const user = {
        username: username.trim(),
        email: email.trim() || `${username.trim()}@fusionhub.local`,
        loggedInAt: new Date().toISOString(),
      };

      if (rememberMe) {
        localStorage.setItem("fusionhub_user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("fusionhub_user", JSON.stringify(user));
      }

      // Also keep a simple flag for quick checks
      localStorage.setItem("fusionhub_logged_in", "true");

      navigate("/home");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-card">
        {/* Logo / Brand */}
        <div className="login-brand">
          <h1>FusionHub</h1>
          <p>{isLogin ? "Sign in to your account" : "Create a new account"}</p>
        </div>

        {/* Error message */}
        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              disabled={loading}
            />
          </div>

          {/* Email — only on Sign Up */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                disabled={loading}
              />
            </div>
          )}

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isLogin ? "current-password" : "new-password"}
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password — only on Sign Up */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                disabled={loading}
              />
            </div>
          )}

          {/* Remember me + Forgot (Login only) */}
          {isLogin && (
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                Remember me
              </label>
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <span className="btn-loading">
                <span className="spinner"></span>
                {isLogin ? "Signing in..." : "Creating account..."}
              </span>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Toggle Login / Sign Up */}
        <div className="login-toggle">
          {isLogin ? (
            <>
              New to Fusion Hub?{" "}
              <button type="button" onClick={toggleMode} disabled={loading}>
                Sign up now
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" onClick={toggleMode} disabled={loading}>
                Sign in
              </button>
            </>
          )}
        </div>

        <p className="demo-hint">
          Demo mode: any valid username + password works
        </p>
      </div>

      {/* Right side decorative panel */}
      <div className="login-side">
        <div className="side-content">
          <h2>Unlimited movies, TV series & more</h2>
          <p>
            Watch anywhere. Explore trending titles, popular movies and series
            in one clean interface.
          </p>
          <ul className="side-features">
            <li>Trending & Top Rated</li>
            <li>Browse Movies & TV</li>
            <li>Coming soon: Watchlist & Search</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
