import { useState, useEffect, useRef } from 'react';
import ProductCard from './components/ProductCard';       // default import
import { Header, Sidebar } from './components/Header';   // named import
import FilterableProductTable from './components/FilterableProductTable';
import Board from './components/Board';

// --- Phase 7: Tic Tac Toe ---
function Game() {
  // history: mảng các snapshot của board sau mỗi nước đi
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  // Derived — không cần state
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    // Cắt bỏ lịch sử phía sau nếu đang xem nước cũ rồi đi tiếp
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  return (
    <div style={{ padding: '16px', border: '2px solid black', margin: '8px', display: 'flex', gap: '32px' }}>
      <div>
        <h3>Tic Tac Toe</h3>
        <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} />
      </div>
      <div>
        <h4>Move history</h4>
        <ol>
          {history.map((_, move) => (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>
                {move === 0 ? 'Go to start' : `Go to move #${move}`}
              </button>
              {move === currentMove && ' ←'}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// --- 2.4: JSX — className, Fragment ---
function JSXDemo() {
  return (
    // Fragment: không tạo thêm <div> trong DOM
    <>
      <h3 className="title">JSX Demo</h3>
      <p>Dùng className thay vì class</p>
      <input type="text" placeholder="tag phải tự đóng" />
    </>
  );
}

// --- Phase 7: useRef ---

// Ví dụ 1: Focus input tự động
function AutoFocusInput() {
  const inputRef = useRef(null);
  // inputRef.current sẽ trỏ đến DOM element <input>

  useEffect(() => {
    inputRef.current.focus(); // focus input ngay khi mount
  }, []);

  return (
    <div style={{ padding: '16px', border: '1px solid navy', margin: '8px' }}>
      <h3>Auto Focus</h3>
      <input ref={inputRef} placeholder="Tự động focus khi load" />
    </div>
  );
}

// Ví dụ 2: useRef lưu giá trị không cần re-render (đếm số lần render)
function RenderCounter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  renderCount.current += 1; // tăng mỗi lần render — không gây re-render

  return (
    <div style={{ padding: '16px', border: '1px solid darkred', margin: '8px' }}>
      <h3>Render Counter</h3>
      <p>Count (state): {count}</p>
      <p>Số lần render: {renderCount.current}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

// --- Phase 6: useEffect ---

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Chạy 1 lần sau khi component mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, []); // ← dependency array rỗng = chỉ chạy 1 lần

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '16px', border: '1px solid brown', margin: '8px' }}>
      <h3>User Profile</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>
    </div>
  );
}

function PostList() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(1);

  // Chạy lại mỗi khi userId thay đổi
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=3`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [userId]); // ← dependency array có userId = chạy lại khi userId đổi

  return (
    <div style={{ padding: '16px', border: '1px solid gray', margin: '8px' }}>
      <h3>Posts of User #{userId}</h3>
      <button onClick={() => setUserId(1)}>User 1</button>
      <button onClick={() => setUserId(2)}>User 2</button>
      <button onClick={() => setUserId(3)}>User 3</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

// --- Phase 5: Lifting State Up ---

function SearchBar({ query, onQueryChange }) {
  return (
    <input
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      placeholder="Search products..."
      style={{ padding: '8px', width: '200px' }}
    />
  );
}

function FilteredProductList({ query }) {
  const allProducts = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 499 },
    { id: 3, name: 'Tablet', price: 299 },
    { id: 4, name: 'Monitor', price: 399 },
  ];

  const filtered = allProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ul>
      {filtered.map((p) => (
        <li key={p.id}>{p.name} — ${p.price}</li>
      ))}
    </ul>
  );
}

function ProductSearch() {
  // State nằm ở cha — cả 2 con đều dùng được
  const [query, setQuery] = useState('');

  return (
    <div style={{ padding: '16px', border: '1px solid teal', margin: '8px' }}>
      <h3>Product Search</h3>
      <SearchBar query={query} onQueryChange={setQuery} />
      <FilteredProductList query={query} />
    </div>
  );
}

// --- 4.2: Choosing the State Structure ---
function NameForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Tính từ state — không cần useState thứ 3
  const fullName = firstName + ' ' + lastName;
  const charCount = fullName.trim().length;

  return (
    <div style={{ padding: '16px', border: '1px solid darkgreen', margin: '8px' }}>
      <h3>Name Form</h3>
      <input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <p>Full name: <strong>{fullName}</strong></p>
      <p>Số ký tự: {charCount}</p>
    </div>
  );
}

// --- Phase 4a: Updating Object in State ---
function UserForm() {
  const [user, setUser] = useState({ name: '', age: '' });

  function handleChange(field, value) {
    setUser({ ...user, [field]: value });
    //         ↑ copy toàn bộ user, rồi ghi đè field cần thay đổi
  }

  return (
    <div style={{ padding: '16px', border: '1px solid purple', margin: '8px' }}>
      <h3>User: {user.name}, Age: {user.age}</h3>
      <input
        placeholder="Name"
        value={user.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <input
        placeholder="Age"
        value={user.age}
        onChange={(e) => handleChange('age', e.target.value)}
      />
    </div>
  );
}

// --- Phase 4b: Updating Array in State (Todo list) ---
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build a project', done: false },
  ]);
  const [input, setInput] = useState('');

  function addTodo() {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    //         ↑ copy array cũ, thêm item mới vào cuối
    setInput('');
  }

  function toggleTodo(id) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
      //                ↑ copy item, ghi đè done
    ));
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
    //                    ↑ giữ lại tất cả trừ item bị xóa
  }

  return (
    <div style={{ padding: '16px', border: '1px solid orange', margin: '8px' }}>
      <h3>Todo List</h3>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo..."
        onKeyDown={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{ textDecoration: todo.done ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Exercise 1: Counter ---
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '16px', border: '1px solid blue', margin: '8px' }}>
      <h3>Counter: {count}</h3>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// --- Exercise 2: Toggle button ---
function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div style={{ padding: '16px', border: '1px solid green', margin: '8px' }}>
      <button onClick={() => setIsOn(!isOn)}>
        {isOn ? '💡 ON' : '🌑 OFF'}
      </button>
    </div>
  );
}

// --- Exercise 3: Like button ---
function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  function handleClick() {
    if (!liked) setCount(count + 1);
    else setCount(count - 1);
    setLiked(!liked);
  }

  return (
    <div style={{ padding: '16px', border: '1px solid red', margin: '8px' }}>
      <button onClick={handleClick}>
        {liked ? '❤️' : '🤍'} {count} Likes
      </button>
    </div>
  );
}

const products = [
  { id: 1, name: 'Laptop', price: 999, inStock: true },
  { id: 2, name: 'Phone', price: 499, inStock: false },
  { id: 3, name: 'Tablet', price: 299, inStock: true },
  { id: 4, name: 'Monitor', price: 399, inStock: true },
];

function App() {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main>
          <Game />
          <FilterableProductTable />
          <JSXDemo />
          <AutoFocusInput />
          <RenderCounter />
          <UserProfile />
          <PostList />
          <ProductSearch />
          <NameForm />
          <UserForm />
          <TodoList />
          <Counter />
          <ToggleButton />
          <LikeButton />
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              inStock={product.inStock}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
