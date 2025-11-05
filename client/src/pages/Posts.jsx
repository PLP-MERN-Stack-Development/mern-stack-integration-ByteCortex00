// Posts.jsx
import { useEffect, useState } from 'react';
import { usePost } from '../contexts/PostContext';
import { useCategories } from '../hooks/useCategories';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import './Posts.css';

const Posts = () => {
  const { posts, loading, pagination, fetchPosts, searchPosts } = usePost();
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Safe access to posts and pagination
  const safePosts = Array.isArray(posts) ? posts : [];
  const safePagination = pagination || { page: 1, pages: 1, limit: 10, total: 0 };
  const hasPosts = safePosts.length > 0;
  const hasMultiplePages = safePagination.pages > 1;

  useEffect(() => {
    fetchPosts(1, 10, selectedCategory);
  }, [selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchPosts(searchQuery);
    } else {
      fetchPosts(1, 10, selectedCategory);
    }
  };

  const handleCategoryFilter = (categorySlug) => {
    setSelectedCategory(categorySlug === selectedCategory ? null : categorySlug);
    setSearchQuery('');
  };

  const handlePageChange = (newPage) => {
    fetchPosts(newPage, 10, selectedCategory);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Safe categories access
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="posts-page">
      <div className="container">
        <h1>All Posts</h1>

        <div className="filters-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="category-filters">
            <button
              className={!selectedCategory ? 'active' : ''}
              onClick={() => handleCategoryFilter(null)}
            >
              All
            </button>
            {safeCategories.map((category) => (
              <button
                key={category._id || category.slug}
                className={selectedCategory === category.slug ? 'active' : ''}
                onClick={() => handleCategoryFilter(category.slug)}
                style={{
                  borderColor: category.color,
                  color: selectedCategory === category.slug ? 'white' : category.color,
                  backgroundColor: selectedCategory === category.slug ? category.color : 'transparent',
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : hasPosts ? (
          <>
            <div className="posts-grid">
              {safePosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {hasMultiplePages && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(safePagination.page - 1)}
                  disabled={safePagination.page === 1}
                >
                  Previous
                </button>
                <span>
                  Page {safePagination.page} of {safePagination.pages}
                </span>
                <button
                  onClick={() => handlePageChange(safePagination.page + 1)}
                  disabled={safePagination.page === safePagination.pages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="no-posts">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Posts;