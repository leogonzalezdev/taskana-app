import React, { useState } from 'react';
import './styles/login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin1234');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin1234') {
      localStorage.setItem('isLoggedIn', 'true');
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h1 className="login-title">Log in to your Account</h1>
          <p className="login-subtitle">Welcome back! Please enter your credentials:</p>
          <div className="input-group">
            <label htmlFor="username" className="label">Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          <button onClick={handleLogin} className="button login-button">Log in</button>
          <p className="signup-link">
            Don't have an account? <a href="#">Create an account</a>
          </p>
        </div>
        <div className="login-image">
          <img src="/assets/images/login.png" alt="Illustration" />
          <div className="image-overlay">
            <h2>Connect with every application</h2>
            <p>Everything you need in an easily customizable dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
