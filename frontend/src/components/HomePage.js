import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to Our Platform</h1>
        <p>Select your role to proceed:</p>
      </header>
      <div className="login-options">
        <div className="login-box">
          <h2>Client</h2>
          <button onClick={() => navigate("/login/client")}>Login</button>
          <button onClick={() => navigate("/signup/client")}>Sign Up</button>
        </div>
        <div className="login-box">
          <h2>Developer</h2>
          <button onClick={() => navigate("/login/dev")}>Login</button>
          <button onClick={() => navigate("/signup/dev")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

