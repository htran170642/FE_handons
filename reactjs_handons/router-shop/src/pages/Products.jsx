import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

export default function Products() {
  return (
    <div>
      <h2>📦 Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {PRODUCTS.map(product => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 16,
              textAlign: 'center',
              cursor: 'pointer',
            }}>
              <div style={{ fontSize: 40 }}>{product.emoji}</div>
              <h3 style={{ margin: '8px 0 4px' }}>{product.name}</h3>
              <p style={{ color: '#888', margin: 0 }}>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
