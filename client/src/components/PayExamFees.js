// src/components/AirtimeData.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PayExamFees = () => {
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    examType: '',
    examBody: '',
    examYear: '',
    amount: '',
    candidateName: '',
    candidateRegNumber: '',
    walletPin: '',
    atmCardNumber: '',
    atmExpiry: '',
    atmCvv: '',
    atmPin: '',
    accountNumber: '',
    selectedBank: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleOtpVerification = () => {
    // logic to verify OTP and complete payment
  };

  const handlePayment = () => {
    // logic to execute payment and generate receipt
    console.log('Payment executed and receipt generated');
  };

  return (
    <div className="container mt-5 w-50">
      <h1 className="text-center mb-4">Pay Examination Fee</h1>
      <form className="row g-3">
        {/* Exam Type */}
        <div className="col-md-6">
          <label className="form-label">Examination Type</label>
          <select
            className="form-select"
            name="examType"
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="professional">Professional Examinations</option>
            <option value="national">National Examinations</option>
          </select>
        </div>

        {/* Exam Body */}
        <div className="col-md-6">
          <label className="form-label">Examination Body</label>
          <input
            type="text"
            className="form-control"
            name="examBody"
            value={formData.examBody}
            onChange={handleInputChange}
          />
        </div>

        {/* Exam Year or Diet */}
        <div className="col-md-6">
          <label className="form-label">Exam Year or Diet</label>
          <input
            type="text"
            className="form-control"
            name="examYear"
            value={formData.examYear}
            onChange={handleInputChange}
          />
        </div>

        {/* Amount */}
        <div className="col-md-6">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </div>

        {/* Candidate Name */}
        <div className="col-md-6">
          <label className="form-label">Candidate Name</label>
          <input
            type="text"
            className="form-control"
            name="candidateName"
            value={formData.candidateName}
            onChange={handleInputChange}
          />
        </div>

        {/* Candidate Registration Number */}
        <div className="col-md-6">
          <label className="form-label">Registration Number</label>
          <input
            type="text"
            className="form-control"
            name="candidateRegNumber"
            value={formData.candidateRegNumber}
            onChange={handleInputChange}
          />
        </div>

        {/* Payment Method */}
        <div className="col-12">
          <label className="form-label">Payment Method</label>
          <div className="btn-group">
            <button
              type="button"
              className={`btn btn-outline-primary ${paymentMethod === 'wallet' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('wallet')}
            >
              Wallet
            </button>
            <button
              type="button"
              className={`btn btn-outline-primary ${paymentMethod === 'atm' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('atm')}
            >
              ATM
            </button>
            <button
              type="button"
              className={`btn btn-outline-primary ${paymentMethod === 'account' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('account')}
            >
              Account
            </button>
          </div>
        </div>

        {/* Wallet Payment */}
        {paymentMethod === 'wallet' && (
          <div className="col-md-6">
            <label className="form-label">Wallet PIN</label>
            <input
              type="password"
              className="form-control"
              name="walletPin"
              value={formData.walletPin}
              onChange={handleInputChange}
            />
            <button className="btn btn-success mt-3" type="button" onClick={handlePayment}>
              Pay with Wallet
            </button>
          </div>
        )}

        {/* ATM Payment */}
        {paymentMethod === 'atm' && (
          <div className="col-md-12">
            <label className="form-label">Card Number</label>
            <input
              type="text"
              className="form-control"
              name="atmCardNumber"
              value={formData.atmCardNumber}
              onChange={handleInputChange}
            />
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="atmExpiry"
                  value={formData.atmExpiry}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  name="atmCvv"
                  value={formData.atmCvv}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">PIN</label>
                <input
                  type="password"
                  className="form-control"
                  name="atmPin"
                  value={formData.atmPin}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {!otpSent ? (
              <button className="btn btn-primary mt-3" type="button" onClick={() => setOtpSent(true)}>
                Send OTP
              </button>
            ) : (
              <div className="mt-3">
                <label className="form-label">OTP</label>
                <input
                  type="text"
                  className="form-control"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button className="btn btn-success mt-3" type="button" onClick={handleOtpVerification}>
                  Verify OTP
                </button>
              </div>
            )}
          </div>
        )}

        {/* Account Payment */}
        {paymentMethod === 'account' && (
          <div className="col-md-12">
            <label className="form-label">Account Number</label>
            <input
              type="text"
              className="form-control"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
            />
            <label className="form-label">Select Bank</label>
            <select
              className="form-select"
              name="selectedBank"
              onChange={handleInputChange}
            >
              <option value="">Select Bank</option>
              {/* Add bank options here */}
            </select>
            {!otpSent ? (
              <button className="btn btn-primary mt-3" type="button" onClick={() => setOtpSent(true)}>
                Send OTP
              </button>
            ) : (
              <div className="mt-3">
                <label className="form-label">OTP</label>
                <input
                  type="text"
                  className="form-control"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button className="btn btn-success mt-3" type="button" onClick={handleOtpVerification}>
                  Verify OTP
                </button>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};




export default PayExamFees;