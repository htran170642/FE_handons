export default function CartItem({ item, product, onIncrease, onDecrease, onRemove }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 0',
      borderBottom: '1px solid #f0f0f0',
    }}>
      <span style={{ fontSize: 24 }}>{product.emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 500 }}>{product.name}</div>
        <div style={{ color: '#888', fontSize: 13 }}>
          ${product.price} × {item.quantity} = ${product.price * item.quantity}
        </div>
      </div>
      <button onClick={() => onDecrease(item.id)} style={btnStyle}>−</button>
      <span style={{ minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
      <button onClick={() => onIncrease(item.id)} style={btnStyle}>+</button>
      <button onClick={() => onRemove(item.id)} style={{ ...btnStyle, color: '#e55' }}>🗑</button>
    </div>
  );
}

const btnStyle = {
  width: 28,
  height: 28,
  border: '1px solid #ddd',
  borderRadius: 4,
  background: '#fff',
  cursor: 'pointer',
  fontSize: 14,
};
