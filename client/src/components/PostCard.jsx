// PostCard.jsx

import { Link } from 'react-router-dom';
import './PostCard.css';

const PostCard = ({ post }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="post-card">
      <div className="post-card-header">
        {post.category && (
          <span 
            className="post-category"
            style={{ backgroundColor: post.category.color }}
          >
            {post.category.name}
          </span>
        )}
      </div>

      <h2 className="post-title">
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
      </h2>

      <p className="post-excerpt">
        {post.excerpt || post.content.substring(0, 150) + '...'}
      </p>

      <div className="post-meta">
        <div className="author-info">
          <span className="author-avatar">👤</span>
          <span className="author-name">{post.author?.name}</span>
        </div>
        <div className="post-stats">
          <span>👁️ {post.viewCount || 0}</span>
          <span>💬 {post.comments?.length || 0}</span>
          <span>📅 {formatDate(post.createdAt)}</span>
        </div>
      </div>

      <Link to={`/posts/${post._id}`} className="read-more">
        Read More →
      </Link>
    </div>
  );
};

export default PostCard;