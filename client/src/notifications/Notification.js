import React, { useState } from 'react';
import Notification from './notifications/Notification';
import '../styles/Notification.css'

const MyComponent = () => {
    const [notification, setNotification] = useState({ message: '', type: '', visible: false });

    const showNotification = (msg, type) => {
        setNotification({ message: msg, type, visible: true });
    };

    const closeNotification = () => {
        setNotification({ ...notification, visible: false });
    };

    return (
        <div>
            <button onClick={() => showNotification('This is a success message!', 'success')}>
                Show Success Notification
            </button>
            <button onClick={() => showNotification('This is an error message!', 'error')}>
                Show Error Notification
            </button>
            
            {notification.visible && (
                <Notification 
                    message={notification.message} 
                    type={notification.type} 
                    onClose={closeNotification} 
                />
            )}
        </div>
    );
};

export default MyComponent;
