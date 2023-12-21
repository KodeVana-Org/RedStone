const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: String
})

const Products = mongoose.model('Products', productSchema);
module.exports = Products;