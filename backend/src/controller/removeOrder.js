const express = require('express');
const router = express.Router();
const Product = require('../model/payment');

exports.RemoveOrder =  async (req, res) => {
    try {
        let { id } = req.params;
        console.log(id)
        await Product.findOneAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Object deleted from Place successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete place',
            error: error.message
        });
    }
};

