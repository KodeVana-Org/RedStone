const express = require('express');
const router = express.Router();
const {CreateProduct} = require('../controller/createProduct');
const { AllProduct } = require('../controller/getAllProdcut');
const { buyProduct } = require('../controller/buyProduct');
const verifyToken = require('../middleware/verifyToken')


router.post('/create-product', CreateProduct);
router.get('/get-all-product', AllProduct);
router.post('/buy-product',verifyToken , buyProduct);

module.exports = router;

