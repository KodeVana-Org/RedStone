import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const initialCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const [cartItems, setCartItems] = useState(initialCartItems);

  const saveCartToLocalStorage = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const addToCart = (product, size) => {
    const existingItem = cartItems.find(item => item.id === product.id && item.selectedSize === size);

    if (existingItem) {
      const updatedCartItems = cartItems.map(item =>
        item.id === product.id && item.selectedSize ===size ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
      saveCartToLocalStorage(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1, selectedSize: size }]);
      saveCartToLocalStorage([...cartItems, { ...product, quantity: 1, selectedSize: size }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
    saveCartToLocalStorage(updatedCartItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
