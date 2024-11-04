import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileSettings = () => {
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [pin, setPin] = useState('');
    const [notification, setNotification] = useState(true);

    useEffect(() => {
        // Fetch user settings from the backend
        axios.get('/api/users/settings')
            .then(response => {
                setProfile(response.data);
                // Set notification preference if fetched from the backend
                // setNotification(response.data.notificationsEnabled); // Uncomment if applicable
            })
            .catch(error => console.error('Error fetching settings:', error));
    }, []);

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePinChange = (e) => {
        setPin(e.target.value);
    };

    const toggleNotification = () => {
        setNotification(!notification);
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/users/settings/update', profile)
            .then(response => alert('Profile updated successfully'))
            .catch(error => console.error('Error updating profile:', error));
    };

    const handlePinSubmit = (e) => {
        e.preventDefault();
        // Assuming you have a backend endpoint for updating PIN
        axios.post('/api/users/update-pin', { pin })
            .then(response => alert('PIN updated successfully'))
            .catch(error => console.error('Error updating PIN:', error));
    };

    return (
        <div className="settings">
            <h1>Settings</h1>

            <form onSubmit={handleProfileSubmit}>
                <h2>User Profile</h2>
                <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    placeholder="Name"
                />
                <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    placeholder="Email"
                />
                <button type="submit">Save Profile Changes</button>
            </form>

            <div className="settings-section">
                <h2>Change PIN</h2>
                <form onSubmit={handlePinSubmit}>
                    <input
                        type="password"
                        placeholder="Enter new PIN"
                        value={pin}
                        onChange={handlePinChange}
                    />
                    <button type="submit">Update PIN</button>
                </form>
            </div>

            <div className="settings-section">
                <h2>Notifications</h2>
                <label>
                    <input
                        type="checkbox"
                        checked={notification}
                        onChange={toggleNotification}
                    />
                    Enable Notifications
                </label>
            </div>
        </div>
    );
};

export default UserProfileSettings;
