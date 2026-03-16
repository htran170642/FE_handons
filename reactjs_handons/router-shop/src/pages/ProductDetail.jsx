import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleAddToCart } = useCart();
  const product = PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div>
        <p>Không tìm thấy sản phẩm.</p>
        <Link to="/products">← Quay lại danh sách</Link>
      </div>
    );
  }

  function handleAdd() {
    handleAddToCart(product.id);
    navigate('/cart');
  }

  return (
    <div style={{ maxWidth: 480 }}>
      <Link to="/products" style={{ color: '#888', textDecoration: 'none' }}>
        ← Quay lại
      </Link>
      <div style={{ textAlign: 'center', margin: '24px 0' }}>
        <div style={{ fontSize: 80 }}>{product.emoji}</div>
        <h2 style={{ margin: '12px 0 4px' }}>{product.name}</h2>
        <p style={{ color: '#888', margin: '0 0 8px' }}>{product.category}</p>
        <p style={{ fontSize: 24, fontWeight: 700, margin: '0 0 16px' }}>
          ${product.price}
        </p>
        <p style={{ color: '#555', lineHeight: 1.6, marginBottom: 24 }}>
          {product.description}
        </p>
        <button
          onClick={handleAdd}
          style={{
            background: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            fontSize: 16,
            cursor: 'pointer',
          }}
        >
          Add to Cart →
        </button>
      </div>
    </div>
  );
}
