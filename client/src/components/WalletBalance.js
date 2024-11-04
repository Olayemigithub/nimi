import React, { useState, useEffect } from 'react';

const WalletBalance = ({ phoneNumber }) => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        // Fetch wallet balance from API based on the user's phone number
        const fetchBalance = async () => {
            try {
                // Replace with your API call to get balance
                const response = await fetch(`/api/wallet/${phoneNumber}/balance`);
                const data = await response.json();
                setBalance(data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };
        
        fetchBalance();
    }, [phoneNumber]);

    return (
        <div>
            <h3>Wallet Balance</h3>
            <p>{balance} USD</p>
        </div>
    );
};

export default WalletBalance;
