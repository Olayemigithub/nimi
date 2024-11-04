import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PayTSA = () => {
    const [selectedEntity, setSelectedEntity] = useState('');
    const [paymentDetails, setPaymentDetails] = useState({
        servicePurpose: '',
        amount: '',
        currency: 'NGN',
        payerName: '',
        payerPhone: '',
        payerEmail: ''
    });

    const entities = [
        "Federal Government Of Nigeria",
        "ABIA STATE GOVERNMENT",
        "ADAMAWA STATE GOVERNMENT",
        "ANAMBRA STATE GOVERNMENT",
        "BAUCHI STATE GOVERNMENT",
        "BENUE STATE GOVERNMENT",
        "BORNO STATE GOVERNMENT",
        "DELTA STATE JUDICIARY",
        "EKITI STATE GOVERNMENT",
        "ENUGU STATE GOVERNMENT",
        "FEDERAL CAPITAL TERRITORY ADMIN",
        "GOMBE STATE GOVERNMENT",
        "IMO STATE INTERNAL REVENUE",
        "JIGAWA STATE GOVERNMENT",
        "KADUNA STATE GOVERNMENT TSA",
        "KANO STATE GOVERNMENT",
        "KOGI STATE GOVERNMENT",
        "KWARA STATE GOVERNMENT",
        "LAGOS STATE GOVERNMENT",
        "LAGOS STATE MODEL COLLEGES AND UPGRADED SCHOOLS",
        "NASARAWA STATE GOVERNMENT",
        "NIGER STATE GOVERNMENT",
        "NNPC Limited (NNPC)",
        "NNPC RETAIL LIMITED",
        "PLATEAU STATE GOVERNMENT",
        "SOKOTO STATE GOVERNMENT",
        "YOBE STATE GOVERNMENT",
        "ZAMFARA STATE GOVERNMENT"
    ];

    const handleSelectChange = (e) => {
        setSelectedEntity(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Payment Details Submitted:", paymentDetails);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 mb-4">
            <div className="pay-tsa-component w-50">
                <h3 className="text-center">Pay FGN and State TSA</h3>

                <label htmlFor="entity-select">Select Entity to Pay</label>
                <select
                    id="entity-select"
                    value={selectedEntity}
                    onChange={handleSelectChange}
                    className="form-control mb-3"
                >
                    <option value="">-- Select Entity --</option>
                    {entities.map((entity, index) => (
                        <option key={index} value={entity}>
                            {entity}
                        </option>
                    ))}
                </select>

                {selectedEntity && (
                    <form onSubmit={handleSubmit} className="text-center">
                        <div className="form-group">
                            <label>Who do you want to pay?</label>
                            <input
                                type="text"
                                name="servicePurpose"
                                value={paymentDetails.servicePurpose}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Name of service/purpose"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Amount To Pay (₦)</label>
                            <input
                                type="number"
                                name="amount"
                                value={paymentDetails.amount}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="₦"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Select Currency</label>
                            <select
                                name="currency"
                                value={paymentDetails.currency}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value="NGN">NGN - Nigerian Naira</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Payer's Name</label>
                            <input
                                type="text"
                                name="payerName"
                                value={paymentDetails.payerName}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter payer's name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Payer's Phone</label>
                            <input
                                type="tel"
                                name="payerPhone"
                                value={paymentDetails.payerPhone}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="+234 802 123 4567"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Payer's Email</label>
                            <input
                                type="email"
                                name="payerEmail"
                                value={paymentDetails.payerEmail}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter payer's email"
                                required
                            />
                        </div>

                        <div className="form-group mt-4">
                            <label>
                                <input type="checkbox" required /> By clicking Submit you agree to our Terms and Conditions and Privacy Policy
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                        <button type="reset" className="btn btn-secondary ml-2 mt-3" onClick={() => setPaymentDetails({
                            servicePurpose: '',
                            amount: '',
                            currency: 'NGN',
                            payerName: '',
                            payerPhone: '',
                            payerEmail: ''
                        })}>Reset</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PayTSA;
