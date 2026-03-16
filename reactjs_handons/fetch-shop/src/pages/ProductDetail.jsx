import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // url thay đổi mỗi khi id đổi → useFetch tự re-fetch
  const { data, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);

  if (loading) return <p style={{ padding: '2rem' }}>Loading...</p>;
  if (error)   return <p style={{ padding: '2rem', color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
        ← Back
      </button>
      <img
        src={data.thumbnail}
        alt={data.title}
        style={{ width: '100%', borderRadius: '8px' }}
      />
      <h1>{data.title}</h1>
      <p style={{ color: '#666' }}>{data.description}</p>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e44' }}>
        ${data.price}
      </p>
      <p>Category: <strong>{data.category}</strong></p>
      <p>Rating: <strong>{data.rating} ⭐</strong></p>
      <p>Stock: <strong>{data.stock} left</strong></p>
    </div>
  );
}
