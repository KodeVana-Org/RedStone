const express = require('express')
const app = express();
const cors = require('cors');
const userRouter = require('./router/userRoute')
const prodcutRouter = require('./router/productRoute')

app.use(cors());
app.use(express.json())

//for user
app.use('/api',userRouter);
app.use('/api',prodcutRouter);


module.exports = app; 