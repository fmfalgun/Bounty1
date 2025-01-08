// pages/AppliedPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AppliedPage = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const devId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:3000/api/applications/${devId}`);
      setApplications(response.data);
    } catch (err) {
      setError('Failed to fetch applications');
    }
  };

  return (
    <div className="flex">
      {/* Vertical Navbar */}
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Applications</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div key={app._id} className="border rounded-lg p-4 shadow-md bg-white">
              <h3 className="text-xl font-bold mb-2">{app.client.startupName}</h3>
              <p className="text-gray-600 mb-1">
                <strong>Status:</strong> {app.status}
              </p>
              <p>
                <strong>Applied on:</strong> {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppliedPage;

