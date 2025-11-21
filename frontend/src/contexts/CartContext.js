import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    if (token) fetchCart();
    else setCart({ items: [] });
    // eslint-disable-next-line
  }, [token]);

  const fetchCart = async () => {
    try {
      const res = await API.get('/cart');
      setCart(res.data);
    } catch (err) {
      console.error('fetchCart error', err);
      setCart({ items: [] });
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await API.post('/cart', { productId, quantity });
      setCart(res.data);
    } catch (err) {
      console.error('addToCart error', err);
      throw err;
    }
  };

  const updateItem = async (itemId, quantity) => {
    try {
      const res = await API.put(`/cart/${itemId}`, { quantity });
      setCart(res.data);
    } catch (err) {
      console.error('updateItem error', err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const res = await API.delete(`/cart/${itemId}`);
      setCart(res.data);
    } catch (err) {
      console.error('removeItem error', err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateItem, removeItem, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}
