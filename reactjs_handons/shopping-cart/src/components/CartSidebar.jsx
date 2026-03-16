import CartItem from './CartItem';

export default function CartSidebar({ cartItems, products, onIncrease, onDecrease, onRemove, totalPrice }) {
  return (
    <div style={{
      flex: 1,
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16,
    }}>
      <h2 style={{ margin: '0 0 12px' }}>Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <p style={{ color: '#aaa', textAlign: 'center', padding: '24px 0' }}>
          Giỏ hàng trống
        </p>
      ) : (
        cartItems.map(item => {
          const product = products.find(p => p.id === item.id);
          return (
            <CartItem
              key={item.id}
              item={item}
              product={product}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          );
        })
      )}

      {cartItems.length > 0 && (
        <div style={{
          borderTop: '2px solid #333',
          marginTop: 12,
          paddingTop: 12,
          fontWeight: 600,
          fontSize: 16,
          textAlign: 'right',
        }}>
          Tổng: ${totalPrice.toLocaleString()}
        </div>
      )}
    </div>
  );
}
