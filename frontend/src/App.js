import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage.js";
import LoginPage from "./components/LoginForm.js";
import SignupPage from "./components/SignupForm.js";
import ListPage from "./pages/ListPage";
import AppliedPage from "./pages/AppliedPage";
import ProfilePage from "./pages/ProfilePage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login/client" element={<LoginPage role="Client" />} />
        <Route path="/login/dev" element={<LoginPage role="Developer" />} />
        <Route path="/signup/client" element={<SignupPage role="Client" />} />
        <Route path="/signup/dev" element={<SignupPage role="Developer" />} />
	<Route path="/list" element={<ListPage />} />
        <Route path="/applied" element={<AppliedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;

