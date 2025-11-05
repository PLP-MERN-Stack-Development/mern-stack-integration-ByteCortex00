// PostContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import { postService } from '../services/api';

const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ 
    page: 1, 
    limit: 10, 
    total: 0, 
    pages: 1 
  });

  const fetchPosts = useCallback(async (page = 1, limit = 10, category = null) => {
    try {
      setLoading(true);
      setError(null);
      const data = await postService.getAllPosts(page, limit, category);
      
      // Normalize posts array with safe defaults
      const items = (data && (data.posts || data.data)) || Array.isArray(data) ? data : [];
      const postsArray = Array.isArray(items) ? items : (items.posts || items.data) || [];
      setPosts(postsArray);

      // Safe pagination setup with defaults
      const safePagination = {
        page: page,
        limit: limit,
        total: 0,
        pages: 1,
        ...(data?.pagination || {}),
        ...(data && { 
          page: data.page || page,
          pages: data.pages || 1,
          total: data.total || 0,
          limit: data.limit || limit
        })
      };
      
      setPagination(safePagination);
      return data;
    } catch (err) {
      setError(err.message || 'Error fetching posts');
      // Set empty posts and default pagination on error
      setPosts([]);
      setPagination({ page: 1, limit: 10, total: 0, pages: 1 });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = async (postData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await postService.createPost(postData);
      setPosts(prevPosts => [data, ...prevPosts]);
      return data;
    } catch (err) {
      setError(err.message || 'Error creating post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id, postData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await postService.updatePost(id, postData);
      setPosts(prevPosts =>
        prevPosts.map(post => (post._id === id ? data : post))
      );
      return data;
    } catch (err) {
      setError(err.message || 'Error updating post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await postService.deletePost(id);
      setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
    } catch (err) {
      setError(err.message || 'Error deleting post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchPosts = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const data = await postService.searchPosts(query);
      const items = (data && (data.posts || data.data)) || Array.isArray(data) ? data : [];
      const postsArray = Array.isArray(items) ? items : (items.posts || items.data) || [];
      setPosts(postsArray);
      
      // Safe pagination for search results
      setPagination({ 
        page: 1, 
        limit: postsArray.length || 10, 
        total: postsArray.length || 0, 
        pages: 1 
      });
      return data;
    } catch (err) {
      setError(err.message || 'Error searching posts');
      setPosts([]);
      setPagination({ page: 1, limit: 10, total: 0, pages: 1 });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    posts,
    loading,
    error,
    pagination,
    fetchPosts,
    searchPosts,
    createPost,
    updatePost,
    deletePost
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
};

export default PostContext;