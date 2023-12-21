const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      productName: String,
      price: Number,
      prime: Boolean,
      quantity: {
        type: Number,
        default: 1,
      },
      purchasedAt: {
        type: Date,
        default: Date.now,
      },
      cardNumber: String, // Include card number
      cvv: String, // Include CVV
    });
    
    const userSchema = new mongoose.Schema({
      // ... other user fields
      purchases: [purchaseSchema], // Update purchases field to include card details
      totalSpent: {
        type: Number,
        default: 0,
      },
    });
module.exports = mongoose.model('Purchase', purchaseSchema);