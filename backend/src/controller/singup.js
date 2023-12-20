const UserModel = require('../model/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.Signup =  async (req, res) => {

    const { name, email, password, phoneNumber} = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });

        if (!name || !email || !password || !phoneNumber) {
            return res.status(404).json({ message: "all fields are required" });
        }

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password' });
            }

            const result = await UserModel.create({
                email: email,
                password: hashedPassword,
                name: name,
                phoneNumber: phoneNumber,
                
            })

            const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY);
            return res.status(200).json({
                success: true,
                message:"user created successfully",
                data: token
                
            });
           
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error while trying to sign up' });
    }
};
