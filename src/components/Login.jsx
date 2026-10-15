import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Mock authentication for now.
    // Later we will connect this to a real backend / database.
    // For development we just accept any non-empty credentials.
    console.log("Login attempt:", { username });
    navigate("/home");
  };

  return (
    <section className="LoginContainer">
      {/* LEFT SIDE - LOGIN */}
      <form onSubmit={handleSubmit} className="loginForm">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button type="submit">Login</button>

        <div className="login-links">
          <a href="#">Forgot password?</a>
        </div>

        <p className="demo-hint">
          Demo: enter any username & password to continue
        </p>
      </form>

      {/* RIGHT SIDE - CHAT BOX */}
      <div className="chatBox">
        <h3>Chat Box</h3>

        <div className="chatMessages">
          <p className="bot">Hello 👋 How can I help you?</p>
        </div>

        <div className="chatInput">
          <input type="text" placeholder="Type a message..." />
          <button type="button">Send</button>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
