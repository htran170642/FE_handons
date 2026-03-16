// ============================================================
// components/PostCard.jsx — Step 10: thêm Like + Bookmark
// ============================================================
//
// PROPS MỚI:
//   isLiked      — boolean: bài này đã được like chưa?
//   isBookmarked — boolean: bài này đã được bookmark chưa?
//   onLike       — function(id): gọi khi user click Like
//   onBookmark   — function(id): gọi khi user click Bookmark
//
// isLiked và isBookmarked là DERIVED BOOLEAN từ App.jsx:
//   isLiked={likedIds.includes(post.id)}
//   PostCard không biết likedIds là gì — nó chỉ nhận true/false.
//
// e.stopPropagation() — QUAN TRỌNG:
//   Nút Like/Bookmark nằm bên trong card có onClick (onSelect).
//   Nếu không dừng, click Like sẽ "bubble" lên → trigger onSelect
//   → mở detail view — không phải hành vi mong muốn.
//   stopPropagation() ngăn event nổi lên phần tử cha.
// ============================================================

import AuthorBadge from './AuthorBadge';

export default function PostCard({ post, onSelect, isLiked, isBookmarked, onLike, onBookmark }) {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: 8,
      padding: 20,
      marginBottom: 16,
      background: '#fff',
    }}>

      {/* Category badge */}
      <span style={{
        display: 'inline-block',
        background: '#f0f0f0',
        padding: '2px 10px',
        borderRadius: 12,
        fontSize: 12,
        color: '#555',
        marginBottom: 8,
      }}>
        {post.category}
      </span>

      <h2
        onClick={() => onSelect(post.id)}
        style={{
          margin: '0 0 8px 0',
          cursor: 'pointer',
          color: '#1a1a1a',
          fontSize: 20,
        }}
      >
        {post.title}
      </h2>

      <p style={{ color: '#555', margin: '0 0 12px 0', lineHeight: 1.6 }}>
        {post.excerpt}
      </p>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
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

      <AuthorBadge author={post.author} />

      {/* Footer: meta info + action buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
        <p style={{ color: '#aaa', fontSize: 12, margin: 0 }}>
          {post.date} · {post.readTime} phút đọc
        </p>

        {/*
          Nút Like và Bookmark.

          onClick dùng arrow function với e.stopPropagation():
            (e) => { e.stopPropagation(); onLike(post.id); }

          Không thể truyền thẳng onLike vì ta cần gọi stopPropagation()
          trước — phải bọc trong arrow function để làm 2 việc cùng lúc.
        */}
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onLike(post.id); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, padding: '0 4px' }}
            title={isLiked ? 'Bỏ like' : 'Like'}
          >
            {isLiked ? '❤️' : '🤍'}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onBookmark(post.id); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, padding: '0 4px' }}
            title={isBookmarked ? 'Bỏ bookmark' : 'Bookmark'}
          >
            {isBookmarked ? '🔖' : '📄'}
          </button>
        </div>
      </div>
    </div>
  );
}
