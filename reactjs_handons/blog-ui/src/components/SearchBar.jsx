// ============================================================
// components/SearchBar.jsx — Controlled input component
// ============================================================
//
// PROPS:
//   query    — string: giá trị hiện tại của ô tìm kiếm (từ state App.jsx)
//   onSearch — function(value): gọi khi user gõ, truyền giá trị mới lên
//
// CONTROLLED COMPONENT:
//   value={query}                    → React kiểm soát input (data đi XUỐNG)
//   onChange={(e) => onSearch(...)}  → user gõ → báo lên App (event đi LÊN)
//
//   Nếu bỏ value={query}: input hoạt động "tự do", state ở App.jsx
//   sẽ không biết user đang gõ gì → filter không hoạt động.
//
//   Nếu chỉ có value={query} mà không có onChange: input bị "đóng băng",
//   user không gõ được gì vì React luôn giữ giá trị cũ.
//   Cả hai phải đi cùng nhau.
// ============================================================

export default function SearchBar({ query, onSearch }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <input
        type="text"
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Tìm kiếm bài viết..."
        style={{
          width: '100%',
          padding: '10px 14px',
          fontSize: 15,
          border: '1px solid #ddd',
          borderRadius: 8,
          boxSizing: 'border-box',
          outline: 'none',
        }}
      />
    </div>
  );
}
