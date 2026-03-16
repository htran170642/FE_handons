// ============================================================
// components/PostDetail.jsx
// ============================================================
//
// PROPS:
//   post    — object đầy đủ. Lần này đọc post.content (không phải excerpt).
//   onBack  — function(): gọi khi user muốn quay về danh sách.
//             Không cần truyền tham số vì App.jsx chỉ cần biết "quay lại",
//             không cần biết "quay lại từ đâu".
//
// REUSE AuthorBadge:
//   Đây là lúc thấy rõ lợi ích của việc tách AuthorBadge ở step 4.
//   Cùng component, cùng props `author={post.author}`, không thay đổi gì.
//   PostDetail không cần biết AuthorBadge render như thế nào — nó chỉ dùng.
// ============================================================

import AuthorBadge from './AuthorBadge';

export default function PostDetail({ post, onBack }) {
  return (
    <article>

      {/* Nút quay lại — gọi onBack() không có tham số */}
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: '1px solid #ddd',
          borderRadius: 6,
          padding: '6px 14px',
          cursor: 'pointer',
          marginBottom: 24,
          fontSize: 14,
          color: '#444',
        }}
      >
        ← Quay lại danh sách
      </button>

      {/* Category badge */}
      <span style={{
        display: 'inline-block',
        background: '#f0f0f0',
        padding: '2px 10px',
        borderRadius: 12,
        fontSize: 12,
        color: '#555',
        marginBottom: 12,
      }}>
        {post.category}
      </span>

      <h1 style={{ margin: '8px 0 16px 0', fontSize: 28, lineHeight: 1.3 }}>
        {post.title}
      </h1>

      {/* AuthorBadge tái sử dụng — cùng component như trong PostCard */}
      <AuthorBadge author={post.author} />

      <p style={{ color: '#aaa', fontSize: 13, margin: '6px 0 16px 0' }}>
        {post.date} · {post.readTime} phút đọc
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
        {post.tags.map((tag) => (
          <span key={tag} style={{
            fontSize: 12,
            background: '#e8f4fd',
            color: '#0066cc',
            padding: '2px 8px',
            borderRadius: 10,
          }}>
            #{tag}
          </span>
        ))}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: 24 }} />

      {/*
        post.content — nội dung đầy đủ, khác với post.excerpt ở PostCard.
        Cùng một object `post` được truyền xuống từ App.jsx,
        nhưng mỗi component chỉ đọc field nó cần.
        whitespace: 'pre-wrap' giữ nguyên xuống dòng trong content string.
      */}
      <div style={{ lineHeight: 1.8, color: '#222', whiteSpace: 'pre-wrap' }}>
        {post.content}
      </div>
    </article>
  );
}
