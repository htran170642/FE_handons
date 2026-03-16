// ============================================================
// App.jsx — Step 11: useEffect + simulated async loading
// ============================================================
//
// THAY ĐỔI:
//   Trước: import POSTS thẳng, dùng trực tiếp (data có ngay)
//   Sau:   posts là state, useEffect "load" data sau 800ms
//
// useEffect(() => { ... }, []):
//   - Chạy SAU lần render đầu tiên (sau khi DOM đã hiển thị)
//   - [] = dependency array rỗng → chỉ chạy 1 lần (component mount)
//   - Trả về cleanup function → chạy khi component unmount
//
// Tại sao cần cleanup (clearTimeout)?
//   Nếu component unmount trước khi timer xong (ví dụ: user navigate đi),
//   setTimeout vẫn chạy và gọi setPosts/setLoading trên component đã chết.
//   React sẽ báo lỗi "Can't perform state update on unmounted component".
//   clearTimeout trong cleanup ngăn điều này xảy ra.
//
// Để chuyển sang API thực: thay setTimeout bằng fetch():
//   useEffect(() => {
//     fetch('/api/posts').then(r => r.json()).then(data => {
//       setPosts(data);
//       setLoading(false);
//     });
//   }, []);
// ============================================================

import { useState, useEffect } from 'react';
import { POSTS as POSTS_DATA } from './data/posts'; // đổi tên import để phân biệt
import PostCard from './components/PostCard';
import PostDetail from './components/PostDetail';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import './App.css';

export default function App() {
  // posts giờ là state — bắt đầu rỗng, được "load" qua useEffect
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [likedIds, setLikedIds] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  // useEffect chạy 1 lần sau render đầu tiên
  useEffect(() => {
    // Giả lập network delay 800ms — giống fetch() thực tế
    const timer = setTimeout(() => {
      setPosts(POSTS_DATA);
      setLoading(false);
    }, 800);

    // Cleanup: nếu component unmount trước khi timer xong,
    // hủy timer để tránh setState trên component đã chết
    return () => clearTimeout(timer);
  }, []); // [] → chỉ chạy 1 lần khi mount

  function handleLike(id) {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleBookmark(id) {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  // Derived state — dùng `posts` (state) thay vì POSTS (import trực tiếp)
  const selectedPost = posts.find((p) => p.id === selectedPostId) ?? null;

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Loading state — hiển thị trong khi chờ data
  if (loading) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 24, textAlign: 'center' }}>
        <h1>Blog</h1>
        <p style={{ color: '#888', marginTop: 60 }}>Đang tải bài viết...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h1>Blog</h1>

      {selectedPost ? (
        <PostDetail
          post={selectedPost}
          onBack={() => setSelectedPostId(null)}
        />
      ) : (
        <div>
          <SearchBar
            query={searchQuery}
            onSearch={setSearchQuery}
          />
          <CategoryFilter
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />

          {/*
            Post count — derived state thuần túy.
            filteredPosts và posts đều đã được tính ở trên,
            ta chỉ đọc .length — không cần useState mới.
            Tự cập nhật mỗi khi filter thay đổi.
          */}
          <p style={{ color: '#999', fontSize: 13, margin: '0 0 16px 0' }}>
            {filteredPosts.length === posts.length
              ? `${posts.length} bài viết`
              : `${filteredPosts.length} / ${posts.length} bài viết`}
          </p>

          {filteredPosts.length === 0 && (
            <p style={{ color: '#bbb', textAlign: 'center', padding: '40px 0' }}>
              Không tìm thấy bài viết nào.
            </p>
          )}

          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onSelect={setSelectedPostId}
              isLiked={likedIds.includes(post.id)}
              isBookmarked={bookmarkedIds.includes(post.id)}
              onLike={handleLike}
              onBookmark={handleBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
}
