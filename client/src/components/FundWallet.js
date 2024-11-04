import React, { useState } from 'react';

const FundWallet = ({ phoneNumber }) => {
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');

    const handleFundWallet = async () => {
        try {
            // API call to fund the wallet
            const response = await fetch('/api/wallet/fund', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, amount }),
            });

            if (response.ok) {
                setStatus(`Wallet funded with ${amount} USD`);
            } else {
                setStatus('Error funding wallet.');
            }
        } catch (error) {
            console.error('Error funding wallet:', error);
            setStatus('Error funding wallet.');
        }
    };

    return (
        <div>
            <h3>Fund Wallet</h3>
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Enter amount" 
            />
            <button onClick={handleFundWallet}>Fund Wallet</button>
            <p>{status}</p>
        </div>
    );
};

export default FundWallet;
