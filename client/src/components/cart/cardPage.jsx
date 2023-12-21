import React from 'react';

import { Img } from 'react-image'
import { Link } from 'react-router-dom';
import { useCart } from './cardContext';
import { toast } from 'react-toastify';

import ProductsData from '../../assets/product.js'

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  const handleRemove = (productId) => {
    removeFromCart(productId);
    toast.error('Item removed from cart!', {
      position: 'top-center',
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

    const calculateSubtotal = (price, quantity) => {
        const subtotal = price * quantity;
        return isNaN(subtotal) ? 0 : subtotal;
      };
      const handleSetSizeInLocalStorage = (productId, selectedSize) => {
        localStorage.setItem(`productsize`, selectedSize);
      };
    
      const handleOrderNow = (productId, selectedSize) => {
        handleSetSizeInLocalStorage(productId, selectedSize);
      };
    
      return (
        <div className="mx-96 my-16">
      <div className="px-3 py-2 flex justify-between text-white bg-[#ff523b]">
        <p className='w-96'>Products</p>
        <p>Quantity</p>
        <p>Subtotal</p>
      </div>
      <div className="mb-7 p-3">
        {cartItems.map((product) => (
          <div key={product.id} className="mb-7 flex justify-between">
            <span className='w-96 flex gap-3'>
              <img className="h-24" src={product.image} alt={product.name} />
              <span>
                <h3 className="text-gray-600">Product Name: {product.name}</h3>
                <p className="text-gray-600">Price: ${product.price}</p>
                <p className="text-gray-600">Size: {product.selectedSize}</p>
                <button onClick={() => handleRemove(product.id)} className='text-sm text-[#ff523b] cursor-pointer'>Remove</button>
                <Link to={`/payment/${product.id}?source=cart`}  onClick={() => handleOrderNow(product.id, product.selectedSize)} className='ml-5 px-2 text-[#ff523b] hover:text-white font-medium bg-white hover:bg-[#ff523b] border-2 border-[#ff523b] transition-all duration-300 rounded-md' >Order Now</Link>
               
              </span>
            </span>
            <input className="p-1 h-10 w-10 border" value={product.quantity} type="number" readOnly />
            <p className="text-gray-600">
              ${isNaN(calculateSubtotal(product.price, product.quantity))
                ? 'Invalid Subtotal'
                : calculateSubtotal(product.price, product.quantity)}
            </p>
            
          </div>
          
        ))}
         
      </div>
      <div className='my-16'>
        <h3 className='mb-7 text-2xl font-semibold'>Products that suits your wardrobe</h3>
        <div className="flex gap-5 justify-center">
          {ProductsData.slice(9, 13).map((product) => (
            <Link key={product.id} className="transition-all duration-700 hover:-translate-y-2" to={`/product/${product.id}`}>
              <Img className="mb-1 h-80" src={product.image} alt={product.name} />
              <h3 className="mb-1 text-gray-600">{product.name}</h3>
              <div className="mb-1 flex gap-2 w-fit text-[#ff523b]">
                <i className="fa fa-star" ></i>
                <i className="fa fa-star" ></i>
                <i className="fa fa-star" ></i>
                <i className="fa fa-star-half-o" ></i>
                <i className="fa fa-star-o" ></i>
              </div>
              <p className="text-gray-600">${product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
