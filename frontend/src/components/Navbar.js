// components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored tokens/session
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white w-64 h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="flex flex-col space-y-4">
        <Link to="/applied" className="hover:text-gray-300">
          Applied Jobs
        </Link>
        <Link to="/profile" className="hover:text-gray-300">
          Profile
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

