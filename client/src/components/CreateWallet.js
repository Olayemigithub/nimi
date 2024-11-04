import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const CreateWallet = ({ phoneNumber }) => {
    const [walletName, setWalletName] = useState('');
    const [status, setStatus] = useState('');

    const handleCreateWallet = async (e) => {
        e.preventDefault();
        try {
            // API call to create wallet based on the user's phone number and wallet name
            const response = await fetch('/api/wallet/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, walletName }),
            });

            if (response.ok) {
                setStatus('Wallet created successfully!');
                setWalletName(''); // Reset wallet name
            } else {
                setStatus('Error creating wallet.');
            }
        } catch (error) {
            console.error('Error creating wallet:', error);
            setStatus('Error creating wallet.');
        }
    };

    return (
        <Container>
            <h1>Create Wallet</h1>
            <Form onSubmit={handleCreateWallet}>
                <Form.Group controlId="formWalletName">
                    <Form.Label>Wallet Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Wallet Name"
                        value={walletName}
                        onChange={(e) => setWalletName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Create Wallet</Button>
            </Form>
            {status && (
                <Alert className="mt-3" variant={status.includes('success') ? 'success' : 'danger'}>
                    {status}
                </Alert>
            )}
        </Container>
    );
};

export default CreateWallet;
