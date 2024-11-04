import AirtimeDataModel from '../models/airtimeModelData.js'; // Import your AirtimeData Mongoose model

export const airtimeDataController = async (req, res) => {
  try {
    const { userId, phoneNumber, networkProvider, amount, paymentMethod } = req.body;
    
    // Create a new instance of the AirtimeData model
    const newAirtimeData = new AirtimeDataModel({
      userId,
      phoneNumber,
      networkProvider,
      amount,
      paymentMethod
    });

    // Save the transaction to the database
    const savedTransaction = await newAirtimeData.save();
    
    res.status(200).json({ message: 'Airtime purchase successful', transaction: savedTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Airtime purchase failed', error });
  }
};
