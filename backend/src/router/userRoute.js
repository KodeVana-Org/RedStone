const express = require('express');
const router = express.Router();
const {Signup} = require('../controller/singup')
const {Login}= require('../controller/login')

router.post('/register',Signup);
router.post('/login',Login);



module.exports = router;