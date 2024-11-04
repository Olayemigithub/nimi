import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CableTv = () => {
  const [providers, setProviders] = useState([]);
  const [bouquets, setBouquets] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedBouquet, setSelectedBouquet] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [subscriberDetails, setSubscriberDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [bankDetails, setBankDetails] = useState({ accountNumber: '', bankName: '' });
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expirationDate: '', pin: '' });
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // Fetch available cable providers when the component mounts
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/list-providers');
        setProviders(response.data.providers);
      } catch (error) {
        console.error('Error fetching providers:', error);
        setMessage('Failed to fetch providers. Please try again later.');
      }
    };

    fetchProviders();
  }, []);

  // Fetch available bouquets based on the selected provider
  useEffect(() => {
    const fetchBouquets = async () => {
      if (selectedProvider) {
        try {
          const response = await axios.get(`http://localhost:3000/providers/${selectedProvider}/bouquets`);
          setBouquets(response.data.bouquets);
          setSelectedBouquet(response.data.bouquets[0] || '');
        } catch (error) {
          console.error('Error fetching bouquets:', error);
          setMessage('Failed to fetch bouquets. Please try again later.');
        }
      }
    };

    fetchBouquets();
  }, [selectedProvider]);

  // Handle subscriber details verification
  const handleVerifySubscriber = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verify-subscriber', {
        identityNumber,
        selectedProvider,
        selectedBouquet,
      });
      setSubscriberDetails(response.data);
      setMessage('Subscriber verified successfully.');
    } catch (error) {
      console.error('Error verifying subscriber:', error);
      setMessage('Failed to verify subscriber. Please check the details and try again.');
    }
  };

  // Handle OTP sending for bank and card payment
  const handleSendBankOtp = async () => {
    try {
      await axios.post('http://localhost:3000/send-otp', {
        accountNumber: bankDetails.accountNumber,
        bankName: bankDetails.bankName,
        paymentMethod: 'bank',
      });
      setMessage('OTP sent to your phone number.');
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('Failed to send OTP. Please try again.');
    }
  };

  const handleSendCardOtp = async () => {
    try {
      await axios.post('http://localhost:3000/send-otp', {
        cardNumber: cardDetails.cardNumber,
        expirationDate: cardDetails.expirationDate,
        pin: cardDetails.pin,
        paymentMethod: 'card',
      });
      setMessage('OTP sent to your phone number.');
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('Failed to send OTP. Please try again.');
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verify-otp', {
        otp,
        paymentMethod,
      });
      if (response.data.verified) {
        setOtpVerified(true);
        setMessage('Payment successful!');
      } else {
        setMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Failed to verify OTP. Please try again.');
    }
  };

  return (
    <div className="container mt-5 w-50">
      <h2 className="text-center mb-4">Cable TV Subscription Payment</h2>

      {/* Select Cable Provider */}
      <div className="form-group">
        <label>Select Provider:</label>
        <select
          className="form-control"
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
        >
          <option value="">-- Select Provider --</option>
          {providers.map(provider => (
            <option key={provider.id} value={provider.id}>{provider.name}</option>
          ))}
        </select>
      </div>

      {/* Select Bouquet/Price Plan */}
      {selectedProvider && (
        <div className="form-group">
          <label>Select Bouquet:</label>
          <select
            className="form-control"
            value={selectedBouquet}
            onChange={(e) => setSelectedBouquet(e.target.value)}
          >
            <option value="">-- Select Bouquet --</option>
            {bouquets.map(bouquet => (
              <option key={bouquet.id} value={bouquet.id}>{bouquet.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Enter Owner Identity Number */}
      {selectedBouquet && (
        <div className="form-group">
          <label>Enter Identity Number (Decoder/Account Number):</label>
          <input
            type="text"
            className="form-control"
            value={identityNumber}
            onChange={(e) => setIdentityNumber(e.target.value)}
          />
        </div>
      )}

      <button className="btn btn-primary" onClick={handleVerifySubscriber}>
        Verify Subscriber
      </button>
      <br />

      {/* Display Subscriber Details */}
      {subscriberDetails && (
        <div className="mt-4">
          <h3>Subscriber Details:</h3>
          <p>Name: {subscriberDetails.name}</p>
          <p>Address: {subscriberDetails.address}</p>
          <p>Bouquet: {subscriberDetails.bouquet}</p>
        </div>
      )}

      {/* Payment Method Toggle */}
      {subscriberDetails && (
        <div className="mt-4">
          <h3>Select Payment Method:</h3>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={() => setPaymentMethod('bank')}
            />
            <label className="form-check-label">Pay with Bank Details</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            <label className="form-check-label">Pay with Card Details</label>
          </div>
        </div>
      )}

      {/* Bank Payment Form */}
      {paymentMethod === 'bank' && subscriberDetails && (
        <div className="mt-4">
          <h3>Enter Bank Details:</h3>
          <div className="form-group">
            <label>Account Number:</label>
            <input
              type="text"
              className="form-control"
              value={bankDetails.accountNumber}
              onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Bank Name:</label>
            <select
              className="form-control"
              value={bankDetails.bankName}
              onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
            >
              <option value="">-- Select Bank --</option>
              <option value="GTBank">GTBank</option>
              <option value="Access Bank">Access Bank</option>
              <option value="Zenith Bank">Zenith Bank</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleSendBankOtp}>Send OTP</button>
        </div>
      )}

      {/* Card Payment Form */}
      {paymentMethod === 'card' && subscriberDetails && (
        <div className="mt-4">
          <h3>Enter Card Details:</h3>
          <div className="form-group">
            <label>Card Number:</label>
            <input
              type="text"
              className="form-control"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Expiration Date:</label>
            <input
              type="text"
              className="form-control"
              value={cardDetails.expirationDate}
              onChange={(e) => setCardDetails({ ...cardDetails, expirationDate: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>PIN:</label>
            <input
              type="password"
              className="form-control"
              value={cardDetails.pin}
              onChange={(e) => setCardDetails({ ...cardDetails, pin: e.target.value })}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSendCardOtp}>Send OTP</button>
        </div>
      )}

      {/* OTP Verification */}
      {(paymentMethod === 'bank' || paymentMethod === 'card') && (
        <div className="mt-4">
          <h3>Enter OTP:</h3>
          <input
            type="text"
            className="form-control"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}

      {/* Display Messages */}
      {message && (
        <div className="mt-4 alert alert-info">
          {message}
        </div>
      )}

      <Button onClick={() => navigate('/')} className="mt-3">Home</Button>
    </div>
  );
};

export default CableTv;
