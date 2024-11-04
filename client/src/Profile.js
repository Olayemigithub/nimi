import React from 'react';
import './Profile.css'; // Ensure you create this CSS file

const Profile = () => {
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        <img src="profile-picture-url" alt="Profile" className="profile-picture" />
        <div className="profile-info">
          <h2>John Doe</h2>
          <p>Email: john.doe@example.com</p>
          <p>Joined: January 2023</p>
        </div>
      </div>
      <button className="edit-button">Edit Profile</button>
    </div>
  );
};

export default Profile;
