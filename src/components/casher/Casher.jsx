import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from 'axios'; // Import axios for API request
import { toast } from 'react-toastify'; // Import toast for error notification
import gsap from 'gsap'; // Import GSAP for animations
import './CashierLogin.css'; // Import external CSS for styling

const CashierLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset any previous errors
    setError("");

    try {
      const result = await axios.post('https://backtade-2.onrender.com/login', {
        username,
        password,
      });

      if(result.status === 200){
        navigate('/casherPage')
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed! Please check your username and password.');
      toast.error('Login failed! Please check your username and password.');
    }
  };

  // Handle form reset (Cancel button)
  const handleCancel = () => {
    setUsername("");
    setPassword("");
    setError(""); // Reset error state
  };

  // Handle navigating to admin page
  const handleAdmin = () => {
    navigate("/");  // Navigate to the admin page
  };

  return (
    <div className="cashier-login-container">
      <div className="cashier-login-form">
        <h2>Cashier Login</h2>
        {error && <div className="error-message">{error}</div>} {/* Show error message if any */}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="button-container">
            <button type="submit" className="login-btn">Login</button>
            <button type="button" className="admin-btn" onClick={handleAdmin}>Go to Admin</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CashierLogin;
