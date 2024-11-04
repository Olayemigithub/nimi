import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';  // Library to handle file downloads
import * as XLSX from 'xlsx';         // Library for generating Excel files

function PaySalaries() {
  const navigate = useNavigate();
  const [isBulkPayment, setIsBulkPayment] = useState(false);
  const [isWalletPayment, setIsWalletPayment] = useState(false);
  const [singlePaymentDetails, setSinglePaymentDetails] = useState({
    bankName: '',
    accountNumber: '',
    amount: '',
  });
  const [senderAccountNumber, setSenderAccountNumber] = useState('');
  const [senderBankName, setSenderBankName] = useState('');
  const [bulkFile, setBulkFile] = useState(null);
  const userId = '1234';  // Replace with actual userId

  const handleTogglePaymentType = () => {
    setIsBulkPayment(!isBulkPayment);
  };

  const handleToggleWalletPayment = () => {
    setIsWalletPayment(!isWalletPayment);
  };

  const handleSinglePaymentChange = (e) => {
    const { name, value } = e.target;
    setSinglePaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  useEffect(() => {
    if (senderAccountNumber && senderAccountNumber.length === 10) {
      searchForBankName(senderAccountNumber);
    }
  }, [senderAccountNumber]);

  const searchForBankName = (accountNumber) => {
    setTimeout(() => {
      setSenderBankName('First Bank of Nigeria');
    }, 1000);
  };

  const onDrop = (acceptedFiles) => {
    setBulkFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isBulkPayment) {
      if (bulkFile) {
        alert(`Bulk payment file uploaded: ${bulkFile.name}`);
      } else {
        alert('Please upload a file for bulk payment.');
      }
    } else {
      const { bankName, accountNumber, amount } = singlePaymentDetails;

      if (isWalletPayment) {
        try {
          const response = await axios.post('/pay-from-wallet', {
            userId,
            amount,
            paymentPurpose: 'Salary Payment',
            entity: 'Entity Name'
          });

          if (response.data.success) {
            alert('Payment successful from wallet!');
          } else {
            alert('Insufficient wallet balance.');
          }
        } catch (error) {
          console.error('Error paying from wallet:', error);
        }
      } else {
        alert(`Processing single payment to ${bankName}`);
      }
    }
  };

  // Function to generate and download the Excel template
  const downloadExcelTemplate = () => {
    const data = [
      {
        'Beneficiary Name': '',
        'Bank Name': '',
        'Account Number': '',
        'Amount': '',
        'Purpose of Payment': '',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bulk Payment Template');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    saveAs(blob, 'bulk_payment_template.xlsx');
  };

  return (
    <div className="container mt-5 w-50">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">
          {isBulkPayment ? 'Bulk Payment' : 'Single Payment'}
        </h2>

        <div className="form-check form-switch text-center mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="bulkPaymentToggle"
            checked={isBulkPayment}
            onChange={handleTogglePaymentType}
          />
          <label className="form-check-label" htmlFor="bulkPaymentToggle">
            {isBulkPayment ? 'Switch to Single Payment' : 'Switch to Bulk Payment'}
          </label>
        </div>

        {!isBulkPayment ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Sender's Account Number:</label>
              <input
                type="text"
                className="form-control"
                value={senderAccountNumber}
                onChange={(e) => setSenderAccountNumber(e.target.value)}
                placeholder="Enter sender's account number"
                maxLength="10"
                required
              />
            </div>

            {senderBankName && (
              <div className="mb-3">
                <label className="form-label">Sender's Bank Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={senderBankName}
                  readOnly
                />
              </div>
            )}

            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="walletPaymentToggle"
                checked={isWalletPayment}
                onChange={handleToggleWalletPayment}
              />
              <label className="form-check-label" htmlFor="walletPaymentToggle">
                {isWalletPayment ? 'Pay from Wallet' : 'Pay from Bank Account'}
              </label>
            </div>

            {!isWalletPayment && (
              <>
                <div className="mb-3">
                  <label className="form-label">Bank Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bankName"
                    value={singlePaymentDetails.bankName}
                    onChange={handleSinglePaymentChange}
                    placeholder="Enter bank name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Account Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="accountNumber"
                    value={singlePaymentDetails.accountNumber}
                    onChange={handleSinglePaymentChange}
                    placeholder="Enter account number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={singlePaymentDetails.amount}
                    onChange={handleSinglePaymentChange}
                    placeholder="Enter amount"
                    required
                  />
                </div>
              </>
            )}

            <button type="submit" className="btn btn-primary w-50">
              {isWalletPayment ? 'Submit Wallet Payment' : 'Submit Bank Payment'}
            </button>
          </form>
        ) : (
          <div>
            <button
              className="btn btn-outline-secondary mb-3"
              onClick={downloadExcelTemplate}
            >
              Download Excel Template
            </button>

            <div
              {...getRootProps()}
              className="dropzone border-dashed border-2 p-4 text-center mb-3"
              style={{
                borderColor: 'gray',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
                cursor: 'pointer',
              }}
            >
              <input {...getInputProps()} />
              <p>Drag & drop a file here, or click to select a file</p>
              <p>(Supported formats: CSV, Excel)</p>
            </div>

            {bulkFile && (
              <div className="alert alert-success text-center">
                File uploaded: {bulkFile.name}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-50"
              onClick={handleSubmit}
            >
              Submit Bulk Payment
            </button>
          </div>
        )}

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Back
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaySalaries;
