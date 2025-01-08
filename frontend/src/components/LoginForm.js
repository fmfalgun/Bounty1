import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import axios from 'axios';

const LoginPage = ({ role }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
      const endpoint = role === 'Client' 
        ? 'http://localhost:3000/api/clients/login'
        : 'http://localhost:3000/api/devs/login';

      const response = await axios.post(endpoint, {
        email: credentials.email,
        password: credentials.password
      });

      // Store user data in localStorage
      localStorage.setItem('userToken', response.data._id); // or actual token if you're using one
      localStorage.setItem('userRole', role);

      // Redirect to list page
      navigate('/list');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <h1>{role} Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

