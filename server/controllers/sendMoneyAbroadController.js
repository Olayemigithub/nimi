import { validateIBAN } from '../utils/ibanValidator.js'; // Ensure correct import

// Function to send money abroad
export const sendMoneyAbroad = (req, res) => {
  const { iban } = req.body;

  if (!validateIBAN(iban)) {
    return res.status(400).json({ message: 'Invalid IBAN' });
  }

  // Process the transaction if IBAN is valid
  res.status(200).json({ message: 'Transaction processed successfully' });
};

// Function to verify bank account details for international payments
export const verifyBankAccount = async (req, res) => {
  const { iban } = req.query;

  if (!iban) {
    return res.status(400).json({ message: "IBAN is required" });
  }

  try {
    const { bankName, swift, accountHolderName } = await validateIBAN(iban);

    // Send back verified bank details
    return res.json({
      accountHolderName,
      bankName,
      iban,
      swiftCode: swift,
    });
  } catch (error) {
    console.error("Error verifying IBAN:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
