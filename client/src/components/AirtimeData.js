import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentConfirmationModal from "./PaymentConfirmationModal"; // Import the modal component
import axios from "axios"; // Import axios for API requests

function AirtimeData() {
  const navigate = useNavigate();

  // State for managing steps
  const [step, setStep] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isAirtime, setIsAirtime] = useState(true);
  const [amount, setAmount] = useState("");
  const [atmCardNumber, setAtmCardNumber] = useState("");
  const [atmCardExpiry, setAtmCardExpiry] = useState("");
  const [atmCardCvv, setAtmCardCvv] = useState("");
  const [atmCardPin, setAtmCardPin] = useState("");

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // For showing loading state during API call
  const [error, setError] = useState(""); // For showing error messages

  // Telecom provider options
  const providers = ["MTN", "Airtel", "Glo", "Etisalat"];

  // Handle moving to the next step
  const handleNextStep = () => {
    if (step === 1) {
      // Validation for provider, mobile number, and amount
      if (selectedProvider && mobileNumber && amount) {
        setStep(2); // Proceed to ATM card verification
      } else {
        alert("Please select a provider, enter a mobile number, and enter the amount.");
      }
    } else if (step === 2) {
      // Validate ATM card details
      if (atmCardNumber && atmCardExpiry && atmCardCvv && atmCardPin) {
        setIsModalOpen(true); // Show the confirmation modal instead of proceeding directly
      } else {
        alert("Please fill in all ATM card details.");
      }
    }
  };

  // Handle going back to the previous step
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      alert("You are on the first step!");
    }
  };

  // Function to handle confirmation and API call
  // Function to handle API request
const handleConfirmPayment = async () => {
  setIsModalOpen(false); // Close the modal
  setLoading(true); // Set loading state while processing payment

  // Choose the correct API endpoint based on whether it's airtime or data
  const apiUrl = isAirtime
    ? "https://paygold.ng/wp-json/api/v1/airtime"
    : "https://paygold.ng/wp-json/api/v1/data";

  // API request payload
  const paymentData = {
    provider: selectedProvider,
    mobileNumber,
    amount,
    atmCardDetails: {
      number: atmCardNumber,
      expiry: atmCardExpiry,
      cvv: atmCardCvv,
      pin: atmCardPin,
    },
  };

  try {
    // Make the API call to the correct endpoint (airtime or data)
    const response = await axios.post(apiUrl, paymentData);
    setLoading(false); // Remove loading state after successful request

    if (response.status === 200) {
      alert("Payment successfully processed!");
      navigate("/home"); // Navigate to the homepage or show success message
    } else {
      alert("Payment failed. Please try again.");
    }
  } catch (err) {
    setLoading(false);
    setError("Payment failed. Please check your details and try again.");
  }
};

  // Step 1: Select Provider and Enter Amount
  const renderStep1 = () => (
    <div className="container mt-5 w-50">
      <div className="card p-5 shadow-lg bg-light">
        <h2 className="text-center text-primary mb-4">Step 1: Airtime/Data Purchase</h2>

        {/* Provider selection */}
        <div className="mb-3">
          <label className="form-label">Select Provider:</label>
          <select
            className="form-select"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            <option value="">--Select a provider--</option>
            {providers.map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile Number */}
        <div className="mb-3">
          <label className="form-label">Mobile Number:</label>
          <input
            type="tel"
            className="form-control"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter Mobile Number"
            pattern="[0-9]{10,11}"
          />
        </div>

        {/* Amount */}
        <div className="mb-3">
          <label className="form-label">Amount:</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        {/* Toggle between airtime and data */}
        <div className="mb-3 form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={!isAirtime}
            onChange={() => setIsAirtime(!isAirtime)}
          />
          <label className="form-check-label">
            {isAirtime ? "Airtime" : "Data"}
          </label>
        </div>

        {/* Navigation buttons */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={handleBack}>Back</button>
          <button className="btn btn-primary" onClick={() => navigate("/")}>Home</button>
          <button className="btn btn-primary" onClick={handleNextStep}>Proceed to Payment</button>
        </div>
      </div>
    </div>
  );

  // Step 2: ATM Card Verification
  const renderStep2 = () => (
    <div className="container mt-5 w-50">
      <div className="card p-5 shadow-lg bg-light">
        <h2 className="text-center text-primary mb-4">Step 2: ATM Card Verification</h2>

        {/* ATM Card Number */}
        <div className="mb-3">
          <label className="form-label">ATM Card Number:</label>
          <input
            type="text"
            className="form-control"
            value={atmCardNumber}
            onChange={(e) => setAtmCardNumber(e.target.value)}
            placeholder="Enter ATM card number"
          />
        </div>

        {/* Expiry Date and CVV */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Expiry Date (MM/YY):</label>
            <input
              type="text"
              className="form-control"
              value={atmCardExpiry}
              onChange={(e) => setAtmCardExpiry(e.target.value)}
              placeholder="MM/YY"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">CVV:</label>
            <input
              type="text"
              className="form-control"
              value={atmCardCvv}
              onChange={(e) => setAtmCardCvv(e.target.value)}
              placeholder="Enter CVV"
            />
          </div>
        </div>

        {/* Card PIN */}
        <div className="mb-3">
          <label className="form-label">Card PIN:</label>
          <input
            type="number"
            className="form-control"
            value={atmCardPin}
            onChange={(e) => setAtmCardPin(e.target.value)}
            placeholder="Enter 4-digit Card PIN"
            maxLength="4"
            onInput={(e) => {
              if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
            }}
          />
        </div>

        {/* Navigation buttons */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={handleBack}>Back</button>
          <button className="btn btn-primary" onClick={() => navigate("/")}>Home</button>
          <button className="btn btn-primary" onClick={handleNextStep}>Submit Payment</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="airtime-data-component">
      {loading && <p>Processing payment...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Render based on current step */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}

      {/* Payment confirmation modal */}
      {isModalOpen && (
        <PaymentConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmPayment}
          amount={amount}
          mobileNumber={mobileNumber}
          provider={selectedProvider}
        />
      )}
    </div>
  );
}

export default AirtimeData;
