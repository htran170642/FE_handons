import { useState } from 'react';
import { PRODUCTS } from './data/products';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import './App.css';

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(id) {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  }

  function handleIncrease(id) {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function handleDecrease(id) {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  function handleRemove(id) {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <h1>
        🛒 Shopping Cart
        {totalItems > 0 && (
          <span style={{
            marginLeft: 10,
            fontSize: 16,
            background: '#e33',
            color: '#fff',
            borderRadius: 12,
            padding: '2px 10px',
          }}>
            {totalItems}
          </span>
        )}
      </h1>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

        <div style={{ flex: 2 }}>
          <ProductList products={PRODUCTS} onAdd={handleAddToCart} />
        </div>

        <CartSidebar
          cartItems={cartItems}
          products={PRODUCTS}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
          totalPrice={totalPrice}
        />

      </div>
    </div>
  );
}
