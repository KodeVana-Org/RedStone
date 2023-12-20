const app = require('./app')
const {connectToDatabase} = require('./config/db')
require('dotenv').config()
const PORT = process.env.PORT;


connectToDatabase();
const startApp = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

startApp()