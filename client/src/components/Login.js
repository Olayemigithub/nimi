import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // CSS for styling
import axios from 'axios';

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Function to handle email/password login
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            localStorage.setItem('userToken', response.data.token); // Assuming your backend returns a token
            onLoginSuccess(response.data.user);
            navigate('/home'); // Redirect to home page
        } catch (error) {
            setErrorMessage('Login failed: ' + (error.response?.data?.message || 'An error occurred'));
        }
    };

    // Function to handle Google sign-in (handled by Google Identity Services)
    const handleCredentialResponse = (response) => {
        const token = response.credential;
        fetch('http://localhost:5000/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('userToken', data.token);
                onLoginSuccess(data.user);
                navigate('/home');
            })
            .catch((error) => console.error('Error:', error));
    };

    // Initialize Google Identity Services when the page loads
    useEffect(() => {
        window.onload = function () {
            google.accounts.id.initialize({
                client_id: 'YOUR_GOOGLE_CLIENT_ID',
                callback: handleCredentialResponse,
            });
            google.accounts.id.renderButton(
                document.getElementById('googleButtonDiv'),
                { theme: 'outline', size: 'large' }
            );
            google.accounts.id.prompt();
        };
    }, []);

    return (
        <div className="login-overlay">
            <div className="login-container">
                <div className="card login-card p-4">
                    <h3 className="text-center mb-4">Hello, Welcome back</h3>
                    <form onSubmit={handleEmailLogin}>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <button type="submit" className="btn btn-primary w-50">
                            Login
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <div id="googleButtonDiv"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
