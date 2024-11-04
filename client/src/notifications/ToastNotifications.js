// src/components/notifications/ToastNotifications.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to notify success messages
export const notifySuccess = (message) => {
    toast.success(message);
};

// Function to notify error messages
export const notifyError = (message) => {
    toast.error(message);
};

// Function to render the ToastContainer
export const CustomToastContainer = () => {
    return <ToastContainer />;
};

export default CustomToastContainer;
