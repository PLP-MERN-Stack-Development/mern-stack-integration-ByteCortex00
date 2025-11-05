// src/pages/Home.jsx - Home page

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePost } from '../contexts/PostContext';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import './Home.css';

const Home = () => {
  const { posts, loading, fetchPosts } = usePost();

  useEffect(() => {
    fetchPosts(1, 6);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>Welcome to MERN Blog</h1>
          <p>Discover amazing stories and share your thoughts with the world</p>
          <Link to="/posts" className="btn-primary">
            Explore Posts
          </Link>
        </div>
      </section>

      <section className="featured-posts">
        <div className="container">
          <h2>Latest Posts</h2>
          
          {loading ? (
            <LoadingSpinner />
          ) : (posts?.length || 0) > 0 ? (
            <div className="posts-grid">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="no-posts">No posts available yet.</p>
          )}

          <div className="view-all">
            <Link to="/posts" className="btn-secondary">
              View All Posts →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;