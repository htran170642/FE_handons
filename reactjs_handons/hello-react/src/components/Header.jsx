// named export — 1 file có thể có nhiều named export
export function Header() {
  return <header><h1>My Shop</h1></header>;
}

export function Sidebar() {
  return (
    <aside>
      <p>Categories</p>
      <ul>
        <li>Electronics</li>
        <li>Clothing</li>
        <li>Books</li>
      </ul>
    </aside>
  );
}
