const Product = require('../model/product');

exports.CreateProduct = async (req, res) => {
    try{
        const {name, image, price} = req.body;

        if(!name || ! image || !price) {
            return res.status(404).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const products = await Product.create({
            name: name,
            image: image,
            price: price

        })
        return res.status(200).json({
            success: true,
            message: 'product creeated successfully',
            products
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Failed to create produdct '
        });
    }
};