import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 0' }}>
      <div style={{ fontSize: 64 }}>🔍</div>
      <h2>404 — Trang không tồn tại</h2>
      <p style={{ color: '#888' }}>URL này không hợp lệ.</p>
      <Link
        to="/products"
        style={{
          display: 'inline-block',
          marginTop: 16,
          background: '#333',
          color: '#fff',
          padding: '10px 24px',
          borderRadius: 8,
          textDecoration: 'none',
        }}
      >
        Về trang sản phẩm
      </Link>
    </div>
  );
}
