import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_USER = "admin";
const ADMIN_PASS = "grolinq2025";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem("isAdmin", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-box">
        <div className="admin-login-logo">
          <img src="/img/logo/logo.png" alt="Grolinq" />
        </div>
        <h2>Admin Login</h2>
        <p>Sign in to access your dashboard</p>
        {error && <div className="admin-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="admin-login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
