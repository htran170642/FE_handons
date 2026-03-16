import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export default function Cart() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <div style={{ fontSize: 48 }}>🛒</div>
        <p style={{ color: '#aaa' }}>Giỏ hàng trống</p>
        <Link to="/products" style={{ color: '#333' }}>← Tiếp tục mua sắm</Link>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>🛒 Giỏ hàng</h2>
      {cartItems.map(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        return (
          <div key={item.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 0',
            borderBottom: '1px solid #f0f0f0',
          }}>
            <span style={{ fontSize: 28 }}>{product.emoji}</span>
            <div style={{ flex: 1 }}>
              <div>{product.name}</div>
              <div style={{ color: '#888', fontSize: 13 }}>
                ${product.price} × {item.quantity}
              </div>
            </div>
            <div style={{ fontWeight: 600 }}>${product.price * item.quantity}</div>
          </div>
        );
      })}
      <div style={{
        marginTop: 16,
        paddingTop: 16,
        borderTop: '2px solid #333',
        textAlign: 'right',
        fontSize: 18,
        fontWeight: 700,
      }}>
        Tổng: ${totalPrice}
      </div>
    </div>
  );
}
