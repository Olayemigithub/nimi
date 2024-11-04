import React, { useState } from 'react';

const WithdrawFromWallet = ({ phoneNumber }) => {
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');

    const handleWithdraw = async () => {
        try {
            // API call to withdraw funds
            const response = await fetch('/api/wallet/withdraw', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, amount }),
            });

            if (response.ok) {
                setStatus(`Withdrawn ${amount} USD from wallet`);
            } else {
                setStatus('Error withdrawing from wallet.');
            }
        } catch (error) {
            console.error('Error withdrawing from wallet:', error);
            setStatus('Error withdrawing from wallet.');
        }
    };

    return (
        <div>
            <h3>Withdraw from Wallet</h3>
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Enter amount" 
            />
            <button onClick={handleWithdraw}>Withdraw</button>
            <p>{status}</p>
        </div>
    )
};

export default WithdrawFromWallet;
