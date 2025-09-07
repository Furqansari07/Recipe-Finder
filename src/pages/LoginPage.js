// src/pages/LoginPage.js
import React, { useState } from 'react';
import Footer from '../components/Footer';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 🔐 Handle traditional login
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await loginUser(email, password);

    if (response.status === "success" && response.user) {
      try {
        localStorage.setItem("user", JSON.stringify(response.user));
        alert("Login successful!");
        navigate('/');
      } catch (err) {
        console.error("Error saving user to localStorage:", err);
      }
    } else {
      console.error("Invalid login response:", response);
      alert("Login failed: " + (response.message || "Unknown error"));
    }
  };

return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container my-5 flex-grow-1">
        <h2 className="text-center mb-4">Login to Your Account</h2>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow-sm mb-4">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="remember" />
                  <label className="form-check-label" htmlFor="remember">Remember me</label>
                </div>

                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
            <div className="text-center">
              <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;