// ============================================================
// components/AuthorBadge.jsx
// ============================================================
//
// PROPS:
//   author — object: { id, name, avatar }
//
// Đây là "presentational component" thuần túy:
// - Không có state
// - Không có side effects
// - Chỉ nhận props → render UI
// - Có thể tái sử dụng ở bất kỳ đâu
// ============================================================

export default function AuthorBadge({ author }) {
  // Destructuring `author` từ props.
  // Bên trong, ta đọc author.avatar và author.name.

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 22 }}>{author.avatar}</span>
      <span style={{ fontSize: 14, color: '#555' }}>{author.name}</span>
    </div>
  );
}
