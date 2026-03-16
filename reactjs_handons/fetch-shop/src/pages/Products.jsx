import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

const LIMIT = 8;

export default function Products() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const skip = (page - 1) * LIMIT;
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`
  );

  // tính tổng số trang từ data.total (do API trả về)
  const totalPages = data ? Math.ceil(data.total / LIMIT) : 1;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Products</h1>

      {/* loading overlay — giữ layout, chỉ làm mờ grid */}
      <div style={{ opacity: loading ? 0.4 : 1, transition: 'opacity 0.2s' }}>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginTop: '1rem',
          minHeight: '300px',  // giữ height để pagination không nhảy lên xuống
        }}>
          {data?.products.map(product => (
            <div key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <div style={{ padding: '0.75rem' }}>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '0.95rem' }}>
                  {product.title}
                </h3>
                <p style={{ margin: 0, color: '#e44', fontWeight: 'bold' }}>
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '2rem',
        justifyContent: 'center',
      }}>
        <button
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1 || loading}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          ← Previous
        </button>

        <span style={{ color: '#666' }}>
          Page {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page === totalPages || loading}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
