const UserModel = require('../model/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.Login =  async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });

        if (!email || !password) {
            return res.status(404).json({ message: "All fields are required" });
        }

        if (!existingUser) {
            return res.status(400).json({ message: 'Email does not exist' });
        }

        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, },process.env.SECRET_KEY);
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = decodedToken
        // Accessing email and id from the decoded token
        res.status(200).json({
             data: token, 
             user 
            });


    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};