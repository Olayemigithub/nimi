import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DirectDebitForm = () => {
    const [formData, setFormData] = useState({
        payee: '',
        servicePurpose: '',
        amount: '',
        currency: 'NGN',
        paymentType: 'Direct Debit',
        frequency: '',
        startDate: '',
        noOfTimes: '',
        endDate: '',
        payerEmail: '',
        payerPhone: '',
        fundingSource: ''
    });
    const [serviceProviders, setServiceProviders] = useState([]);
    const [availableBanks, setAvailableBanks] = useState([]);
    const [otpSent, setOtpSent] = useState(false);

    useEffect(() => {
        fetchCurrencyOptions();
    }, []);

    const fetchCurrencyOptions = async () => {
        const currencyOptions = await axios.get('/api/currency-options');
        setFormData((prevData) => ({
            ...prevData,
            currency: currencyOptions.data[0]?.code || 'NGN'
        }));
    };

    const handlePayeeChange = async (e) => {
        const payee = e.target.value;
        setFormData({ ...formData, payee });

        try {
            const response = await axios.get(`/api/service-providers?payee=${payee}`);
            setServiceProviders(response.data);
        } catch (error) {
            console.error('Error fetching service providers:', error);
        }
    };

    const handleFundingSourceValidation = async () => {
        if (formData.fundingSource.length === 10) {
            try {
                const response = await axios.get(`/api/validate-funding-source/${formData.fundingSource}`);
                setAvailableBanks(response.data.banks);
                sendOtp();
            } catch (error) {
                console.error('Error validating funding source:', error);
            }
        }
    };

    const sendOtp = async () => {
        try {
            await axios.post('/api/send-otp', { phone: formData.payerPhone });
            setOtpSent(true);
            alert('OTP sent to your phone');
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('Failed to send OTP');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            ...(name === 'noOfTimes' ? { endDate: calculateEndDate(prevData.startDate, value, prevData.frequency) } : {})
        }));
    };

    const calculateEndDate = (startDate, noOfTimes, frequency) => {
        const start = new Date(startDate);
        if (frequency === 'Monthly') {
            start.setMonth(start.getMonth() + parseInt(noOfTimes));
        } else if (frequency === 'Weekly') {
            start.setDate(start.getDate() + parseInt(noOfTimes) * 7);
        }
        return start.toISOString().split('T')[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/create-direct-debit', formData);
            alert(response.data.message);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to create direct debit');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container p-4 bg-light border rounded">
            <h2 className="mb-4">Direct Debit Form</h2>
            
            <div className="mb-3">
                <label className="form-label">Who do you want to pay *</label>
                <input type="text" name="payee" className="form-control" value={formData.payee} onChange={handlePayeeChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Name of service/purpose *</label>
                <select name="servicePurpose" className="form-select" value={formData.servicePurpose} onChange={handleChange} required>
                    <option value="">Select Service</option>
                    {serviceProviders.map((provider) => (
                        <option key={provider.id} value={provider.name}>{provider.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Amount To Pay (₦) *</label>
                <input type="number" name="amount" className="form-control" value={formData.amount} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Select currency *</label>
                <select name="currency" className="form-select" value={formData.currency} onChange={handleChange}>
                    <option value="NGN">NGN - Nigerian Naira</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Recurring payment type *</label>
                <select name="paymentType" className="form-select" value={formData.paymentType} onChange={handleChange}>
                    <option value="Standing Order">Standing Order</option>
                    <option value="Direct Debit">Direct Debit</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Every *</label>
                <input type="text" name="frequency" className="form-control" value={formData.frequency} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Start Date *</label>
                <input type="date" name="startDate" className="form-control" value={formData.startDate} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">No of Times *</label>
                <input type="number" name="noOfTimes" className="form-control" value={formData.noOfTimes} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">OR End Date *</label>
                <input type="date" name="endDate" className="form-control" value={formData.endDate} readOnly />
            </div>

            <div className="mb-3">
                <label className="form-label">Payer Email *</label>
                <input type="email" name="payerEmail" className="form-control" value={formData.payerEmail} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Payer Phone</label>
                <input type="tel" name="payerPhone" className="form-control" value={formData.payerPhone} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Funding Source *</label>
                <input type="text" name="fundingSource" className="form-control" value={formData.fundingSource} onChange={(e) => {
                    handleChange(e);
                    handleFundingSourceValidation();
                }} required />
                {availableBanks.length > 0 && (
                    <select name="bank" className="form-select mt-2" onChange={handleChange} required>
                        <option value="">Select Bank</option>
                        {availableBanks.map((bank) => (
                            <option key={bank.code} value={bank.name}>{bank.name}</option>
                        ))}
                    </select>
                )}
            </div>

            <div className="form-check mb-3">
                <input type="checkbox" name="terms" className="form-check-input" required />
                <label className="form-check-label">By clicking Submit you agree to our Terms and Conditions and Privacy Policy</label>
            </div>

            <div className="d-flex gap-3">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="reset" className="btn btn-secondary" onClick={() => setFormData({})}>Reset</button>
            </div>
        </form>
    );
};

export default DirectDebitForm;
