// src/pages/CreatePost.jsx - Create and edit post page

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePost } from '../contexts/PostContext';
import { useCategories } from '../hooks/useCategories';
import LoadingSpinner from '../components/LoadingSpinner';
import './CreatePost.css';

const CreatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const { currentPost, fetchPost, createPost, updatePost } = usePost();
  const { categories, loading: categoriesLoading } = useCategories();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    isPublished: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchPost(id).then((post) => {
        if (post) {
          setFormData({
            title: post.title || '',
            content: post.content || '',
            excerpt: post.excerpt || '',
            category: post.category?._id || '',
            tags: post.tags?.join(', ') || '',
            isPublished: post.isPublished || false,
          });
        }
      });
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Format data
    const postData = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    const result = isEditMode
      ? await updatePost(id, postData)
      : await createPost(postData);

    if (result.data) {
      navigate(`/posts/${result.data._id}`);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  if (categoriesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="create-post-page">
      <div className="container">
        <h1>{isEditMode ? 'Edit Post' : 'Create New Post'}</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter post title..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt</label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Short description (optional)..."
              maxLength="200"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="javascript, react, nodejs (comma separated)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="15"
              placeholder="Write your post content here..."
            />
          </div>

          <div className="form-group-checkbox">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
            />
            <label htmlFor="isPublished">Publish immediately</label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading
                ? isEditMode
                  ? 'Updating...'
                  : 'Creating...'
                : isEditMode
                ? 'Update Post'
                : 'Create Post'}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;