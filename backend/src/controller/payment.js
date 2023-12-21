const express = require('express');
const router = express.Router();
const PurchaseDetails = require('../model/payment'); 
const UserModel = require('../model/userModel');
const verifyToken = require('../middleware/verifyToken')

 exports.validateTourData = (req, res, next) => {
    const { productName, amount,  cardHolderName,} = req.body;
    if (!productName || productName.trim().length === 0 || !amount || !cardHolderName) {
      const missingFields = [];
      if (!productName || productName.trim().length === 0) missingFields.push('placeName');
      if (!amount) missingFields.push('amount');
      if (!cardHolderName) missingFields.push('cardHolderName');
      return res.status(400).json({ error: `Required fields missing: ${missingFields.join(', ')}` });
    }
    next(); // Move to the next middleware/route handler
  };

exports.Payment =  async (req, res) => {
  try {
    const { productName, amount, cardHolderName,cardNumber, size,id, cvc} = req.body;
    const userId = req.user.id ;
    // console.log(userId);

    // Create a new Tour instance based on the model
    const Place = new PurchaseDetails({
      productName,
      amount,
      cvc,
      cardHolderName,
      cardNumber,
      size,
      id: id,
      user: userId
    });

    // Save the new tour to the database
    await Place.save();
    await UserModel.findByIdAndUpdate(userId, { $push: { purchasedProduct: Place._id } });

    res.status(200).json({ message: 'product buyed successfully', data: Place });
  } catch (error) {
    console.error('Error saving tour:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// module.exports = Payment;