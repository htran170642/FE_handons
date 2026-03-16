import { useState } from 'react';

const PRODUCTS = [
  { category: 'Electronics', name: 'Laptop',  price: '$999', inStock: true },
  { category: 'Electronics', name: 'Phone',   price: '$499', inStock: false },
  { category: 'Electronics', name: 'Tablet',  price: '$299', inStock: true },
  { category: 'Clothing',    name: 'T-Shirt', price: '$19',  inStock: true },
  { category: 'Clothing',    name: 'Jeans',   price: '$49',  inStock: false },
];

// Bước 2: Static components — chỉ nhận props, không có state
function ProductCategoryRow({ category }) {
  return (
    <tr><th colSpan={2} style={{ background: '#eee' }}>{category}</th></tr>
  );
}

function ProductRow({ product }) {
  return (
    <tr style={{ color: product.inStock ? 'black' : 'gray' }}>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, onlyInStock }) {
  // Bước 3: filtered là derived — không cần state
  const rows = [];
  let lastCategory = null;

  products
    .filter((p) => {
      if (onlyInStock && !p.inStock) return false;
      if (!p.name.toLowerCase().includes(filterText.toLowerCase())) return false;
      return true;
    })
    .forEach((p) => {
      if (p.category !== lastCategory) {
        rows.push(<ProductCategoryRow key={p.category} category={p.category} />);
        lastCategory = p.category;
      }
      rows.push(<ProductRow key={p.name} product={p} />);
    });

  return (
    <table>
      <thead><tr><th>Name</th><th>Price</th></tr></thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, onlyInStock, onFilterChange, onStockChange }) {
  return (
    <div>
      <input
        value={filterText}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search..."
      />
      <label>
        <input
          type="checkbox"
          checked={onlyInStock}
          onChange={(e) => onStockChange(e.target.checked)}
        />
        {' '}Only show in stock
      </label>
    </div>
  );
}

// Bước 4: State sống ở cha chung
export default function FilterableProductTable() {
  const [filterText, setFilterText] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);

  return (
    <div style={{ padding: '16px', border: '2px solid black', margin: '8px' }}>
      <h3>Thinking in React — Product Filter</h3>
      <SearchBar
        filterText={filterText}
        onlyInStock={onlyInStock}
        onFilterChange={setFilterText}
        onStockChange={setOnlyInStock}
      />
      <ProductTable
        products={PRODUCTS}
        filterText={filterText}
        onlyInStock={onlyInStock}
      />
    </div>
  );
}
