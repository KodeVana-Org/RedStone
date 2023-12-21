const express = require('express');
const router = express.Router();
const {Signup} = require('../controller/singup')
const {Login}= require('../controller/login');
const { Contact } = require('../controller/contact');

router.post('/register',Signup);
router.post('/login',Login);
router.post('/contact', Contact);



module.exports = router;