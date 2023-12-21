const express = require('express');
const router = express.Router();
const ProductDetails = require('../model/payment');
const User = require('../model/userModel')
const verifyToken = require('../middleware/verifyToken');


exports.getProfile = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const userDetails = await User.findOne({ _id: userId });
      const purchaseDetails = await ProductDetails.findOne({ user: userId }).populate('user').exec();
  
      let responseData = {};
  
      if (purchaseDetails) {
        // Send data from purchaseDetails if it exists
        responseData = {
          message: 'Data received successfully',
          userDetails: null,
          purchaseDetails: purchaseDetails || null,
        };
      } else {
        // If purchaseDetails is not present, send data from userDetails
        responseData = {
          message: 'Data received successfully',
          userDetails: userDetails || null,
          purchaseDetails: null,
        };
      }
  
      // Send the combined data
      return res.status(200).json({
        success: true,
        message: "Data received",
        responseData
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  