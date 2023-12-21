import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // Retrieve cart items from localStorage on component mount
  const initialCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const [cartItems, setCartItems] = useState(initialCartItems);

  // Function to save cart items to localStorage
  const saveCartToLocalStorage = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
      saveCartToLocalStorage(updatedCartItems); // Save updated cart to localStorage
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      saveCartToLocalStorage([...cartItems, { ...product, quantity: 1 }]); // Save updated cart to localStorage
    }
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
    saveCartToLocalStorage(updatedCartItems); // Save updated cart to localStorage
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
