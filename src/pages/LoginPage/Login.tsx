import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

interface JWTPayload {
  exp: number;
  role: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("https://localhost:7116/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();

      // Save token in localStorage
      localStorage.setItem("token", data.token);

      // Decode JWT to get role
      const decoded = jwtDecode<JWTPayload>(data.token);
      localStorage.setItem("role", decoded.role);

      // Redirect based on role
      if (decoded.role === "Admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/my-courses");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          {error && <p className="error-message">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-login">Login</button>

          <p className="switch-auth">
            Don’t have an account? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
