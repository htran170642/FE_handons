// default export — mỗi file chỉ có 1 default export
export default function ProductCard({ name, price, inStock }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px' }}>
      <h3>{name}</h3>
      <p>${price}</p>
      <p>{inStock ? '✅ In Stock' : '❌ Out of Stock'}</p>
    </div>
  );
}
