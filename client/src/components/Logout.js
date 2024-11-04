import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout'); // Call the logout endpoint
      localStorage.removeItem('token'); // Clear token from storage
      alert('Logged out successfully'); // Feedback to user
      navigate('/login'); // Redirect to login page
    } catch (error) {
      alert('Logout failed'); // Handle error if logout fails
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="btn btn-warning">Logout</button>
      {/* Add Home Button */}
      <div className="text-center my-3">
        <a href="/login" className="btn btn-outline-primary">Home</a>
      </div>
    </div>
  );
};

export default Logout;
