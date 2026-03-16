import { useState, useEffect } from 'react';

// NoteList — danh sách notes bên trái
function NoteList({ notes, selectedId, onSelect, onDelete }) {
  return (
    <div style={{ width: 200, borderRight: '1px solid #ccc', padding: 8, minHeight: '100vh' }}>
      <h3 style={{ margin: '0 0 8px' }}>Notes ({notes.length})</h3>
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4px 8px',
            borderRadius: 4,
            marginBottom: 4,
            background: note.id === selectedId ? '#ddd' : 'transparent',
          }}
        >
          <span
            onClick={() => onSelect(note.id)}
            style={{ cursor: 'pointer', flex: 1 }}
          >
            {note.title || 'Untitled'}
          </span>
          <button
            onClick={() => onDelete(note.id)}
            style={{ marginLeft: 4, border: 'none', background: 'none', cursor: 'pointer', color: '#999' }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

// NoteEditor — edit note đang được chọn
function NoteEditor({ note, onUpdate }) {
  const [title, setTitle]     = useState(note.title);
  const [content, setContent] = useState(note.content);

  function handleSave() {
    onUpdate(note.id, title, content);
  }

  return (
    <div style={{ flex: 1, padding: 16, borderRight: '1px solid #ccc' }}>
      <h3>Chỉnh sửa</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          style={{ padding: 8, fontSize: 14, resize: 'vertical' }}
        />
        <button onClick={handleSave} style={{ padding: '8px 16px', width: 'fit-content' }}>
          Save
        </button>
      </div>
    </div>
  );
}

// NoteForm — form tạo note mới, state title/content nằm ở đây
function NoteForm({ onAdd }) {
  const [title, setTitle]     = useState('');
  const [content, setContent] = useState('');

  function handleSubmit() {
    if (!title.trim()) return;
    onAdd(title, content);
    setTitle('');    // reset sau khi add
    setContent('');
  }

  return (
    <div style={{ padding: 16 }}>
      <h3>Tạo note mới</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề..."
          style={{ padding: 8, fontSize: 16 }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nội dung..."
          rows={4}
          style={{ padding: 8, fontSize: 14, resize: 'vertical' }}
        />
        <button onClick={handleSubmit} style={{ padding: '8px 16px', fontSize: 16, width: 'fit-content' }}>
          Add Note
        </button>
      </div>
    </div>
  );
}

export default function App() {
  // Step 4: lazy initializer — đọc từ localStorage 1 lần lúc mount
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Note đầu tiên', content: 'Đây là nội dung note đầu tiên' },
    ];
  });
  const [selectedId, setSelectedId] = useState(null);

  // Step 4: ghi vào localStorage mỗi khi notes thay đổi
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // derived state — tính từ notes + selectedId, không cần useState riêng
  const selectedNote = notes.find((n) => n.id === selectedId) ?? null;

  function handleAdd(title, content) {
    const newNote = { id: Date.now(), title, content };
    setNotes([...notes, newNote]);
  }

  function handleUpdate(id, title, content) {
    setNotes(notes.map((n) =>
      n.id === id ? { ...n, title, content } : n
    ));
  }

  // Step 3: xóa note, reset selectedId nếu đang xóa note đang chọn
  function handleDelete(id) {
    setNotes(notes.filter((n) => n.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  return (
    <div style={{ display: 'flex', fontFamily: 'sans-serif' }}>
      <NoteList notes={notes} selectedId={selectedId} onSelect={setSelectedId} onDelete={handleDelete} />

      {selectedNote
        ? <NoteEditor key={selectedNote.id} note={selectedNote} onUpdate={handleUpdate} />
        : <div style={{ flex: 1, padding: 16, color: '#999' }}>Chọn một note để xem</div>
      }

      <NoteForm onAdd={handleAdd} />
    </div>
  );
}
