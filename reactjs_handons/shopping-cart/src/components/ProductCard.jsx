export default function ProductCard({ product, onAdd }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16,
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 48 }}>{product.emoji}</div>
      <h3 style={{ margin: '8px 0 4px' }}>{product.name}</h3>
      <p style={{ color: '#888', margin: '0 0 12px' }}>${product.price}</p>
      <button
        onClick={() => onAdd(product.id)}
        style={{
          background: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '8px 16px',
          cursor: 'pointer',
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
