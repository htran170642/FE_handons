import { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

export default function App() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'active' | 'completed'

  function handleAdd() {
    if (!input.trim()) return;
    const newTodo = { id: Date.now(), text: input.trim(), done: false };
    setTodos([...todos, newTodo]);
    setInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd();
  }

  function handleToggle(id) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // Step 4: derived state — tính từ todos + activeFilter, không dùng useState
  const visibleTodos = todos.filter((todo) => {
    if (activeFilter === 'active')    return !todo.done;
    if (activeFilter === 'completed') return todo.done;
    return true; // 'all'
  });

  // Step 5: derived counts — tính từ todos, không cần useState
  const activeCount     = todos.filter((todo) => !todo.done).length;
  const completedCount  = todos.filter((todo) => todo.done).length;

  function handleClearCompleted() {
    setTodos(todos.filter((todo) => !todo.done));
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Todo App</h1>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Thêm công việc..."
          style={{ flex: 1, padding: '8px', fontSize: 16 }}
        />
        <button onClick={handleAdd} style={{ padding: '8px 16px', fontSize: 16 }}>
          Add
        </button>
      </div>

      {/* Filter buttons */}
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{ fontWeight: activeFilter === f ? 'bold' : 'normal' }}
          >
            {f}
          </button>
        ))}
      </div>

      <ul style={{ marginTop: 16, padding: 0, listStyle: 'none' }}>
        {visibleTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      {/* Footer: count + clear */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, color: '#999' }}>
        <span>{activeCount} việc chưa xong</span>
        {completedCount > 0 && (
          <button onClick={handleClearCompleted}>
            Xóa {completedCount} đã xong
          </button>
        )}
      </div>
    </div>
  );
}
