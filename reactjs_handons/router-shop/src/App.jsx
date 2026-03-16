import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CartContext } from './context/CartContext';
import Layout from './components/Layout';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(id) {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  }

  return (
    <CartContext.Provider value={{ cartItems, handleAddToCart }}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/products" replace />} />
          <Route path="/products"     element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart"         element={<Cart />} />
          <Route path="*"             element={<NotFound />} />
        </Route>
      </Routes>
    </CartContext.Provider>
  );
}
