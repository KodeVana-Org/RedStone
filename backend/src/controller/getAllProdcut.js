const Product = require('../model/product');

exports.AllProduct = async (req, res) =>{
    try{
    const product = await Product.find();
    const productCount = product.length;
    return res.status(200).json({
        success: true,
        message: 'all product',
        productCount: productCount,
        product
    })

    } catch(error){
        return res.status(500).json({
            success: false,
            message: ' Failed to fetch the products'
        })
    }
}