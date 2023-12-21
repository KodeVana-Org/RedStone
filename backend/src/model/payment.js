const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: String,
    amount: String,
    cardNumber: Number,
    cvc: Number,
    cardHolderName: String,
    size: String,
    id: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
      },
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;