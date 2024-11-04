// PayBillsPage.js
import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import PaymentConfirmationModal from './PaymentConfirmationModal'; // Adjust the path as necessary

const PayBills = () => {
    const [amount, setAmount] = useState('');
    const [billType, setBillType] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [message, setMessage] = useState('');
    const [showSummary, setShowSummary] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleBillPayment = async () => {
        try {
            const response = await axios.post("http://localhost:5001/api/payments/pay-bills", {
                amount,
                billType,
                accountNumber,
            });
            setMessage(response.data.message);
            setShowModal(false); // Hide modal after payment
        } catch (error) {
            setMessage("Failed to pay bill");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount && billType && accountNumber) {
            setShowSummary(true);
            setShowModal(true); // Show confirmation modal
        } else {
            setMessage("Please fill in all fields.");
        }
    };

    return (
        <Container>
            <h1>Pay Bills</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBillType">
                    <Form.Label>Select Bill Type</Form.Label>
                    <Form.Control as="select" value={billType} onChange={(e) => setBillType(e.target.value)} required>
                        <option value="">Select a bill type</option>
                        <option value="electricity">Electricity</option>
                        <option value="water">Water</option>
                        <option value="internet">Internet</option>
                        <option value="airtime/Data">Airtime/Data Top Up</option>
                        <option value="cable-television">Cable TV</option>
                        <option value="gaming">Gaming</option>
                        <option value="betting">Betting</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formAmount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter Amount" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formAccountNumber">
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Account Number" 
                        value={accountNumber} 
                        onChange={(e) => setAccountNumber(e.target.value)} 
                        required 
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Review Payment</Button>
            </Form>

            {message && <Alert className="mt-3" variant={message.includes('success') ? 'success' : 'danger'}>{message}</Alert>}

            <PaymentConfirmationModal 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                handleConfirm={handleBillPayment} 
                summary={{ billType, amount, accountNumber }} 
            />
        </Container>
    );
};

export default PayBills;
