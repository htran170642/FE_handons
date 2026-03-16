import { NavLink } from 'react-router-dom';

export default function Navbar({ totalItems }) {
  return (
    <nav style={{
      display: 'flex',
      gap: 24,
      padding: '12px 0',
      borderBottom: '1px solid #ddd',
      marginBottom: 24,
    }}>
      <NavLink to="/" end style={navStyle}>🏠 Home</NavLink>
      <NavLink to="/products" style={navStyle}>📦 Products</NavLink>
      <NavLink to="/cart" style={navStyle}>
        🛒 Cart
        {totalItems > 0 && (
          <span style={{
            marginLeft: 6,
            background: '#e33',
            color: '#fff',
            borderRadius: 10,
            padding: '1px 7px',
            fontSize: 12,
          }}>
            {totalItems}
          </span>
        )}
      </NavLink>
    </nav>
  );
}

function navStyle({ isActive }) {
  return {
    textDecoration: 'none',
    color: isActive ? '#e33' : '#333',
    fontWeight: isActive ? 700 : 500,
    borderBottom: isActive ? '2px solid #e33' : '2px solid transparent',
    paddingBottom: 4,
  };
}
