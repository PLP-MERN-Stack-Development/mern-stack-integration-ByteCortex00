import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePost } from '../contexts/PostContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { posts, loading, fetchPosts } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated, fetchPosts]);

  const handleCreatePost = () => {
    navigate('/posts/create');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}! 👋</h1>
        <button className="create-post-button" onClick={handleCreatePost}>
          Create New Post
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Your Posts</h3>
          <p className="stat-number">{posts.length}</p>
        </div>
        {/* Add more stat cards as needed */}
      </div>

      <div className="dashboard-content">
        <section className="recent-posts">
          <h2>Your Recent Posts</h2>
          {posts.length > 0 ? (
            <div className="posts-list">
              {posts.slice(0, 5).map(post => (
                <div key={post._id} className="post-item">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt || post.content.substring(0, 100)}...</p>
                  <div className="post-actions">
                    <button onClick={() => navigate(`/posts/${post._id}`)}>
                      View
                    </button>
                    <button onClick={() => navigate(`/edit-post/${post._id}`)}>
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-posts">
              You haven't created any posts yet. 
              <button onClick={handleCreatePost}>Create your first post</button>
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;