const Purchase = require('../model/purchase');
const Product = require('../model/product');
const User = require('../model/userModel')


exports.buyProduct = async (req, res) => {
    try {
        const { productId, quantity, cardNumber, cvv } = req.body;
        const userId = req.user.id;
    
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        let existingPurchase = user.purchases.find(
          (purchase) => purchase.productId.toString() === productId
        );
    
        if (existingPurchase) {
          existingPurchase.quantity += quantity || 1;
        //   existingPurchase.prime = product.prime;
        } else {
          user.purchases.push({
            productId: product._id,
            productName: product.name,
            price: product.price,
            // prime: product.prime,
            quantity: quantity || 1,
            purchasedAt: new Date(),
            cardNumber, // Save card details to the purchase
            cvv,
          });
        }
    
        // Calculate total price
        const totalPrice = user.purchases.reduce(
          (acc, purchase) => acc + purchase.price * purchase.quantity,
          0
        );
    
        user.totalSpent = totalPrice;
        await user.save();
    
        return res.status(200).json({
          message: 'Product purchased successfully',
          user,
        });
      } catch (error) {
        console.error('Error buying product:', error);
        return res.status(500).json({ error: 'Failed to buy product' });
      }
    };