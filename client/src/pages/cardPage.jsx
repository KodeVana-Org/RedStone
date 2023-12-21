// import React from 'react';
import { useCart } from './cardContext';

import React from 'react';

const CartPage = () => {
    const { cartItems, removeFromCart } = useCart();

    const calculateSubtotal = (price, quantity) => {
        const subtotal = price * quantity;
        return isNaN(subtotal) ? 0 : subtotal; // Handle NaN by returning a default value (e.g., 0)
      };
    
      return (
        <div className="mx-96 my-16">
      <div className="px-3 py-2 flex justify-between text-white bg-[#ff523b]">
        <p className='w-80'>Products</p>
        <p>Quantity</p>
        <p>Subtotal</p>
      </div>
      <div className="p-3">
        {cartItems.map((product) => (
          <div key={product.id} className="mb-7 flex justify-between">
            <span className='w-80 flex gap-3'>
              <img className="h-24" src={product.image} alt={product.name} />
              <span>
                <h3 className="text-gray-600">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
                <button onClick={() => removeFromCart(product.id)} className='text-sm text-[#ff523b]'>Remove</button>
              </span>
            </span>
            <input className="p-1 h-10 w-10 border" value={product.quantity} type="number" readOnly />
            {/* Handle potential NaN in the subtotal */}
            <p className="text-gray-600">
              {isNaN(calculateSubtotal(product.price, product.quantity))
                ? 'Invalid Subtotal'
                : calculateSubtotal(product.price, product.quantity)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
