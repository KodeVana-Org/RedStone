const mongoose = require('monoose');

const productSchema = new mongoose.Schema({

})

const Products = mongoose.model('Products', productSchema);
module.exports = Products;