// PostContext.jsx

import { createContext, useContext, useState } from 'react';
import { postService } from '../services/api';

const PostContext = createContext();

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within PostProvider');
  }
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const fetchPosts = async (page = 1, limit = 10, category = null) => {
    setLoading(true);
    setError(null);
    try {
      const data = await postService.getAllPosts(page, limit, category);
      setPosts(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchPost = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await postService.getPost(id);
      setCurrentPost(data.data);
      return data.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      const data = await postService.createPost(postData);
      setPosts([data.data, ...posts]);
      return { success: true, data: data.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to create post',
      };
    }
  };

  const updatePost = async (id, postData) => {
    try {
      const data = await postService.updatePost(id, postData);
      setPosts(posts.map((p) => (p._id === id ? data.data : p)));
      if (currentPost?._id === id) {
        setCurrentPost(data.data);
      }
      return { success: true, data: data.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to update post',
      };
    }
  };

  const deletePost = async (id) => {
    try {
      await postService.deletePost(id);
      setPosts(posts.filter((p) => p._id !== id));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to delete post',
      };
    }
  };

  const searchPosts = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await postService.searchPosts(query);
      setPosts(data.data);
      return data.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Search failed');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (postId, content) => {
    try {
      const data = await postService.addComment(postId, { content });
      if (currentPost?._id === postId) {
        setCurrentPost(data.data);
      }
      return { success: true, data: data.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to add comment',
      };
    }
  };

  const value = {
    posts,
    currentPost,
    loading,
    error,
    pagination,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    searchPosts,
    addComment,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};