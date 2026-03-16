import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery]             = useState('');       // giá trị input, đổi mỗi keystroke
  const [debouncedQuery, setDebounced] = useState('');      // chỉ đổi sau 500ms ngừng gõ

  // Debounce effect: reset timer mỗi lần query đổi
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(query);   // chỉ chạy nếu query không đổi trong 500ms
    }, 500);

    return () => clearTimeout(timer); // cleanup: hủy timer cũ trước khi tạo cái mới
  }, [query]);

  // useFetch chỉ re-fetch khi debouncedQuery đổi
  // nếu query rỗng → truyền null → useFetch bỏ qua (if (!url) return)
  const url = debouncedQuery
    ? `https://dummyjson.com/products/search?q=${debouncedQuery}`
    : null;

  const { data, loading, error } = useFetch(url);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Search Products</h1>

      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search products..."
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          fontSize: '1rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          boxSizing: 'border-box',
        }}
      />

      {/* Trạng thái: chưa gõ gì */}
      {!debouncedQuery && (
        <p style={{ color: '#999' }}>Type to search...</p>
      )}

      {/* Trạng thái: đang fetch */}
      {debouncedQuery && loading && (
        <p>Searching for "{debouncedQuery}"...</p>
      )}

      {/* Trạng thái: lỗi */}
      {error && (
        <p style={{ color: 'red' }}>Error: {error}</p>
      )}

      {/* Trạng thái: có kết quả */}
      {data && (
        <>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            {data.total} results for "{debouncedQuery}"
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}>
            {data.products.map(product => (
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

          {/* Không có kết quả */}
          {data.products.length === 0 && (
            <p style={{ color: '#999' }}>No products found.</p>
          )}
        </>
      )}
    </div>
  );
}
