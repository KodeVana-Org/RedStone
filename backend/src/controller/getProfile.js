const express = require('express');
const router = express.Router();
const ProductDetails = require('../model/payment');
const User = require('../model/userModel')
const verifyToken = require('../middleware/verifyToken');


exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
  
    const userDetails = await User.find({ _id: userId });
    console.log(userDetails);
  
    const purchaseDetails = await ProductDetails.find({ user: userId }).populate('user').exec();
    console.log(purchaseDetails);
  
    let responseData = {};
  
    if (purchaseDetails.length > 0) {
      // Send data from purchaseDetails if it exists
      responseData = {
        message: 'Data received successfully',
        purchaseDetails: purchaseDetails,
      };
    } else {
      if (userDetails.length > 0) {
        responseData = {
          message: 'Data received successfully',
          userDetails: userDetails,
        };
      } else {
        responseData = {
          message: 'No data found',
        };
      }
    }
  
    // Send the combined data
    return res.status(200).json({
      success: true,
      message: 'Data received',
      responseData,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
}