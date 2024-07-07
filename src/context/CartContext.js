import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/cart');
        setCart(response.data || { items: [], total: 0 });
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (dish) => {
    const existingItem = cart.items.find(item => item.dish._id === dish._id);
    let updatedItems;

    if (existingItem) {
      updatedItems = cart.items.map(item =>
        item.dish._id === dish._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedItems = [...cart.items, { dish, quantity: 1 }];
    }

    const updatedTotal = updatedItems.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
    const updatedCart = { items: updatedItems, total: updatedTotal };

    setCart(updatedCart);

    try {
      await axios.post('http://localhost:8081/api/cart', updatedCart);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const updateQuantity = async (dishId, newQuantity) => {
    let updatedItems = cart.items.map(item =>
      item.dish._id === dishId ? { ...item, quantity: newQuantity } : item
    );

    updatedItems = updatedItems.filter(item => item.quantity > 0);

    const updatedTotal = updatedItems.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
    const updatedCart = { items: updatedItems, total: updatedTotal };

    setCart(updatedCart);

    try {
      await axios.post('http://localhost:8081/api/cart', updatedCart);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (dishId) => {
    const updatedItems = cart.items.filter(item => item.dish._id !== dishId);
    const updatedTotal = updatedItems.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
    const updatedCart = { items: updatedItems, total: updatedTotal };

    setCart(updatedCart);

    try {
      await axios.post('http://localhost:8081/api/cart', updatedCart);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const clearCart = async () => {
    setCart({ items: [], total: 0 });

    try {
      await axios.delete('http://localhost:8081/api/cart');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
