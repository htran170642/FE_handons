// ============================================================
// components/CategoryFilter.jsx
// ============================================================
//
// PROPS:
//   activeCategory — string: category đang được chọn ('All', 'Tech', ...)
//   onSelect       — function(category): gọi khi user click một button
//
// ACTIVE ITEM PATTERN:
//   Component này không tự lưu state nào.
//   Nó nhận activeCategory từ App.jsx qua props và dùng để tính style.
//   Khi user click, nó gọi onSelect(cat) để báo lên — App.jsx quyết định
//   có cập nhật activeCategory không (thường là có).
//
//   So sánh:
//     activeCategory === cat ? style_active : style_inactive
//   Đây là cách render "nút đang được chọn" mà không cần state bên trong.
// ============================================================

const CATEGORIES = ['All', 'Tech', 'Life', 'Science'];

export default function CategoryFilter({ activeCategory, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            style={{
              padding: '6px 16px',
              borderRadius: 20,
              border: '1px solid #ccc',
              // Style thay đổi dựa trên prop activeCategory, không phải state nội bộ
              background: isActive ? '#333' : '#fff',
              color: isActive ? '#fff' : '#444',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
