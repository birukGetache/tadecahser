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

  const loginForm = document.querySelector(".login-form");
  const registerForm = document.querySelector(".register-form");
  const wrapper = document.querySelector(".wrapper");
  const loginTitle = document.querySelector(".title-login");
  const registerTitle = document.querySelector(".title-register");
  const signUpBtn = document.querySelector("#SignUpBtn");
  const signInBtn = document.querySelector("#SignInBtn");

  function loginFunction(){
    loginForm.style.left = "50%";
    loginForm.style.opacity = 1;
    registerForm.style.left = "150%";
    registerForm.style.opacity = 0;
    wrapper.style.height = "500px";
    loginTitle.style.top = "50%";
    loginTitle.style.opacity = 1;
    registerTitle.style.top = "50px";
    registerTitle.style.opacity = 0;
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset any previous errors
    setError("");

    // Validate input fields
    if (!username || !password) {
      // Show toast if either field is empty
      toast.error('Both fields are required! Please enter a valid username and password.');
      return;
    }

    try {
      const result = await axios.post('https://backtade-2.onrender.com/login', {
        username,
        password,
      });

      if (result.status === 200) {
        navigate('/casherPage');
        
      }
      else{
        setError('Login failed! Please check your username and password.');
        toast.error('Login failed! Please check your username and password.');
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
    navigate("/admin");  // Navigate to the admin page
  };

  return (
    <div className="wrapper">
      <div className="form-header">
        <div className="titles">
          <div className="title-login">Login</div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
        <div className="input-box">
          <input
            type="text"
            className="input-field"
            id="log-email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
          <label htmlFor="log-email" className="label">UserName</label>
          <i className="bx bx-envelope icon"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            className="input-field"
            id="log-pass"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <label htmlFor="log-pass" className="label">Password</label>
          <i className="bx bx-lock-alt icon"></i>
        </div>
        <div className="input-box">
          <button className="btn-submit" id="SignInBtn">Sign In <i className="bx bx-log-in"></i></button>
        </div>
        <div className="switch-form">
          <span>If you are an admin, <a href="#" onClick={handleAdmin}>go to Admin</a></span>
        </div>
      </form>
    </div>
  );
};

export default CashierLogin;
