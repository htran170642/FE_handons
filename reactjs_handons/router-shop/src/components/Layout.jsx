import { Outlet } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';

export default function Layout() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <header style={{ borderBottom: '2px solid #333', paddingBottom: 8, marginBottom: 0 }}>
        <h1 style={{ margin: '0 0 4px' }}>🛍️ Router Shop</h1>
        <Navbar totalItems={totalItems} />
      </header>
      <main style={{ paddingTop: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}
