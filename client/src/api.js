// services/api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://your-backend-url.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginUser = (userCredentials) => {
    return apiClient.post('/auth/login', userCredentials);
};

export const getWalletBalance = (userId) => {
    return apiClient.get(`/wallet/${userId}/balance`);
};

export const sendMoney = (paymentDetails) => {
    return apiClient.post('/payments/send', paymentDetails);
};
