// PostDetail.jsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePost } from '../contexts/PostContext';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentPost, loading, fetchPost, deletePost, addComment } = usePost();
  const { user, isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const result = await deletePost(id);
      if (result.success) {
        navigate('/posts');
      } else {
        alert(result.error);
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setCommentLoading(true);
    const result = await addComment(id, comment);
    if (result.success) {
      setComment('');
    } else {
      alert(result.error);
    }
    setCommentLoading(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!currentPost) {
    return (
      <div className="container" style={{ padding: '3rem' }}>
        <h2>Post not found</h2>
        <Link to="/posts">Back to posts</Link>
      </div>
    );
  }

  const isAuthor = user && currentPost.author?._id === user.id;

  return (
    <div className="post-detail">
      <div className="container">
        <Link to="/posts" className="back-link">← Back to posts</Link>

        <article className="post-content">
          <header className="post-header">
            {currentPost.category && (
              <span
                className="post-category"
                style={{ backgroundColor: currentPost.category.color }}
              >
                {currentPost.category.name}
              </span>
            )}
            <h1>{currentPost.title}</h1>

            <div className="post-meta">
              <div className="author-info">
                <span className="author-avatar">👤</span>
                <div>
                  <p className="author-name">{currentPost.author?.name}</p>
                  <p className="post-date">{formatDate(currentPost.createdAt)}</p>
                </div>
              </div>
              <div className="post-stats">
                <span>👁️ {currentPost.viewCount || 0} views</span>
                <span>💬 {currentPost.comments?.length || 0} comments</span>
              </div>
            </div>

            {isAuthor && (
              <div className="post-actions">
                <Link to={`/edit-post/${currentPost._id}`} className="btn-edit">
                  Edit Post
                </Link>
                <button onClick={handleDelete} className="btn-delete">
                  Delete Post
                </button>
              </div>
            )}
          </header>

          <div className="post-body">
            <p>{currentPost.content}</p>
          </div>

          {currentPost.tags && currentPost.tags.length > 0 && (
            <div className="post-tags">
              {currentPost.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </article>

        <section className="comments-section">
          <h2>Comments ({currentPost.comments?.length || 0})</h2>

          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                rows="4"
                required
              />
              <button type="submit" disabled={commentLoading}>
                {commentLoading ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <p className="login-prompt">
              <Link to="/login">Login</Link> to leave a comment
            </p>
          )}

          <div className="comments-list">
            {currentPost.comments && currentPost.comments.length > 0 ? (
              currentPost.comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <div className="comment-header">
                    <span className="comment-avatar">👤</span>
                    <div>
                      <p className="comment-author">{comment.user?.name}</p>
                      <p className="comment-date">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostDetail;