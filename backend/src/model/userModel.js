const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    phoneNumber: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    
    resetToken: {
        type: String,
    },
    resetTokenExpiration: {
        type: Date,
    },
    // userDetails: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'UserDetail' 
    //     }
    //   ],
    // purchasedPlaces: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Product' 
    //     }
    //   ],
    expirationTime: {
        type: Date,
    }
    
})
const User = mongoose.model('User', userSchema);

module.exports = User;