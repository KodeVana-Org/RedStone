const express = require('express');
const router = express.Router();
const {CreateProduct} = require('../controller/createProduct');
const { AllProduct } = require('../controller/getAllProdcut');
const { buyProduct } = require('../controller/buyProduct');
const verifyToken = require('../middleware/verifyToken');
const { Payment } = require('../controller/payment');
const {validateTourData} = require('../controller/payment');
const { getProfile } = require('../controller/getProfile');


router.post('/create-product', CreateProduct);
router.get('/get-all-product', AllProduct);
// router.post('/buy-product',verifyToken , buyProduct);
router.post('/payment', verifyToken,validateTourData,Payment);
router.get('/get-data',verifyToken, getProfile);

module.exports = router;

