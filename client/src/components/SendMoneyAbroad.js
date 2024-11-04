import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const SendMoneyAbroad = () => {
  const [countries, setCountries] = useState([]);
  const [banks, setBanks] = useState([]);
  const [formData, setFormData] = useState({
    beneficiary: {
      country: "",
      currency: "",
      amount: "",
      accountHolderName: "",
      bankName: "",
      iban: "",
      swiftCode: "",
      purpose: "",
    },
    paymentMethod: "",
    walletPin: "",
    cardInfo: { number: "", type: "", expiry: "", ccv: "", pin: "" },
    bankAccount: "",
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [accountValidated, setAccountValidated] = useState(false);

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryList = response.data.map((country) => ({
          name: country.name.common,
          currency: Object.values(country.currencies || {})[0]?.name || "N/A",
        }));
        countryList.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      beneficiary: {
        ...prevState.beneficiary,
        [name]: value,
      },
    }));
  };

  // When a country is selected, automatically select the currency
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const selectedCurrency = countries.find((c) => c.name === selectedCountry)?.currency || "N/A";
    
    setFormData((prevState) => ({
      ...prevState,
      beneficiary: {
        ...prevState.beneficiary,
        country: selectedCountry,
        currency: selectedCurrency,
      },
    }));
  };

  // Handle bank account verification and fetching bank list
  const verifyBankAccount = async () => {
    try {
      const response = await axios.get(`api/api/v1/iban/verify-bank-account?iban=${formData.bankAccount}&country=${formData.beneficiary.country}`);
      const { accountHolderName, bankList, iban, swiftCode } = response.data;

      setBanks(bankList || []); 
      setFormData((prevState) => ({
        ...prevState,
        beneficiary: {
          ...prevState.beneficiary,
          accountHolderName,
          iban,
          swiftCode,
        },
      }));
      setAccountValidated(true);
    } catch (error) {
      console.error("Error verifying account:", error);
      setAccountValidated(false);
    }
  };

  const handleBankSelect = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      beneficiary: {
        ...prevState.beneficiary,
        bankName: e.target.value,
      },
    }));
  };

  // Handle form submission
  const handlePayment = (e) => {
    e.preventDefault();
    setShowModal(true); 
  };

  const confirmPayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://testapi.opaycheckout.com/api/v1/international/payment/create", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error sending money abroad.");
      console.error(error);
    } finally {
      setLoading(false);
      setShowModal(false); 
    }
  };

  return (
    <div className="container foreign-pay-container my-5 w-50">
      <h1 className="text-center mb-4">Send Money Abroad</h1>

      <form onSubmit={handlePayment}>
        <div className="card p-4 mb-4">
          <h2 className="card-title">Beneficiary Details</h2>
          <div className="form-group">
            <select className="form-control mb-3" name="country" value={formData.beneficiary.country} onChange={handleCountryChange}>
              <option value="">Select Country</option>
              {countries.map((country, idx) => (
                <option key={idx} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>

            <input type="text" className="form-control mb-3" name="currency" placeholder="Currency" value={formData.beneficiary.currency} readOnly />

            <input type="number" className="form-control mb-3" name="amount" placeholder="Amount in Foreign Currency" value={formData.beneficiary.amount} onChange={handleChange} />

            <input type="text" className="form-control mb-3" name="accountNumber" placeholder="Bank Account Number" value={formData.bankAccount} onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })} />

            {/* Validate Account Button */}
            <Button className="mb-3" onClick={verifyBankAccount} disabled={formData.bankAccount === "" || formData.beneficiary.country === ""}>
              Validate Account
            </Button>

            {accountValidated && banks.length > 0 && (
              <select className="form-control mb-3" name="bankName" value={formData.beneficiary.bankName} onChange={handleBankSelect}>
                <option value="">Select Bank</option>
                {banks.map((bank, idx) => (
                  <option key={idx} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            )}

            <input type="text" className="form-control mb-3" name="accountHolderName" placeholder="Account Holder's Name" value={formData.beneficiary.accountHolderName} readOnly />
            <input type="text" className="form-control mb-3" name="iban" placeholder="IBAN/Routing Number" value={formData.beneficiary.iban} readOnly />
            <input type="text" className="form-control mb-3" name="swiftCode" placeholder="SWIFT Code" value={formData.beneficiary.swiftCode} readOnly />
            <input type="text" className="form-control mb-3" name="purpose" placeholder="Purpose of Payment" value={formData.beneficiary.purpose} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="btn btn-success btn-lg btn-block" disabled={loading}>
          {loading ? "Processing..." : "Confirm Payment"}
        </button>
      </form>

      {message && <p className="alert alert-info mt-4">{message}</p>}

      <Link to="/" className="btn btn-secondary mt-4">Back to Home</Link>

      {/* Modal for payment confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to send {formData.beneficiary.amount} {formData.beneficiary.currency} to {formData.beneficiary.accountHolderName}?</p>
          <p>Bank: {formData.beneficiary.bankName}</p>
          <p>SWIFT Code: {formData.beneficiary.swiftCode}</p>
          <p>Purpose: {formData.beneficiary.purpose}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmPayment} disabled={loading}>
            {loading ? "Processing..." : "Confirm Payment"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SendMoneyAbroad;
