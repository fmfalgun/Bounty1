import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignupForm.css";
import axios from 'axios';

const SignupPage = ({ role }) => {

  const navigate = useNavigate();

  const initialState = role === 'Client' ? {
    name: "",
    whatsapp: "",
    linkedin: "",
    gmail: "",
    startupName: "",
    startupLocation: "",
    startupIdea: "",
    salary: "",
    equity: "",
    pass: ""
  } : {
    name: "",
    whatsapp: "",
    linkedin: "",
    gmail: "",
    pass: ""
  };

  const [userInfo, setUserInfo] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = role === 'Client' ? 'http://localhost:3000/api/clients' : 'http://localhost:3000/api/devs';
      const response = await axios.post(endpoint, userInfo);
      console.log('Registration successful:', response.data);
      
      // Store user data in localStorage
      localStorage.setItem('userToken', response.data._id); // or actual token if you're using one
      localStorage.setItem('userRole', role);
      
      // Redirect to list page
      navigate('/list');
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="signup-page">
      <h1>{role} Signup</h1>
      {error && <div className="error-message">{error}</div>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userInfo.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="gmail"
          placeholder="Gmail"
          value={userInfo.gmail}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp Number"
          value={userInfo.whatsapp}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn Profile URL"
          value={userInfo.linkedin}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="pass"
          placeholder="Password"
          value={userInfo.pass}
          onChange={handleChange}
          required
        />

        {role === 'Client' && (
          <>
            <input
              type="text"
              name="startupName"
              placeholder="Startup Name"
              value={userInfo.startupName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="startupLocation"
              placeholder="Startup Location"
              value={userInfo.startupLocation}
              onChange={handleChange}
              required
            />
            <textarea
              name="startupIdea"
              placeholder="Describe your startup idea"
              value={userInfo.startupIdea}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="salary"
              placeholder="Offered Salary"
              value={userInfo.salary}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="equity"
              placeholder="Offered Equity (%)"
              value={userInfo.equity}
              onChange={handleChange}
              required
            />
          </>
        )}
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
