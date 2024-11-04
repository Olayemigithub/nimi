// ibanValidator.js
import axios from 'axios';

export const validateIBAN = async (iban) => {
  const ibanApiUrl = `https://cdn.jsdelivr.net/gh/ibanapi/ibanapi_js@1.0.0/dist/ibanapi.min.js/iban/${iban}?api_key=YOUR_IBAN_API_KEY`;

  try {
    const response = await axios.get(ibanApiUrl);
    if (response.data && response.data.valid) {
      return {
        bankName: response.data.bank_name || "Unknown Bank",
        swift: response.data.swift || "N/A",
        accountHolderName: response.data.account_holder || "N/A",
      };
    } else {
      throw new Error('Invalid IBAN');
    }
  } catch (error) {
    throw new Error('Error verifying IBAN');
  }
};
