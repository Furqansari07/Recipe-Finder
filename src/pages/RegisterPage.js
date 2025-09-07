// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { registerUser } from '../api/auth';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await registerUser(name, email, password);

    if (response.status === "success" && response.user) {
      try {
        localStorage.setItem("user", JSON.stringify(response.user));
        alert("Registration successful!");
        navigate('/');
      } catch (err) {
        console.error("Error saving user to localStorage:", err);
      }
    } else {
      console.error("Invalid user object in response:", response);
      alert("Registration failed: " + (response.message || "Unknown error"));
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container my-5 flex-grow-1">
        <h2 className="text-center mb-4">Create Your Account</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow-sm">
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="name"
                    value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="confirmPassword"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" />
                </div>

                <button type="submit" className="btn btn-success w-100">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage;