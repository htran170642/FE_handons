import { Routes, Route, Link } from 'react-router-dom';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';

export default function App() {
  return (
    <>
      <nav style={{ padding: '1rem 2rem', borderBottom: '1px solid #ddd', display: 'flex', gap: '1.5rem' }}>
        <Link to="/">All Products</Link>
        <Link to="/search">Search</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}
