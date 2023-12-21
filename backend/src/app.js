const express = require('express')
const app = express();
const userRouter = require('./router/userRoute')
const prodcutRouter = require('./router/productRoute')

app.use(express.json())

//for user
app.use('/api',userRouter);
app.use('/api',prodcutRouter);


module.exports = app; 