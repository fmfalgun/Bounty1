// pages/ListPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ClientCard = ({ client, onApply }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-md">
      <h3 className="text-xl font-bold">{client.startupName}</h3>
      <p className="text-gray-600">{client.startupLocation}</p>
      <p className="my-2">{client.startupIdea}</p>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p>Salary: ${client.salary}</p>
          <p>Equity: {client.equity}%</p>
        </div>
        <button
          onClick={() => onApply(client._id)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

const ListPage = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/clients');
      setClients(response.data);
    } catch (err) {
      setError('Failed to fetch clients');
    }
  };

  const handleApply = async (clientId) => {
    try {
      const devId = localStorage.getItem('userId'); // You'll need to store this on login
      await axios.post('http://localhost:3000/api/applications', {
        devId,
        clientId,
        status: 'pending'
      });
      alert('Application submitted successfully!');
    } catch (err) {
      setError('Failed to submit application');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Available Opportunities</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map(client => (
            <ClientCard 
              key={client._id} 
              client={client} 
              onApply={handleApply}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListPage;
