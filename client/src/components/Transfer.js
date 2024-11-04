import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Transfer = () => {
  const [amount, setAmount] = useState('');
  const [beneficiaryAccount, setBeneficiaryAccount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [banks, setBanks] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('atm'); // 'atm', 'bank', or 'wallet'
  const [atmCardNumber, setAtmCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [virtualPin, setVirtualPin] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [accountVerified, setAccountVerified] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null); // Store verified account details
  const [otp, setOtp] = useState('');
  const [showOtpPrompt, setShowOtpPrompt] = useState(false);
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [walletBalance, setWalletBalance] = useState(1000); // Example balance for wallet
  const [walletPin, setWalletPin] = useState(''); // Wallet PIN for authorization

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch the list of banks on component mount
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/banks'); // Replace with actual API endpoint
        setBanks(response.data);
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    };

    fetchBanks();
  }, []);

  // Trigger bank name fetching when beneficiary account number becomes 10 digits
  const handleBeneficiaryAccountChange = async (event) => {
    const enteredAccountNumber = event.target.value;
    setBeneficiaryAccount(enteredAccountNumber);

    if (enteredAccountNumber.length === 10) {
      // If beneficiary account number is 10 digits, fetch the bank name
      try {
        const response = await axios.post('http://localhost:3000/get-bank-name', {
          accountNumber: enteredAccountNumber,
        });
        if (response.data.success) {
          setSelectedBank(response.data.bankName); // Automatically select the bank name
          setMessage(`Bank Name: ${response.data.bankName}`);
        } else {
          setMessage('Bank name could not be fetched. Please select manually.');
        }
      } catch (error) {
        setMessage('Error fetching bank name. Please try again.');
      }
    } else {
      setSelectedBank(''); // Reset if account number is not 10 digits
      setMessage('');
    }
  };

  // Handle the bank selection (manual fallback if fetching fails)
  const handleBankSelection = (event) => {
    setSelectedBank(event.target.value);
  };

  // Handle Wallet Payment submission
  const handleWalletPayment = () => {
    if (amount > walletBalance) {
      setMessage('Insufficient wallet balance');
    } else if (walletPin.length !== 4) {
      setMessage('Please enter a valid 4-digit wallet PIN.');
    } else {
      setMessage('Wallet payment successful.');
      // Logic to deduct amount from wallet goes here
    }
  };

  // Send OTP to the phone number linked to the bank account
  const sendOtpToPhone = async () => {
    try {
      const response = await axios.post('http://localhost:3000/send-otp', {
        phoneNumber: accountDetails.phoneNumber, // Assume the phone number is attached to the account details
        amount,
        beneficiaryAccount,
        bank: selectedBank,
      });
      if (response.data.success) {
        setOtpSent(true);
        setShowOtpPrompt(true);
        setMessage('OTP sent to the registered phone number.');
      } else {
        setMessage('Error sending OTP.');
      }
    } catch (error) {
      setMessage('Error sending OTP. Please try again.');
    }
  };

  // Verify the OTP entered by the user
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verify-otp', {
        otp,
        accountNumber: bankAccountNumber,
        amount,
        beneficiaryAccount,
        bank: selectedBank,
      });
      if (response.data.success) {
        setMessage('Payment completed successfully.');
        setOtpSent(false);
        setShowOtpPrompt(false);
      } else {
        setMessage('OTP verification failed. Please try again.');
      }
    } catch (error) {
      setMessage('Error verifying OTP.');
    }
  };

  // Submit the payment details
  const handleSubmit = async () => {
    if (paymentMethod === 'atm') {
      // For ATM payments, proceed with card details submission
      try {
        await axios.post('http://localhost:3000/send-otp', {
          cardNumber: atmCardNumber,
          amount,
          beneficiaryAccount,
          bank: selectedBank,
        });
        setOtpSent(true);
        setShowOtpPrompt(true);
      } catch (error) {
        setMessage('Error sending OTP. Please try again.');
      }
    } else if (paymentMethod === 'bank') {
      if (accountVerified && bankAccountNumber.length === 10 && selectedBank) {
        // If the account is verified, send OTP for bank payment
        await sendOtpToPhone();
      } else {
        setMessage('Please verify the account and select a bank.');
      }
    } else if (paymentMethod === 'wallet') {
      handleWalletPayment();
    }
  };

  const handleHomeClick = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <Container className="p-3 my-2 bg-secondary text-white card w-50">
      <h2>Transfer Funds</h2>
      <Form>
        <Form.Group as={Row} controlId="formAmount">
          <Form.Label column sm={2}>Amount:</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mb-3"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formBeneficiaryAccount">
          <Form.Label column sm={2}>Beneficiary Account:</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              value={beneficiaryAccount}
              onChange={handleBeneficiaryAccountChange}
              className="mb-3"
            />
          </Col>
        </Form.Group>

        {selectedBank && <p>Bank Name: {selectedBank}</p>}

        {/* Payment Method Toggle */}
        <Form.Group as={Row} className="my-3">
          <Form.Label column sm={2}>Choose Payment Method:</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="atm">ATM</option>
              <option value="bank">Bank</option>
              <option value="wallet">Wallet</option>
            </Form.Control>
          </Col>
        </Form.Group>

        {paymentMethod === 'bank' && (
          <div>
            <h3>Bank Details</h3>
            <Form.Group as={Row} controlId="formBankAccountNumber">
              <Form.Label column sm={2}>Sender's Account Number:</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  value={bankAccountNumber}
                  onChange={handleBeneficiaryAccountChange}
                  maxLength={10} // Ensure input is limited to 10 digits
                />
              </Col>
            </Form.Group>
            {accountVerified && accountDetails && (
              <div>
                <p>Account Name: {accountDetails.name}</p>
              </div>
            )}
            {/* Bank Selection Dropdown */}
            {accountVerified && (
              <Form.Group as={Row} controlId="formBankSelection">
                <Form.Label column sm={2}>Select Bank:</Form.Label>
                <Col sm={10}>
                  <Form.Control as="select" value={selectedBank} onChange={handleBankSelection}>
                    <option value="">-- Select Bank --</option>
                    {banks.map((bank) => (
                      <option key={bank.id} value={bank.id}>
                        {bank.name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
            )}
          </div>
        )}

        {paymentMethod === 'atm' && (
          <div>
            <h3>ATM Card Details</h3>
            <Form.Group as={Row} controlId="formAtmCardNumber">
              <Form.Label column sm={2}>ATM Card Number:</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={atmCardNumber}
                  onChange={(e) => setAtmCardNumber(e.target.value)}
                  maxLength={16} // Ensure input is limited to 16 digits
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formExpiryDate">
              <Form.Label column sm={2}>Expiry Date:</Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                />
              </Col>
              <Col sm={5}>
                <Form.Control
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="CVV"
                 /> 
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formVirtualPin">
              <Form.Label column sm={2} className="m-3">Virtual PIN:</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  value={virtualPin}
                  onChange={(e) => setVirtualPin(e.target.value)}
                />
              </Col>
            </Form.Group>
          </div>
        )}

        {paymentMethod === 'wallet' && (
          <div>
            <h3>Wallet Details</h3>
            <p>Wallet Balance: ₦{walletBalance}</p>
            <Form.Group as={Row} controlId="formWalletPin">
              <Form.Label column sm={2}>Wallet PIN:</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  value={walletPin}
                  onChange={(e) => setWalletPin(e.target.value)}
                  maxLength={4} // Ensure input is limited to 4 digits
                />
              </Col>
            </Form.Group>
          </div>
        )}

        <Button variant="primary" onClick={handleSubmit}>
          Send Money
        </Button>
        <Button variant="primary" className="ms-3" onClick={handleHomeClick}>
          Home
        </Button>
      </Form>

      {message && <p className="mt-3">{message}</p>}

      {/* OTP Prompt */}
      {showOtpPrompt && otpSent && (
        <div className="mt-3">
          <Form.Group as={Row} controlId="formOtp">
            <Form.Label column sm={2}>OTP:</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Button variant="primary" onClick={handleVerifyOtp}>
            Verify OTP
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Transfer;
